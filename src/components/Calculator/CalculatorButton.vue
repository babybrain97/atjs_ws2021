<template>
    <button class="bg-zinc-700 p-0 text-gray-200 text-xl rounded-full w-16 h-16 m-2 hover:bg-orange-400">{{digit}}</button>
</template>

<script>
    export default {
        name: 'CalculatorButton',
        props: ['digit'],
    }
</script>
