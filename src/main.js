const { useForm, createFormError, createFruitCard } = require("./helpers");
const { fruity, pixabay } = require("./apis");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");
const totalCalElement = document.querySelector('#nutrition-sect .fruit-total');

let cals = 0;

fruitForm.addEventListener("submit", async (e) => {
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z]/gi, '')) return;
    const res = await fruity.getFruit(fruit);
    const picRes = await pixabay.getPicture(fruit);

    if (res.id) {
        const card = createFruitCard(res);
        nutritionList.appendChild(card);

        const { calories } = res.nutritions;
        cals += calories;
        totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`

        const err = fruitForm.querySelector('.form-error')
        if (err) err.remove();

    } else {
        const err = fruitForm.querySelector('.form-error')
        if (err) err.remove();

        const errEl = createFormError(res.error, fruitForm)
        fruitForm.appendChild(errEl)
    }
});

nutritionList.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    cals -= item.dataset.calories;
    totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`

    item.remove();
})

