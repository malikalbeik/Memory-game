

var deck = document.querySelector('.deck');
var currentlySelectedCards = []; /* An array containing the currently played two cards */
var shuffledCards = shuffle(Array.from(document.getElementsByClassName('card')));
var numberOfTimesTheUserWasWrong = 0;



/**
 * Setting the time and adding it to the .timer claased node.
 */
var seconds = 0, minutes = 0, hours = 0, startTimer;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    document.querySelector('.timer').textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    startTimer = setTimeout(add, 1000);
}
startTimer = setTimeout(add, 1000);




/**
 * removing all old elements inside the deck and replacing them
 * with the new shuffled-cards.
 */
deck.innerHTML = "";
for (var i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
}


/**
 * event listener for when the deck is clicked.
 */
deck.addEventListener('click', function(event){

  /* An if statment to check if the clicked element is a deck or a card. */
  if (event.target.firstElementChild.classList[1] !== undefined && event.target.classList.contains('open','show') === false){
    currentlySelectedCards.push(event.target.firstElementChild.classList[1]);
  }
  event.target.classList.add('show', 'open');


  var cardsWithOpenClass = [].slice.call(document.querySelectorAll('.open')).filter(e => (e.className.indexOf('match') === -1));

  /*
  * check if the two cards match each other or not,
  * if so match them if not then close them.
  */
  if (currentlySelectedCards[0] === currentlySelectedCards[1]) {
     cardsWithOpenClass.forEach(function(element) {
      element.classList.add('match');
     })
  }else if (currentlySelectedCards[1]) {
    cardsWithOpenClass.forEach(function(element) {
      setTimeout(function () {
        element.classList.remove('open', 'show');
      }, 250);
    });
    numberOfTimesTheUserWasWrong += 1;
  }

  if(currentlySelectedCards.length === 2) currentlySelectedCards = [];

  document.querySelector('.moves').innerHTML = 9 - numberOfTimesTheUserWasWrong;


  /**
   * A switch statment to know the players star
   *  rating and to know when the user loses.
   */
  var stars = document.querySelector('.stars');
  switch (numberOfTimesTheUserWasWrong) {
    case 3:
      stars.removeChild(stars.childNodes[0]);
      break;
    case 6:
      stars.removeChild(stars.childNodes[0]);
      break;
    case 9:
      var lostModal = document.querySelector('.lost-modal');
      lostModal.style.display = "block";
      document.querySelector('.timer-lost').textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      clearTimeout(t);
      break;
    default:
      break;
  };


  /* check for when the player has won the game and present the win modal.*/
  if (Array.from(document.querySelectorAll('.match')).length >= 16){
    var winModal = document.querySelector('.win-modal');
    var closeButton = document.querySelector('.win-modal-close');
    document.querySelector('.timer-won').textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    clearTimeout(t);
    clearTimeout(t);
    winModal.style.display = "block";

    closeButton.onclick = function() {
    winModal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == winModal) {
          winModal.style.display = "none";
      }
    }
  }

});

document.querySelector('.restart').addEventListener('click', function(){
  document.querySelectorAll('.card').forEach(function(element) {
    element.classList.remove('match', 'open', 'show');
    location.reload();
  });

});





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
