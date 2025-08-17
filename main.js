// This function will be executed once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and inject the navigation bar
    fetch('nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            // --- Mobile Menu Toggle ---
            const navToggle = document.getElementById('nav-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            if (navToggle && mobileMenu) {
                navToggle.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // --- Highlight Active Nav Link ---
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('#nav-menu a, #mobile-menu a');

            navLinks.forEach(link => {
                const linkPage = decodeURIComponent(link.getAttribute('href').split('/').pop());
                if (linkPage === decodeURIComponent(currentPage)) {
                    link.classList.add('text-blue-600', 'font-bold');
                    link.classList.remove('text-gray-700');
                    if (link.closest('#mobile-menu')) {
                        link.classList.add('bg-blue-100');
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching navigation:', error);
            document.getElementById('navbar-placeholder').innerHTML = '<p class="text-center text-red-500">Error: Navigation could not be loaded.</p>';
        });
});
