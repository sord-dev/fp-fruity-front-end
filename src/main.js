const { useForm, appendToList, createFormError } = require("./helpers");
const { fruity } = require("./fruityAPI");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", async (e) => {
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z0-9]/gi, '')) return;
    const res = await fruity.getFruit(fruit);

    res.id ? appendToList(res, nutritionList) 
    : createFormError(res.error, fruitForm)

});

nutritionList.addEventListener('click', (e) => {
    if (e.target.className === 'fruit-list') return
    e.target.remove();
});