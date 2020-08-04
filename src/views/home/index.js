// =========================== Pesquisando paises disponiveis na API ====================
const listarPaises = async() => {
    const url = 'https://api.covid19api.com/countries';

    const paises = await axios.get(url);

    return paises;
}


// ================================ Carregando os paises no menu dropdown ===================
const loadPaises = async() => {
    const { data } = await listarPaises();

    const mainContainer = document.getElementById('listarPaises');

    data.forEach(element => {
        const lista = createMenu(element);

        mainContainer.insertAdjacentHTML('beforeend', lista);
    });

    listarDados();
    loadDados();
}

// ==================================== Listando as informações dos casos de Covid-19===========
const listarDados = async() => {
    const paisURL = document.location.href.split('?')[1];

    const dados = await axios.get(`https://api.covid19api.com/country/${paisURL}`);

    return dados;
}

const loadDados = async() => {
    let { data } = await listarDados();

    data = data[data.length - 1];

    const mainContainer = document.getElementById('main-container');
    const info = createInfo(data);

    mainContainer.insertAdjacentHTML('beforeend', info);
}

// ======================= Pesquisando pelo campo de pesquisa ===========================

// const pesquisar = () => {
//     const pesquisa = document.getElementById('pesquisa').value;

//     document.location.href(`index.html?${pesquisa}`);

// }

loadPaises();