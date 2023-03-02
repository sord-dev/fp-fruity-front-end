// creation somewhat done - SyntaxError: Unexpected token 'c', "creation e"... is not valid JSON?
// but still adds the fruit sometimes
async function postFruit(fruitData) {
  const data = JSON.stringify(fruitData);
  console.log(fruitData);
  try {
    const pRes = await fetch(`https://fruit-api.onrender.com/fruits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const res = await pRes.json();

    return res;
  } catch (error) {
    return error;
  }
}

function showNotificationCard(text, error = null) {
  if (!error) {
    notificationEl.innerHTML = `<p>${text}</p>`;
  } else {
    notificationEl.classList.toggle(".error");
    notificationEl.innerHTML = `<p>${text}</p>`;
  }
}

function canBeNumber(str) {
  let canBe = true;
  for (letter of str) {
    if (isNaN(letter)) canBe = false;
  }
  return canBe;
}

const notificationEl = document.querySelector("div.notification");
const addFruitForm = document.querySelector("form.main-form");

document.addEventListener("DOMContentLoaded", () => {
  notificationEl.innerHTML = "";
});

addFruitForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll("input");
  const data = { nutritions: {} };

  inputs.forEach((input) => {
    const { name, value } = input;
    if (canBeNumber(value)) {
      data["nutritions"][name] = Number(value);
    } else {
      data[name] = value;
    }
  });

  const res = await postFruit(data);

  if (res.id) {
    console.log("success");
    console.log(res);
    showNotificationCard("card created! 🍈🍊");
    e.target.reset();
  } else {
    console.log("error");
    console.log(res);
    showNotificationCard(res.error);
  }
});
