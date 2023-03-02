(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// acc url = https://fruit-api.onrender.com

const fruity = {
  baseurl: "https://fruit-api.onrender.com",
  async getFruit(query) {
    try {
      const pRes = await fetch(`${this.baseurl}/fruits/${query}`);
      const res = await pRes.json();
      return res;
    } catch (error) {
      return error;
    }
  },

  async getAllFruits() {
    try {
      const pRes = await fetch(`${this.baseurl}/fruits`);
      const res = await pRes.json();
      return res;
    } catch (error) {
      return error;
    }
  },

  // ss error where data returns false on the post route
  async postFruit(fruitData) {
    const data = JSON.stringify(fruitData);
    console.log(fruitData);
    try {
      const pRes = await fetch(`${this.baseurl}/fruits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const res = await pRes.json();

      return res;
    } catch (error) {
      return error;
    }
  },
  async deleteFruit(id) {
    if (!id) return;
    try {
      const pRes = await fetch(`${this.baseurl}/fruits/${id}`, { method: "DELETE" });

      const res = await pRes.json();
      return res;
    } catch (error) {
      return error;
    }
  },
};

module.exports = { fruity };

},{}],2:[function(require,module,exports){
const { fruity } = require('./fruityAPI')
const { pixabay } = require('./pixabayAPI')

module.exports = {fruity, pixabay}
},{"./fruityAPI":1,"./pixabayAPI":3}],3:[function(require,module,exports){
const TEMP_KEY = "33986162-cedca4d11848ce9f647a94446";

if (!TEMP_KEY) throw new Error("Enter a api key for pixabay API -- https://pixabay.com/api/docs/#api_search_images")

const pixabay = {
    baseurl: 'https://pixabay.com/api',
    async getPicture(query) {
        try {
            const pRes = await fetch(`${this.baseurl}/?key=${TEMP_KEY}&q=${query}&image_type=photo`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    },
};

module.exports = { pixabay }
},{}],4:[function(require,module,exports){
function createFormError(error, form) {
  const err = form.querySelector(".error");
  if (err) {
    err.textContent = error;
  } else {
    const errorEl = document.createElement("p");
    errorEl.textContent = error;
    errorEl.className = "error";
    form.appendChild(errorEl);
  }
}

function createNutritionList(nutritionList = []) {
  const innerEl = document.createElement("div");
  nutritionList.forEach((item) => {
    const dataTag = document.createElement("p");
    let k = item[0];
    let v = item[1];
    dataTag.textContent = `${k} - ${v}`;
    innerEl.appendChild(dataTag);
  });

  return innerEl;
}

function createFruitCard(fruitRes) {
  if (fruitRes.error) {
    createFormError(fruitRes.error, list);
  } else {
    const { id, name, genus, nutritions } = fruitRes;
    const el = document.createElement("li");

    //create container for metadata
    const metaContainer = document.createElement("div");
    metaContainer.className = "metadata-container";

    // create title
    const title = document.createElement("h2");
    title.innerText = `${name} - ${genus}`;
    metaContainer.appendChild(title);

    // create nutritional info
    const nutritionList = Object.entries(nutritions);
    const nutritionListEl = createNutritionList(nutritionList);

    metaContainer.appendChild(nutritionListEl);
    el.appendChild(metaContainer);

    const buttonContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const selectBtn = document.createElement("button");
    selectBtn.innerText = "Select";
    selectBtn.dataset.select = "true";
    deleteBtn.innerText = "X";
    deleteBtn.dataset.delete = "true";

    buttonContainer.className = "item-action-group";

    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(selectBtn);

    el.appendChild(buttonContainer);

    el.className = "fruit-list-item";
    el.dataset.name = name;
    el.dataset.calories = nutritions.calories;
    el.dataset.protein = nutritions.protein;
    el.dataset.id = id;

    return el;
  }
}

function createFreqObj(arr) {
  const freq = {};
  for (item of arr) {
    freq[item] ? freq[item]++ : (freq[item] = 1);
  }
  return freq;
}

module.exports = {
  createFruitCard,
  createFreqObj,
};

},{}],5:[function(require,module,exports){
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

},{"./apis":2,"./helpers":4}]},{},[5]);
