<template>
    <nav class="flex items-center  h-14 ">
        <router-link class="pr-4" to="/">home</router-link>
        <router-link class="pr-4" to="/pokedex">pokedex</router-link>
        <router-link class="pr-4" to="/calculator">calculator</router-link>
        <router-link class="pr-4" to="/blackjack">blackjack</router-link>
    </nav>
    <router-view />
</template>