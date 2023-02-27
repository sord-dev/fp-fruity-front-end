function useForm(e) {
    e.preventDefault();
    let values = {};
    let inputs = e.target.querySelectorAll('input');

    inputs.forEach(input => values[input.name] = input.value);

    e.target.reset();

    return values;
}

function addFruit(fruit) {
    const el = document.createElement("li");
    el.textContent = fruit;

    nutritionList.appendChild(el);
}


module.exports = { useForm, addFruit }