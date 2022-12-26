<script setup>
/* eslint-disable */
import { ref, watch } from 'vue'
import TxForm from '@/components/TxForm'
import WalletAdapter from '@/components/WalletAdapter'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAnchorWallet } from 'solana-wallets-vue';
import { assertExpressionStatement } from '@babel/types';

let username = ref(null)
let degen = ref({})
let isDegen = ref(false)
let partner =ref({})
let partnerId = ref("")

let degens = ref([])

axios.get('https://ruggedsanta.xyz:8443/api/degens').then(response => {
    degens.value = response.data.filter(e => e.image)

console.log(response)
})


// axios.post('https://localhost:3000/api/degen/D8M679pWjdgQaEKdHY3FqnwzeoCDccm3iRnMin74vcPn', {
//     "name":"Mawcel6069",
//     "starWallet":"D8M679pWjdgQaEKdHY3FqnwzeoCDccm3iRnMin74vcPn",
//     "partner":"JB (33.3%)0069",
//     "tx":"mJ3SZXF7Z9eZdW4Xt7T5QABhfSEtYAPGXJ4KoqKbPo3r8gzgtESgUkUVbfT4DJn629XL8ZpkWhYZyAJSRu1uTnG"
// })

// const setDegen = (newDegen) => {
//     degen.value = newDegen

//     setPartner(degen.value.partner)
// } 

// const setPartner = (wallet) => {
//     axios.get(`http://localhost:3000/api/degen/${wallet}`).then(e => {
//         partner.value = e.data

//         const nbers = partner.value.name.slice(-4)
//         const name = partner.value.name.slice(0, -4)
//         partnerId.value = `${name}#${nbers}`
//         console.log(partner.value)
//         console.log(partnerId.value)
//     }).catch(e => {
//         console.log(e)
//     })
// }

// watch(isDegen, (newValue, oldValue) => {
//     if(newValue) {
//         axios.post(`http://localhost:3000/api/degen/get`, {name: username.value}).then(e => {
//             setDegen(e.data)
//             console.log(degen)
//         }).catch(e => {
//             console.log(e)
//         })
//     } 
// });

// const fragment = new URLSearchParams(window.location.hash.slice(1));
// const accessToken = fragment.get('access_token');
// const login = () => {
// 		axios.get('https://discord.com/api/users/@me/guilds/892103590242566145/member', {
// 			headers: {
// 				authorization: `Bearer ${accessToken}`,
// 			},
// 		})
// 			.then(response => {
//                 console.log(response)
// 				const { roles } = response.data;
// 				roles.map(role => {
//                     if(['906532040114049055', '956047907658809394', '936091196110012477', '911993304432930846'].includes(role) && !isDegen.value) {
//                         isDegen.value = true
//                         username.value = response.data.user.username + response.data.user.discriminator
//                     }
//                 })

//                 if(!isDegen.value) {
//                     toast('You are not a verified Degeniverse holder')
//                 }
// 			})
// 			.catch(console.error);
// }

// if(accessToken) {
//     // login()
// }


</script>

<template>
    <img src="../assets/daoo-logo.png" id="logo" alt="">
    <div class="container " v-if="degens.length > 1">
        <img v-for="degen in degens" :src="degen.image" alt="" class="rug">
    </div>
</template>
