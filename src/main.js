const { useForm, createFormError, createFruitCard, createImageCard } = require("./helpers");
const { fruity, pixabay } = require("./apis");

// dom elements
const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");
const pictureListSect = document.querySelector('#picture-sect');
const pictureList = document.querySelector('#picture-sect .images');
const totalCalElement = document.querySelector('#nutrition-sect .fruit-total');
const clearImgButton = document.querySelector('#picture-sect .picture-clear');

// page state
let cals = 0;

// event listeners
fruitForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // get user data
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z]/gi, '')) return;

    // call apis based on data
    const res = await fruity.getFruit(fruit);
    const { hits } = await pixabay.getPicture(fruit);
    // trim picture response
    const searchImages = hits.slice(0, 2);

    // if there are search images append them to the dom
    if (searchImages) {
        searchImages.forEach((image) => {
            const fruitCard = createImageCard(image);

            console.log(pictureList);

            pictureList.appendChild(fruitCard);
        })

    }
    // show error if there arent any results
    else {
        const errEl = createFormError('no image results')
        pictureList.appendChild(errEl)
    }


    // if there is a res from the fruit api append them to the dom
    if (res.id) {
        const card = createFruitCard(res);
        nutritionList.appendChild(card);

        // keep track of calories
        const { calories } = res.nutritions;
        cals += calories;
        totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`

        // remove error as there was a success
        const err = fruitForm.querySelector('.form-error')
        if (err) err.remove();

    }
    // else, show error
    else {
        const err = fruitForm.querySelector('.form-error')
        if (err) err.remove();

        const errEl = createFormError(res.error, fruitForm)
        fruitForm.appendChild(errEl)
    }
});


// handle delete on click
nutritionList.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    cals -= item.dataset.calories;
    totalCalElement.innerHTML = `<h3>total calories: ${cals}</h3>`

    item.remove();
})

// handle delete on click button for images
clearImgButton.addEventListener('click', () => {
    pictureList.innerHTML = ''
})

pictureList.addEventListener('click', (e) => {
    const item = e.target.closest('img');
    if(item) window.open(item.src)
})