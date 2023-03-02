const { createFruitCard, createFreqObj } = require("./helpers");
const { fruity } = require("./apis");

// --- dom elements ---
const fruitFormInput = document.querySelector("header .header-searchbar input");
const fruitList = document.querySelector(".fruit-bar .fruit-list");
const selectedFruitsList = document.querySelector(".selected-items-list");
// const addFruitForm = document.querySelector("#create-fruit-form");

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

// handle fruit card delete on click
fruitList.addEventListener("click", (e) => {
  // get data to update state
  const target = e.target.closest("li");
  const name = target.dataset.name.toLowerCase() || "";
  const calories = Number(target.dataset.calories) || 0;
  const protein = Number(target.dataset.protein) || 0;

  // update state
  selectedFruits.push(name);
  totalCals += calories;
  totalProtein += protein;
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
});

// creation somewhat done - SyntaxError: Unexpected token 'c', "creation e"... is not valid JSON?
// but still adds the fruit sometimes
// addFruitForm.addEventListener("submit", async (e) => {
//   const { fruit } = useForm(e);
//   const data = { name: fruit };

//   if (fruit) {
//     const res = await fruity.postFruit(data);
//     console.log(res);
//   }
// });

// PS why is it so verbose to do the simpliest of things bruh... i hate vnl js....
