if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('bg-dark');
    header.classList.add('bg-dark');
    footer.classList.add('bg-dark');
}
const themebtn = document.getElementById('theme-toggle');
themebtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-dark');
    header.classList.toggle('bg-dark');
    footer.classList.toggle('bg-dark');
    if (document.body.classList.contains('bg-dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});