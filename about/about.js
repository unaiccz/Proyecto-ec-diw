        // Toggle dark mode
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        const themeToggle = document.getElementById('theme-toggle');
        const user = document.getElementById('user');
        let user_email = localStorage.getItem('email');
            if (user_email) {
                user.innerHTML = user_email;
            } else {
                user.innerHTML = 'Usuario';
            }
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