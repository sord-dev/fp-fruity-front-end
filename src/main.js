const { useForm, appendToList } = require("./helpers");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", e => {
    const { fruit } = useForm(e);
    if(!fruit.replace(/[^a-z]/gi, '')) return;
    appendToList(fruit, nutritionList);
})

nutritionList.addEventListener('click', (e) => e.target.remove());


