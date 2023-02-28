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

function clearFormError(form){
  const err = form.querySelector(".error");
  if(err) err.remove();
}

function createImageCard(image, list) {
  if (!image.previewURL) createFormError("no image results", list);
  const { previewURL } = image;
  const fruitImg = document.createElement("img");

  fruitImg.src = previewURL;

  list.appendChild(fruitImg);
  clearFormError(list)
}

function createFruitCard(fruitRes, list, errLocation = false) {
  let errEl;
  errLocation ? (errEl = errLocation) : (errEl = list);
  if (!fruitRes.id) createFormError('fruit not found.', errEl);
  else {
    const { name, genus, nutritions } = fruitRes;
    const el = document.createElement("li");

    const content = `<h2>${name} - ${genus}</h2>`;
    el.innerHTML = content;

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

    list.appendChild(el);
    clearFormError(errEl)
  }
}

module.exports = {
  useForm,
  createFormError,
  createFruitCard,
  createImageCard,
};
