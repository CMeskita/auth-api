export function RandomCode() {
    let numberRandom = "";
    for (let i = 0; i < 9; i++) {
        numberRandom += Math.floor(Math.random() * 10);
    }
    return numberRandom;
  }
  
 
