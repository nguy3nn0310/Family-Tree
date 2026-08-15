const treeCanvas = document.getElementById("treeCanvas");
const treeViewport = document.getElementById("treeViewport");
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const resetZoom = document.getElementById("resetZoom");

let scale = 1;

function applyZoom() {
  treeCanvas.style.transform = `scale(${scale})`;
}

zoomIn.addEventListener("click", () => {
  scale = Math.min(1.4, scale + 0.1);
  applyZoom();
});

zoomOut.addEventListener("click", () => {
  scale = Math.max(0.65, scale - 0.1);
  applyZoom();
});

resetZoom.addEventListener("click", () => {
  scale = 1;
  applyZoom();
});

let isDown = false;
let startX;
let scrollLeft;

treeViewport.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - treeViewport.offsetLeft;
  scrollLeft = treeViewport.scrollLeft;
});

treeViewport.addEventListener("mouseleave", () => {
  isDown = false;
});

treeViewport.addEventListener("mouseup", () => {
  isDown = false;
});

treeViewport.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - treeViewport.offsetLeft;
  const walk = (x - startX) * 1.3;
  treeViewport.scrollLeft = scrollLeft - walk;
});

const modal = document.getElementById("personModal");
const closeModal = document.getElementById("closeModal");
const modalName = document.getElementById("modalName");

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".person-card");
    const name = card.querySelector("h3").textContent;
    modalName.textContent = name;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});
