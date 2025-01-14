document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    const header = document.querySelector('header'); // Asegúrate de que el header también esté seleccionado correctamente

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('bg-dark');
        document.body.classList.add('text-white');
        header.classList.add('bg-dark');
        footer.classList.add('bg-dark');
    }
    const themebtn = document.getElementById('theme-toggle');
    themebtn.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        header.classList.toggle('bg-dark');
        footer.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');
        if (document.body.classList.contains('bg-dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});