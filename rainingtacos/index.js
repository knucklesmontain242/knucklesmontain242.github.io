$(document).ready(function(){
    window.resizeTo("600", "600");
    particlesJS("particles-header", {
			"particles": {
			  "number": {
				"value": 100,
				"density": {
				  "enable": true,
				  "value_area": 789.1476416322727
				}
			  },
			  "shape": {
				"type": "image",
				"stroke": {
				  "width": 0,
				  "color": "#d7b157"
				},
				"polygon": {
				  "nb_sides": 5
				},
				"image": {
				  "src": "https://static.wikia.nocookie.net/survive-the-disasters-2-wikia/images/f/ff/TacoModel.png",
				  "width": 1,
				  "height": 1
				}
			  },
			  "opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
				  "enable": true,
				  "speed": 0.2,
				  "opacity_min": 0.4,
				  "sync": false
				}
			  },
			  "size": {
				"value": 80,
				"random": true,
				"anim": {
				  "enable": true,
				  "speed": 50,
				  "size_min": 50,
				  "sync": false
				}
			  },
			  "line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			  },
			  "move": {
				"enable": true,
				"speed": 1,
				"direction": "bottom",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
				  "enable": false,
				  "rotateX": 600,
				  "rotateY": 1200
				}
			  }
			},
			"interactivity": {
			  "detect_on": "canvas",
			  "events": {
				"onhover": {
				  "enable": true,
				  "mode": "bubble"
				},
				"onclick": {
				  "enable": true,
				  "mode": "push"
				},
				"resize": true
			  },
			  "modes": {
				"grab": {
				  "distance": 400,
				  "line_linked": {
					"opacity": 1
				  }
				},
				"bubble": {
				  "distance": 83.91608391608392,
				  "size": 1,
				  "duration": 3,
				  "opacity": 1,
				  "speed": 3
				},
				"repulse": {
				  "distance": 200,
				  "duration": 0.4
				},
				"push": {
				  "particles_nb": 4
				},
				"remove": {
				  "particles_nb": 2
				}
			  }
			},
			"retina_detect": true
		  });
          $('body').append('<script src="https://www.youtube.com/player_api"></script><div class="gaf210imvustylez_youtubebox" style="width:1px;height:1px;overflow:hidden"><iframe allow="autoplay" width="300" height="300" src="https://www.youtube.com/embed/vG3iP2Shvs0?autoplay=1&amp;loop=1&amp;playlist=vG3iP2Shvs0" frameborder="0" onload="gaf210_youtube_invisible=new YT.Player(this,{events:{\'onReady\':function(event){event.target.playVideo()}}});" allowfullscreen></iframe><!--Youtube player code generated @ https://gaf210.imvustylez.net --></div>');
});
var audio = document.getElementById('audio');

document.onclick = function() {
    var song = Math.floor((Math.random()*30) + 1);
    audio.pause();
    console.log("Now playing song " + song + ".mp3");
    audio.src ="./meme_sounds/"+song+".mp3";
    audio.play();
}
window.onmousedown = (e) => {
    if (e.button === 1) {
        for (let song = 1; song < 30; song++) {
            $("body").append('<audio id="'+song+'"></audio>');
            document.getElementById(song).pause();
            console.log("Now playing song " + song + ".mp3");
            document.getElementById(song).src ="./meme_sounds/"+song+".mp3";
            document.getElementById(song).play();
          }
    }
}