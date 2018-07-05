const FIELD_MARKUP = "<label>\n" +
    "            <small>დასახელება</small>\n" +
    "            <input autocomplete=\"off\">\n" +
    "          </label>\n" +
    "          <label>რაოდენობა\n" +
    "            <input type=\"number\">\n" +
    "          </label>\n" +
    "          <select>\n" +
    "            <option>გრამი</option>\n" +
    "            <option>კგ.</option>\n" +
    "            <option>ცალი</option>\n" +
    "          </select>"

function addField(e) {
    e.preventDefault();
    let ingredients = document.getElementById('ingredient-list')
    let ingredient = document.createElement('div');
    ingredient.classList.add('ingredient');
    ingredient.innerHTML = FIELD_MARKUP;
    ingredients.appendChild(ingredient);
}

function ready() {
    document.getElementById('add_field').addEventListener('click', addField)
}

document.addEventListener('DOMContentLoaded', ready);

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
    xmlHttp.open("post", url);
    xmlHttp.send();
}