export function loader() {
    let phrases = [
        "Nous préparons tout...",
        "Encore un petit instant...",
        "C'est sur, c'est long aujourd'hui :(",
        "On y est presque..."
    ];
    
    let txt = document.getElementById("loadertxt");
    let sentence = 0;
    
    // function fadeout(){
    //     preloader.style.opacity = 0;
    // }
    
    function switchSentence(){
        if(txt){
            txt.innerText = phrases[sentence];
            sentence++;
            if(sentence >= phrases.length){
                sentence = 0;
            }
            setTimeout(switchSentence, 5000)
        }
    }
    setTimeout(switchSentence, 5000)
    
    
  }
  