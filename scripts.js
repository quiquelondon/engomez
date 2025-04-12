function toggleSidebar() {
const sidebar = document.querySelector('.sidebar');
sidebar.classList.toggle('active');
}

document.addEventListener("click", (event) => {
const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('.hamburger');

if (sidebar.classList.contains('active') && 
!sidebar.contains(event.target) && 
!hamburger.contains(event.target)) {
sidebar.classList.remove('active');
}
});

