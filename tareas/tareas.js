const getTareas = async () => {
    const res = await fetch('http://localhost:444/api/tareas');
    const data = await res.json();
    console.log(data);
    const tareasDiv = document.getElementById('apuntes');
    tareasDiv.innerHTML = ''; // Limpiar el contenido anterior
    data.forEach(element => {
        const { Asignatura, Tareas, FechaLimite, DatosInteres } = element;
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${Asignatura}</h2>
                <p class="card-text"><strong>Tareas:</strong> ${Tareas}</p>
                <p class="card-text"><strong>Fecha Límite:</strong> ${FechaLimite}</p>
                <p class="card-text">${DatosInteres}</p>
            </div>
        `;
        tareasDiv.appendChild(card);
    });
}

const sendTarea = async (e) => {
    e.preventDefault();
    const asignatura = document.getElementById('asignatura').value;
    const tareas = document.getElementById('tarea').value;
    const fechaLimite = document.getElementById('fechaLimite').value;
    const datosInteres = document.getElementById('datosInteres').value;
    const data = {
        Asignatura: asignatura,
        Tareas: tareas,
        FechaLimite: fechaLimite,
        DatosInteres: datosInteres
    }
    document.getElementById('form').reset();
    const res = await fetch('http://localhost:444/api/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getTareas();
}

document.getElementById('form').addEventListener('submit', sendTarea);
getTareas();

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