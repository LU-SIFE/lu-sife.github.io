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
  targets: '.text2',
  translateX: ["-100%", "0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2000
});

anime.timeline().add({
  targets: '.nav',
  top: ["-100%","0%"],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2000
});

anime.timeline().add({
  targets: '.scroll, .mail',
  bottom: [-100,0],
  easing: "easeOutElastic(0,1)",
  duration: 500,
  delay: 2500
});