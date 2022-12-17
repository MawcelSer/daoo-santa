<script setup>
/* eslint-disable */
import { ref, watch } from 'vue'
import DegenForm from '@/components/DegenForm'
import WalletAdapter from '@/components/WalletAdapter'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let username = ref(null)
let degen = ref({})
let isDegen = ref(false)

watch(isDegen, (newValue, oldValue) => {
    console.log(username.value)
    console.log(isDegen.value)
    console.log(degen.value.name)
    if(newValue) {
        axios.get(`http://localhost:3000/api/degen/${username.value}`).then(e => {
            degen.value = e.data
            console.log(degen)
        }).catch(e => {
            console.log(e)
        })
    } 
});

const fragment = new URLSearchParams(window.location.hash.slice(1));
const accessToken = fragment.get('access_token');
const login = () => {
		axios.get('https://discord.com/api/users/@me/guilds/892103590242566145/member', {
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})
			.then(response => {
                console.log(response)
				const { roles } = response.data;
				roles.map(role => {
                    if(['906532040114049055', '956047907658809394', '936091196110012477'].includes(role) && !isDegen.value) {
                        isDegen.value = true
                        username.value = response.data.user.username + response.data.user.discriminator
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
</script>

<template>
    <div class="container " v-if="!isDegen">
        <div class="px-8 py-4 border-b">
            <img id="santape" src="../assets/santape.png" alt="">
            <p class="welcome">Welcome to Rugged Santa degen</p>
            <p>The concept is simple, every participant will be randomly paired with another participant to become their Rugged Santa</p>
            <p>Each Rugged Santa will gift his most prestigious rugged nft to his fellow degen</p>
            <p>Be a good degen and you'll be rewarded with gold stars</p>
        </div>
        <a href="https://discord.com/api/oauth2/authorize?client_id=1051860317627486220&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=token&scope=identify%20guilds%20guilds.members.read">
            <button>Login with discord</button>
        </a>
    </div>
    <div class="container" v-if="isDegen">
        <WalletAdapter v-if="!degen.starWallet && username" :name="username"></WalletAdapter>
        <div v-if="degen.starWallet" class="px-8 py-4 border-b ">
            <img id="santape" src="../assets/santape.png" alt="">
            <span class="welcome" id="registered">
            <p>You've been registered {{degen.name.slice(0, -4)}}, see you on the 23rd to find out who's Rugged Santa you are</p>
            </span>
        </div>
    </div>
</template>
