const url = 'https://api.covid19api.com/countries';


const listarPaises = async() => {

    const paises = await axios.get(url);

    return paises;
}

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

const createMenu = ({
    Country,
    Slug
}) => {
    const div =
        `<a class="dropdown-item" href="index.html?${Slug}">${Country}</a>`;
    return div;
}

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

const createInfo = ({
    Country,
    CountryCode,
    Confirmed,
    Deaths,
    Recovered,
    Active,
    Date
}) => {;
    const div = `
    <div class="infos">
            <h3>${Country} - ${CountryCode}</h3>
            <small class="text-muted">Atualizado a ${dataAtualFormatada(Date)}</small>

            <div class="center-card">
                <div class="card border-info">
                    <div class="card-body">
                        <h5 class="card-title">Casos</h5>
                        <p class="card-text">${Confirmed}</p>
                    </div>
                </div>
            </div>
            <div class="card-deck">
                <div class="card border-danger">
                    <div class="card-body">
                        <h5 class="card-title">Mortes</h5>
                        <p class="card-text">${Deaths}</p>
                    </div>
                </div>
                <div class="card border-success">
                    <div class="card-body">
                        <h5 class="card-title">Recuperados</h5>
                        <p class="card-text">${Recovered}</p>
                    </div>
                </div>
                <div class="card border-warning">
                    <div class="card-body">
                        <h5 class="card-title">Ativos</h5>
                        <p class="card-text">${Active}</p>
                    </div>
                </div>
            </div>
        </div>
    `
    return div;
}

const dataAtualFormatada = (data) => {
    const atualizacao = new Date(data);
    const hoje = new Date();
    const diff = Math.abs(hoje.getTime() - atualizacao.getTime());
    let days = Math.ceil(diff / (1000 * 60 * 60));

    if (days > 24) {
        days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return `${days} dia(s)`
    } else {

        return `${days}h`;
    }
}

loadPaises();