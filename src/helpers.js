function useForm(e) {
  e.preventDefault();
  let values = {};
  let inputs = e.target.querySelectorAll("input");

  inputs.forEach((input) => (values[input.name] = input.value));

  e.target.reset();

  return values;
}

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

function createThumbnail(img) {
  const fruitImg = document.createElement("img");
  if (!img) {
    fruitImg.src = "https://via.placeholder.com/300";
    return fruitImg;
  } else {
    const { previewURL } = img;
    fruitImg.src = previewURL;
    return fruitImg;
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

function createFruitCard(fruitRes, img) {
  if (fruitRes.error) {
    createFormError(fruitRes.error, list);
  } else {
    const { name, genus, nutritions } = fruitRes;
    const el = document.createElement("li");

    //create thumbnail
    const fruitImg = createThumbnail(img);
    el.appendChild(fruitImg);

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

    el.className = "fruit-list-item";
    el.dataset.name = name;
    el.dataset.calories = nutritions.calories;
    el.dataset.protein  = nutritions.protein;

    return el;
  }
}

function createFreqObj(arr) {
  const freq = {};
  for (item of arr) {
    freq[item] ? freq[item]++ : (freq[item] = 1);
  }
  return freq
}

module.exports = {
  useForm,
  createFormError,
  createFruitCard,
  createFormError,
  createFreqObj
};
