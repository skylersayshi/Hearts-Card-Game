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
c1Points = document.querySelector('.c1-points')
c2Points = document.querySelector('.c2-points')
c3Points = document.querySelector('.c3-points')
playerPoints = document.querySelector('.player-points')
messageBoard = document.querySelector('.message-board')

deck.shuffleCards();

c1PointsJS = 0
c2PointsJS = 0
c3PointsJS = 0
pPointsJS = 0

// CONSTRUCTING PLAYER HANDS
    let computer1Cards = deck.cards.splice(0, 13);
    let computer2Cards = deck.cards.splice(0, 13);
    let computer3Cards = deck.cards.splice(0, 13);
    let playerCards = deck.cards.splice(0, 13);
// ALREADY PLAYED CARDS BY EACH PLAYER
    let c1Deleted = [];
    let c2Deleted = [];
    let c3Deleted = [];
    let pDeleted = [];
    let potValues = [];
// WHO STARTS NEXT HAND
    let nextHandStarter = "";
    let initialSuit = ""

function dealCards(){
    for(let i = 0; i<computer1Cards.length; i++){
        c1Hand.innerHTML += (computer1Cards[i].value + computer1Cards[i].suit)
    }
    for(let i = 0; i<computer2Cards.length; i++){
        c2Hand.innerHTML += (computer2Cards[i].value + computer2Cards[i].suit)
    }
    for(let i = 0; i<computer3Cards.length; i++){
        c3Hand.innerHTML += (computer3Cards[i].value + computer3Cards[i].suit)
    }
    for(let i = 0; i<playerCards.length; i++){
        playerCards.sort((a,b)=> (a.suit.localeCompare(b.suit) || a.value - b.value ));
        function createPlayerHand(cards){
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = playerCards[i].value + playerCards[i].suit;
            return card;
        }
        playerHand.appendChild(createPlayerHand());
    }
// firstRound();
};

dealButton.addEventListener('click', playGame);

function firstRound(){
    for(let i = 0; i<computer1Cards.length; i++){
        if(computer1Cards[i].suit === "♣" && computer1Cards[i].value === "2"){
            pot1.innerHTML += computer1Cards[i].value + computer1Cards[i].suit;
            pot.push(computer1Cards[i]);
            c1Deleted.push(computer1Cards[i]);
            computer1Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer2Cards.length; i++){
        if(computer2Cards[i].suit === "♣" && computer2Cards[i].value === "2"){
            pot2.innerHTML += computer2Cards[i].value + computer2Cards[i].suit;
            pot.push(computer2Cards[i]);
            c2Deleted.push(computer1Cards[i]);
            computer2Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer3Cards.length; i++){
        if(computer3Cards[i].suit === "♣" && computer3Cards[i].value === "2"){
            pot3.innerHTML += computer3Cards[i].value + computer3Cards[i].suit;
            pot.push(computer3Cards[i]);
            c3Deleted.push(computer1Cards[i]);
            computer3Cards.splice(i,1);
        }
    }

    for(let i = 0; i<playerCards.length; i++){
        if(playerCards[i].suit === "♣" && playerCards[i].value === "2"){
            playerPot.innerHTML += playerCards[i].value + playerCards[i].suit;
            pot.push(playerCards[i]);
            pDeleted.push(computer1Cards[i]);
            playerCards.splice(i,1);
        }
    }

    playCardFromHand();
    addPoints();
    givePoints();
};

function playCardFromHand(){
    while(pot.length<4) {
        if(computer1Cards.length<computer2Cards.length){
            let cardPlayed = getRandomCard(computer2Cards);
            pot.push(cardPlayed); 
            pot2.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            c2Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer2Cards);
            // computer2Cards.splice(cardPlayed,1);
            // c2Hand.innerHTML -= cardPlayed.value + cardPlayed.suit;
        }
        if(computer2Cards.length<computer3Cards.length){
            let cardPlayed = getRandomCard(computer3Cards);
            pot.push(cardPlayed);
            pot3.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            c3Deleted.push(cardPlayed);
            // computer3Cards.splice(cardPlayed,1);
            spliceCard(cardPlayed, computer3Cards)
            // c3Hand.innerHTML = computer3Cards.length;
        }
        if(computer3Cards.length<playerCards.length){
            let cardPlayed = getRandomCard(playerCards);
            pot.push(cardPlayed);
            playerPot.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            pDeleted.push(cardPlayed);
            // playerCards.splice(cardPlayed,1);
            spliceCard(cardPlayed, playerCards);
            // playerHand.innerHTML = playerCards.length;
            //to be modified to allow player to play game

        }
        if(playerCards.length<computer1Cards.length){
            let cardPlayed = getRandomCard(computer1Cards);
            pot.push(cardPlayed);
            pot1.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            c1Deleted.push(cardPlayed);
            // computer1Cards.splice(cardPlayed,1);
            spliceCard(cardPlayed, computer1Cards);
            // c1Hand.innerHTML = computer1Cards.length;
        }
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
    const randomCard = Math.floor(Math.random() * player.length);
    const item = player[randomCard];
    // return item.value + item.suit;
    return item;
};

function givePoints(){
    for(let i = 0; i<pot.length; i++){
        potValues.push(pot[i].value)
    }
        highestCard = Math.max(...potValues)
    for(let i = 0; i<potValues.length; i++){
        for(let j = 0; j<c1Deleted.length; j++){
            if (potValues[i] == highestCard && c1Deleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c1PointsJS = c1PointsJS + potPoints;
                c1Points.innerHTML = c1PointsJS;
                nextHandStarter = "c1"
            }
            if (potValues[i] == highestCard && c2Deleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c2PointsJS = c2PointsJS + potPoints;
                c2Points.innerHTML = c2PointsJS;
                nextHandStarter = "c2"
            }
            if (potValues[i] == highestCard && c3Deleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c3PointsJS = c3PointsJS + potPoints;
                c3Points.innerHTML = c3PointsJS;
                nextHandStarter = "c3"
            }
            if (potValues[i] == highestCard && pDeleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                pPointsJS = pPointsJS + potPoints;
                playerPoints.innerHTML = pPointsJS;
                nextHandStarter = "player"
            }
        }
    }
};

function nextHand(){
    if(nextHandStarter === "c1"){
        let cardPlayed1 = getRandomCard(computer1Cards);
            pot.push(cardPlayed1);
            pot1.innerHTML+=faceCards(cardPlayed1.value) + cardPlayed1.suit;
            c1Deleted.push(cardPlayed1);
            computer1Cards.splice(cardPlayed1,1);
            spliceCard(cardPlayed1,computer1Cards);
    }
    if(nextHandStarter === "c2"){
        let cardPlayed2 = getRandomCard(computer2Cards);
            pot.push(cardPlayed2); 
            pot2.innerHTML+=faceCards(cardPlayed2.value) + cardPlayed2.suit;
            c2Deleted.push(cardPlayed2);
            computer2Cards.splice(cardPlayed2,1);
            spliceCard(cardPlayed2,computer2Cards);
    }
    if(nextHandStarter === "c3"){
        let cardPlayed3 = getRandomCard(computer3Cards);
            pot.push(cardPlayed3);
            pot3.innerHTML+=faceCards(cardPlayed3.value) + cardPlayed3.suit;
            c3Deleted.push(cardPlayed3);
            // computer3Cards.splice(cardPlayed3,1);
            spliceCard(cardPlayed3,computer3Cards);
    }
    if(nextHandStarter === "player"){
        let cardPlayed4 = getRandomCard(playerCards);
            pot.push(cardPlayed4);
            playerPot.innerHTML+=faceCards(cardPlayed4.value) + cardPlayed4.suit;
            pDeleted.push(cardPlayed4);
            // playerCards.splice(cardPlayed4,1);
            spliceCard(cardPlayed4,playerCards);
    }

    playCardFromHand();
    addPoints();
    givePoints();
};

function newHandParameters(){
    pointsInPot.innerHTML = 0
    potPoints = 0;
    pot.splice(0,4);
    potValues.splice(0,4);
    c1Deleted.splice(0,1);
    c2Deleted.splice(0,1);
    c3Deleted.splice(0,1);
    pDeleted.splice(0,1);
};

function playGame(){
    dealCards();
    firstRound();
    newHandParameters();
    nextHand();
    newHandParameters();
    nextHand();
    newHandParameters();
    nextHand();
    // newHandParameters();
    // nextHand();
    // newHandParameters();
    // nextHand();
    // newHandParameters();
    // nextHand();
    // newHandParameters();
    // nextHand();
    // newHandParameters();
    // nextHand();
    // newHandParameters();
    // nextHand();

    
    console.log(pot)
    console.log(playerCards.length)
    console.log(playerCards)
    console.log(computer3Cards.length)
    console.log(computer3Cards)
    // nextHand();
    
    // console.log(computer1Cards.length)
    // console.log(computer2Cards.length)
    // console.log(computer3Cards.length)
    // console.log(playerCards.length)
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

function startingSuit(){

};

function spliceCard(card, array){
    let index = array.indexOf(card)
    if (index !== -1) {
        array.splice(index, 1);
      }
};