let list = [];
var awesomes = [];
const FIELD_MARKUP = "<div class=\"ingredient\">\n" +
    "              <input class=\"ingredient-name\" placeholder=\"ინგრედიენტის დასახელება\" name=\"ingredient_name\" data-id=-1\n" +
    "                     autocomplete=\"off\">\n" +
    "            </div>"

function addAwesome(input) {
    awesomes.push(new Awesomplete(input, {
            list: list,
            data: parseIngredient
        })
    );
}

function addField(e) {
    e.preventDefault();
    let ingredients = document.getElementById('ingredient-list')
    let ingredient = document.createElement('div');
    ingredient.classList.add('ingredient');
    ingredient.innerHTML = FIELD_MARKUP;
    let input = ingredient.getElementsByClassName('ingredient-name')[0];
    ingredients.appendChild(ingredient);
    addAwesome(input)
}

function toList(data) {
    data = JSON.parse(data);
    let result = [];
    for (let i in data) result.push(data[i]['name'])
    return result;
}

function parseIngredient(item) {

    this.input.setAttribute('data-id', item.id);
    return ({label: item.name, value: item.name})
}

function autoComplete(list) {
    let inputs = document.getElementsByClassName('ingredient-name');
    for (let i = 0; i < inputs.length; i++) {
        addAwesome(inputs[i])
    }

}

function submit(e) {
    e.preventDefault();
}

function ready() {
    document.getElementById('add_field').addEventListener('click', addField)
    ajax('database/items.json', data => {
        list = JSON.parse(data);
        autoComplete(list);
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
