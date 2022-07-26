const lists = async (t) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${t}=list`);
    if (response.status != 200) {
        throw new Error('Não é possível ler os dados!');
    }
    const data = await response.json();

    return data;
}

export default lists;