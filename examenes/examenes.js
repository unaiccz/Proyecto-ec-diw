const getExamenes = async () => {
    const res = await fetch('http://localhost:444/api/examenes');
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
            const { Fecha, Asignatura, Temas, _id } = element;
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.id = _id;  // Agregar el ID al card
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title examen-asignatura">${Asignatura}</h2>
                    <p class="card-text examen-fecha"><strong>Fecha:</strong> ${Fecha}</p>
                    <p class="card-text examen-tema"><strong>Tema:</strong> ${Temas}</p>
                    <button class="btn btn-danger" onclick="deleteExamen('${_id}')">Eliminar</button>
                    <button class="btn btn-warning" onclick="openEditModal('${_id}')">Editar</button>
                </div>
            `;
            examenesDiv.appendChild(card);
        });
    }
}

// Función para abrir el modal de edición
const openEditModal = (id) => {
    const examen = document.getElementById(id); // Obtener el examen usando el ID

    // Obtener los valores actuales del examen
    const fecha = examen.querySelector('.examen-fecha').innerText;
    const asignatura = examen.querySelector('.examen-asignatura').innerText;
    const tema = examen.querySelector('.examen-tema').innerText;

    // Llenar el formulario del modal con los datos del examen
    document.getElementById('editFecha').value = fecha.split(': ')[1]; // Obtener solo la fecha
    document.getElementById('editAsignatura').value = asignatura;
    document.getElementById('editTema').value = tema;
    document.getElementById('editExamenId').value = id;

    // Mostrar el modal
    $('#editModal').modal('show');
};

// Función para enviar los datos del examen actualizado
const updateExamen = async (e) => {
    e.preventDefault();

    const id = document.getElementById('editExamenId').value;
    const fecha = document.getElementById('editFecha').value;
    const asignatura = document.getElementById('editAsignatura').value;
    const tema = document.getElementById('editTema').value;

    const data = {
        Fecha: fecha,
        Asignatura: asignatura,
        Temas: tema
    }

    const res = await fetch(`http://localhost:444/api/examenes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    const json = await res.json();
    console.log(json);
    getExamenes();  // Recargar los exámenes después de actualizar
    $('#editModal').modal('hide');  // Cerrar el modal
}

document.getElementById('editForm').addEventListener('submit', updateExamen);

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
    const res = await fetch('http://localhost:444/api/examenes', {
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
    const res = await fetch(`http://localhost:444/api/examenes/${id}`, {
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
