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
