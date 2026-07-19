document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stars[data-github-repo]").forEach(async (element) => {
    const repository = element.dataset.githubRepo;
    const starCount = element.querySelector(".github-star-count");
    const forkElement = element.parentElement.querySelector(".github-forks");
    const forkCount = forkElement.querySelector(".github-fork-count");

    try {
      const response = await fetch(`https://api.github.com/repos/${repository}`, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) return;

      const data = await response.json();
      starCount.textContent = data.stargazers_count.toLocaleString();
      forkCount.textContent = data.forks_count.toLocaleString();
      element.title = `${data.stargazers_count.toLocaleString()} GitHub stars`;
      forkElement.title = `${data.forks_count.toLocaleString()} GitHub forks`;
    } catch (_error) {
      // Keep the fallback glyph when GitHub is unavailable or rate-limited.
    }
  });
});
