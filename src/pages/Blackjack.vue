<template>
  <Header title="BlackJack" />
  <div v-if="!gameState.running">
    <button @click="startGame">Start Game</button>
  </div>
  <section class="p-4 mr-4 w-fit text-center bg-zinc-900 rounded-xl shadow-xl" v-if="gameState.running">
    <div class="flex flex-wrap">
      <div class="rounded shadow-xl p-4 mr-4">
        <div class="bg-orange-400 p-2 mb-6 text-zinc-800 rounded-lg glow text-left">
          <p class="font-medium leading-tight">Host</p>
        </div>
      <div class="flex flex-wrap">
        <div v-if="gameState.gameFinished" class="mr-4 w-28">
           <img :src="computer.cards[0].image" :alt="computer.cards[0].value" />
        </div>
        <div v-else class="mr-4 w-28 bg-amber-50 rounded-md">
           <p class="text-xl">?</p>
        </div>
        <div class="mr-4 w-28">
           <img :src="computer.cards[1].image" :alt="computer.cards[1].value" />
        </div>
      </div>
    </div>
    <div class="rounded p-4 mr-4 ">
      <div class="flex justify-between items-baseline bg-orange-400 p-2 mb-6 text-zinc-800 rounded-lg glow text-left">
        <p class="font-medium leading-tight ">Player</p>
        <p class="font-medium">On hand: {{player.score}}</p>
      </div>
      <div class="flex flex-wrap">
        <div class="mr-4 w-28" v-for="card in player.cards" v-bind:key="card">
           <img :src="card.image" :alt="card.value" />
        </div>
      </div>
    </div>
    </div>
    <div v-if="gameState.gameOver" class="m-6">
      <h1 class="text-zinc-400">You Lost</h1>
    </div>
    <div v-if="gameState.gameWon" class="m-6">
      <h1 class="text-zinc-400">You Won!</h1>
    </div>
    <div v-if="gameState.gamedraw" class="m-6">
      <h1 class="text-zinc-400">Draw</h1>
    </div>
    <div v-if="!gameState.gameFinished" >
      <button class="mr-4 bg-orange-600 text-gray-800 w-32" @click="stand">Stand</button>
      <button class="mr-4 bg-orange-600 text-gray-800 w-32" @click="hit">Hit</button>
    </div>
    <div v-else>
      <button class="mr-4 bg-orange-600 text-gray-800 w-38" @click="startGame">new game</button>
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
    name: 'BlackJackPage',
    components: {
      Header
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['computer', 'player', 'gameState']),
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['startGame', 'hit', 'stand'])
    },
  }
</script>

<style scoped>
.glow {
    box-shadow: 0px 0px 12px 4px rgba(251,146,60,0.7);
}
</style>