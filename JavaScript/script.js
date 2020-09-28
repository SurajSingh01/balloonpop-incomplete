let colors = ['yellow', 'red', 'blue', 'violet','green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let heightOfBalloon = 200;
let widthOfBalloon = 100;
let scores = document.querySelectorAll('.score');
let numberOfBalloonPop = 0;
let totalBalloonToBePoped = 10;
let currentBalloon = 0;
let gameOver =false;
let totalShadow = document.querySelector('.total-shadow');
let winner = document.querySelector('.win');
let looser = document.querySelector('.lose');

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length);    //Random variable for color picking
	div.className = 'balloon balloon-' + colors[rand];       //appended class ballon-red,balloon-green etc...
	
	rand = Math.floor(Math.random() * (windowWidth - 100));    //Added random number to obtain different position on screen
	div.style.left = rand + 'px';							//Moving to left with specific pixel
	div.dataset.number = currentBalloon; //dataset is the properyt to ssign number or object number is the name of variable therfore the name of the attribute become data-number
	currentBalloon++;
	document.body.appendChild(div);
	animateBalloon(div);
}
function animateBalloon(elem) {
	let pos = 0; 											//position of the ballon
	let interval = setInterval(frame, 10); 					//function frame will be caled after every 10 millisecond
 
	function frame() {
		if(pos >=(windowHeight + 200)){						// condition for function will stop at top
			clearInterval(interval);
			gameOver=true;
			//deleteBalloon(elem);
		}
		else{
			pos++;
			elem.style.top = windowHeight - pos + 'px';
		}
	}

}

function deleteBalloon(elem){
	if(document.querySelector('[data-number=" '+elem.dataset.number+' "]' !== null)) {    //This function will only work when there is some number in data-number
	elem.remove();
	numberOfBalloonPop++;
	updateScore();
	}
}

/*To ccalculate the score */
function updateScore() {
	for (let i=0; i< scores.length; i++){
		scores[i].textContent = numberOfBalloonPop;
	}
}
 /* To amimate the creation of ballon */
 function startGame(){
 let loop = setInterval(function(){
 		if(!gameOver && numberOfBalloonPop !== totalBalloonToBePoped) {
 			createBalloon();
 		} else if(num !== totalBalloonToBePoped){
 			clearInterval(loop);
 			totalShadow.style.display = 'flex'; //in css we have done none 
 			looser.style.display = 'block';
 		}else{
 			clearInterval(loop);
 			totalShadow.style.display = 'flex';
 			winner.style.display = 'block';
 		}
 	} , 800);
 }

/*let balloons =document.querySelectorAll('.balloon');						/*this code is not working because event listener will not work for prdefined object on webpage.

for (let i=0; i< balloons.length; i++) {									to overcome this , using event delegation .
	balloons[i].addEventListener('click',function(){
		deleteBalloon(balloons[i])
	})
}*/ 
 /*Event deligation  for popup*/
 document.addEventListener('click',function(event){
 	if(event.target.classList.contains('balloon')){
 		deleteBalloon(event.target);
 	}
 })


/* To start th game */
startGame()