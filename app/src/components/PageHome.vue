
<script setup>
/* eslint-disable */
import { ref, watch } from 'vue'
// import TweetForm from '@/components/TweetForm'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import axios from 'axios'

const {publicKey} = useWallet()
let degen = ref({})

watch(publicKey, (newValue, oldValue) => {
    axios.get(`http://localhost:3000/api/degen/${newValue.toBase58()}`).then(e => {
        console.log(e)
        degen.value = e.data
        console.log(degen)
    })
});
</script>

<template>
     <div v-if="publicKey" class="px-8 py-4 border-b bg-gray-50">
        {{publicKey.toBase58()}} {{degen.name}}
    </div>
   <img src="https://media.giphy.com/media/xkGkrAIbJqAtKlsZI5/giphy.gif" id="snow">
    <div id="container">
        <p id="welcome">Welcome to Rugged Santa degen</p>
        <p>The concept is simple, every participant will be randomly paired with another participant to become their Rugged Santa</p>
        <p>Each rugged santa will gift his most prestigious rugged nft to his fellow degen</p>
        <wallet-multi-button></wallet-multi-button>
    </div>
</template>
