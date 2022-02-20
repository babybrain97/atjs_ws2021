<template>
  <Header title="BlackJack" />
  <div v-if="!gameState.running">
    <button @click="startGame">Start Game</button>
  </div>
  <section v-if="gameState.running">
    <div v-if="gameState.gameOver">
      <h1>You Lost</h1>
    </div>
    <div v-if="gameState.gameWon">
      <h1>You Won!</h1>
    </div>
    <div v-if="gameState.gamedraw">
      <h1>Draw</h1>
    </div>
    <div class="rounded shadow-lg p-4 ">
      <h2 class="font-bold leading-tight text-l text-slate-600">Host</h2>
      <div class="flex flex-wrap">
        <!-- <div class="mr-2 w-28" v-for="card in computer.cards" v-bind:key="card">
            {{ card.value }} of {{ card.symbol }}
           <img :src="card.image" :alt="card.value" />
        </div> -->
        <div v-if="gameState.gameFinished" class="mr-2 w-28">
            {{ computer.cards[0].value }} of {{ computer.cards[0].symbol }}
           <img :src="computer.cards[0].image" :alt="computer.cards[0].value" />
        </div>
        <div class="mr-2 w-28">
            {{ computer.cards[1].value }} of {{ computer.cards[1].symbol }}
           <img :src="computer.cards[1].image" :alt="computer.cards[1].value" />
        </div>
      </div>
    </div>
    <div>
      <h2>Player</h2>
      <p>Values on hand: {{player.score}}</p>
      <div class="flex flex-wrap">
        <div class="mr-2 w-28" v-for="card in player.cards" v-bind:key="card">
            {{ card.value }} of {{ card.symbol }}
           <img :src="card.image" :alt="card.value" />
        </div>
      </div>
    </div>
    <div v-if="!gameState.gameFinished">
      <button class="mr-4" @click="stand">Stand</button>
      <button class="mr-4" @click="hit">Hit</button>
    </div>
    <div v-else>
      <button @click="startGame">new game</button>
    </div>
  </section>
  
</template>

<script>
  import Header from "../components/Header.vue";
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';

  export default {
    name: 'GuesserPage',
    components: {
      Header
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['guesser', 'computer', 'player', 'gameState']),
    },
    methods: {
      // ...mapMutations(['setNextGuess']),
      // ...mapActions(['getDeck', 'drawCard', 'startGame'])
      ...mapMutations([]),
      ...mapActions(['startGame', 'hit', 'stand'])
    },
  }
</script>