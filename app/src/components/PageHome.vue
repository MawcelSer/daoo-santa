<script setup>
/* eslint-disable */
import { ref, watch } from 'vue'
import DegenForm from '@/components/DegenForm'
import WalletAdapter from '@/components/WalletAdapter'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const {publicKey} = useWallet()
let username = ref(null)
let degen = ref({})
let isDegen = ref(false)

// axios.post('http://localhost:3000/api/degen', {
//     name: 'Mawcel6069',
//     starWallet: 'qdss',
//     rugWallet: 'fdlkdazazazzzazlfsdj',
// }).then(e => console.log(e))

watch(isDegen, (newValue, oldValue) => {
    console.log(username.value)
    console.log(isDegen.value)
    console.log(degen.value.name)
    if(newValue) {
        axios.get(`http://localhost:3000/api/degen/${username.value}`).then(e => {
        console.log(e)
        e.data.starWallet = null
        degen.value = e.data
        console.log(degen)
    })
    } 
});

const exists = () => {

}

const fragment = new URLSearchParams(window.location.hash.slice(1));
const accessToken = fragment.get('access_token');
const login = () => {
        console.log(accessToken)

		fetch('https://discord.com/api/users/@me/guilds/892103590242566145/member', {
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})
			.then(result => result.json())
			.then(response => {
				const { roles } = response;
				roles.map(role => {
                    if(['906532040114049055', '956047907658809394', '936091196110012477'].includes(role) && !isDegen.value) {
                        isDegen.value = true
                        username.value = response.user.username + response.user.discriminator
                    }
                })

                if(!isDegen.value) {
                    toast('You are not a verified Degeniverse holder')
                }
			})
			.catch(console.error);
}

if(accessToken) {
    login()
}
// isDegen.value = true
</script>

<template>
    <div class="container" v-if="!isDegen">
        <p id="welcome">Welcome to Rugged Santa degen</p>
        <p>The concept is simple, every participant will be randomly paired with another participant to become their Rugged Santa</p>
        <p>Each rugged santa will gift his most prestigious rugged nft to his fellow degen</p>
        <a href="https://discord.com/api/oauth2/authorize?client_id=1051860317627486220&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=token&scope=identify%20guilds%20guilds.members.read">
            <button>Login with discord</button>
        </a>
    </div>
    <div class="container" v-if="isDegen">
        <WalletAdapter v-if="!degen.starWallet && degen.name" :name="degen.name"></WalletAdapter>
        <div v-if="degen.name && degen.starWallet" class="px-8 py-4 border-b ">{{degen.name}}</div>
    </div>
</template>
