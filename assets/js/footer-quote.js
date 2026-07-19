(() => {
  const footerQuote = document.querySelector(".footer-quote[data-quotes-url]");

  if (!footerQuote) return;

  const quoteText = footerQuote.querySelector("[data-quote-text]");
  const quoteAuthor = footerQuote.querySelector("[data-quote-author]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const typeText = (element, text, delay) =>
    new Promise((resolve) => {
      const characters = Array.from(text);
      let index = 0;

      element.textContent = "";
      element.classList.add("is-typing");

      const typeNextCharacter = () => {
        element.textContent += characters[index];
        index += 1;

        if (index < characters.length) {
          window.setTimeout(typeNextCharacter, delay);
        } else {
          element.classList.remove("is-typing");
          resolve();
        }
      };

      typeNextCharacter();
    });

  const showQuote = async ({ quote, author }) => {
    footerQuote.setAttribute("aria-label", `“${quote}” — ${author}`);

    if (reduceMotion) {
      quoteText.textContent = quote;
      quoteAuthor.textContent = `— ${author}`;
      return;
    }

    quoteText.textContent = "";
    quoteAuthor.textContent = "";
    await typeText(quoteText, quote, 28);
    await new Promise((resolve) => window.setTimeout(resolve, 220));
    await typeText(quoteAuthor, `— ${author}`, 38);
  };

  fetch(footerQuote.dataset.quotesUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Quote data request failed: ${response.status}`);
      return response.json();
    })
    .then((quotes) => {
      if (!Array.isArray(quotes) || quotes.length === 0) {
        throw new Error("Quote data is empty.");
      }

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      return showQuote(randomQuote);
    })
    .catch((error) => {
      console.warn("Could not load a random footer quote; showing the fallback quote.", error);
    });
})();
