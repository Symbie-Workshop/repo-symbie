// Get the button, close button, and menu layout elements by their IDs
const button = document.getElementById('btnInfos');
const infoLayout = document.getElementById('infoLayout');
const closeButton = document.getElementById('closeBtn');

// Function to show the menu
function showMenu() {
    if (infoLayout){
        infoLayout.classList.remove('hide');
        infoLayout.classList.add('show');
        const currentDisplay = button!.style.display;
    
        // If the menu is hidden, show it. Otherwise, hide it.
        button!.style.display = currentDisplay === 'none' ? 'block' : 'none';
        }
}
// Function to hide the menu
function hideMenu() {
    if (infoLayout){
        infoLayout.classList.remove('show');
        infoLayout.classList.add('hide');
        const currentDisplay = button!.style.display;
    
        // If the menu is hidden, show it. Otherwise, hide it.
        button!.style.display = currentDisplay === 'none' ? 'block' : 'none';

    }
}

// Attach the click event listener to the show menu button
button!.addEventListener('click', showMenu);

// Attach the click event listener to the close menu button
closeButton?.addEventListener('click', hideMenu);
