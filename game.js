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
    computer2Cards = deck.cards.splice(0, 13);
    computer3Cards = deck.cards.splice(0, 13);
    playerCards = deck.cards.splice(0, 13);
 };

dealCards();
console.log(computer1Cards.length);
