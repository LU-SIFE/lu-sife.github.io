tsParticles.load('particles-js',
{
  "particles": {
    "number": {
      "value": 185,
      "density": {
        "enable": true,
        "area": 800
      }
    },
    "color": {
      "value": "#f25050"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "animation": {
        "enable": false,
        "speed": 1,
        "miminumValue": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "animation": {
        "enable": false,
        "speed": 40,
        "miminumValue": 0.1,
        "sync": false
      }
    },
    "lineLinked": {
      "enable": true,
      "distance": 150,
      "color": "#6d00cf",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 9.9,
      "direction": "top-right",
      "random": true,
      "straight": true,
      "outMode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotate": {
          "x": 600,
          "y": 1200
        }
      }
    }
  },
  "interactivity": {
    "detectsOn": "canvas",
    "events": {
      "onHover": {
        "enable": true,
        "mode": "repulse"
      },
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "lineLinked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 90,
        "duration": 0.4
      },
      "push": {
        "quantity": 4
      },
      "remove": {
        "quantity": 2
      }
    }
  },
  "detectsRetina": true,
  "fpsLimit": 60
}
);