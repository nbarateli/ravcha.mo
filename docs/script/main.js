let list = [];
var awesomes = [];
const chosenIngredients = new Set();

function mustache(id) {
    let tmp = document.getElementById('ingredient-template').innerHTML;
    Mustache.parse(tmp);
    let item = list[id];
    return Mustache.render(tmp, item);
}

function ingredientSelected(e) {
    e.target.value = ""
    parseIngredient(e.text.value);
}

function addAwesome(input) {
    let awesome = new Awesomplete(input, {
        list: list,
        data: item => ({label: item.name, value: item}),
        minChars: 0
    });
    awesomes.push(awesome);
    input.addEventListener('awesomplete-selectcomplete', ingredientSelected)
    input.addEventListener('click', () => {
        if (awesome.ul.childNodes.length === 0) {
            awesome.minChars = 0;
            awesome.evaluate();
        }
        else if (awesome.ul.hasAttribute('hidden')) {
            awesome.open();
        }
        else {
            awesome.close();
        }
    })
}

function removeIngredient(e) {
    console.log(e);
    let ingredient = e.target.parentElement.parentElement;
    let id = ingredient.children[0].value
    chosenIngredients.delete(id);
    ingredient.remove();
}

function parseIngredient(item) {
    if (!chosenIngredients.has(item.id)) {
        chosenIngredients.add(item.id);
        let html = mustache(item.id);
        let ingredient = document.createElement('div');
        ingredient.innerHTML = html;
        ingredient.classList.add('ingredient');
        ingredient.children[2].children[0].addEventListener('click', removeIngredient);
        document.getElementById('ingredient-list').append(ingredient);
    }

}

function autoComplete() {
    let inputs = document.getElementsByClassName('ingredient-n');
    for (let i = 0; i < inputs.length; i++) {
        addAwesome(inputs[i])
    }

}

function submit(e) {
    e.preventDefault();
}

function ready() {

    ajax('database/items.json', data => {
        list = JSON.parse(data);
        autoComplete(list);
        // for (let i = 0; i < list.length; i++) parseIngredient(list[i])
    })
    document.getElementById('ingredients').addEventListener('submit', submit);
}


function parseData(url, parse, nextStep) {
    ajax(url, () => {
            if (parse instanceof Function)
                parse(data);
            if (nextStep instanceof Function)
                nextStep()
        }
    )
}

function ajax(url, parse) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (parse instanceof Function) parse(xmlHttp.responseText)
        }
    }
    xmlHttp.open("get", url);
    xmlHttp.send();
}


if (document.readyState === "complete") ready()
else {
    document.addEventListener('DOMContentLoaded', ready);
    ready()
}
