let list = [], recipes = [];
let workingList;
let awesome;
const chosenIngredients = new Set();

/*
 * function: text2HTML.js
 * Description: Convert plain text to HTML
 * Author: Geoffrey Bourne @geoffbourne https://github.com/gbourne1
*/
function text2HTML(text) {
    // 1: Plain Text Search
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 2: Line Breaks
    text = text.replace(/\r\n?|\n/g, "<br>");

    // 3: Paragraphs
    text = text.replace(/<br>\s*<br>/g, "</p><p>");

    // 4: Wrap in Paragraph Tags
    text = "<p>" + text + "</p>";

    return text;
}

function renderMustache(item, templateId) {
    let tmp = document.getElementById(templateId).innerHTML;
    Mustache.parse(tmp);
    return Mustache.render(tmp, item);
}

function addIngredients(ls, recipe) {
    console.log(recipe.ingredients)
    for (let i in recipe.ingredients) {
        let li = document.createElement('li');
        try {
            li.innerText = list[parseInt(i)].name + ": " + recipe.ingredients[i];
        }
        catch (e) {
            console.log(i)
        }
        ls.appendChild(li);
    }
}

function showModal(e) {
    let target = e.target;
    while (!target.classList.contains('result')) {
        target = target.parentElement;
    }
    let id = target.getElementsByTagName('input')[0].value;
    let modal = document.getElementById('recipe-modal');
    let content = modal.getElementsByClassName('recipe-content')[0];
    content.innerHTML = renderMustache(recipes[id], 'recipe-full-template');
    addIngredients(content.getElementsByTagName('ul')[0], recipes[id]);
    modal.classList.toggle('hidden')
}

function renderRecipe(rec) {
    let html = renderMustache(rec, 'recipe-template');
    let recipe = document.createElement('div');
    recipe.classList.add('result');
    recipe.innerHTML = html;
    recipe.addEventListener('click', showModal);
    document.getElementById('results').append(recipe)
}

function remove(a, i) {
    a[i] = a[a.length - 1];
    a.pop();
}

function ingredientSelected(e) {
    e.target.value = ""
    parseIngredient(e.text.value);
}

function addAwesome(input) {
    workingList = list.slice();
    awesome = new Awesomplete(input, {
        list: workingList,
        data: item => ({label: item.name, value: item}),
        minChars: 0
    });
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


function binarySearch(a, el, compFn, s, e,) {
    if (s === undefined) {
        s = 0;
        e = a.length - 1;
    }
    const m = Math.floor((s + e) / 2);

    if (m === s || m === e) {
        return compFn instanceof Function ? compFn(a[m], el) === 0 ? m : ~m : a[m] === el ? m : ~m;
    }
    if (compFn instanceof Function) {

        switch (Math.sign(compFn(el, a[m]))) {
            case 1:
                return binarySearch(a, el, compFn, m, e);
            case 0:
                return m;
            case -1:
                return binarySearch(a, el, compFn, s, m);
        }
    }
    if (el === a[m]) return m;
    if (el > a[m]) return binarySearch(a, el, compFn, m, e);
    if (el < a[m]) return binarySearch(a, el, compFn, s, m);
}

function removeIngredient(e) {

    let ingredient = e.target.parentElement.parentElement;
    let id = ingredient.children[0].value
    chosenIngredients.delete(parseInt(id));
    workingList.push(list[id])
    awesome.list = workingList;
    ingredient.remove();
    awesome.evaluate();
    awesome.close()
    submit()
}

function parseIngredient(item) {
    if (!chosenIngredients.has(item.id)) {
        chosenIngredients.add(item.id);
        let html = renderMustache(item, 'ingredient-template');
        let ingredient = document.createElement('div');
        ingredient.innerHTML = html;
        ingredient.classList.add('ingredient');
        ingredient.children[2].children[0].addEventListener('click', removeIngredient);
        document.getElementById('ingredient-list').append(ingredient);
        let compFn = (a, b) => a.id - b.id;
        workingList.sort(compFn);
        let id = binarySearch(workingList, item, compFn);
        remove(workingList, id);
        awesome.list = workingList;
    }
    awesome.close();
    submit()
}

function autoComplete() {
    let inputs = document.getElementsByClassName('ingredient-n');
    addAwesome(inputs[0])
}

function submit() {
    document.getElementById('results').innerHTML = "";
    let isStrict = document.getElementById('strict-match').checked;
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].ingredientCount = 0;
        recipes[i].flag = false;
        chosenIngredients.forEach(el => {
            if (isStrict && recipes[i].ingredients[el] === undefined) {
                recipes[i].flag = true;
            }
            if (recipes[i].ingredients[el] !== undefined)
                recipes[i].ingredientCount++
        })

    }
    let sorted = recipes.slice();
    sorted.sort((a, b) => b.ingredientCount - a.ingredientCount)
    for (let i = 0; i < recipes.length; i++) {
        if (sorted[i].ingredientCount === 0) break;
        if (!sorted[i].flag) renderRecipe(sorted[i])
    }
}

function setupModal() {
    // Get the modal
    var modal = document.getElementById('recipe-modal');

    // Get the <span> element that oses the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    // btn.onclick = function () {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', () => modal.classList.add('hidden'));

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.classList.add('hidden')
        }
    }
}

function ready() {

    ajax('database/items.json', data => {
        list = JSON.parse(data);
        autoComplete(list);
        // for (let i = 0; i < list.length; i++) parseIngredient(list[i])
    });
    ajax('database/recipes.json', data => {
        recipes = JSON.parse(data);
        for (let i = 0; i < recipes.length; i++) {
            recipes[i].ingredientCount = 0;
            recipes[i].id = i;
            recipes[i].recipe = text2HTML(recipes[i].recipe);
            recipes[i].flag = false;

        }
    });
    document.getElementById('ingredients').addEventListener('submit', e => {
        e.preventDefault();
        submit();
    });
    document.getElementById('strict-match').addEventListener('change', submit)
    setupModal();

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
