let phrases = [
    "Nous préparons tout...",
    "Encore un petit instant...",
    "C'est sur, c'est long aujourd'hui :(",
    "On y est presque..."
];

let txt = document.getElementById("loadertxt");
let preloader = document.getElementById('preloader');
let percentage = 0;
let sentence = 0;

// function fadeout(){
//     preloader.style.opacity = 0;
// }

function switchSentence(){
    txt.innerText = phrases[sentence];
    sentence++;
    if(sentence >= phrases.length){
        sentence = 0;
    }
    setTimeout(switchSentence, 5000)
}
setTimeout(switchSentence, 5000)

document.addEventListener('load', function() {
    percentage = 50;
});
document.addEventListener('DOMContentLoaded', function() {
    percentage = 100;
    //setTimeout(fadeout, 500)
});

