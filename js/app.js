
/*The list*/
const cardlist=["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-camera", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-camera"]

//* The shuffle function*//

// Shuffle function from http://stackoverflow.com/a/2450976
// Known as the Fisher-Yates (aka Knuth) Shuffle


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cardlist); /* shuffle list*/

/* assigning icons to the HTML */

const card = document.querySelectorAll(".card"); 

function display(){
for (i = 0 ; i < card.length; i++) {
    card[i].children.item(0).className=cardlist[i]; 
    card[i].setAttribute("idValue", cardlist[i]);}}

/* variables for the card guesses*/

let card1 = "";
let card2 = "";
let openedCards=[];
let clicks = 0;
let matchedCards= [];
const SelectedCards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let firsttime=0;

/*When the user clicks an event takes action*/
deck.addEventListener('click', function Play(clicked){

    display();
	/*start clock only once*/
	if (firsttime == 0) { 
	startClock();
	
	firsttime++; 
	}
	/*check of a "li" element is cliked*/
    if (clicked.target.nodeName == 'LI'){ 
    	if (clicks <2){
        	clicks++;
    	if (clicks === 1){
			card1 = clicked.target;
			card1.className += " open show";
			let cardVal = clicked.target.getAttribute("idValue");
			openedCards.push(cardVal);
		 } 
		else {
			card2=clicked.target;
			/*check if the same card is clicked*/
	   		if (card1 == card2) { 
		   		NotMatched();
	   }
	   		else {
        		card2.className += " open show";
				let cardVal = clicked.target.getAttribute("idValue");
        		openedCards.push(cardVal);
	   }
   }
}
		
/*If two open cards are open, check if their matching*/
    if (openedCards.length ==2) { 
        matchingCards();
        RemoveStar();
        setTimeout(resetCards, 200);
        }
	/*if the matched cards are 16, then the game will be completed*/
    if(matchedCards.length===16){ 
       Completed ();
    }}
})


					  
					 
/* close cards*/

function resetCards() {
    card1 = "";
    card2 = "";
    clicks = 0;
}

/* if the open cards aren't a match. */

function NotMatched(){
	/*if the card clicked twice*/
	if (card1== card2) {
    card1.classList.remove("open", "show");
	}
	else {
	card1.classList.remove("open", "show");
	card2.classList.remove("open", "show");
	}
    
    openedCards = [];
    clicks=0;
}



//* If the cards match *//

function matchingCards() {   
    if (openedCards[0] == openedCards[1]) {
        var first=card1.className += " match";
        var second=card2.className += " match";
        matchedCards.push(first);
        matchedCards.push(second);
        openedCards = [];
        clicks=0;
        

} 	else {

    	setTimeout(NotMatched, 200);
    	setTimeout(resetCards, 200);
    }
}


const seconds = document.getElementById("seconds");
let totalSeconds = 0;
let minutes= document.getElementById("min");
let min=0;
function startClock() {
	Interval= setInterval(function setTime() {
    if (matchedCards.length< 16) {
    	++totalSeconds;
     }
    seconds.innerHTML = totalSeconds;
	/*if sec=59 then min=1 and sec=0*/
	if (totalSeconds === 59) {
		setTimeout(function(){ totalSeconds=0;  seconds.innerHTML=totalSeconds;}, 1000);	
		setTimeout(function(){ min++; minutes.innerHTML=min; }, 1000);
		setTimeout(function(){document.getElementById("minute").style.visibility="visible";}, 1000);
		minutes.innerHTML=min;		
		}
	}, 1000); 
}
/*Clock stopped*/
function ClockStopped(){
if (totalSeconds>0) {
    clearInterval(interval);
	}
}




/* Variables for the moves counter and star remover.*/

const moves = document.querySelector(".moves");
let movesNum = 0;
const star = document.querySelectorAll('.fa-star');
const star1 = star.item(0);
const star2 = star.item(1);

/*When user makes too many moves start deleting stars*/

function RemoveStar() {
    movesNum++;
    moves.innerText =  movesNum;
	if ( movesNum === 20) {
    	star1.classList.remove("fa-star");

    } 
	else if( movesNum === 30) {
    	star2.classList.remove("fa-star");
    }
}

/* Reset button*/

const restart = document.querySelector(".restart");
restart.addEventListener("click", function buttonReset (){
	if (card1 != ""){
    	card1.classList.remove("open", "show");
    }
	document.getElementById("minute").style.visibility="hidden";
  	removeMatch();
  	resetCards();
  	openedCards=[];
	movesNum=0;
	moves.innerHTML= 0;
	seconds.innerHTML = 0;
	min=0;
	matchedCards=[];
	totalSeconds=0;
	star1.classList.add("fa-star");
	star2.classList.add("fa-star");
	ClockStopped();
	shuffle(cardlist);              
});

//* Remove all matched cards*/
function removeMatch(){
        for (i = 0; i < cardlist.length; i++){
        card[i].classList.remove('open', 'show', 'match');
}}

/*When it is completed, display a winning message to user*/
function Completed(){
	if(matchedCards.length==16){
    	document.getElementById("message").style.visibility="visible";
		document.getElementById("MovesTotal").innerText =moves.innerText;
		let remained= document.getElementsByClassName("fa-star").length;
		document.getElementById("StarsRemained").innerText =remained;
		if (min>0){
			document.getElementById("Time").textContent=min+" min. and "+ totalSeconds+" sec. ";
		}
		else {
			document.getElementById("Time").textContent= totalSeconds + " sec.";
		}
	} 
}

/*If user clicks, "YES" button, the game starts again*/
const buttonYes = document.getElementById("newgame");
buttonYes.addEventListener('click',function playAgain(){
	/*hide winning message and minutes, time restarts again*/
	document.getElementById("message").style.visibility="hidden";
	document.getElementById("minute").style.visibility="hidden";
    removeMatch();
    openedCards=[];
   	seconds.innerHTML = 0;
	movesNum=0;
    moves.innerHTML= 0;
	matchedCards=[];
	totalSeconds=0;	
	star1.classList.add("fa-star");
	star2.classList.add("fa-star");
	shuffle(cardlist);  
});
/*if user clicks, "NO" button, the winning message is hidden and nothing else  happens*/
const buttonNo= document.getElementById("no");
buttonNo.addEventListener('click',function nonewgame() {
	document.getElementById("message").style.visibility="hidden";		
});

