(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// acc url = https://fruit-api.onrender.com/

const fruity = {
    baseurl: 'http://localhost:3000',
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

    // posts false? 
    async postFruit(fruitData) {
        const data = JSON.stringify(fruitData);
        console.log(fruitData);
        try {
            const pRes = await fetch(`${this.baseurl}/fruits`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            });

            const res = await pRes.json();

            return res;
        } catch (error) {
            return error;
        }
    }
}

module.exports = { fruity }
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
function useForm(e) {
  e.preventDefault();
  let values = {};
  let inputs = e.target.querySelectorAll("input");

  inputs.forEach((input) => (values[input.name] = input.value));

  e.target.reset();

  return values;
}

function createFormError(error, form) {
  const errorEl = document.createElement("p");
  errorEl.textContent = error;
  errorEl.className = "error";
  form.appendChild(errorEl);
}

function createThumbnail(img) {
  const { previewURL } = img;
  const fruitImg = document.createElement("img");
  fruitImg.src = previewURL;

  return fruitImg || false;
}

function createFruitCard(fruitRes, list, img) {
  if (!fruitRes.id) createFormError('fruit not found.', list);
  else {
    const { name, genus, nutritions } = fruitRes;
    const el = document.createElement("li");

    const fruitImg = createThumbnail(img)
    el.appendChild(fruitImg);

    const title = document.createElement('h2')
    title.innerText = `${name} - ${genus}`
    el.appendChild(title)

    const innerEl = document.createElement("div");
    Object.entries(nutritions).forEach((item) => {
      const dataTag = document.createElement("p");
      let k = item[0];
      let v = item[1];
      dataTag.textContent = `${k} - ${v}`;
      innerEl.appendChild(dataTag);
    });    
    el.appendChild(innerEl);

    el.className = "fruit-list-item";
    el.dataset.calories = nutritions.calories;

    return el;
  }
}

module.exports = {
  useForm,
  createFormError,
  createFruitCard,
};

},{}],5:[function(require,module,exports){
const { useForm, createFruitCard } = require("./helpers");
const { fruity, pixabay } = require("./apis");

// --- dom elements ---
const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");
const totalCalElement = document.querySelector('#calories')
const addFruitForm = document.querySelector('#create-fruit-form')

// --- page state ---
let cals = 0;

const incrimentCals = (calories) => {
  cals += calories;
  totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`;
};

const decrimentCals = (calories) => {
  cals -= calories;
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

  // pick random image lol + create card from image and data
  const img = hits[Math.floor(Math.random() * hits.length)];

  // incriment the caloires
  incrimentCals(res.nutritions.calories);

  const card = createFruitCard(res, fruitForm, img);

  nutritionList.appendChild(card)
});

// handle delete on click
nutritionList.addEventListener("click", (e) => {
  const item = e.target.closest("li");
  decrimentCals(item.dataset.calories);
  item.remove();
});

// creation somewhat done - SyntaxError: Unexpected token 'c', "creation e"... is not valid JSON?
addFruitForm.addEventListener('submit', async (e) => {
  const { fruit } = useForm(e);

  const data = { name: fruit }

  if (fruit) {
    const res = await fruity.postFruit(data)
    console.log(res);
  }
})

// PS why is it so verbose to do the simpliest of things bruh... i hate vnl js....

},{"./apis":2,"./helpers":4}]},{},[5]);
