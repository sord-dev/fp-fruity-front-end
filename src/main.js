const fruitForm = document.querySelector("#input-sect form");

fruitForm.addEventListener("submit", e => {
    e.preventDefault()
    let values = {}
    let inputs = fruitForm.querySelectorAll('input');
    inputs.forEach(input => values[input.name] = input.value)


    console.log(values);
    return values;
})