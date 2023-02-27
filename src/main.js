const { useForm } = require("./helpers");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", e => {
    const { fruit } = useForm(e);

    if (!!fruit) addFruit(fruit);
})

nutritionList.addEventListener('click', (e)  => e.target.remove());

function addFruit(fruit) {
    const el = document.createElement("li");
    el.textContent = fruit;
    el.className = 'fruit-list-item'

    nutritionList.appendChild(el);
}