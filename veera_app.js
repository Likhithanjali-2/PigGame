var scores , roundScore , activePlayer , previousDice ,winningScore ;
//init();
//set dice when it rolled
//
function rollButtonListener(){
    //random number for dice
    var dice1 = Math.floor ( Math.random()*6)+1;
    var dice2 = Math.floor ( Math.random()*6)+1;

    document.querySelector('.dice1').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';

    //changing img based on random number
    document.querySelector('.dice1').src = 'dice-'+dice1+'.png';
    document.querySelector('.dice2').src = 'dice-'+dice2+'.png';

    if(dice1 !== 1 && dice2 !== 1){
      //update the roundScore
      roundScore += dice1 + dice2 ;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
      previousDice = dice1 ;
    }else {
        nextPlayer();
    }

    /*
    if (previousDice == 6 && dice1 == 6 ) {
      scores[activePlayer] = 0;
      document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }else if(dice1 !== 1){
      //update the roundScore
      roundScore += dice1 + dice2 ;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
      previousDice = dice1 ;
    }else {
        nextPlayer();
    }*/
}

//
function holdButtonListener(){
    //add score to GLOBAL
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    // check winning of game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-'+activePlayer).textContent += " Winner !";
      document.querySelector('.dice1').style.display = 'none'
      document.querySelector('.dice2').style.display = 'none'
      document.querySelector('.player-'+activePlayer+'-panel').classList.add("winner");
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active");
      document.querySelector('.btn-roll').removeEventListener('click',rollButtonListener)
      document.querySelector('.btn-hold').removeEventListener('click',holdButtonListener)
    }else{
      //give chance to next player
      nextPlayer();
    }
}


function nextPlayer() {
  //give chance to next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //make the roundScore =0
  roundScore = 0;
  previousDice = 0;

  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';

  //change background
  /*document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');*/
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice1').style.display = 'none'
  document.querySelector('.dice2').style.display = 'none'
}


//action: new game
document.querySelector('.btn-new').addEventListener('click',start);


function init() {
   //intialize
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;

   //hide the dice1
   document.querySelector('.dice1').style.display = 'none'
   document.querySelector('.dice2').style.display = 'none'
   document.getElementById('score-0').textContent = '0'
   document.getElementById('score-1').textContent = '0'
   document.getElementById('current-0').textContent = '0'
   document.getElementById('current-1').textContent = '0'
   document.querySelector('.player-0-panel').classList.remove("winner");
   document.querySelector('.player-1-panel').classList.remove("winner");
   document.querySelector('.player-0-panel').classList.remove("active");
   document.querySelector('.player-1-panel').classList.remove("active");
   document.querySelector('.player-0-panel').classList.add("active");
   document.querySelector('.btn-roll').addEventListener('click',rollButtonListener)
   document.querySelector('.btn-hold').addEventListener('click',holdButtonListener)
}


function start(){

     document.querySelector('#name-0').textContent = document.querySelector("input[name='player-1']").value ;
     document.querySelector('#name-1').textContent =document.querySelector("input[name='player-2']").value;

     winningScore = document.querySelector(".winner-score").value;

     document.querySelector('#initial-page').classList.toggle("hidden");
     document.querySelector('#original-game').classList.toggle("hidden")
     init();
}

document.querySelector('.btn-start').addEventListener('click',start);
