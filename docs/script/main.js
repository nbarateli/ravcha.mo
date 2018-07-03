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