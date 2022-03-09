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

// console.log(deck.cards);
// let computer1Cards = [];
// let computer2Cards = [];
// let computer3Cards = [];
// let playerCards = [];

function dealCards(){
    deck.shuffleCards();
    computer1Cards = deck.cards.splice(0, 13);
        // console.log(computer1Cards.length);
    computer2Cards = deck.cards.splice(0, 13);
        // console.log(computer2Cards.length);
    computer3Cards = deck.cards.splice(0, 13);
        // console.log(computer3Cards.length);
    playerCards = deck.cards.splice(0, 13);
    //     console.log(playerCards.length);

    // // while(deck.cards.length){
    // for(let i = 0; i<deck.cards.length; i++);{
    //     computer1Cards.push(deck.cards.slice(i,i+13))
    //     computer2Cards.push(deck.cards.slice(i+14,i+13))
        // console.log(deck.cards.splice(0,13, computer1Cards, computer2Cards, computer3Cards, playerCards));
 };


dealCards();
