let list = [];
var awesomes = [];
const chosenIngredients = new Set();
const FIELD_MARKUP = "<div class=\"ingredient\">\n" +
    "              <input class=\"ingredient-n\" placeholder=\"ინგრედიენტის დასახელება\" name=\"ingredient_name\" data-id=-1\n" +
    "                     autocomplete=\"off\">\n" +
    "            </div>"

function mustache(id) {
    let tmp = document.getElementById('ingredient-template').innerHTML;
    Mustache.parse(tmp);
    let item = list[id];
    return Mustache.render(tmp, item);
}

function ingredientSelected(e) {
    e.preventDefault();
    e.target.value = e.text['value']['name'];
    parseIngredient(e.text.value);
}

function addAwesome(input) {
    awesomes.push(new Awesomplete(input, {
            list: list,
        data: item => ({label: item.name, value: item}),
        minChars: 1
        })
    );
    input.addEventListener('awesomplete-selectcomplete', ingredientSelected)
}

function addField(e) {
    e.preventDefault();
    let ingredients = document.getElementById('ingredient-list')
    let ingredient = document.createElement('div');
    ingredient.classList.add('ingredient');
    ingredient.innerHTML = FIELD_MARKUP;
    let input = ingredient.getElementsByClassName('ingredient-n')[0];
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
    if (!chosenIngredients.has(item.id)) {
        chosenIngredients.add(item.id);
        let html = mustache(item.id);
        let ingredient = document.createElement('div');
        ingredient.innerHTML = html;
        ingredient.classList.add('ingredient');
        document.getElementById('ingredient-list').append(ingredient);
    }

}

function autoComplete(list) {
    let inputs = document.getElementsByClassName('ingredient-n');
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
