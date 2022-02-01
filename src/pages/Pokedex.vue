<template>
    <Header title="Pokedex" />
    <main>
        <button @click="catchAll">Catch em All</button>
        <div class="flex flex-wrap" @load="mounted">
            <Pokecard v-for="(pokeman, index) in pokemon" v-bind:key="index" :name="pokeman.name"
                :imgsrc="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`"
                :alt="pokeman.name" />
        </div>
    </main>
</template>

<script>
    const POKEMON_API = "https://pokeapi.co/api/v2/pokemon?limit=151";

    import Pokecard from "../components/PokeCard.vue";
    import Header from "../components/Header.vue";

    export default {
        name: 'PokedexPage',
        components: {
            Pokecard,
            Header
        },
        data() {
            return {
                pokemon: []
            };
        },

        methods: {
            async catchAll() {
                const result = await fetch(POKEMON_API)
                const data = await result.json();
                this.pokemon = data.results
            }
        }
    };
</script>