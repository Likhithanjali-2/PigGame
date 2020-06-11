var scores , roundScore , activePlayer , dice , previousDice , gamePlaying  ;

init();
//set dice when it rolled
document.querySelector('.btn-roll').addEventListener('click',function(){
  if (!gamePlaying) {//gaurd clause
    return ;
  }
    //random number for dice
    var dice = Math.floor ( Math.random()*6)+1;

    //display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';

    //chaching img based on random number
    diceDOM.src = 'dice-'+dice+'.png';

    if (previousDice == 6 && dice == 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    }else if(dice !== 1){
      //update the roundScore
      roundScore += dice ;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
      previousDice = dice;
    }else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
  if (!gamePlaying) {
    return ;
  }
    //add score to GLOBAL
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    // check winning of game
    var input = document.querySelector(".winner-score").value;
    var winnerScore;
    if (input) {
      winnerScore = input;
    }else{
      winnerScore = 100;
    }
    if (scores[activePlayer] >= winnerScore) {
      document.getElementById('name-'+activePlayer).textContent += " Winner !";
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-'+activePlayer+'-panel').classList.add("winner");
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active");
      gamePlaying = false;
    }else{
      //give chance to next player
      nextPlayer();
    }
});


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

  document.querySelector('.dice').style.display = 'none';
}


//action: new game
document.querySelector('.btn-new').addEventListener('click',init);


function init() {
   //intialize
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   //hide the dice
   document.querySelector('.dice').style.display = 'none'

   document.getElementById('score-0').textContent = '0'
   document.getElementById('score-1').textContent = '0'
   document.getElementById('current-0').textContent = '0'
   document.getElementById('current-1').textContent = '0'

   var name1 = prompt("Enter player1 name ");
   var name2 = prompt("Enter player2 name ")
   document.querySelector('#name-0').textContent = name1 ;
   document.querySelector('#name-1').textContent = name2 ;
   document.querySelector('.player-0-panel').classList.remove("winner");
   document.querySelector('.player-1-panel').classList.remove("winner");
   document.querySelector('.player-0-panel').classList.remove("active");
   document.querySelector('.player-1-panel').classList.remove("active");
   document.querySelector('.player-0-panel').classList.add("active");

}
