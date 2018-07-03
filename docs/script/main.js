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
    fetch(url,
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                , 'Accept': 'application/json'
            }
        }
    ).then(
        response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            if (parse instanceof Function)
                response.json().then(data => {
                    parse(data);
                    if (nextStep instanceof Function) nextStep()
                });

        }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
        if (nextStep instanceof Function) nextStep()
    });
}