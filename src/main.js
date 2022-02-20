import {
  createApp
} from 'vue'
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import './index.css'

import HomePage from './pages/Home.vue'
import PokedexPage from './pages/Pokedex.vue'
import CalculatorPage from './pages/Calculator.vue'
import GuesserPage from './pages/Guesser.vue'
import App from './App.vue'
import {
  createStore
} from 'vuex';
const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

function cardSymbol(card) {
  switch (card.suit) {
    case 'CLUBS':
      return '♣️';
    case 'SPADES':
      return '♠️';
    case 'DIAMONDS':
      return '♦️';
    case 'HEARTS':
      return '♥️';
    default:
      break;
  }
}

function showValue(card) {
  const values = {
    ACE: 11,
    KING: 10,
    QUEEN: 10,
    JACK: 10,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10
  };

  const cardValue = values[card.value];
  console.log(cardValue);
  return cardValue;
}

const store = createStore({
  state: {
      deckID: {
        id: undefined
      }, 
      gameState: {
        running: false,
        gameOver: false,
        gameWon: false,
        gameDraw: false,
        gameFinished: false
      },
      computer: {
        cards: [],
        score: 0,
      },
      player: {
        cards: [],
        score: 0,
      }
  },

  getters: {
    computerCards: function(state) {
      return `https://deckofcardsapi.com/api/deck/${state.deckID.id}/draw/?count=2`
    },
    playerCards: function(state) {
      return `https://deckofcardsapi.com/api/deck/${state.deckID.id}/draw/?count=2`
    },
    drawOneCard: function(state){
      return `https://deckofcardsapi.com/api/deck/${state.deckID.id}/draw/?count=1`
    }
  },

  mutations: {
    changeGameState(state){
      state.gameState.running ? false : state.gameState.running = true

      //reset values 
      state.gameState.gameOver = false;
      state.gameState.gameWon = false;
      state.gameState.gameDraw = false;
      state.gameState.gameFinished = false;

      state.computer.score = 0;
      state.computer.cards = [];

      state.player.score = 0;
      state.player.cards = [];
    },
    setDeckId(state, deckID) {
      state.deckID.id = deckID;
    },
    pushComputerPlayerCards(state, cards) {
      state.computer.cards.push(cards[0])
      state.computer.cards.push(cards[1])
      console.log(state.computer.cards)
    },
    pushInitialPlayerCards(state, cards){
      state.player.cards.push(cards[0])
      state.player.cards.push(cards[1])
    },
    drawCard(state, newCard){
      state.player.cards.unshift(newCard)
    },
    countScoreComputer(state, value){
      state.computer.score = state.computer.score + value;
      console.log('computer score ' + state.computer.score)
    },
    // gameOver(state){
    //   state.computer.score = 0;
    //   state.player.score = 0;
    //   state.player.winner = false;
    //   state.gameState.gameFinished = true;
    // },
    countScore(state, value){
      state.player.score = state.player.score + value;
      console.log('player score ' + state.player.score);
    },
    
  },

  actions: {
    async startGame({
      state,
      commit,
      getters
    }) {
      commit('changeGameState', state);

      const { deck_id } = await fetch(API).then((r) => r.json());
      commit('setDeckId', deck_id);

      const {cards} = await fetch(getters.computerCards).then((r) => r.json());
      const [computerCard1, computerCard2] = [
        {
          value: cards[0].value,
          symbol: cardSymbol(cards[0]),
          image: cards[0].image,
        },
        {
          value: cards[1].value,
          symbol: cardSymbol(cards[1]),
          image: cards[1].image,
        }
      ]
      const computersHand = [computerCard1, computerCard2]
      commit('pushComputerPlayerCards', computersHand)

      let computerScore = showValue(computerCard1) + showValue(computerCard2)
      commit('countScoreComputer', computerScore); 

      const playerCards = await fetch(getters.playerCards).then((r) => r.json());
      const [playerCard1, playerCard2] = [
        {
          value: playerCards.cards[0].value,
          symbol: cardSymbol(cards[0]),
          image: playerCards.cards[0].image,
        },
        {
          value: playerCards.cards[1].value,
          symbol: cardSymbol(cards[1]),
          image: playerCards.cards[1].image,
        },
      ]
      const playersHand = [playerCard1, playerCard2]
      commit('pushInitialPlayerCards', playersHand)

      let initialScore = showValue(playerCard1) + showValue(playerCard2)
      commit('countScore', initialScore);

      if (state.player.score == 21){
        state.gameState.gameWon = true;
        state.gameState.gameFinished = true
      } 
    },
    async hit({
      state,
      commit,
      getters
    }) {
      const newCard = await fetch(getters.drawOneCard).then((r) => r.json());
      
      const card = {
        value: newCard.cards[0].value,
        symbol: cardSymbol(newCard.cards[0]),
        image: newCard.cards[0].image,
      };

      showValue(card);
      commit('drawCard', card);
      commit('countScore', showValue(card)); 

      if (state.player.score > 21) {
        state.gameState.gameOver = true;
        state.gameState.gameFinished = true;
      } else if (state.player.score == 21){
        state.gameState.gameWon = true; 
        state.gameSate.gameFinished = true;
      } 
    },
    stand({
      state,
    }){
      if(state.player.score > state.computer.score){
        state.gameState.gameWon = true;
        state.gameState.gameFinished = true; 
      } else if (state.player.score < state.computer.score){
        state.gameState.gameOver = true;
        state.gameState.gameFinished = true; 
      }
    },
  },
});

const routes = [{
    path: '/',
    component: HomePage
  },
  {
    path: '/pokedex',
    component: PokedexPage
  },
  {
    path: '/calculator',
    component: CalculatorPage
  },
  {
    path: '/guesser',
    component: GuesserPage
  },
]



const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App);
app.component()
app.use(router);
app.use(store);
app.mount('#app');