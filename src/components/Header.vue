<template>
  <header class="mt-8 mb-12">
    <h1 class="text-4xl">{{title}}</h1>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: ['title'],
  }
</script>