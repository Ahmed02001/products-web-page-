hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// ── PRODUCT FILTERS ──
const cards = Array.from(document.querySelectorAll(".product-card"));
const grid = document.querySelector(".products-grid");
const searchInput = document.querySelector(".search-box input");
const selects = document.querySelectorAll(".filter-select");
const catDrop = selects[0];
const stockDrop = selects[1];
const subtitle = document.querySelector(".page-title-group p");

// Empty state card
const emptyEl = document.createElement("div");
emptyEl.style.cssText =
  "grid-column:1/-1;padding:60px 20px;text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:12px;display:none;";
emptyEl.innerHTML =
  '<div style="font-size:40px;margin-bottom:12px;">🛍️</div><div style="font-size:15px;font-weight:600;margin-bottom:6px;">No products found</div><div style="font-size:13px;color:var(--muted);">Try a different search or filter</div>';
grid.appendChild(emptyEl);

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = catDrop.value.toLowerCase();
  const stock = stockDrop.value.toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const catEl = card.querySelector(".product-cat");
    const nameEl = card.querySelector(".product-name");
    const stockEl = card.querySelector(".product-stock");
    const cardCat = catEl ? catEl.textContent.trim().toLowerCase() : "";
    const cardTxt = (nameEl ? nameEl.textContent : "") + " " + cardCat;
    const isInStock = stockEl && stockEl.classList.contains("in-stock");

    const catOk = cat === "all categories" || cardCat === cat.toLowerCase();
    const stockOk =
      stock === "all status" ||
      (stock === "in stock" && isInStock) ||
      (stock === "out of stock" && !isInStock);
    const textOk = q === "" || cardTxt.toLowerCase().includes(q);
    const show = catOk && stockOk && textOk;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  emptyEl.style.display = visible === 0 ? "block" : "none";
  subtitle.textContent =
    visible === cards.length
      ? `Showing ${cards.length} products in catalogue`
      : `Showing ${visible} of ${cards.length} products`;
}

searchInput.addEventListener("input", applyFilters);
catDrop.addEventListener("change", applyFilters);
stockDrop.addEventListener("change", applyFilters);
