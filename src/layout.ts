// Get the button, close button, and menu layout elements by their IDs
const PdfBtn = document.getElementById('btnPdf');
const buttonInfo = document.getElementById('btnInfos');
const buttonCredits = document.getElementById('btnCredits');

// 
const infoLayout = document.getElementById('infoLayout');
const creditsLayout = document.getElementById('creditsLayout');
const closeButton = document.getElementById('closeBtn');
const PdfBtn = document.getElementById('btnPdf');

const contactInfos: { title: string, link: string, type:string , subtitle:string }[] = [
    {
        title: "Directrice de la publication",
        link: "Anaïs AKKOUCHE",
        subtitle:"",
        type: "mail"
    },
    {
        title: "Email",
        link: "anais.akkouche@mmibordeaux.com",
        subtitle:"",
        type: "mail"
    },
    {
        title: "Instagram",
        link: "https://www.instagram.com/symbiemagazine/",
        subtitle:"symbiemagazine",
        type: "insta"
    }
];
let contextClick : string = "";
const teamMembers : { name : string, poste : string}[]= [
    { name: "Thomas Marilleau", poste: "Print Designer & Directeur Artistique" },
    { name: "Clément Madeleine", poste: "Motion Designer" },
    { name: "Soufiyan Kahlaoui", poste: "Graphiste" },
    { name: "Bartholomé Duteil", poste: "Photographe" },
    { name: "Anaïs Akkouche", poste: "Product Owner & Directeur de Publication" },
    { name: "Nino Berber", poste: "Développeur Web" },
    { name: "Anaïs Delavier", poste: "Product Owner" },
    { name: "Adrian Delgado", poste: "Graphiste" },
    { name: "Elyser Cellier", poste: "Photographe" },
    { name: "André Despouys Pascual", poste: "Développeur Web" },
    { name: "Lucas Duverneuil", poste: "Développeur Web" },
    { name: "César Morel", poste: "Photographe" }
  ];
  


// Function to show the menu
function showMenu(context: string) {
    console.log("Click")
    if (context === 'infos'){
        if (infoLayout){
        infoLayout.classList.remove('hide');
        infoLayout.classList.add('show');
            }
    }else if(context === 'credits'){
        if (creditsLayout){
            creditsLayout.classList.remove('hide');
            creditsLayout.classList.add('show');
        }
    }
    closeButton!.classList.add('showBtn');
    contextClick = context;
}
// Function to hide the menu
function hideMenu(context: string) {
    if (context === 'infos'){
        if (infoLayout){
            infoLayout.classList.remove('show');
            infoLayout.classList.add('hide');    

        }
    }else{
        if (creditsLayout){
            creditsLayout.classList.remove('show');
            creditsLayout.classList.add('hide');        
        }
    }
    closeButton!.classList.remove('showBtn');
    closeButton!.classList.add('hide');  
}

// Set Contact infos
document.addEventListener('DOMContentLoaded', () => {
    const contactGrid = document.getElementById('contactGrid');
    const creditsGrid = document.getElementById('creditsGrid');
    if (contactGrid) {
        // Corrected the loop to iterate through the array
        
        contactInfos.forEach(info => {
            // Create a div or any other element as a container for each contact info
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('contactInfo'); // Add a class for potential styling

            if(info.type == "insta"){
                infoDiv.innerHTML = `
                <strong>${info.title}</strong> 
                <a href="${info.link}">${info.subtitle}</a>
            `;
            }
            if(info.type == "mail"){
                infoDiv.innerHTML = `
                <strong>${info.title}</strong> 
                <a href="${info.link.startsWith('http') ? info.link : `mailto:${info.link}`}">${info.link}</a>
            `;
            }
            else{ //mail
                infoDiv.innerHTML = `
                <strong>${info.title}</strong> 
                <a href="${info.link.startsWith('http') ? info.link : `mailto:${info.link}`}">${info.link}</a>
            `;
            }

            // Append the newly created div to the contactGrid
            contactGrid.appendChild(infoDiv);
        });
    }
    if (creditsGrid) {
        // Corrected the loop to iterate through the array
        teamMembers.forEach(info => {
            // Create a div or any other element as a container for each contact info
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('creditInfo'); // Add a class for potential styling

            // Assuming you want to display the title and make the link clickable
            infoDiv.innerHTML = `
                <strong>${info.name}</strong> 
                <p>${info.poste}</p>
            `;

            // Append the newly created div to the contactGrid
            creditsGrid.appendChild(infoDiv);
        });
    }
});

// Attach the click event listener to the show menu button
buttonInfo!.addEventListener('click', () => showMenu('infos'));
buttonCredits!.addEventListener('click', () => showMenu('credits'));
// PdfBtn!.addEventListener('click', () => showMenu('pdf'));

// Attach the click event listener to the close menu button
closeButton!.addEventListener('click', () => hideMenu(contextClick));

