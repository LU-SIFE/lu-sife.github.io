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

anime.timeline().add({
  targets: '.crosses',
  opacity: [0,1],
  easing: "easeOutElastic(0,1)",
  duration: 520,
  delay: 2500
});

setInterval(function() {
  anime.timeline().add({
    targets: '.crosses',
    translate: ["10px -10px", "-10px 10px", "10px -10px", "0px 0px"],
    easing: "easeInOutCubic",
    duration: 2000,
    delay: (el, i) => 50 * i,
  });
}, 6000);

anime.timeline().add({
  targets: '.text2',
  translateX: ["-100%", "0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: (el, i) => 250 * i + 2000
});

anime.timeline().add({
  targets: '#time_container',
  top: ["-100%","0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2000
});

anime.timeline().add({
  targets: '.nav_items',
  translateX: ["150%","0%"],
  easing: "easeOutExpo",
  duration: 750,
  delay: 2000
});

anime.timeline().add({
  targets: '.mail',
  left: [-280,0],
  easing: "easeOutElastic(0,1)",
  duration: 600,
  delay: 2500
});

anime.timeline().add({
  targets: '.scroll',
  right: [-250,0],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2500
});

anime.timeline().add({
  targets: ".color_bar",
  easing: "easeOutElastic(0,1)",
  width: "11%",
  delay: 1000,
  duration: 750
});

anime.timeline().add({
  targets: '#scroll_nav',
  left: ["-2em","1em"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 3000
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
    return;
  } else {
    anime.timeline().add({
      targets: page_num,
      bottom: ["0vh","-80vh"],
      easing: "easeOutExpo",
      duration: 1000,
    });
    page_state = "none"; 
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
  document.querySelector('.scroll_circle').style.top = scrollPercent() / 5 - 0.5 + "em";
  divAnimation.seek(scrollPercent());
};

const divAnimation = anime({
  targets: '.text_container',
  translateY: [0, "100vh"],
  duration: 100,
  autoplay: false,
  loop: true,
  easing: "linear"
});


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