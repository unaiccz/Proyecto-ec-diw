const deleteApuntes = async (id) => {
    try {
        const res = await fetch(`http://localhost:444/api/apuntes/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error al eliminar apunte');
        getApuntes();
    } catch (error) {
        console.error('Hubo un problema con la eliminación:', error);
    }
};

window.deleteApuntes = deleteApuntes;

const getApuntes = async () => {
    const apuntesDiv = document.getElementById('apuntes');
    apuntesDiv.innerHTML = '<p>Cargando...</p>';

    try {
        const res = await fetch('http://localhost:444/api/apuntes');
        if (!res.ok) throw new Error('No se pudieron obtener los apuntes');
        const data = await res.json();
        apuntesDiv.innerHTML = '';

        if (!data.length) {
            apuntesDiv.innerHTML = '<div class="alert alert-warning">Sin datos...</div>';
            return;
        }

        data.forEach(({ _id, Asignatura, Tema, Apuntes }) => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${Asignatura}</h2>
                    <p class="card-text"><strong>Tema:</strong> ${Tema}</p>
                    <p class="card-text">${Apuntes}</p>
                    <button class="btn btn-danger" onclick="deleteApuntes('${_id}')">Eliminar</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                        onclick="editApunte('${_id}', '${Asignatura}', '${Tema}', '${Apuntes}')">Editar</button>
                </div>
            `;
            apuntesDiv.appendChild(card);
        });
    } catch (error) {
        apuntesDiv.innerHTML = '<div class="alert alert-danger">Error al cargar datos</div>';
        console.error(error);
    }
};

const sendApuntes = async (e) => {
    e.preventDefault();
    const asignatura = document.getElementById('asignatura').value.trim();
    const tema = document.getElementById('tema').value.trim();
    const apuntes = document.getElementById('apuntesText').value.trim();

    if (!asignatura || !tema || !apuntes) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const data = { Asignatura: asignatura, Tema: tema, Apuntes: apuntes };
    document.getElementById('form').reset();

    try {
        const res = await fetch('http://localhost:444/api/apuntes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Error al enviar apunte');
        getApuntes();
    } catch (error) {
        console.error('Error:', error);
    }
};

const editApunte = (id, asignatura, tema, apuntes) => {
    document.getElementById('modal-id').value = id;
    document.getElementById('modal-asignatura').value = asignatura;
    document.getElementById('modal-tema').value = tema;
    document.getElementById('modal-apuntes').value = apuntes;
};

window.editApunte = editApunte;

const updateApunte = async () => {
    const id = document.getElementById('modal-id').value;
    const asignatura = document.getElementById('modal-asignatura').value.trim();
    const tema = document.getElementById('modal-tema').value.trim();
    const apuntes = document.getElementById('modal-apuntes').value.trim();

    if (!asignatura || !tema || !apuntes) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const data = { Asignatura: asignatura, Tema: tema, Apuntes: apuntes };

    try {
        const res = await fetch(`http://localhost:444/api/apuntes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Error al actualizar apunte');

        getApuntes();

        // Cerrar el modal en Bootstrap 4
        $('#exampleModal').modal('hide');
    } catch (error) {
        console.error('Error:', error);
    }
};
// Toggle dark mode
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const themeToggle = document.getElementById("theme-toggle");

// Función para aplicar el tema oscuro
const applyDarkMode = (enable) => {
    document.body.classList.toggle("dark-mode", enable);
    header.classList.toggle("bg-dark", enable);
    footer.classList.toggle("bg-dark", enable);

    // Aplicar a elementos dinámicos como tarjetas y enlaces
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.toggle("dark-mode", enable);
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("dark-mode", enable);
    });

    // Guardar preferencia en localStorage
    localStorage.setItem("theme", enable ? "dark" : "light");
};

// Verificar si el usuario tenía activado el modo oscuro
if (localStorage.getItem("theme") === "dark") {
    applyDarkMode(true);
}

// Evento para cambiar el tema
themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    applyDarkMode(!isDarkMode);
});

// Observer para aplicar modo oscuro a nuevas tarjetas dinámicas
const observer = new MutationObserver(() => {
    if (document.body.classList.contains("dark-mode")) {
        document.querySelectorAll(".card").forEach((card) => {
            card.classList.add("dark-mode");
        });
    }
});

observer.observe(document.getElementById("apuntes"), { childList: true });

window.updateApunte = updateApunte;

document.getElementById('form').addEventListener('submit', sendApuntes);
getApuntes();
