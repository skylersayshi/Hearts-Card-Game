// CONSTRUCTING THE DECK OF CARDS

const suits = ["♠", "♦", "♥", "♣"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

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

function dealCards(){
    deck.shuffleCards();
    computer1Cards = deck.cards.splice(0, 13);
        // console.log(computer1Cards);
        for(let i = 0; i<computer1Cards.length; i++){
        c1Hand.innerHTML += (computer1Cards[i].value + computer1Cards[i].suit)
        }
    computer2Cards = deck.cards.splice(0, 13);
        for(let i = 0; i<computer1Cards.length; i++){
            c2Hand.innerHTML += (computer2Cards[i].value + computer2Cards[i].suit)
        }
    computer3Cards = deck.cards.splice(0, 13);
        for(let i = 0; i<computer1Cards.length; i++){
            c3Hand.innerHTML += (computer3Cards[i].value + computer3Cards[i].suit)
        }
    playerCards = deck.cards.splice(0, 13);
        for(let i = 0; i<computer1Cards.length; i++){
            playerHand.innerHTML += (playerCards[i].value + playerCards[i].suit)
        }
 };

// Cache the DOM and Add Event Listeners

dealButton = document.querySelector('.deal');
c1Hand = document.querySelector('#hand-c1');
c2Hand = document.querySelector('#hand-c2');
c3Hand = document.querySelector('#hand-c3');
playerHand = document.querySelector('#hand-player');

dealButton.addEventListener('click', dealCards);
