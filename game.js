// CONSTRUCTING THE DECK OF CARDS


///add points
///give points
///new hand parameters
///new hand






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
        c1Hand.innerHTML += (computer1Cards[i].value + computer1Cards[i].suit)
    }
    for(let i = 0; i<computer2Cards.length; i++){
        c2Hand.innerHTML += (computer2Cards[i].value + computer2Cards[i].suit)
    }
    for(let i = 0; i<computer3Cards.length; i++){
        c3Hand.innerHTML += (computer3Cards[i].value + computer3Cards[i].suit)
    }
};

////TESTING__________________________
//add delay
var delayInMilliseconds = 1000;

for(let i = 0; i<playerCards.length; i++){
    function createPlayerHand(cards){
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("id", `${i}`)
        card.innerHTML = faceCards(playerCards[i].value) + playerCards[i].suit;
        return card;
    }
    playerHand.appendChild(createPlayerHand(playerCards[i].value + playerCards[i].suit));
}
cardChoice = document.querySelectorAll('.card')
cardChoice.forEach(card => {
    //waits for user input
    card.addEventListener('click', () =>{ //plays user card to the pot
        pot.push(playerCards[card.id]);
        playerPot.innerHTML+=card.innerHTML
        // suitColor(playerPot)
        if(pot.length === 1){
            initialSuit = playerCards[card.id].suit;
        }
        pDeleted.push(playerCards[card.id]);
        card.parentNode.removeChild(card);
        spliceCard(playerCards[card.id], playerCards);
        // finishRound();
        // console.log('PLAYER ARRAY LENGTH: ' + playerCards.length);
        // console.log('C1ARRAYLENGTH: '+ computer1Cards.length)

        //testing
        for(let i = 0; i<playerCards.length; i++){
            document.getElementsByClassName("card")[i].removeAttribute("id");
            document.getElementsByClassName("card")[i].setAttribute("id", `${i}`);
        }
        finishRound()});
    });

dealButton.addEventListener('click', playGame);

function firstRound(){ //no problems
    for(let i = 0; i<computer1Cards.length; i++){
        if(computer1Cards[i].suit === "♣" && computer1Cards[i].value === "2"){
            pot1.innerHTML += computer1Cards[i].value + computer1Cards[i].suit;
            pot.push(computer1Cards[i]);
            c1Deleted.push(computer1Cards[i]);
            initialSuit = computer1Cards[i].suit;
            computer1Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer2Cards.length; i++){
        if(computer2Cards[i].suit === "♣" && computer2Cards[i].value === "2"){
            pot2.innerHTML += computer2Cards[i].value + computer2Cards[i].suit;
            pot.push(computer2Cards[i]);
            c2Deleted.push(computer2Cards[i]);
            initialSuit = computer2Cards[i].suit;
            computer2Cards.splice(i,1);
        }
    }

    for(let i = 0; i<computer3Cards.length; i++){
        if(computer3Cards[i].suit === "♣" && computer3Cards[i].value === "2"){
            pot3.innerHTML += computer3Cards[i].value + computer3Cards[i].suit;
            pot.push(computer3Cards[i]);
            c3Deleted.push(computer3Cards[i]);
            initialSuit = computer3Cards[i].suit;
            computer3Cards.splice(i,1);
        }
    }

    for(let i = 0; i<playerCards.length; i++){
        if(playerCards[i].suit === "♣" && playerCards[i].value === "2"){
            // playerPot.innerHTML += playerCards[i].value + playerCards[i].suit;
            // pot.push(playerCards[i]);
            // pDeleted.push(playerCards[i]);
            // playerCards.splice(i,1);
            initialSuit = playerCards[i].suit;
            alert ('play 2 of clubs')
        }
    }

    finishRound();
    // addPoints();
    // givePoints();
};

function playCardFromHand(){ //MAJOR PROBLEMS

    //testing
    // console.log('playcardfromhand -- function');
    // console.log('computer 1 length:' + computer1Cards.length)
    // console.log('computer 2 length:' + computer2Cards.length)
    // console.log('computer 3 length:' + computer3Cards.length)
    // console.log('player length' + playerCards.length)
    // console.log('pot length:' + pot.length)
        if(playerCards.length<computer1Cards.length && pot.length<4 && computer1Cards.length>=playerCards.length){
            let cardPlayed = getRandomCard(computer1Cards);
            pot.push(cardPlayed);
            pot1.innerHTML += faceCards(cardPlayed.value) + cardPlayed.suit;
            // suitColor(pot1);
            c1Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer1Cards);
            finishRound();
        }
        if(computer1Cards.length<computer2Cards.length && pot.length<4 && computer2Cards.length>=playerCards.length){
            // console.log('condition 2');
            let cardPlayed = getRandomCard(computer2Cards);
            pot.push(cardPlayed); 
            pot2.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            c2Deleted.push(cardPlayed);
            spliceCard(cardPlayed, computer2Cards);
            // computer2Cards.splice(cardPlayed,1);
            // c2Hand.innerHTML -= cardPlayed.value + cardPlayed.suit;
            finishRound();
        }
        if(computer2Cards.length<computer3Cards.length && pot.length<4 && computer3Cards.length>=playerCards.length){
            // console.log('condition 3');
            let cardPlayed = getRandomCard(computer3Cards);
            pot.push(cardPlayed);
            pot3.innerHTML+=faceCards(cardPlayed.value) + cardPlayed.suit;
            c3Deleted.push(cardPlayed);
            // computer3Cards.splice(cardPlayed,1);
            spliceCard(cardPlayed, computer3Cards);
            // c3Hand.innerHTML = computer3Cards.length;
            finishRound();
        }
        // console.log('end of:');
        // console.log('playcardfromhand -- function');
        // console.log('computer 1 length:' + computer1Cards.length)
        // console.log('computer 2 length:' + computer2Cards.length)
        // console.log('computer 3 length:' + computer3Cards.length)
        // console.log('player length' + playerCards.length)
        // console.log('pot length:' + pot.length)
};

function addPoints(){
    // console.log('ADD POINTS====================================')
    // console.log('computer 1 length:' + computer1Cards.length)
    // console.log('computer 2 length:' + computer2Cards.length)
    // console.log('computer 3 length:' + computer3Cards.length)
    // console.log('player length:' + playerCards.length)
    // console.log('pot length:' + pot.length)

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
};

function getRandomCard2(player){
    const randomCard = Math.floor(Math.random() * player.length);
            const item = player[randomCard];
            return item
} // use for new hand only

function givePoints(){ //creates next hand starter and adds points
    // console.log('GIVE POINTS====================================')
    // console.log('computer 1 length:' + computer1Cards.length)
    // console.log('computer 2 length:' + computer2Cards.length)
    // console.log('computer 3 length:' + computer3Cards.length)
    // console.log('player length' + playerCards.length)
    // console.log('pot length:' + pot.length)
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
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c1PointsJS = c1PointsJS + potPoints;
                c1Points.innerHTML = c1PointsJS;
                nextHandStarter = "c1"
                // return nextHandStarter
                // console.log('COMPUTER 1 POINTS: ' + )
            }
            if (potValues[i] == highestCard && c2Deleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c2PointsJS = c2PointsJS + potPoints;
                c2Points.innerHTML = c2PointsJS;
                nextHandStarter = "c2"
                // return nextHandStarter
            }
            if (potValues[i] == highestCard && c3Deleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                c3PointsJS = c3PointsJS + potPoints;
                c3Points.innerHTML = c3PointsJS;
                nextHandStarter = "c3"
                // return nextHandStarter
            }
            if (potValues[i] == highestCard && pDeleted[j] == pot[i]){
                messageBoard.innerHTML = faceCards(pot[i].value) + pot[i].suit + " takes this hand";
                pPointsJS = pPointsJS + potPoints;
                playerPoints.innerHTML = pPointsJS;
                nextHandStarter = "player"
                // return nextHandStarter
            }
        }
    }
};

function nextHand(){ //includes new hand parameters

    // console.log('NEXT HAND====================================')
    // console.log('computer 1 length:' + computer1Cards.length)
    // console.log('computer 2 length:' + computer2Cards.length)
    // console.log('computer 3 length:' + computer3Cards.length)
    // console.log('player length' + playerCards.length)
    // console.log('pot length:' + pot.length)

    if(nextHandStarter === "c1"){
        let cardPlayed1 = getRandomCard2(computer1Cards);
            pot.push(cardPlayed1);
            pot1.innerHTML+=faceCards(cardPlayed1.value) + cardPlayed1.suit;
            c1Deleted.push(cardPlayed1);
            initialSuit = cardPlayed1.suit;
            // computer1Cards.splice(cardPlayed1,1);
            spliceCard(cardPlayed1,computer1Cards);
            // finishRound();
            // console.log('c1 ===========================')
            // console.log(pot);
            // console.log(initialSuit);
            // console.log(computer1Cards.length)
    }
    if(nextHandStarter === "c2"){
        let cardPlayed2 = getRandomCard2(computer2Cards);
            pot.push(cardPlayed2); 
            pot2.innerHTML+=faceCards(cardPlayed2.value) + cardPlayed2.suit;
            c2Deleted.push(cardPlayed2);
            initialSuit = cardPlayed2.suit;
            spliceCard(cardPlayed2,computer2Cards);
            // finishRound();
    }
    if(nextHandStarter === "c3"){
        let cardPlayed3 = getRandomCard2(computer3Cards);
            pot.push(cardPlayed3);
            pot3.innerHTML+=faceCards(cardPlayed3.value) + cardPlayed3.suit;
            c3Deleted.push(cardPlayed3);
            initialSuit = cardPlayed3.suit;
            // computer3Cards.splice(cardPlayed3,1);
            spliceCard(cardPlayed3,computer3Cards);
            // finishRound();
    }
    if(nextHandStarter === "player"){
        
    }
    
    finishRound();
};

function newHandParameters(){
    // console.log('NEW HAND PARAMETERS====================================')
    // console.log('computer 1 length:' + computer1Cards.length)
    // console.log('computer 2 length:' + computer2Cards.length)
    // console.log('computer 3 length:' + computer3Cards.length)
    // console.log('player length' + playerCards.length)
    // console.log('pot length:' + pot.length)

    pointsInPot.innerHTML = 0
    potPoints = 0;
    const empty = arr => arr.length = 0;
    empty(pot);
    // pot.splice(0,4);
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
        // return playCardFromHand()
        playCardFromHand()
    }

    if(pot.length === 4){
    console.log('computer 1 length:' + computer1Cards.length)
    console.log('computer 2 length:' + computer2Cards.length)
    console.log('computer 3 length:' + computer3Cards.length)
    console.log('player length:' + playerCards.length)
        addPoints()
        givePoints()
        newHandParameters()
        nextHand()
        // console.log(playerCards.length)
        // console.log(computer1Cards.length)
        // console.log(computer2Cards.length)
        // console.log(computer3Cards.length)
    }
};

// console.log(pDeleted)
// console.log(c1Deleted)
// console.log(c2Deleted)
// console.log(c3Deleted)

function suitColor(item){
    if(item.innerHTML.charAt(1) === "♣" || item.innerHTML.charAt(1) === "♠"){
        item.style.color = 'black';
    }
    if(item.innerHTML.charAt(1) === "♥" || item.innerHTML.charAt(1) === "♦"){
        item.style.color = 'red';
    }
}