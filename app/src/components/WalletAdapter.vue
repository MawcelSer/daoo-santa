<script setup>
/* eslint-disable */
import { computed, ref, toRefs, watch } from 'vue'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import axios from 'axios';

let saved = ref(false)
const props = defineProps(['name'])
const { name } = toRefs(props)

const {publicKey} = useWallet()

let degen = ref({})
watch(publicKey, (newValue, oldValue) => { 
    if(newValue) {
      console.log('AAA', name.value)
        axios.post(`http://localhost:3000/api/degen/${name.value}`, {
        name: name.value,
        starWallet: newValue,
      }).then(e => console.log(e))
    }
});

const save = () => {
   
}
</script>

<template>
    <wallet-multi-button></wallet-multi-button>
</template>
