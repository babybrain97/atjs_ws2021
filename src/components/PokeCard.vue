<template>
  <article class="w-40 shadow-md rounded-md bg-gray-50 m-2 p-4 text-center  hover:shadow-xl">
    <h2 class="font-semibold text-slate-800">{{name}}</h2>
    <img v-bind:src="imgsrc" v-bind:alt="alt"/>
  </article>
</template>

<script>
  export default {
    name: 'Pokecard',
    props: ['name', 'imgsrc', 'alt'],
  }
</script>

