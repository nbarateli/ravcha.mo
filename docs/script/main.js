let list = [];
let workingList;
let awesome;
const chosenIngredients = new Set();

function mustache(id) {
    let tmp = document.getElementById('ingredient-template').innerHTML;
    Mustache.parse(tmp);
    let item = list[id];
    return Mustache.render(tmp, item);
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
        let compFn = (a, b) => a.id - b.id;
        workingList.sort(compFn);
        let id = binarySearch(workingList, item, compFn);
        remove(workingList, id);
        awesome.list = workingList;
    }
    awesome.close();
}

function autoComplete() {
    let inputs = document.getElementsByClassName('ingredient-n');
    addAwesome(inputs[0])
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
