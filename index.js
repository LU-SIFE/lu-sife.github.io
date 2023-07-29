// moves cursor to correct position
document.onmousemove = function() {
  document.getElementById('cursor').style.left = event.clientX + 'px';
  document.getElementById('cursor').style.top = event.clientY + 'px';
};

//enables and disables scrolling in body
function disableScroll() {document.body.classList.add("stop_scrolling");}
function enableScroll() {document.body.classList.remove("stop_scrolling");}

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

//refreshes the time
function refreshTime() {
  var dateString = new Date().toLocaleString("en-US", {
    timeZone: "America/Denver", 
    hour12: false,
  });

  var formattedString = dateString.replace(", ", " - ");
  document.getElementById("time").innerHTML = formattedString + " MDT";
}

const scrollPercent = () => {
  const bodyST = document.body.scrollTop;
  const docST = document.documentElement.scrollTop;
  const docSH = document.documentElement.scrollHeight;
  const docCH = document.documentElement.clientHeight;
  return (docST + bodyST) / (docSH - docCH) * 100
}

function bar_change(state) {
  if (bar_counter === true) {return;}
  bar_counter = true;
  anime.timeline().add({
    targets: "#bar1, #bar2, #bar3, #bar4, #bar5",
    width: "0%",
    duration: 1000,
    easing: "easeOutExpo"
  });

  setTimeout(function() {
    if (state === true) {
      grow_back();
      document.getElementById("bar_text1").innerHTML = "Text";
      document.getElementById("bar_text2").innerHTML = "Text";
      document.getElementById("bar_text3").innerHTML = "Text";
      document.getElementById("bar_text4").innerHTML = "Text";
      document.getElementById("bar_text5").innerHTML = "Text";
    } else {
      grow_front();
      document.getElementById("bar_text1").innerHTML = "HTML/CSS";
      document.getElementById("bar_text2").innerHTML = "JS";
      document.getElementById("bar_text3").innerHTML = "ANIME.JS";
      document.getElementById("bar_text4").innerHTML = "Text";
      document.getElementById("bar_text5").innerHTML = "Text";
    }
    setTimeout(function() {bar_counter = false;}, 1000);

  }, 1000);
}

function idle_text() {
  anime.timeline().add({
  targets: '.ml16 .letter',
  translateY: ["0em", "-1em", "0em"], 
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


var bar_counter = false;
var scroll_counter = false;
var toggle_counter = false;
var page_state = "none";

window.onload = function() {
  refreshTime();
  setInterval(refreshTime, 1000);
  bar_change(false);
  setInterval(idle_text, 9000);
  document.querySelectorAll('ul.cloud a').forEach((i) => {
    i.style.setProperty('--size', i.dataset.weight);
    });
}