/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/
const initPage = () => {
  //see if button is pressed, if so, add it to class list
  const pressed = window.localStorage.getItem("dyslexic") === 'true';
  if (pressed) {
    document.body.classList.add("dyslexia-mode");
  }
  // toggle aria-pressed attribute
  if (pressed) {
    document.getElementById("dyslexia-toggle").setAttribute("aria-pressed", 'true');
  }
  // add event listener to button
  document.getElementById("dyslexia-toggle").addEventListener("click", makeDyslexiaMode);

};

const makeDyslexiaMode = ev => {
  let pressed = ev.currentTarget.getAttribute('aria-pressed') === 'true';
  ev.currentTarget.setAttribute('aria-pressed', String(!pressed));
  document.body.classList.toggle("dyslexia-mode");
  window.localStorage.setItem("dyslexic", String(!pressed));
};

initPage();

