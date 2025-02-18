const user = document.getElementById('user');
let user_email = localStorage.getItem('email');
if (user_email) {
    user.innerHTML = user_email;
} else {
    user.innerHTML = 'Usuario';
}
const getExamenes = async () => {
    const loadingDiv = document.getElementById('loading');
    const examenesDiv = document.getElementById('examenes');
    
    // Mostrar el mensaje de carga
    loadingDiv.style.display = 'block';
    examenesDiv.innerHTML = ''; // Limpiar el contenido anterior

    const res = await fetch('https://backendv2-1kro.onrender.com/api/examenes');
    const data = await res.json();
    console.log(data);

    // Ocultar el mensaje de carga
    loadingDiv.style.display = 'none';

    if (data.message === 'No hay examenes' || data.length === 0) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning';
        alert.innerText = 'Sin datos...';
        examenesDiv.appendChild(alert);
    } else {
        data.forEach(element => {
            const { _id, Fecha, Asignatura, Temas } = element;
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${Asignatura}</h2>
                    <p class="card-text"><strong>Fecha:</strong> ${Fecha}</p>
                    <p class="card-text"><strong>Tema:</strong> ${Temas}</p>
                    <button class="btn btn-danger" onclick="deleteExamen('${_id}')">Eliminar</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="editExamen('${_id}', '${Fecha}', '${Asignatura}', '${Temas}')">Editar</button>
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

    if (!fecha || !asignatura || !tema) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const data = {
        Fecha: fecha,
        Asignatura: asignatura,
        Temas: tema
    }
    document.getElementById('form').reset();
    const res = await fetch('https://backendv2-1kro.onrender.com/api/examenes', {
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
    const res = await fetch(`https://backendv2-1kro.onrender.com/api/examenes/${id}`, {
        method: 'DELETE'
    });
    const json = await res.json();
    console.log(json);
    getExamenes();
}

const editExamen = (id, fecha, asignatura, temas) => {
    document.getElementById('modal-id').value = id;
    document.getElementById('modal-fecha').value = fecha;
    document.getElementById('modal-asignatura').value = asignatura;
    document.getElementById('modal-tema').value = temas;
}

const updateExamen = async () => {
    const id = document.getElementById('modal-id').value;
    const fecha = document.getElementById('modal-fecha').value;
    const asignatura = document.getElementById('modal-asignatura').value;
    const temas = document.getElementById('modal-tema').value;

    if (!fecha || !asignatura || !temas) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const data = {
        Fecha: fecha,
        Asignatura: asignatura,
        Temas: temas
    }

    const res = await fetch(`https://backendv2-1kro.onrender.com/api/examenes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getExamenes();
    $('#exampleModal').modal('hide');
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