// =========================== Pesquisando paises disponiveis na API ====================
const listarPaises = async() => {
    const url = 'https://api.covid19api.com/countries';

    const paises = await axios.get(url);

    return paises;
}


// ============= Função para ondenar países ===================
function compare(a, b) {
    if (a.Country < b.Country)
        return -1;
    if (a.Country > b.Country)
        return 1;
    return 0;
}
// ================================ Carregando os paises no menu dropdown ===================
const loadPaises = async() => {
    const { data } = await listarPaises();

    const mainContainer = document.getElementById('listarPaises');
    const paisesAutoComplete = document.getElementById('paises');

    data.sort(compare).forEach(element => {
        const lista = createMenu(element);
        const autoComplete = createAutocomplete(element);

        mainContainer.insertAdjacentHTML('beforeend', lista);
        paisesAutoComplete.insertAdjacentHTML('beforeend', autoComplete);
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

    const removeBemVindo = document.getElementById("bemVindo");
    if (removeBemVindo.parentNode) {
        removeBemVindo.parentNode.removeChild(removeBemVindo);
    }
}

// ======================= Pesquisando pelo campo de pesquisa ===========================

const pesquisar = async() => {
    const paisURL = document.getElementById('pesquisa').value.toLowerCase();
    event.preventDefault();
    window.location = `index.html?${paisURL}`;
}

loadPaises();