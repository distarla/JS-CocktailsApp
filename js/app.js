// https://www.thecocktaildb.com/api.php

import lists from './data/lists.js'
import cocktails from './data/cocktail.js'
import searchCocktails from './data/searchCocktails.js'
import randomGenerator from './data/random.js'

const categoriesList = document.querySelector('#categoriesList');
const glassesList = document.querySelector('#glassesList');
const ingredientsList = document.querySelector('#ingredientsList');
const cocktailsList = document.querySelector('#cocktailsList');

const getCocktails = (t, srtSearch) => {
    cocktails(t, srtSearch)
        .then(dataCocktails => {
            var titulo;
            switch (t) {
                case 'c':
                    titulo = 'Category';
                    break;
                case 'g':
                    titulo = 'Glass';
                    break;
                case 'i':
                    titulo = 'Ingredient';
                    break;
            }
            cocktailsList.innerHTML = `<button type="button" class="list-group-item list-group-item-action active" disabled>${titulo}: ${srtSearch}</button>`;

            dataCocktails.drinks.forEach(cocktail => {
                cocktailsList.innerHTML +=  `<a href="#" class="list-group-item list-group-item-action">${cocktail.strDrink}</a>`;
            });
        })
        .catch( err => { //em caso de erro
            console.log('Promise com erro',err.message);
        })   
}

const criarListas = (t, lista) => {
    lists(t)
        .then(dataElements => {
            dataElements.drinks.forEach(element => {
                var key;
                switch (t) {
                    case 'c':
                        key = element.strCategory;
                        break;
                    case 'g':
                        key = element.strGlass;
                        break;
                    case 'i':
                        key = element.strIngredient1
                        break;
                }
                lista.innerHTML += `<div class='alert alert-primary' role='alert'>${key}</div>`
            });
        })
        .catch( err => { //em caso de erro
            console.log('Promise com erro',err.message);
        })
    
    lista.addEventListener('click', e => {
        if (e.target.getAttribute('role') == 'alert') {
            getCocktails(t, e.target.innerText.trim());
        } 
    })
}

criarListas('c',categoriesList);
criarListas('g',glassesList);
criarListas('i', ingredientsList);

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    cocktailsList.innerHTML = `<button type="button" class="list-group-item list-group-item-action active" disabled>Category: ${formSearch.searchCocktail.value.trim()}</button>`;
    searchCocktails(formSearch.searchCocktail.value.trim())
        .then(dataCocktails => {
            dataCocktails.drinks.forEach(cocktail => {
                cocktailsList.innerHTML +=  `<a href="#" class="list-group-item list-group-item-action">${cocktail.strDrink}</a>`;
            });
        })
        .catch(err => { console.log('Promise rejeitada', err.message) });
    formSearch.reset();
});

cocktailsList.addEventListener('click', e => {
    if (e.target.tagName == 'A') {
        searchCocktails(e.target.innerText.trim())
            .then(cocktailInfo => {
                document.querySelector('.toast-container').innerHTML += `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="c${cocktailInfo.drinks[0].idDrink}">
                <div class="toast-header">
                <img src="${cocktailInfo.drinks[0].strDrinkThumb}" class="rounded me-2" width="100px">
                <strong class="me-auto">${cocktailInfo.drinks[0].strDrink}</strong>
                <small class="text-muted">${cocktailInfo.drinks[0].strAlcoholic}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                <p>${cocktailInfo.drinks[0].strInstructions}</p>
                <p><strong>Category: </strong>${cocktailInfo.drinks[0].strCategory}</p>
                <p><strong>Glass: </strong>${cocktailInfo.drinks[0].strGlass}</p>
                <p><small class="text-muted">${cocktailInfo.drinks[0].strIngredient1}, ${cocktailInfo.drinks[0].strIngredient2}</small></p>
                </div>
                </div>`;

                var toast = new bootstrap.Toast(document.querySelector('#c'+cocktailInfo.drinks[0].idDrink));
                toast.show();
            })
            .catch(err => { console.log('Promise rejeitada', err.message) });
    }
})

randomGenerator();

setInterval( () => {
    randomGenerator();
}, 20000);
