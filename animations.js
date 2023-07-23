//Onload functions
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml16');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline().add({
  targets: '.ml16 .letter',
  translateY: ["-1.2em","0em"], 
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: (el, i) => 40 * i + 1250
});

var textWrapper2 = document.getElementById("test1_change");
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='test2'>$&</span>");
const divAnimation = anime({
  targets: '.test2',
  color: ["#333333", "#dfdfdf"],
  duration: 20,
  delay: (el, i) => 100 * i + 1000,
  autoplay: false,
});

anime.timeline().add({
  targets: '.text2',
  translateX: ["-100%", "0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: (el, i) => 250 * i + 2000
});

anime.timeline().add({
  targets: '.nav',
  top: ["-100%","0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2000
});

anime.timeline().add({
  targets: '.mail',
  left: [-250,0],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2500
});

anime.timeline().add({
  targets: '.scroll',
  right: [-250,0],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2500
});


//                    //
// ------------------ //
//                    //

//animation functions
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


function toggle() {
  if (bar_counter === true) {return;}

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

    bar_change(false);
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

    bar_change(true);
    toggle_counter = true;
  }
}

// listeners
window.onscroll = () => {
  if (scroll_counter == false) {
    anime.timeline().add({
      targets: ".scroll",
      translateX: [0,200],
      duration: 1500,
    });
    scroll_counter = true;
  }
  divAnimation.seek((scrollPercent() / 30 - 0.8) * divAnimation.duration);
};


for (var i = 0; i < document.getElementsByClassName("letter").length; i++) {
  document.getElementsByClassName("letter")[i].addEventListener("mouseover", (event) => {
    if (event.target.animestate === true) {return;}
    event.target.animestate = true;
    setTimeout(function() {event.target.animestate = false;},700);
    setTimeout(function() {fly_in(event);},700);
    anime.timeline().add({
      targets: event.target,
      translateY: ["0em", "-1.2em"],
      easing: "easeOutElastic(0,1)",
      duration: 700
    });
  });
}

function fly_in(event) {
    anime.timeline().add({
      targets: event.target,
      translateY: ["-1.2em", "0em"],
      easing: "easeOutElastic(0,1)",
      duration: 700
    });

}


//weird stuff idk

var width_array = [["100%", "90%", "80%", "70%", "60%"],["100%", "90%", "80%", "70%", "60%"]];

function grow_back() {
  for (i = 0; i <= 5; i++) {
    anime.timeline().add({
      targets: "#bar" + (i + 1),
      width: width_array[0][i],
      easing: "easeOutExpo",
      duration: 1000
    });
  }
}

function grow_front() {
  for (i = 0; i <= 5; i++) {
    anime.timeline().add({
      targets: "#bar" + (i + 1),
      width: width_array[1][i],
      easing: "easeOutExpo",
      duration: 1000
    });
  }
}