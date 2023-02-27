function useForm(e) {
    e.preventDefault();
    let values = {};
    let inputs = e.target.querySelectorAll('input');

    inputs.forEach(input => values[input.name] = input.value);

    e.target.reset();

    return values;
}

function appendToList(content, list) {
    const el = document.createElement("li");
    el.textContent = content;
    el.className = 'fruit-list-item';
    el.dataset = 'data-item'
    list.appendChild(el);
}


module.exports = { useForm, appendToList }