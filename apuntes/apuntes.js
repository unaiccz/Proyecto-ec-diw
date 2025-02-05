const deleteApuntes = async (id) => {
    const res = await fetch(`http://localhost:444/api/apuntes/${id}`, {
        method: 'DELETE'
    });
    const json = await res.json();
    console.log(json);
    getApuntes();
}

// Función para obtener todos los apuntes
const getApuntes = async () => {
    const res = await fetch('http://localhost:444/api/apuntes');
    const data = await res.json();
    console.log(data);
    const apuntesDiv = document.getElementById('apuntes');
    apuntesDiv.innerHTML = ''; // Limpiar el contenido anterior

    if (data.message === 'No hay apuntes' || data.length === 0) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning';
        alert.innerText = 'Sin datos...';
        apuntesDiv.appendChild(alert);
    } else {
        data.forEach(element => {
            const { _id, Asignatura, Tema, Apuntes } = element;
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${Asignatura}</h2>
                    <p class="card-text"><strong>Tema:</strong> ${Tema}</p>
                    <p class="card-text">${Apuntes}</p>
<<<<<<< HEAD
                    <button class="btn btn-danger" onclick="deleteApuntes('${element._id}')">Eliminar</button>
                    <button class="btn btn-warning" onclick="openEditModal('${element._id}', '${Asignatura}', '${Tema}', '${Apuntes}')">Editar</button>
=======
                    <button class="btn btn-danger" onclick="deleteApuntes('${_id}')">Eliminar</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="editApunte('${_id}', '${Asignatura}', '${Tema}', '${Apuntes}')">Editar</button>
>>>>>>> 70a60a87bb00fcc2f30a99aab56a6bf5c9f630f7
                </div>
            `;
            apuntesDiv.appendChild(card);
        });
    }
}

// Función para enviar nuevos apuntes
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

<<<<<<< HEAD
// Función para editar apuntes (abrir el modal con datos cargados)
const openEditModal = (id, asignatura, tema, apuntes) => {
    document.getElementById('editId').value = id;
    document.getElementById('editAsignatura').value = asignatura;
    document.getElementById('editTema').value = tema;
    document.getElementById('editApuntes').value = apuntes;
    $('#editModal').modal('show');  // Mostrar el modal usando Bootstrap
}
=======
const editApunte = (id, asignatura, tema, apuntes) => {
    document.getElementById('modal-id').value = id;
    document.getElementById('modal-asignatura').value = asignatura;
    document.getElementById('modal-tema').value = tema;
    document.getElementById('modal-apuntes').value = apuntes;
}

// Hacer que la función esté disponible globalmente
window.editApunte = editApunte;

const updateApunte = async () => {
    const id = document.getElementById('modal-id').value;
    const asignatura = document.getElementById('modal-asignatura').value;
    const tema = document.getElementById('modal-tema').value;
    const apuntes = document.getElementById('modal-apuntes').value;

    const data = {
        Asignatura: asignatura,
        Tema: tema,
        Apuntes: apuntes
    }

    const res = await fetch(`http://localhost:444/api/apuntes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getApuntes();
    $('#exampleModal').modal('hide');
}

// Hacer que la función esté disponible globalmente
window.updateApunte = updateApunte;

document.getElementById('form').addEventListener('submit', sendApuntes);
getApuntes();
>>>>>>> 70a60a87bb00fcc2f30a99aab56a6bf5c9f630f7

// Función para actualizar apuntes
const updateApuntes = async (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const asignatura = document.getElementById('editAsignatura').value;
    const tema = document.getElementById('editTema').value;
    const apuntes = document.getElementById('editApuntes').value;
    const data = {
        Asignatura: asignatura,
        Tema: tema,
        Apuntes: apuntes
    }
    const res = await fetch(`http://localhost:444/api/apuntes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log(json);
    getApuntes();
    $('#editModal').modal('hide');  // Ocultar el modal
}

// Evento para enviar apuntes
document.getElementById('form').addEventListener('submit', sendApuntes);

// Evento para actualizar apuntes desde el modal
document.getElementById('editForm').addEventListener('submit', updateApuntes);

// Función para manejar el tema oscuro (Dark Mode)
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const themeToggle = document.getElementById('theme-toggle');

// Verificar tema guardado en localStorage
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

    // Guardar la preferencia del tema en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Asegurarse de que las nuevas tarjetas también usen el tema oscuro si es necesario
const observer = new MutationObserver(() => {
    if (document.body.classList.contains('dark-mode')) {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('dark-mode');
        });
    }
});

observer.observe(document.getElementById('apuntes'), { childList: true });

// Obtener apuntes al cargar la página
getApuntes();
