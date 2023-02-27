const { useForm, createFruitCard, createImageCard } = require("./helpers");

const { fruity, pixabay } = require("./apis");

// --- dom elements ---
const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");
const pictureList = document.querySelector("#picture-sect .images");
const totalCalElement = document.querySelector("#nutrition-sect .fruit-total");
const clearImgButton = document.querySelector("#picture-sect .picture-clear");

// --- page state ---
let cals = 0;

const incrimentCals = (ammount) => {
  cals += ammount;
  totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`;
};

const decrimentCals = (ammount) => {
  cals -= ammount;
  totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`;
};

// --- event listeners ---
fruitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // get user data
  const { fruit } = useForm(e);
  if (!fruit.replace(/[^a-z]/gi, "")) return;

  // call apis based on data
  const res = await fruity.getFruit(fruit);
  const { hits } = await pixabay.getPicture(fruit);

  // pick random image lol
  const img = hits[Math.floor(Math.random() * hits.length)];

  createFruitCard(res, nutritionList, fruitForm);
  createImageCard(img, pictureList);
  incrimentCals(res.nutritions.calories || 0);
});

// handle delete on click
nutritionList.addEventListener("click", (e) => {
  const item = e.target.closest("li");
  decrimentCals(item.dataset.calories);
  item.remove();
});

// handle delete on click button for images
clearImgButton.addEventListener("click", () => {
  pictureList.innerHTML = "";
});

// handle download image on click -- this is hella annoying as a feature
// pictureList.addEventListener("click", (e) => {
//   const item = e.target.closest("img");
//   if (item) window.open(item.src);
// });

// PS why is it so verbose to do the simpliest of things bruh... i hate vnl js....
