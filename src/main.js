const { useForm, appendToList } = require("./helpers");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", e => {
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z0-9]/gi, '')) return;
    appendToList(fruit, nutritionList);
});

nutritionList.addEventListener('click', (e) => {
    if (e.target.className === 'fruit-list') return
    e.target.remove();
});


