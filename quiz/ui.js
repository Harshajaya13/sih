// ui.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

    // Sidebar collapse/expand
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Language level expand/collapse
    const languageHeaders = document.querySelectorAll('.language-header');
    languageHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const list = header.nextElementSibling;
            list.classList.toggle('open');
            const icon = header.querySelector('.toggle-levels');
            icon.textContent = list.classList.contains('open') ? '-' : '+';
        });
    });
});
