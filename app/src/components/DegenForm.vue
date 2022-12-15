<script setup>
/* eslint-disable */
import { computed, ref, toRefs } from 'vue'
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'

const {publicKey} = useWallet()

let saved = ref(false)

const save = () => {
    axios.post('http://localhost:3000/api/degen', {
        name: 'Mawcel6069',
        starWallet: 'qdss',
        rugWallet: 'fdlkdazazazzzazlfsdj',
    }).then(e => console.log(e))
}
</script>

<template>
    <div class="px-8 py-4 border-b">
        <div class="flex flex-wrap items-center justify-between -m-2">
            <div class="relative m-2 mr-4">
                <label for="">Solana wallet</label>
                <p>this wallet will be used to receive your gift as well as your gold stars voucher</p>
                <input
                    type="text"
                    placeholder="topic"
                    class="py-2 pl-10 pr-4 text-pink-500 bg-gray-100 rounded-full"
                    :value="effectiveTopic"
                    :disabled="forcedTopic"
                    @input="topic = $event.target.value"
                >
                <div class="absolute inset-y-0 left-0 flex pl-3 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 m-auto" :class="effectiveTopic ? 'text-pink-500' : 'text-gray-400'" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
                    </svg>
                </div>

                <button
                    class="px-4 py-2 font-semibold text-white bg-red-600 rounded-full"
                    @click="save"
                >Submit</button>
            </div>
        </div>
    </div>
</template>
