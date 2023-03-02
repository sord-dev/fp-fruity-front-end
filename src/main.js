const { createFruitCard, createFreqObj } = require("./helpers");
const { fruity } = require("./apis");

// --- dom elements ---
const fruitFormInput = document.querySelector("header .header-searchbar input");
const fruitList = document.querySelector(".fruit-bar .fruit-list");
const selectedFruitsList = document.querySelector(".selected-items-list");

const totalCalsEl = document.querySelector(".selected-item-totals-cals");
const totalProteinEl = document.querySelector(".selected-item-totals-protein");

// --- page state ---
let fruits = [];
let selectedFruits = [];

let totalCals = 0;
let totalProtein = 0;

let selectedFruitsFreq;

// --- event listeners ---

// on dom load get all fruits
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fruity.getAllFruits();

  data.forEach((fruit) => {
    const card = createFruitCard(fruit);
    fruits.push(fruit);
    fruitList.appendChild(card);
  });

  totalCalsEl.innerHTML = totalCals;
  totalProteinEl.innerHTML = totalProtein;
});

fruitFormInput.addEventListener("input", async (e) => {
  e.preventDefault();
  // get user data
  const query = e.target.value;

  let result = fruits.filter((fruitItem) => {
    return fruitItem.name.toLowerCase().includes(query);
  });

  if (result.length > 0) {
    fruitList.innerHTML = "";
    result.forEach((fruit) => {
      const card = createFruitCard(fruit);
      fruitList.appendChild(card);
    });
  }
});

// handle fruit card click
fruitList.addEventListener("click", async (e) => {
  // get data to update state
  const targetItem = e.target.closest("li");
  const targetAction = e.target.closest("button");

  if (!targetItem || !targetAction) return;

  if (targetAction.innerText === "X") {
    const res = await fruity.deleteFruit(targetItem.dataset.id);
    console.log(res);
    targetItem.remove();
  } else if (targetAction.innerText === "Select") {
    selectFruit(targetItem);
  } else {
    return;
  }
});

// PS why is it so verbose to do the simpliest of things bruh... i hate vnl js....

function selectFruit(target) {
  const { name, calories, protein } = target.dataset;

  // update state
  selectedFruits.push(name);
  totalCals += Number(calories);
  totalProtein += Number(protein);
  totalCalsEl.innerHTML = Math.round(totalCals);
  totalProteinEl.innerHTML = totalProtein.toFixed(2);

  // create tally to display for selected items list
  selectedFruitsFreq = createFreqObj(selectedFruits);
  const selected = Object.entries(selectedFruitsFreq);

  selectedFruitsList.innerHTML = "";

  // render selected items state as tally
  for (selItem of selected) {
    const el = document.createElement("p");
    el.innerHTML = `${selItem[0]} x ${selItem[1] == 1 ? 1 : selItem[1]}`;
    selectedFruitsList.appendChild(el);
  }
}
