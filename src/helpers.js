function useForm(e) {
    e.preventDefault();
    let values = {};
    let inputs = e.target.querySelectorAll('input');

    inputs.forEach(input => values[input.name] = input.value);

    e.target.reset();

    return values;
}

function createFormError(error) {
    const errorEl = document.createElement('p')
    errorEl.textContent = error;
    errorEl.className = 'error';
    return errorEl;
}

function createImageCard(image) {
    const { previewURL } = image;
    const fruitImg = document.createElement('img');

    fruitImg.src = previewURL;

    return fruitImg
}

function createFruitCard(fruitRes) {

    const { name, genus, nutritions } = fruitRes;

    console.log("creating card... ", { name, genus, nutritions });

    const el = document.createElement("li");

    const content = `<h2>${name} - ${genus}</h2>`
    el.innerHTML = content;

    const innerEl = document.createElement('div')

    Object.entries(nutritions).forEach((item) => {
        const dataTag = document.createElement('p')
        let k = item[0];
        let v = item[1];

        dataTag.textContent = `${k} - ${v}`
        innerEl.appendChild(dataTag)
    })

    el.appendChild(innerEl)
    el.className = 'fruit-list-item';
    el.dataset.calories = nutritions.calories;

    return el
}


module.exports = { useForm, createFormError, createFruitCard, createImageCard }