const getApuntes = async () => {
    const res = await fetch('http://localhost:444/api/apuntes');
    const data = await res.json();
    console.log(data);
    const apuntesDiv = document.getElementById('apuntes');
    apuntesDiv.innerHTML = ''; // Limpiar el contenido anterior
    data.forEach(element => {
        const { Asignatura, Tema, Apuntes } = element;
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${Asignatura}</h2>
                <p class="card-text"><strong>Tema:</strong> ${Tema}</p>
                <p class="card-text">${Apuntes}</p>
            </div>
        `;
        apuntesDiv.appendChild(card);
    });
}

const sendApuntes = async (e) => {
    e.preventDefault();
    const asignatura = document.getElementById('asignatura').value;
    const tema = document.getElementById('tema').value;
    const apuntes = document.getElementById('apuntesText').value;
    const data = {
        Asignatura: asignatura,
        Tema: tema,
        Apuntes: apuntes
    }
    document.getElementById('form').reset();
    const res = await fetch('http://localhost:444/api/apuntes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getApuntes();
}

document.getElementById('form').addEventListener('submit', sendApuntes);
getApuntes();

// Toggle dark mode
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const themeToggle = document.getElementById('theme-toggle');

// Check local storage for theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    header.classList.add('bg-dark');
    footer.classList.add('bg-dark');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('dark-mode');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.add('dark-mode');
    });
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    header.classList.toggle('bg-dark');
    footer.classList.toggle('bg-dark');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('dark-mode');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('dark-mode');
    });

    // Save theme to local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Ensure dark mode is applied to dynamically added cards
const observer = new MutationObserver(() => {
    if (document.body.classList.contains('dark-mode')) {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('dark-mode');
        });
    }
});

observer.observe(document.getElementById('apuntes'), { childList: true });
