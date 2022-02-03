let currentFontSize = 1.4;
const makeBigger = () => {
   //alert('make bigger!');
   currentFontSize += 0.2;
   document.querySelector(".content").style.fontSize = currentFontSize + "em";
   document.querySelector("h1").style.fontSize = (currentFontSize + 0.6) + "em";

};

const makeSmaller = () => {
   currentFontSize -= 0.2;
   document.querySelector(".content").style.fontSize = currentFontSize + "em";
   document.querySelector("h1").style.fontSize = (currentFontSize + 0.6) + "em";
};


document.querySelector("#a1").addEventListener('click', makeBigger);
document.querySelector("#a2").addEventListener('click', makeSmaller);

