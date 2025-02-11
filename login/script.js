// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuración de Firebase (REEMPLAZA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "AIzaSyBHeNNCQVD0PYazs4YdXJYa5fxkW4PetwY",
    authDomain: "auth-ff5aa.firebaseapp.com",
    projectId: "auth-ff5aa",
    storageBucket: "auth-ff5aa.firebasestorage.app",
    messagingSenderId: "999401205631",
    appId: "1:999401205631:web:79a3c6fe2265ac3984344a",
    measurementId: "G-FQGRSVQPH0"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función de Login
window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("¡Bienvenido!");
            mostrarUsuario(userCredential.user);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
        window.location.href = "../home/index.html";

};

// Función de Registro
window.register = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("¡Usuario registrado correctamente!");
            mostrarUsuario(userCredential.user);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
        window.location.href = "../home/index.html";
};

// Función para cerrar sesión
window.logout = function() {
    signOut(auth)
        .then(() => {
            alert("Sesión cerrada");
            document.getElementById("user-info").innerText = "";
        })
        .catch((error) => {
            alert("Error al cerrar sesión: " + error.message);
        });
};

// Detectar usuario autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        mostrarUsuario(user);
    } else {
        document.getElementById("user-info").innerText = "";
    }
});

// Mostrar usuario logueado
function mostrarUsuario(user) {
    document.getElementById("user-info").innerText = "Usuario: " + user.email;
}
