document.addEventListener("DOMContentLoaded", () => {
  const walls = Array.from(document.querySelectorAll("[data-conference-wall]"));
  const dialog = document.querySelector("[data-conference-lightbox]");
  if (!walls.length || !dialog) return;

  const image = dialog.querySelector(".conference-lightbox__image");
  const stage = dialog.querySelector(".conference-lightbox__stage");
  const closeButton = dialog.querySelector(".conference-lightbox__close");
  const previousButton = dialog.querySelector(".conference-lightbox__previous");
  const nextButton = dialog.querySelector(".conference-lightbox__next");
  const mobile = window.matchMedia("(max-width: 640px)");
  let activePhotos = [];
  let activeIndex = 0;
  let opener = null;
  let originalOverflow = "";
  let touchStart = null;

  function showPhoto(index) {
    activeIndex = (index + activePhotos.length) % activePhotos.length;
    const photo = activePhotos[activeIndex];
    image.src = photo.href;
    image.alt = photo.querySelector("img").alt;
    for (const offset of [-1, 1]) {
      const adjacent = new Image();
      adjacent.src = activePhotos[(activeIndex + offset + activePhotos.length) % activePhotos.length].href;
    }
  }

  for (const wall of walls) {
    const originalRows = Array.from(wall.querySelectorAll(".conference-row"), (row) => Array.from(row.children));
    const photos = originalRows.flat();

    function arrangeRows() {
      const rows = mobile.matches ? Array.from({ length: Math.ceil(photos.length / 2) }, (_, i) => photos.slice(i * 2, i * 2 + 2)) : originalRows;
      const fragment = document.createDocumentFragment();
      for (const rowPhotos of rows) {
        const row = document.createElement("div");
        row.className = "conference-row";
        row.append(...rowPhotos);
        fragment.append(row);
      }
      wall.replaceChildren(fragment);
    }

    arrangeRows();
    mobile.addEventListener("change", arrangeRows);

    wall.addEventListener("click", (event) => {
      const photo = event.target.closest("[data-conference-photo]");
      if (!photo || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function") return;
      event.preventDefault();
      activePhotos = photos;
      opener = photo;
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showPhoto(photos.indexOf(photo));
      dialog.showModal();
    });
  }

  closeButton.addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => showPhoto(activeIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(activeIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target === stage) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });

  dialog.addEventListener("close", () => {
    document.body.style.overflow = originalOverflow;
    if (opener) opener.focus({ preventScroll: true });
  });

  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) showPhoto(activeIndex + (dx < 0 ? 1 : -1));
      touchStart = null;
    },
    { passive: true }
  );
});
