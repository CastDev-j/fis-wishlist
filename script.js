const addBtn = document.getElementById("add-btn");
const wishlist = document.getElementById("wishlist");
const emptyMsg = document.getElementById("empty-msg");
const STORAGE_KEY = "wishlist";

function loadWishes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveWishes() {
  const wishes = [...wishlist.querySelectorAll("li")].map((li) =>
    li.textContent.trim()
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function updateEmptyState() {
  emptyMsg.hidden = wishlist.children.length > 0;
}

function createWish(text = "", focus = false) {
  const li = document.createElement("li");
  li.contentEditable = "true";
  li.textContent = text;
  li.addEventListener("input", saveWishes);
  li.addEventListener("blur", saveWishes);
  wishlist.appendChild(li);
  updateEmptyState();
  if (focus) li.focus();
}

addBtn.addEventListener("click", () => createWish("", true));

loadWishes().forEach((text) => createWish(text));
updateEmptyState();
