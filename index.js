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
  if (state === true) {
    document.getElementById("bar1").classList.remove("bar1_grow_front");
    document.getElementById("bar2").classList.remove("bar2_grow_front");
    document.getElementById("bar3").classList.remove("bar3_grow_front");
    document.getElementById("bar4").classList.remove("bar4_grow_front");
    document.getElementById("bar5").classList.remove("bar5_grow_front");
    document.getElementById("bar1").classList.add("bar_shrink");
    document.getElementById("bar2").classList.add("bar_shrink");
    document.getElementById("bar3").classList.add("bar_shrink");
    document.getElementById("bar4").classList.add("bar_shrink");
    document.getElementById("bar5").classList.add("bar_shrink");
    setTimeout(function() {
    document.getElementById("bar1").classList.remove("bar_shrink");
    document.getElementById("bar2").classList.remove("bar_shrink");
    document.getElementById("bar3").classList.remove("bar_shrink");
    document.getElementById("bar4").classList.remove("bar_shrink");
    document.getElementById("bar5").classList.remove("bar_shrink");

    document.getElementById("bar1").classList.add("bar1_grow_back");
    document.getElementById("bar2").classList.add("bar2_grow_back");
    document.getElementById("bar3").classList.add("bar3_grow_back");
    document.getElementById("bar4").classList.add("bar4_grow_back");
    document.getElementById("bar5").classList.add("bar5_grow_back");

    }, 1000);
  } else {
    document.getElementById("bar1").classList.remove("bar1_grow_back");
    document.getElementById("bar2").classList.remove("bar2_grow_back");
    document.getElementById("bar3").classList.remove("bar3_grow_back");
    document.getElementById("bar4").classList.remove("bar4_grow_back");
    document.getElementById("bar5").classList.remove("bar5_grow_back");
    document.getElementById("bar1").classList.add("bar_shrink");
    document.getElementById("bar2").classList.add("bar_shrink");
    document.getElementById("bar3").classList.add("bar_shrink");
    document.getElementById("bar4").classList.add("bar_shrink");
    document.getElementById("bar5").classList.add("bar_shrink");
    setTimeout(function() {
    document.getElementById("bar1").classList.remove("bar_shrink");
    document.getElementById("bar2").classList.remove("bar_shrink");
    document.getElementById("bar3").classList.remove("bar_shrink");
    document.getElementById("bar4").classList.remove("bar_shrink");
    document.getElementById("bar5").classList.remove("bar_shrink");

    document.getElementById("bar1").classList.add("bar1_grow_front");
    document.getElementById("bar2").classList.add("bar2_grow_front");
    document.getElementById("bar3").classList.add("bar3_grow_front");
    document.getElementById("bar4").classList.add("bar4_grow_front");
    document.getElementById("bar5").classList.add("bar5_grow_front");

    }, 1000);
  }
}


var scroll_counter = false;
var toggle_counter = false;
var page_state = "none";


window.onload = function() {
  refreshTime();
  setInterval(refreshTime, 1000);
}