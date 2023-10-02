// moves cursor to correct position
document.onmousemove = function() {
  mouse.x = event.clientX - window.innerWidth / 2;
  mouse.y = event.clientY - window.innerHeight / 2;
  document.getElementById('cursor').style.left = event.clientX + 'px';
  document.getElementById('cursor').style.top = event.clientY + 'px';
  parallax();
};

//changes cursor state onhover
function ch(state) {
  if (state === true) {
    document.getElementById("cursor").classList.remove("cursor_shrink");
    document.getElementById("cursor").classList.add("cursor_expand");
  } else {
    document.getElementById("cursor").classList.remove("cursor_expand");
    document.getElementById("cursor").classList.add("cursor_shrink");
  }
}


var elems = document.getElementsByClassName("letter");



//refreshes the time
function refreshTime() {
  var dateString = new Date().toLocaleString("en-US", {
    timeZone: "America/Denver", 
    hour12: false,
  });

  var formattedString = dateString.replace(", ", " - ");
  document.getElementById("time").innerHTML = formattedString + " MDT <3";
}

const scrollPercent = () => {
  const bodyST = document.body.scrollTop;
  const docST = document.documentElement.scrollTop;
  const docSH = document.documentElement.scrollHeight;
  const docCH = document.documentElement.clientHeight;
  return (docST + bodyST) / (docSH - docCH) * 100
}

function idle_text() {
  anime.timeline().add({
  targets: '.ml16 .letter',
  translateY: ["0em", "-1.2em", "0em"], 
  easing: "easeOutElastic(0,0.8)",
  duration: 1000,
  delay: (el, i) => 40 * i
});

  anime.timeline().add({
  targets: '.text2',
  rotate: ["0deg", "1deg", "-1deg", "0deg"],
  easing: "easeOutElastic(0,0.8)",
  duration: 500,
  delay: (el, i) => 250 * i + 1000
});
}

function parallax() {
  document.getElementById('scroll_nav').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.getElementById('nav').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.querySelector('.mail').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.querySelector('.scroll').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.querySelector('.sect1').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.querySelector('.sect3').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
  document.querySelector('.text_container').style.translate = -(mouse.x/200) + "px " + -(mouse.y/65) + "px";
}

var mouse = new Object();
var bar_counter = false;
var scroll_counter = false;
var toggle_counter = false;
var page_state = "none";

window.onload = function() {
  refreshTime();
  setInterval(refreshTime, 1000);
  setInterval(idle_text, 10000);
  document.querySelectorAll('ul.cloud a').forEach((i) => {
    i.style.setProperty('--size', i.dataset.weight);
    });
}