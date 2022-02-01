<template>
    <div class="bg-orange-400 p-2 m-2 mb-6 text-zinc-700 rounded-lg glow">
        <h2 class="text-4xl">{{number}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Display',
        props: ['number'],
    }
</script>

<style scoped>
.glow {
      
    box-shadow: 0px 0px 12px 4px rgba(251,146,60,0.7);
}
</style>