<template>
    <Header title="Blackjack" />
    <!-- <div class="flex flex-wrap">
        <button class="mr-4">stand</button>
        <button @click=getDeck>hit</button>
    </div> -->
    <!-- <button @click="getDeck">Get a new Deck</button> -->
    <button @click="startGame">Start Game</button>
    <div v-if="gameState.deckID">
    <button @click="stand()">Stand</button>
    <button @click="hit()">Hit</button>
    <br />
    <button v-if="gameState.score" @click="drawCard">Draw a card</button>

    <h1>Guesses: {{ gameState.guesses }}</h1>
    <h1>Points: {{ gameState.points }}</h1>
    <!-- <h2>Your next guess is: {{ guesser.nextGuess }}</h2> -->

    <section class="flex flex-wrap">
      <div class="mr-2" v-for="card in gameState.cards" v-bind:key="card">
        {{ card.value }} of {{ card.symbol }}
        <img :src="card.image" :alt="card.value" />
      </div>
    </section>

  </div>
  <div v-else>Please draw a new deck!</div>

</template>  

<script>
  import Header from "../components/Header.vue";
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';

  export default {
    name: 'BlackjackPage',
    components: {
      Header
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['gameState']),
    },
    methods: {
    //   ...mapMutations(['startGame']),
    //   ...mapActions(['getDeck', 'drawCard'])
    },
  }
</script>