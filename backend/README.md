# TeacherHub Database
## Api **Node** ***Mongodb***
### Todo:
- [x] bbdd
- [x] Forms
- [ ] Delete
- [ ] path
- [ ] leer mas...

## Tabla: Apuntes

| Campo     | Tipo          | Descripción                          |
|-----------|---------------|--------------------------------------|
| id        | INT           | Identificador único                  |
| Asignatura| VARCHAR(100)  | Nombre de la asignatura              |
| Tema      | VARCHAR(100)  | Tema específico                      |
| Apuntes   | TEXT          | Contenido de los apuntes             |

## Tabla: Examenes

| Campo      | Tipo          | Descripción                          |
|------------|---------------|--------------------------------------|
| id         | INT           | Identificador único                  |
| Fecha      | DATE          | Fecha del examen                     |
| Asignatura | VARCHAR(100)  | Nombre de la asignatura              |
| Temas      | TEXT          | Temas que abarca el examen           |

## Tabla: Tareas

| Campo        | Tipo          | Descripción                          |
|--------------|---------------|--------------------------------------|
| id           | INT           | Identificador único                  |
| Asignatura   | VARCHAR(100)  | Nombre de la asignatura              |
| Tareas       | TEXT          | Descripción de la tarea              |
| FechaLimite  | DATE          | Fecha límite para completar la tarea |
| DatosInteres | TEXT          | Datos adicionales de interés         |

## Guía de Uso

### Requisitos Previos

- Node.js
- MongoDB

### Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/teacherhub-database.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd teacherhub-database
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

### Configuración

1. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:
    ```env
    PORT=444
    MONGODB_URI=mongodb://localhost:27017/teacherhub
    ```

### Ejecución

1. Inicia el servidor:
    ```sh
    node app.js
    ```

### Consumo de la API

1. Abre el archivo `index.html` en tu navegador para consumir la API con el front-end.

### Ver más

Para más información, consulta la [documentación completa](https://github.com/tu-usuario/teacherhub-database/wiki).

@unaiccz
