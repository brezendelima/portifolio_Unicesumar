document.addEventListener("DOMContentLoaded", function () {
    // Busca repositórios do GitHub
    async function fetchRepositories() {
        const username = 'brezendelima';
        const url = `https://api.github.com/users/${username}/repos`;

        try {
            const response = await fetch(url);
            const repos = await response.json();

            if (response.status !== 200) {
                throw new Error('Erro ao buscar repositórios');
            }

            return repos;
        } catch (error) {
            console.error('Erro:', error);
            return [];
        }
    }

    // Cria Cards com animação
    function createCard(repo) {
        const card = document.createElement('div');
        card.classList.add('Card', 'animate__animated', 'animate__fadeInUp');
        card.innerHTML = `
            <i class="fas fa-code"></i>
            <h5>${repo.name}</h5>
            <div class="Paragrafo-button">
                <p>${repo.description || 'Descrição não disponível'}</p>
                <button type="button" onclick="window.open('${repo.html_url}', '_blank')">Me leve lá</button>
            </div>
        `;
        return card;
    }

    // Exibe os repositórios com animação
    async function displayRepositories() {
        const repos = await fetchRepositories();
        const cartoesBox = document.querySelector('.cartoesBox');

        repos.forEach((repo, index) => {
            const card = createCard(repo);
            cartoesBox.appendChild(card);
        });
    }

    displayRepositories();

    // Abre o WhatsApp
    document.getElementById('btnEnviarMensagemWhatsApp').addEventListener('click', function () {
        var phoneNumber = '+5541999448022';
        var whatsappLink = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=Olá, gostaria de entrar em contato.';
        window.open(whatsappLink, '_blank');
    });

    // Mensagens aleatórias no rodapé
    const messages = [
        "Que a força esteja com você",
        "Vida longa e próspera",
        "Ao infinito e além!",
        "Você é um bruxo, Harry!",
        "Malfeito feito",
        "Expecto Patronum!",
        "É perigoso ir sozinho, leve isso aqui!",
        "Eu sou Groot!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.querySelector('footer .end').textContent = randomMessage;
});
