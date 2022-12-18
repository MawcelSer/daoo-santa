<script setup>
/* eslint-disable */
import { computed, ref, toRefs, watch } from 'vue'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import axios from 'axios';

let saved = ref(false)
const props = defineProps(['name', 'setDegen'])
const { name, setDegen } = toRefs(props)

const {publicKey} = useWallet()

let degen = ref({})
watch(publicKey, (newValue, oldValue) => { 
    if(newValue) {
        axios.post(`http://localhost:3000/api/degen`, {
        name: name.value,
        starWallet: newValue,
      }).then(response => {
        setDegen.value(response.data)
    })
    }
});
</script>

<template>
    <wallet-multi-button></wallet-multi-button>
</template>
