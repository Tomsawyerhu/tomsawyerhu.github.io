(() => {
  const stats = document.querySelector(".visitor-stats");
  // Preview servers must not inflate the public site's counts.
  if (!stats || window.location.hostname !== stats.dataset.counterHost) return;

  const views = document.getElementById("busuanzi_value_site_pv");
  const visitors = document.getElementById("busuanzi_value_site_uv");
  if (!views || !visitors) return;

  const observer = new MutationObserver(() => {
    const counts = [views, visitors].map((element) => element.textContent.trim());
    if (!counts.every((count) => /^\d+$/.test(count))) return;

    stats.hidden = false;
    observer.disconnect();
    window.clearTimeout(timeout);
  });

  // Stay unobtrusive when the service is slow, blocked, or unavailable.
  const timeout = window.setTimeout(() => observer.disconnect(), 15000);
  observer.observe(stats, { childList: true, subtree: true, characterData: true });

  const script = document.createElement("script");
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.async = true;
  script.referrerPolicy = "origin";
  script.onerror = () => {
    observer.disconnect();
    window.clearTimeout(timeout);
  };
  document.head.appendChild(script);
})();
