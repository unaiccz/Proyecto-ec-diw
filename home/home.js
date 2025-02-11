
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const user = document.getElementById('user');
let user_email = localStorage.getItem('email');
    if (user_email) {
        user.innerHTML = user_email;
    } else {
        user.innerHTML = 'Usuario';
    }
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('bg-dark');
        document.body.classList.add('text-white');
        document.body.classList.add('dark-mode');
        header.classList.add('bg-dark');
        footer.classList.add('bg-dark');
        document.querySelectorAll('a img').forEach(img => {
            img.classList.add('dark-mode');
        });
    }

    const themebtn = document.getElementById('theme-toggle');
    themebtn.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        header.classList.toggle('bg-dark');
        footer.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('a img').forEach(img => {
            img.classList.toggle('dark-mode');
        });

        if (document.body.classList.contains('bg-dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
