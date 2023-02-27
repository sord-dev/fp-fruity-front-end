(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const { useForm } = require("./helpers");

const fruitForm = document.querySelector("#input-sect form");
const nutritionList = document.querySelector("#nutrition-sect ul");

fruitForm.addEventListener("submit", e => {
    const { fruit } = useForm(e);

    if (!!fruit) addFruit(fruit);
})

nutritionList.addEventListener('click', (e)  => e.target.remove());

function addFruit(fruit) {
    const el = document.createElement("li");
    el.textContent = fruit;
    el.className = 'fruit-list-item'

    nutritionList.appendChild(el);
}
},{"./helpers":1}]},{},[2]);
