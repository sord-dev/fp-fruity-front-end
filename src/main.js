const { useForm, createFormError, createFruitCard } = require("./helpers");
const { fruity } = require("./fruityAPI");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");
const totalCalElement = document.querySelector('#nutrition-sect .fruit-total');

let cals = 0;

fruitForm.addEventListener("submit", async (e) => {
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z]/gi, '')) return;
    const res = await fruity.getFruit(fruit);

    if (res.id) {
        const card = createFruitCard(res);
        const { calories } = res.nutritions;
        cals += calories;
        totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`
        nutritionList.appendChild(card)
    } else {
        createFormError(res.error, fruitForm)
    }
});

nutritionList.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    cals -= item.dataset.calories;
    totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`

    item.remove();
})