const random = async () => {

    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    if (response.status !== 200)
        throw new Error('Não é possível ler os dados');

    const data = await response.json();

    return data;
};

const randomGenerator = () => {
    random()
    .then(cocktail => {
        var cocktailElement = "";
  
        cocktailElement = `
            <div class="card mb-3" style="max-width: 840px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${cocktail.drinks[0].strDrinkThumb}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${cocktail.drinks[0].strDrink}</h5>
                  <p class="card-text">${cocktail.drinks[0].strInstructions}</p>
                  <p class="card-text"><strong>Category: </strong>${cocktail.drinks[0].strCategory}</p>
                  <p class="card-text"><strong>Glass: </strong>${cocktail.drinks[0].strGlass}</p>
                  <p class="card-text"><small class="text-muted">${cocktail.drinks[0].strAlcoholic}</small></p>
                  <p class="card-text"><small class="text-muted">${cocktail.drinks[0].strIngredient1}, ${cocktail.drinks[0].strIngredient2}</small></p>
                </div>
              </div>
            </div>
          </div>
            `;
  
        document.querySelector('#randomCocktail').innerHTML = cocktailElement;
    })
    .catch(err => { console.log('Promise rejeitada', err.message) });
  }

export default randomGenerator;