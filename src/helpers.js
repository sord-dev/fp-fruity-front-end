function useForm(e) {
    e.preventDefault();
    let values = {};
    let inputs = e.target.querySelectorAll('input');

    inputs.forEach(input => values[input.name] = input.value);

    e.target.reset();

    return values;
}

function createFormError(error, form) {
    const errorEl = document.createElement('p')
    errorEl.textContent = error;
    errorEl.className = 'form-error';
    form.appendChild(errorEl)
}

function appendToList(content, list) {
    const el = document.createElement("li");
    el.textContent = content;
    el.className = 'fruit-list-item';
    el.dataset = 'data-item'
    list.appendChild(el);
}


module.exports = { useForm, appendToList, createFormError }