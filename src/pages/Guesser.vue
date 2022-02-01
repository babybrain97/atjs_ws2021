<template>
  <Header title="The great guesser game!" />

  <button @click="getDeck">Get a new Deck</button>

  <div v-if="guesser.deckID">
    <button @click="setNextGuess('red')">Guess Red</button>
    <button @click="setNextGuess('black')">Guess Black</button>
    <br />
    <button v-if="guesser.nextGuess" @click="drawCard">Draw a card</button>

    <h1>Guesses: {{ guesser.guesses }}</h1>
    <h1>Points: {{ guesser.points }}</h1>
    <h2>Your next guess is: {{ guesser.nextGuess }}</h2>

    <section class="flex flex-wrap">
      <div class="mr-2" v-for="card in guesser.cards" v-bind:key="card">
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
    name: 'GuesserPage',
    components: {
      Header
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(['guesser']),
      // ...mapState(['points', 'deckID', 'cards', 'nextGuess', 'guesses',]),
    },
    methods: {
      ...mapMutations(['setNextGuess']),
      ...mapActions(['getDeck', 'drawCard'])
    },
  }
</script>