document.onmousemove = function() {
  document.getElementById('cursor').style.left = event.clientX + 'px';
  document.getElementById('cursor').style.top = event.clientY + 'px';
};

function ch(state) {
  if (state === true) {
    document.getElementById("cursor").classList.remove("cursor_shrink");
    document.getElementById("cursor").classList.add("cursor_expand");
  } else {
    document.getElementById("cursor").classList.remove("cursor_expand");
    document.getElementById("cursor").classList.add("cursor_shrink");
  }
}

function refreshTime() {
  var dateString = new Date().toLocaleString("en-US", {
    timeZone: "America/Denver", 
    hour12: false,
  });

  var formattedString = dateString.replace(", ", " - ");

  document.getElementById("time").innerHTML = formattedString + " MDT";
}

refreshTime();
setInterval(refreshTime, 1000);


var page_state = "none";


function pullpage(page_num) {

  if (page_num != page_state && page_state != "none") {
    anime.timeline().add({
      targets: page_state,
      bottom: ["0vh","-80vh"],
      easing: "easeOutExpo",
      duration: 1000,
    });

    anime.timeline().add({
      targets: page_num,
      bottom: ["-80vh","0vh"],
      easing: "easeOutExpo",
      delay: 750,
      duration: 1000,
    });
    page_state = page_num;
    return;
  }

  if (page_state === "none") {
    anime.timeline().add({
      targets: page_num,
      bottom: ["-80vh","0vh"],
      easing: "easeOutExpo",
      duration: 1000,
    });
    page_state = page_num;
    disableScroll();
    return;
  } else {
    anime.timeline().add({
      targets: page_num,
      bottom: ["0vh","-80vh"],
      easing: "easeOutExpo",
      duration: 1000,
    });
    page_state = "none";
    enableScroll();
    return;
  }
}


function disableScroll() {document.body.classList.add("stop_scrolling");}
function enableScroll() {document.body.classList.remove("stop_scrolling");}


// Wrap every letter in a span
var textWrapper = document.getElementById("test1");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='test2'>$&</span>");
const divAnimation = anime({
  targets: '.test2',
  color: ["#333333", "#dfdfdf"],
  duration: 20,
  delay: (el, i) => 100 * i + 1000,
  autoplay: false,
});


const scrollPercent = () => {
  const bodyST = document.body.scrollTop;
  const docST = document.documentElement.scrollTop;
  const docSH = document.documentElement.scrollHeight;
  const docCH = document.documentElement.clientHeight;
  return (docST + bodyST) / (docSH - docCH) * 100
}

var scroll_counter = false;

window.onscroll = () => {
  if (scroll_counter == false) {
    anime.timeline().add({
      targets: ".scroll",
      translateX: [0,200],
      duration: 1500,
    });
    scroll_counter = true;
  }
  divAnimation.seek((scrollPercent() / 30 - 0.5) * divAnimation.duration);
};

var toggle_counter = false;

function toggle() {
  if (toggle_counter === true) {
    anime.timeline().add({
      targets: "#toggle_fill",
      width: ["2em", "0em"],
      easing: "easeOutExpo",
      duration: 500
    });

    anime.timeline().add({
      targets: "#toggle_back",
      color: ["#9D00FF", "#333333"],
      easing: "easeOutExpo",
      duration: 500
    });

    anime.timeline().add({
      targets: "#toggle_front",
      color: ["#333333", "#9D00FF"],
      easing: "easeOutExpo",
      duration: 500
    });

    toggle_counter = false;

  } else {
    anime.timeline().add({
      targets: "#toggle_fill",
      width: ["0em", "2em"],
      easing: "easeOutExpo",
      duration: 500
    });

    anime.timeline().add({
      targets: "#toggle_front",
      color: ["#9D00FF", "#333333"],
      easing: "easeOutExpo",
      duration: 500
    });

    anime.timeline().add({
      targets: "#toggle_back",
      color: ["#333333", "#9D00FF"],
      easing: "easeOutExpo",
      duration: 500
    });

    toggle_counter = true;
  }
}