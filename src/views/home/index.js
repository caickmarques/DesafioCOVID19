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
}


function loading() {
    document.getElementById("bemVindo").style.display = "none";
    document.getElementById("spinner").style.display = "flex";
}

// ==================================== Listando as informações dos casos de Covid-19===========
const paisURL = document.location.href.split('?')[1];
const listarDados = async() => {
    loading();
    const dados = await axios.get(`https://api.covid19api.com/country/${paisURL}`);
    document.getElementById("spinner").style.display = "none";
    return dados;
}

const alteraURL = (url) => {
    document.location.href = `index.html?${url}`;
}
const loadDados = async() => {
    let { data } = await listarDados();
    data = data[data.length - 1];
    console.log(data);

    const mainContainer = document.getElementById('main-container');
    const info = createInfo(data);

    mainContainer.insertAdjacentHTML('beforeend', info);
}

if (paisURL != undefined) {
    loadDados();
}
// ======================= Pesquisando pelo campo de pesquisa ===========================

const pesquisar = async() => {
    const paisURL = document.getElementById('pesquisa').value.toLowerCase();
    event.preventDefault();
    window.location = `index.html?${paisURL}`;
}

const teste = (url) => {
    console.log('Teste feito com sucesso; ' + url);
}
loadPaises();