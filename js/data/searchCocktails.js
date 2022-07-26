const searchCocktails = async (cocktail) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`);
    if (response.status != 200) {
        throw new Error('Não é possível ler os dados!');
    }
    const data = await response.json();

    return data;
}

export default searchCocktails;