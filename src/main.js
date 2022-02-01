import {
  createApp
} from 'vue'
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import './index.css'

//game logic
// import Blackjack from './blackjack.js'

import HomePage from './pages/Home.vue'
import PokedexPage from './pages/Pokedex.vue'
import CalculatorPage from './pages/Calculator.vue'
import GuesserPage from './pages/Guesser.vue'
import BlackJackPage from './pages/Blackjack.vue' 
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

function validateGuess(card, nextGuess) {
  const colors = {
    SPADES: 'black',
    HEARTS: 'red',
    CLUBS: 'black',
    DIAMONDS: 'red',
  };

  const cardColor = colors[card.suit];
  return cardColor == nextGuess;

}

const moduleA = createStore({
  state() {
    return {
      guesser: {
        points: 0,
        deckID: undefined,
        cards: [],
        nextGuess: undefined,
        guesses: 0,
      }
    };
  },

  getters: {
    cardAPI(state) {
      return `https://deckofcardsapi.com/api/deck/${state.guesser.deckID}/draw/?count=2`
    },
  },

  mutations: {
    incrementPoints(state) {
      state.guesser.points++;
    },
    incrementGuesses(state) {
      state.guesser.guesses++;
    },
    setDeckId(state, deckID) {
      state.guesser.deckID = deckID;
    },
    setNextGuess(state, color) {
      state.guesser.nextGuess = color;
    },
    pushNewCard(state, newCard) {
      state.guesser.cards.unshift(newCard)
    }

  },


  actions: {
    startGame({
      commit
    }, color) {
      commit('startGame', color);
    },
    setNextGuess({
      commit
    }, color) {
      commit('setNextGuess', color);
    },
    async getDeck({
      commit
    }) {
      const {
        deck_id
      } = await fetch(API).then((r) => r.json());
      commit('setDeckId', deck_id)
    },
    async drawCard({
      state,
      commit,
      getters
    }) {
      const {
        cards
      } = await fetch(getters.cardAPI).then((r) => r.json());

      commit('incrementGuesses');

      if (validateGuess(cards[0], state.guesser.nextGuess)) {
        commit('incrementPoints');
      };

      const cleanCard = {
        value: cards[0].value,
        symbol: cardSymbol(cards[0]),
        image: cards[0].image,
      }

      commit('pushNewCard', cleanCard);
    },
  },
});

const moduleB = createStore({
  // state: {
  //   gameState: {
  //     score: 0,
  //     deckID: undefined,
  //     cards: [],
  //     currentValue: undefined
  //     // nextGuess: undefined,
  //     // guesses: 0,
  //   }
  // }
  state() {
    return {
      gameState: {
        score: 0,
        deckID: undefined,
        cards: [],
        currentValue: undefined,
        // guesses: 0,
      }
    };
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
  {
    path: '/blackjack',
    component: BlackJackPage
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App);
app.component()
app.use(router);
app.use(moduleA, moduleB);
app.mount('#app');