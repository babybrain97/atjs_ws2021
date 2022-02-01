// const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

// // function cardSymbol(card) {
// //   switch (card.suit) {
// //     case 'CLUBS':
// //       return '♣️';
// //     case 'SPADES':
// //       return '♠️';
// //     case 'DIAMONDS':
// //       return '♦️';
// //     case 'HEARTS':
// //       return '♥️';
// //     default:
// //       break;
// //   }
// // }

// function countValue(card) {
// //   const colors = {
// //     SPADES: 'black',
// //     HEARTS: 'red',
// //     CLUBS: 'black',
// //     DIAMONDS: 'red',
// //   };

//     const values = {
//         KING: 10,
//         QUEEN: 10,
//         JACK: 10,
//         ACE: 11
//     }

//   const value = card.value;
//   if (value == values.keys){
//       console.log('yess queen')
//   }
//   return value;

// }



// const store = createStore({
//   state() {
//     return {
//       blackjack: {
//         points: 0,
//         deckID: undefined,
//         cards: [],
//         // nextGuess: undefined,
//         // guesses: 0,
//       }
//     };
//   },

//   getters: {
//     cardAPI(state) {
//       return `https://deckofcardsapi.com/api/deck/${state.blackjack.deckID}/draw/?count=1`
//     },
//   },

//   mutations: {
//     incrementPoints(state) {
//       state.guesser.points++;
//     },
//     incrementGuesses(state) {
//       state.guesser.guesses++;
//     },
//     setDeckId(state, deckID) {
//       state.guesser.deckID = deckID;
//     },
//     setNextGuess(state, color) {
//       state.guesser.nextGuess = color;
//     },
//     pushNewCard(state, newCard) {
//       state.guesser.cards.unshift(newCard)
//     }

//   },


//   actions: {
//     setNextGuess({
//       commit
//     }, color) {
//       commit('setNextGuess', color);
//     },
//     async getDeck({
//       commit
//     }) {
//       const {
//         deck_id
//       } = await fetch(API).then((r) => r.json());
//       commit('setDeckId', deck_id)
//     },
//     async drawCard({
//       state,
//       commit,
//       getters
//     }) {
//       const {
//         cards
//       } = await fetch(getters.cardAPI).then((r) => r.json());

//       commit('incrementGuesses');

//       if (validateGuess(cards[0], state.guesser.nextGuess)) {
//         commit('incrementPoints');
//       };

//       const cleanCard = {
//         value: cards[0].value,
//         symbol: cardSymbol(cards[0]),
//         image: cards[0].image,
//       }

//       commit('pushNewCard', cleanCard);
//     },
//   },
// });