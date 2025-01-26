const getExamenes = async () => {
    const res = await fetch('http://192.168.5.136:444/api/examenes');
    const data = await res.json();
    console.log(data);
    const examenesDiv = document.getElementById('examenes');
    examenesDiv.innerHTML = ''; // Limpiar el contenido anterior

    if (data.message === 'No hay examenes' || data.length === 0) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning';
        alert.innerText = 'Sin datos...';
        examenesDiv.appendChild(alert);
    } else {
        data.forEach(element => {
            const { Fecha, Asignatura, Temas } = element;
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${Asignatura}</h2>
                    <p class="card-text"><strong>Fecha:</strong> ${Fecha}</p>
                    <p class="card-text"><strong>Tema:</strong> ${Temas}</p>
                    <button class="btn btn-danger" onclick="deleteExamen('${element._id}')">Eliminar</button>
                </div>
            `;
            examenesDiv.appendChild(card);
        });
    }
}

const sendExamen = async (e) => {
    console.log('Enviando examen');
    
    e.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const asignatura = document.getElementById('asignatura').value;
    const tema = document.getElementById('tema').value;

    const data = {
        Fecha: fecha,
        Asignatura: asignatura,
        Temas: tema
    }
    document.getElementById('form').reset();
    const res = await fetch('http://192.168.5.136:444/api/examenes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getExamenes();
}

const deleteExamen = async (id) => {
    const res = await fetch(`http://192.168.5.136:444/api/examenes/${id}`, {
        method: 'DELETE'
    });
    const json = await res.json();
    console.log(json);
    getExamenes();
}

document.getElementById('form').addEventListener('submit', sendExamen);
getExamenes();

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
    document.querySelectorAll('a img').forEach(img => {
        img.classList.add('dark-mode');
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
    document.querySelectorAll('a img').forEach(img => {
        img.classList.toggle('dark-mode');
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
        document.querySelectorAll('a img').forEach(img => {
            img.classList.add('dark-mode');
        });
    }
});

observer.observe(document.getElementById('examenes'), { childList: true });