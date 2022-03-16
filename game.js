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

deck.shuffleCards();

// CONSTRUCTING PLAYER HANDS
    let computer1Cards = deck.cards.splice(0, 13);
    let computer2Cards = deck.cards.splice(0, 13);
    let computer3Cards = deck.cards.splice(0, 13);
    let playerCards = deck.cards.splice(0, 13);

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
firstRound();
};

dealButton.addEventListener('click', dealCards);

function firstRound(){
    for(let i = 0; i<computer1Cards.length; i++){
        if(computer1Cards[i].suit === "♣" && computer1Cards[i].value === "2"){
            pot1.innerHTML += computer1Cards[i].value + computer1Cards[i].suit;
            pot.push(computer1Cards[i]);
            computer1Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer2Cards.length; i++){
        if(computer2Cards[i].suit === "♣" && computer2Cards[i].value === "2"){
            pot2.innerHTML += computer2Cards[i].value + computer2Cards[i].suit;
            pot.push(computer2Cards[i]);
            computer2Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer3Cards.length; i++){
        if(computer3Cards[i].suit === "♣" && computer3Cards[i].value === "2"){
            pot3.innerHTML += computer3Cards[i].value + computer3Cards[i].suit;
            pot.push(computer3Cards[i]);
            computer3Cards.splice(i,1);
        }
    }

    for(let i = 0; i<playerCards.length; i++){
        if(playerCards[i].suit === "♣" && playerCards[i].value === "2"){
            playerPot.innerHTML += playerCards[i].value + playerCards[i].suit;
            pot.push(playerCards[i]);
            playerCards.splice(i,1);
        }
    }

    playCardFromHand();
    addPoints();
};

function playCardFromHand(){
    while(pot.length<4) {
        if(computer1Cards.length<computer2Cards.length){
            let cardPlayed = getRandomCard(computer2Cards);
            pot.push(cardPlayed); 
            pot2.innerHTML+=cardPlayed.value + cardPlayed.suit;
            computer2Cards.splice(cardPlayed,1);
            // c2Hand.innerHTML = computer2Cards.length;
            console.log(pot);
        }
        if(computer2Cards.length<computer3Cards.length){
            let cardPlayed = getRandomCard(computer3Cards);
            pot.push(cardPlayed);
            pot3.innerHTML+=cardPlayed.value + cardPlayed.suit;
            computer3Cards.splice(cardPlayed,1);
            // c3Hand.innerHTML = computer3Cards.length;
        }
        if(computer3Cards.length<playerCards.length){
            let cardPlayed = getRandomCard(playerCards);
            pot.push(cardPlayed);
            playerPot.innerHTML+=cardPlayed.value + cardPlayed.suit;
            playerCards.splice(cardPlayed,1);
            // playerHand.innerHTML = playerCards.length;
            //to be modified to allow player to play game

        }
        if(playerCards.length<computer1Cards.length){
            let cardPlayed = getRandomCard(computer1Cards);
            pot.push(cardPlayed);
            pot1.innerHTML+=cardPlayed.value + cardPlayed.suit;
            computer1Cards.splice(cardPlayed,1);
            // c1Hand.innerHTML = computer1Cards.length;
        }
    }
};

function addPoints(){ //needs work
    for(let i = 0; i<pot.length; i++){
        if(pot[i].value === "♥"){
            potPoints++;
            pointsInPot.innerHTML = potPoints;
        }
    }
    console.log(potPoints);

};

function getRandomCard(player){
    const randomCard = Math.floor(Math.random() * player.length);
    const item = player[randomCard];
    // return item.value + item.suit;
    return item;
};