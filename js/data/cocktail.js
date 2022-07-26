const cocktails = async (t, strSearch) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${t}=${strSearch}`);
    if (response.status != 200) {
        throw new Error('Não é possível ler os dados!');
    }
    const data = await response.json();

    return data;
}

export default cocktails;