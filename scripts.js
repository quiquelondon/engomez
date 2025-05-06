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
        const activePage = document.querySelector('.page.active');  // Get the current active page
        const targetPage = document.getElementById(targetId);       // Get the target page
        const parentContainer = document.querySelector('.pages-container'); // The parent container of all pages
    
        if (activePage === targetPage) return; // Prevent redundant transitions
    
        // Start transition for the currently active page (exit animation)
        activePage.classList.add('exit');  // Begin the push-out animation
        activePage.classList.remove('active');  // Remove its "active" state

        // Activate the target page with the entry animation
        targetPage.classList.remove('hidden');  // Ensure it's visible
        targetPage.scrollTo(0, 0); 
        targetPage.classList.add('active');     // Mark it as the active page
        targetPage.classList.add('entering');

        // Wait for the exit animation to complete before hiding all non-active pages
        setTimeout(() => {
            activePage.classList.remove('exit');  // Reset the exit animation state
    
            // Hide any page that is not marked as active
            document.querySelectorAll('.page').forEach(page => {
                if (!page.classList.contains('active')) {
                    page.classList.add('hidden');
                }
                
                page.classList.remove('entering');  // Reset the entering animation state
                window.scrollTo(0, 0); // Reset scroll position to the top
            });
        }, 1000);  // Match the CSS transition duration

        // window.location.hash = targetId; // Updates URL hash
    
        // Handle the sidebar for smaller screens
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth < 768) {  // Adjust the breakpoint as needed
            sidebar.classList.add('hide');  // Apply the hide (ease-out) transition
    
            // Remove "active" and reset the hide state once the transition completes
            setTimeout(() => {
                sidebar.classList.remove('active');
                sidebar.classList.remove('hide');
            }, 300);  // Match the CSS transition duration
        }
    
        // Update the navigation menu to highlight the active page
        document.querySelectorAll('.sidebar ul li button').forEach(button => {
            button.classList.remove('active');  // Remove active class from all buttons
        });
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');  // Highlight the corresponding button
    }


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
