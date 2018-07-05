let list = [];
var awesomes = [];
const FIELD_MARKUP = "<label>\n" +
    "                <small>დასახელება</small>\n" +
    "                <input class=\"ingredient-name\" name=\"ingredient_name\" data-id=-1 autocomplete=\"off\">\n" +
    "              </label>\n" +
    "              <label>რაოდენობა\n" +
    "                <input name=\"ingredient_quantity\" type=\"number\" value=\"0\">\n" +
    "              </label>\n" +
    "              <select name=\"quantity_type\">\n" +
    "                <option>გრამი</option>\n" +
    "                <option>კგ.</option>\n" +
    "                <option>ცალი</option>\n" +
    "              </select>"

function addField(e) {
    e.preventDefault();
    let ingredients = document.getElementById('ingredient-list')
    let ingredient = document.createElement('div');
    ingredient.classList.add('ingredient');
    ingredient.innerHTML = FIELD_MARKUP;
    let input = ingredient.getElementsByClassName('ingredient-name')[0];
    ingredients.appendChild(ingredient);
    awesomes.push(new Awesomplete(input, {
            list: list,
            data: parseIngredient
        })
    );
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
        awesomes.push(new Awesomplete(inputs[i], {
                list: list,
            data: parseIngredient
            })
        );
        console.log(i)
    }

}

function ready() {
    console.log('aa')
    document.getElementById('add_field').addEventListener('click', addField)
    ajax('database/items.json', data => {
        list = JSON.parse(data);
        autoComplete(list);
    })

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

function source(term, suggest) {
    term = term.toLowerCase();
    var choices = ['ActionScript', 'AppleScript', 'Asp'];
    var matches = [];
    for (i = 0; i < choices.length; i++)
        if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
    suggest(matches);
}


if (document.readyState === "complete") ready()
else {
    document.addEventListener('DOMContentLoaded', ready);
    ready()
}
