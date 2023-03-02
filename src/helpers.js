function createFormError(error, form) {
  const err = form.querySelector(".error");
  if (err) {
    err.textContent = error;
  } else {
    const errorEl = document.createElement("p");
    errorEl.textContent = error;
    errorEl.className = "error";
    form.appendChild(errorEl);
  }
}

function createNutritionList(nutritionList = []) {
  const innerEl = document.createElement("div");
  nutritionList.forEach((item) => {
    const dataTag = document.createElement("p");
    let k = item[0];
    let v = item[1];
    dataTag.textContent = `${k} - ${v}`;
    innerEl.appendChild(dataTag);
  });

  return innerEl;
}

function createFruitCard(fruitRes) {
  if (fruitRes.error) {
    createFormError(fruitRes.error, list);
  } else {
    const { id, name, genus, nutritions } = fruitRes;
    const el = document.createElement("li");

    //create container for metadata
    const metaContainer = document.createElement("div");
    metaContainer.className = "metadata-container";

    // create title
    const title = document.createElement("h2");
    title.innerText = `${name} - ${genus}`;
    metaContainer.appendChild(title);

    // create nutritional info
    const nutritionList = Object.entries(nutritions);
    const nutritionListEl = createNutritionList(nutritionList);

    metaContainer.appendChild(nutritionListEl);
    el.appendChild(metaContainer);

    const buttonContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const selectBtn = document.createElement("button");
    selectBtn.innerText = "Select";
    selectBtn.dataset.select = "true";
    deleteBtn.innerText = "X";
    deleteBtn.dataset.delete = "true";

    buttonContainer.className = "item-action-group";

    buttonContainer.appendChild(deleteBtn);
    buttonContainer.appendChild(selectBtn);

    el.appendChild(buttonContainer);

    el.className = "fruit-list-item";
    el.dataset.name = name;
    el.dataset.calories = nutritions.calories;
    el.dataset.protein = nutritions.protein;
    el.dataset.id = id;

    return el;
  }
}

function createFreqObj(arr) {
  const freq = {};
  for (item of arr) {
    freq[item] ? freq[item]++ : (freq[item] = 1);
  }
  return freq;
}

module.exports = {
  createFruitCard,
  createFreqObj,
};
