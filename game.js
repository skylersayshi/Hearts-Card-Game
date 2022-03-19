// CONSTRUCTING THE DECK OF CARDS


const suits = ["♣", "♥", "♠" , "♦"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

class Deck {
    constructor(cards = makeNewDeck()) {
        this.cards = cards
    }
    shuffleCards(){
        for(let i = this.cards.length - 1; i > 0; i--){
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
    
        }
    };
};

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
};

function makeNewDeck(){
    return suits.flatMap(suit => {
        return values.map(value => {
            return new Card(suit, value)
        })
    })
};

// DEALING THE CARDS

const deck = new Deck();
const pot = [];
let potPoints = 0;

dealButton = document.querySelector('.deal');
c1Hand = document.querySelector('#hand-c1');
c2Hand = document.querySelector('#hand-c2');
c3Hand = document.querySelector('#hand-c3');
playerHand = document.querySelector('#hand-player');
pot1 = document.querySelector('.pot1');
pot2 = document.querySelector('.pot2');
pot3 = document.querySelector('.pot3');
playerPot = document.querySelector('.pot-player');
pointsInPot = document.querySelector('.pot-points');
c1Points = document.querySelector('.c1-points');
c2Points = document.querySelector('.c2-points');
c3Points = document.querySelector('.c3-points');
playerPoints = document.querySelector('.player-points');
messageBoard = document.querySelector('.message-board');
history1 = document.querySelector('.history1');
history2 = document.querySelector('.history2');
history3 = document.querySelector('.history3');

cardChoice = document.querySelectorAll('.card')

deck.shuffleCards();

c1PointsJS = 0;
c2PointsJS = 0;
c3PointsJS = 0;
pPointsJS = 0;

// CONSTRUCTING PLAYER HANDS
    let computer1Cards = deck.cards.splice(0, 13);
    let computer2Cards = deck.cards.splice(0, 13);
    let computer3Cards = deck.cards.splice(0, 13);
    let playerCards = deck.cards.splice(0, 13).sort((a,b)=> (a.suit.localeCompare(b.suit) || a.value - b.value ));
// ALREADY PLAYED CARDS BY EACH PLAYER
    let c1Deleted = [];
    let c2Deleted = [];
    let c3Deleted = [];
    let pDeleted = [];
    let potValues = [];
// WHO STARTS NEXT HAND
    let nextHandStarter = "";
    let initialSuit;
    let playerSuit;

function dealCards(){
    for(let i = 0; i<computer1Cards.length; i++){
        c1Hand.innerHTML += "__"
    }
    for(let i = 0; i<computer2Cards.length; i++){
        c2Hand.innerHTML += "__"
    }
    for(let i = 0; i<computer3Cards.length; i++){
        c3Hand.innerHTML += "__"
    }
};

//add delay
var delayInMilliseconds = 500;
var delay3Seconds = 3000;

for(let i = 0; i<playerCards.length; i++){
    function createPlayerHand(cards){
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("id", `${i}`)
        card.innerHTML = faceCards(playerCards[i].value) + playerCards[i].suit;
        suitColor(card)
        return card;
    }
    playerHand.appendChild(createPlayerHand(playerCards[i].value + playerCards[i].suit));
}
cardChoice = document.querySelectorAll('.card')
cardChoice.forEach(card => {
    //waits for user input
    card.addEventListener('click', () =>{ //plays user card to the pot
        pot.push(playerCards[card.id]);
        playerPot.innerHTML=card.innerHTML
        suitColor(playerPot)
        if(pot.length === 1){
            initialSuit = playerCards[card.id].suit;
        }
        pDeleted.push(playerCards[card.id]);
        card.parentNode.removeChild(card);
        spliceCard(playerCards[card.id], playerCards);
    
        for(let i = 0; i<playerCards.length; i++){
            document.getElementsByClassName("card")[i].removeAttribute("id");
            document.getElementsByClassName("card")[i].setAttribute("id", `${i}`);
        }
        finishRound()});
    });

dealButton.addEventListener('click', playGame);

function firstRound(){
    for(let i = 0; i<computer1Cards.length; i++){
        if(computer1Cards[i].suit === "♣" && computer1Cards[i].value === "2"){
            pot1.innerHTML += computer1Cards[i].value + computer1Cards[i].suit;
            suitColor(pot1)
            pot.push(computer1Cards[i]);
            c1Deleted.push(computer1Cards[i]);
            initialSuit = computer1Cards[i].suit;
            computer1Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer2Cards.length; i++){
        if(computer2Cards[i].suit === "♣" && computer2Cards[i].value === "2"){
            pot2.innerHTML += computer2Cards[i].value + computer2Cards[i].suit;
            suitColor(pot2)
            pot.push(computer2Cards[i]);
            c2Deleted.push(computer2Cards[i]);
            initialSuit = computer2Cards[i].suit;
            computer2Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer3Cards.length; i++){
        if(computer3Cards[i].suit === "♣" && computer3Cards[i].value === "2"){
            pot3.innerHTML += computer3Cards[i].value + computer3Cards[i].suit;
            suitColor(pot3)
            pot.push(computer3Cards[i]);
            c3Deleted.push(computer3Cards[i]);
            initialSuit = computer3Cards[i].suit;
            computer3Cards.splice(i,1);
        }
    }

    for(let i = 0; i<playerCards.length; i++){
        if(playerCards[i].suit === "♣" && playerCards[i].value === "2"){
            initialSuit = playerCards[i].suit;
            alert ('play 2 of clubs')
        }
    }

    finishRound();
};

function playCardFromHand(){
        if(playerCards.length<computer1Cards.length && pot.length<4 && computer1Cards.length>=playerCards.length){
            let cardPlayed = getRandomCard(computer1Cards);
            pot.push(cardPlayed);
            pot1.innerHTML += faceCards(cardPlayed.value) + cardPlayed.suit
            suitColor(pot1)
            c1Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer1Cards);
            finishRound();
        }
        if(computer1Cards.length<computer2Cards.length && pot.length<4 && computer2Cards.length>=playerCards.length){
            let cardPlayed = getRandomCard(computer2Cards);
            pot.push(cardPlayed); 
            pot2.innerHTML += faceCards(cardPlayed.value) + cardPlayed.suit
            suitColor(pot2)
            c2Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer2Cards);
            // computer2Cards.splice(cardPlayed,1);
            // c2Hand.innerHTML -= cardPlayed.value + cardPlayed.suit;
            finishRound();
        }
        if(computer2Cards.length<computer3Cards.length && pot.length<4 && computer3Cards.length>=playerCards.length){
            let cardPlayed = getRandomCard(computer3Cards);
            pot.push(cardPlayed);
            pot3.innerHTML += faceCards(cardPlayed.value) + cardPlayed.suit
            suitColor(pot3)
            c3Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer3Cards);
            finishRound();
        }
};

function addPoints(){
    for(let i = 0; i<pot.length; i++){
        if(pot[i].suit === "♥"){
            potPoints++;
            pointsInPot.innerHTML ++;
        }
    }
};

function getRandomCard(player){
    let arrInitialSuit = [];
    for(let i = 0; i<player.length; i++){
        if(player[i].suit === initialSuit){
            arrInitialSuit.push(player[i]) 
        }
    };

        if(arrInitialSuit.length > 0){
            const randomCardInSuit = Math.floor(Math.random() * arrInitialSuit.length);
            const itemInSuit = arrInitialSuit[randomCardInSuit];
            return itemInSuit;
        }
        if(arrInitialSuit<1) {
            const randomCard = Math.floor(Math.random() * player.length);
            const item = player[randomCard];
            return item  
        }
    }

function getRandomCard2(player){
    const randomCard = Math.floor(Math.random() * player.length);
            const item = player[randomCard];
            return item
} // use for new hand only

function givePoints(){ //creates next hand starter and adds points
    for(let i = 0; i<pot.length; i++){
        if(pot[i].suit === initialSuit && pot.length === 4){
            potValues.push(pot[i].value)
        } 
        if(pot[i].suit != initialSuit){
            potValues.push('0')
        }
    }

        const highestCard = Math.max(...potValues)
    for(let i = 0; i<potValues.length; i++){
        for(let j = 0; j<c1Deleted.length; j++){
            if (potValues[i] == highestCard && c1Deleted[j] == pot[i]){
                messageBoard.innerHTML = "Computer 1 takes this hand with " + faceCards(pot[i].value) + pot[i].suit;
                c1PointsJS = c1PointsJS + potPoints;
                c1Points.innerHTML = c1PointsJS;
                nextHandStarter = "c1"
            }
            if (potValues[i] == highestCard && c2Deleted[j] == pot[i]){
                messageBoard.innerHTML = "Computer 2 takes this hand with " + faceCards(pot[i].value) + pot[i].suit;
                c2PointsJS = c2PointsJS + potPoints;
                c2Points.innerHTML = c2PointsJS;
                nextHandStarter = "c2"
            }
            if (potValues[i] == highestCard && c3Deleted[j] == pot[i]){
                messageBoard.innerHTML = "Computer 3 takes this hand with " + faceCards(pot[i].value) + pot[i].suit;;
                c3PointsJS = c3PointsJS + potPoints;
                c3Points.innerHTML = c3PointsJS;
                nextHandStarter = "c3"
            }
            if (potValues[i] == highestCard && pDeleted[j] == pot[i]){
                messageBoard.innerHTML = "You took this hand with " + faceCards(pot[i].value) + pot[i].suit + ". PLAY NEXT CARD";;
                pPointsJS = pPointsJS + potPoints;
                playerPoints.innerHTML = pPointsJS;
                nextHandStarter = "player"
            }
        }
    }
};

function nextHand(){ //includes new hand parameters
    if(nextHandStarter === "c1"){
        let cardPlayed1 = getRandomCard2(computer1Cards);
            pot.push(cardPlayed1);
            pot1.innerHTML+=faceCards(cardPlayed1.value) + cardPlayed1.suit
            suitColor(pot1)
            c1Deleted.push(cardPlayed1);
            initialSuit = cardPlayed1.suit;
            spliceCard(cardPlayed1,computer1Cards);
    }
    if(nextHandStarter === "c2"){
        let cardPlayed2 = getRandomCard2(computer2Cards);
            pot.push(cardPlayed2); 
            pot2.innerHTML+=faceCards(cardPlayed2.value) + cardPlayed2.suit
            suitColor(pot2)
            c2Deleted.push(cardPlayed2);
            initialSuit = cardPlayed2.suit;
            spliceCard(cardPlayed2,computer2Cards);
    }
    if(nextHandStarter === "c3"){
        let cardPlayed3 = getRandomCard2(computer3Cards);
            pot.push(cardPlayed3);
            pot3.innerHTML+=faceCards(cardPlayed3.value) + cardPlayed3.suit
            suitColor(pot3)
            c3Deleted.push(cardPlayed3);
            initialSuit = cardPlayed3.suit;
            spliceCard(cardPlayed3,computer3Cards);
    }
    if(nextHandStarter === "player"){
        
    }
    
    finishRound();
};

function newHandParameters(){

    pointsInPot.innerHTML = 0
    potPoints = 0;
    const empty = arr => arr.length = 0;
    empty(pot);
    potValues.splice(0,4);
    c1Deleted.splice(0,1);
    c2Deleted.splice(0,1);
    c3Deleted.splice(0,1);
    pDeleted.splice(0,1);
};

function playGame(){
    dealCards();
    firstRound();
};

function faceCards(value){
    
    if(value === "11"){
        return "J"
    }
    if(value === "12"){
        return "Q"
    }
    if(value === "13"){
        return "K"
    }
    if(value === "14"){
        return "A"
    }
    else{return value}

};

function spliceCard(card, array){
    let index = array.indexOf(card)
    if (index !== -1) {
        array.splice(index, 1);
        return array
      }
};

function finishRound(){
    if(pot.length < 4){
        playCardFromHand()
    }

    if(pot.length === 4){
    console.log('computer 1 length:' + computer1Cards.length)
    console.log('computer 2 length:' + computer2Cards.length)
    console.log('computer 3 length:' + computer3Cards.length)
    console.log('player length:' + playerCards.length)
        addPoints()
        givePoints()
        history1.innerHTML = pot1.innerHTML
        suitColor(history1)
        history2.innerHTML = pot2.innerHTML
        suitColor(history2)
        history3.innerHTML = pot3.innerHTML
        suitColor(history3)
        
        pot1.innerHTML = "";
        pot2.innerHTML = "";
        pot3.innerHTML = "";
        playerPot.innerHTML = "";

        newHandParameters()
        nextHand()
    }
};

function suitColor(item){
    if(item.innerHTML.charAt(1) === "♣" || item.innerHTML.charAt(1) === "♠"){
        item.style.color = 'black';
    }
    if(item.innerHTML.charAt(1) === "♥" || item.innerHTML.charAt(1) === "♦"){
        item.style.color = 'red';
    }
}

function winGame(){
    if(playerCards.length === 0 && computer1Cards.length === 0 && computer2Cards.length === 0 && computer3Cards.length === 0){
    console.log('game over');
    }
}
winGame();