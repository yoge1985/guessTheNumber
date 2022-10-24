// const { URL } = require("uuid/dist/v35");

let winningNumber;
let minNumber;
let maxNumber;

const container = document.querySelector('.container');
const sadIcon = document.querySelector('.sad-icon');
const selectMin = document.getElementById('select-min');
const selectMax = document.getElementById('select-max');
const guessBtn = document.getElementById('guess-btn');
const submitSelect = document.querySelector('.submit-selection');
const instruction = document.querySelector('.instruction');
const message = document.querySelector('.message');
const guessNumber = document.getElementById('guess-number');
const restartBtn = document.getElementById('restart');

//initialise the guess btn to disabled until min and max have been selected
guessBtn.disabled = true; 


submitSelect.addEventListener('click', function() {
    
     //set min and max value to Int
     minNumber =parseInt(selectMin.value);
     maxNumber = parseInt(selectMax.value);
    console.log(minNumber);
    console.log(maxNumber);
    //set the message
    if(selectMin.value == '' || selectMax.value == '' || minNumber > maxNumber) {
        // document.getElementById('submit').disabled = false;  
       alert('Enter a valid min and max number')

    }else if(confirm('are you sure?') == true) {
        console.log('hello??')
        instruction.style.color = 'purple';
        instruction.innerText = `Guess a number between ${selectMin.value} and ${selectMax.value}`;
       //unblock the disabled on the guess btn
        document.getElementById('guess-btn').disabled = false;
        //disable submit btn
        submitSelect.disabled = true;
        selectMin.disabled = true;
        selectMax.disabled = true;

        //set the value of winning number
    winningNumber = initialiseWinningNumber(minNumber, maxNumber);
    console.log(selectMin.value);
    console.log(selectMax.value);
    console.log('----------------')
    console.log(winningNumber);

    }else{
        
        console.log('pressed cancel');
    }
    //disable submitSelect btn, otherwise min, max and winning number could be changed
    // submitSelect.disabled = true;
      
})

// function to call confirm - proceed with the game
// function begin() {
//     if(confirm('Are you sure?') == true) {
//         console.log('hello');
//         const created = document.createElement('h5');
//         created.className = 'created';
//         created.innerText = 'confirmed';
//         document.body.appendChild(created);

//     }
// }

 //function to add image of sad emoji if wrong guess
 function badGuess() {
    let img = document.createElement('img');
    img.src = './assets/sad-img.jpg';
    console.log('test');
    sadIcon.append(img);
    let bleep = new Audio('./assets/donkey noise.mp3');
    bleep.play();    
    
    const myTimeout = setTimeout(myGreeting, 8000);
}

function myGreeting() {
    sadIcon.innerHTML = ' ';
  }

function initialiseWinningNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

guessBtn.addEventListener('click', function() {
    
    console.log(parseInt(guessNumber.value));
    if(parseInt(guessNumber.value) === winningNumber) {
        message.style.color = 'green';
        message.innerText = `congratulations!! winning number is ${winningNumber}`;
        //confetti celebration
        guessNumber.style.borderColor = 'green';
        startConfetti()
        let bleep = new Audio('./assets/sibat_hasibot.mp3');
        bleep.play();  
    }
    else{
        guessNumber.value = '';
        guessNumber.style.borderColor = 'red';
        //display sad emoji and fade after 8 seconds
        badGuess();
    }


    
})

restartBtn.addEventListener('click', function restart() {
    location.reload();
});

// if(selectMin.value == '' || selectMax.value == ''){
//     document.getElementById('guess-btn').disabled = true;
//     document.getElementById('number').disabled = true;
// }else {
//     document.getElementById('guess-btn').disabled = false;
//     document.getElementById('number').disabled = false;
// }

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately


	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}

    // startConfetti()

    






