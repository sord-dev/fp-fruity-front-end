(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruity = {
    baseurl: 'https://fruity-api.onrender.com',
    async getFruit(query) {
        try {
            const pRes = await fetch(`${this.baseurl}/fruits/${query}`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    },

    async getAllFruits() {
        try {
            const pRes = await fetch(`${this.baseurl}/fruits`);
            const res = await pRes.json();
            return res;
        } catch (error) {
            return error;
        }
    }
}

module.exports = { fruity }
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
const { useForm, appendToList, createFormError } = require("./helpers");
const { fruity } = require("./fruityAPI");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", async (e) => {
    const { fruit } = useForm(e);
    if (!fruit.replace(/[^a-z0-9]/gi, '')) return;
    const res = await fruity.getFruit(fruit);

    res.id ? appendToList(res, nutritionList) 
    : createFormError(res.error, fruitForm)

});

nutritionList.addEventListener('click', (e) => {
    if (e.target.className === 'fruit-list') return
    e.target.remove();
});
},{"./fruityAPI":1,"./helpers":2}]},{},[3]);
