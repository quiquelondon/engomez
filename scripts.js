fetch('button-section.html')
    .then(response => response.text())
    .then(html => {
        // Select all elements with the "footer" class
        document.querySelectorAll('.button-section').forEach(footerElement => {
            footerElement.innerHTML = html; // Populate each footer element with the same content
        });
    })
    .catch(error => console.error('Error loading button-section:', error));



    fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        // Select all elements with the "footer" class
        document.querySelectorAll('.footer').forEach(footerElement => {
            footerElement.innerHTML = html; // Populate each footer element with the same content
        });
    })
    .catch(error => console.error('Error loading footer:', error));




function switchPage(targetId) {
    const activePage = document.querySelector('.page.active');
    const targetPage = document.getElementById(targetId);
    const allPages = document.querySelectorAll('.page');

    if (!targetPage || activePage === targetPage) return;

    // 🔁 Clean old transition classes
    // const cleanTransitionClasses = (el) => {
    //     el.classList.forEach(cls => {
    //         if (cls.startsWith('enter-') || cls.startsWith('exit-')) {
    //             el.classList.remove(cls);
    //         }
    //     });
    // };
    // cleanTransitionClasses(activePage);
    // cleanTransitionClasses(targetPage);

    // 🌀 Get transition type from target page
    const transitionType = targetPage.dataset.transition || 'slide';

    // 🔁 Begin transition
    activePage.classList.add(`exit-${transitionType}`);
    activePage.classList.remove('active');

    targetPage.classList.remove('hidden');
    targetPage.scrollTo(0, 0);
    targetPage.classList.add('active', 'entering', `enter-${transitionType}`);

    // 🧹 Clean up after animation
    setTimeout(() => {
        activePage.classList.remove(`exit-${transitionType}`);
        targetPage.classList.remove('entering', `enter-${transitionType}`);

        allPages.forEach(page => {
            if (!page.classList.contains('active')) {
                page.classList.add('hidden');
            }
        });
        window.scrollTo(0,0);

    }, 1000); // Match animation duration


    // 📱 Hide sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth < 768 && sidebar) {
        sidebar.classList.add('hide');
        setTimeout(() => {
            sidebar.classList.remove('active', 'hide');
        }, 300);
    }

    // 🧭 Highlight active menu button
    document.querySelectorAll('.sidebar ul li button')
        .forEach(btn => btn.classList.remove('active'));

    const activeButton = document.querySelector(`[data-target="${targetId}"]`);
    if (activeButton) activeButton.classList.add('active');

// Update URL without reloading
if (window.location.hash !== `#${targetId}`) {
    history.pushState({ pageId: targetId }, '', `#${targetId}`);
}
}
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.pageId) {
        switchPage(event.state.pageId);
    }
});
// document.addEventListener('DOMContentLoaded', () => {
//     const hash = window.location.hash.replace('#', '');
//     if (hash) {
//         switchPage(hash);
//     }
// });




function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

document.addEventListener("click", (event) => {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');

    // Close sidebar when clicking outside (on smaller screens)
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        !hamburger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Sidebar ease-out on page load with transitions
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior for smooth transition
        const sidebar = document.querySelector(".sidebar");

        if (window.innerWidth < 768) { // Only hide sidebar on smaller screens
            sidebar.classList.add("hide"); // Apply the "hide" transition class
        }

        // Delay navigation until the sidebar transition completes
        setTimeout(() => {
            window.location.href = link.href; // Navigate after sidebar slides out
        }, 300); // Match the CSS transition duration
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.animation, .reverse-animation, .flash-animation'); // Select all items to be observed

    // Create an observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class to items in the viewport
                entry.target.classList.add('animate');
            }
        });
    });

    // Observe each item
    items.forEach(item => observer.observe(item));
});


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const pages = document.querySelectorAll(".page");
        const prevButtons = document.querySelectorAll("#prevButton");
        const nextButtons = document.querySelectorAll("#nextButton");

        if (!prevButtons.length || !nextButtons.length) {
            console.error("Buttons not found! Make sure they exist before running this script.");
            return;
        }

        function updateNavigationButtons() {
            const activePage = document.querySelector(".page.active");
            if (!activePage) return;

            const pageArray = Array.from(pages);
            const currentIndex = pageArray.findIndex(page => page.id === activePage.id);

            if (currentIndex > -1) {
                const prevId = currentIndex > 0 ? pageArray[currentIndex - 1].id : null;
                const nextId = currentIndex < pageArray.length - 1 ? pageArray[currentIndex + 1].id : null;

                prevButtons.forEach(btn => {
                    if (prevId) {
                        btn.setAttribute("onclick", `switchPage('${prevId}')`);
                    } else {
                        btn.removeAttribute("onclick");
                    }
                });

                nextButtons.forEach(btn => {
                    if (nextId) {
                        btn.setAttribute("onclick", `switchPage('${nextId}')`);
                    } else {
                        btn.removeAttribute("onclick");
                    }
                });
                    document.querySelectorAll('.prevId').forEach(el => {
                    el.innerHTML = prevId ? `${prevId}` : '';
                });
            
                document.querySelectorAll('.nextId').forEach(el => {
                    el.innerHTML = nextId ? `${nextId}` : '';
                });
            }
        }

        // Automatically run after switchPage completes
        const originalSwitchPage = window.switchPage;
        window.switchPage = function (targetId) {
            if (typeof originalSwitchPage === 'function') {
                originalSwitchPage(targetId);
            }

            // Delay slightly in case switchPage uses transitions
            setTimeout(() => {
                updateNavigationButtons();
            }, 50);
        };

        // Initial run
        updateNavigationButtons();
    }, 500); // Shorter delay now, adjust if needed
});
