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
