// ================= Listar os paises no dropdown ===========
const createMenu = ({
    Country,
    Slug
}) => {
    const div =
        `<a class="dropdown-item" href="index.html?${Slug}">${Country}</a>`;
    return div;
}

// ================== Cria as informações da página =============

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

// ========================= Formatar a data ====================

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


// ============================== Configuração para o modo Dark ========

const darkMode = () => {
    const nav = document.getElementById('activeDark');
    const footer = document.getElementById('footerDark');
    btnDark();

    nav.classList.remove('navbar-light', 'bg-light');
    nav.classList.add('navbar-dark', 'bg-dark');
    footer.classList.add('footerDark');
    let clique = document.getElementById('darkMode').value;

    document.getElementById('darkMode').onclick = function() {
        if (clique == 'on') {
            clique = 'off';
            nav.classList.add('navbar-light', 'bg-light');
            nav.classList.remove('navbar-dark', 'bg-dark');
            footer.classList.remove('footerDark');
            btnLight();
        } else {
            clique = 'on';
            nav.classList.add('navbar-dark', 'bg-dark');
            nav.classList.remove('navbar-light', 'bg-light');
            footer.classList.add('footerDark');
            btnDark();
        }
    }
}

const btnDark = () => {
    const darkBtn = document.getElementsByClassName('btn');
    for (let i = 1; i < darkBtn.length; i++) {
        darkBtn[i].classList.add('btn-light');
        darkBtn[i].classList.remove('btn-dark');
    }
}

const btnLight = () => {
    const darkBtn = document.getElementsByClassName('btn');
    for (let i = 1; i < darkBtn.length; i++) {
        darkBtn[i].classList.remove('btn-light');
        darkBtn[i].classList.add('btn-dark');
    }
}


// ============================================================