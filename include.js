(() => {
  const includeTargets = document.querySelectorAll("[data-include]");

  const isRewritablePath = (value) => {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;

    return !(
      trimmed.startsWith("#") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("mailto:") ||
      trimmed.startsWith("tel:") ||
      trimmed.startsWith("javascript:")
    );
  };

  const rewriteRelativeAssetPaths = (container, includePath) => {
    const baseUrl = new URL(includePath, window.location.href);
    container.querySelectorAll("[src], [href]").forEach((node) => {
      if (node.hasAttribute("src")) {
        const src = node.getAttribute("src");
        if (isRewritablePath(src)) {
          node.setAttribute("src", new URL(src, baseUrl).href);
        }
      }

      if (node.hasAttribute("href")) {
        const href = node.getAttribute("href");
        if (isRewritablePath(href)) {
          node.setAttribute("href", new URL(href, baseUrl).href);
        }
      }
    });
  };

  const runEmbeddedScripts = (container) => {
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Only set textContent for inline scripts (no src attribute)
      if (!oldScript.hasAttribute("src") && oldScript.textContent.trim()) {
        newScript.textContent = oldScript.textContent;
      }

      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  };
  includeTargets.forEach(async (target) => {
    const includePath = target.getAttribute("data-include");
    if (!includePath) return;

    try {
      const resolvedUrl = new URL(includePath, window.location.href).href;
      const response = await fetch(resolvedUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load ${includePath}: ${response.status}`);
      }

      const markup = await response.text();
      if (includePath.includes("navbar.html")) {
        console.log("[include-debug] navbar fetch url:", resolvedUrl);
        console.log(
          "[include-debug] navbar contains cart-wrap:",
          markup.includes("cart-wrap")
        );
      }
      const content = markup;

      target.innerHTML = content;
      rewriteRelativeAssetPaths(target, includePath);
      runEmbeddedScripts(target);
    } catch (error) {
      console.error(error);
    }
  });
})();
