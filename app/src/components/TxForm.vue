<script setup>
/* eslint-disable */
import { computed, ref, toRefs } from 'vue'
import { Connection } from '@solana/web3.js';
import { ParticleNetwork } from '@particle-network/auth';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import { doesNotMatch } from 'assert';

const props = defineProps(['degen', 'address'])
const done = ref(false)

const { degen, address } = toRefs(props) 

const save = async () => {
    const connection = new Connection(
        "https://old-nameless-bridge.solana-mainnet.discover.quiknode.pro/6fdc470238c40c1c9c3754ed5035c71e0a9b0267",
        "confirmed"
    )

    let isTransfer = false
    let isLegit = false
    const tx = await connection.getParsedTransaction(degen.value.tx.trim(), 'finalized').catch(e => toast('Invalid transaction'))

    tx.transaction.message.instructions.map(ins => {
        console.log(tx)
        if(ins.program === 'spl-token' && ins.parsed?.type === 'transferChecked') {
            isTransfer = true
        }
    // console.log(ins.parsed?.info.wallet)
    // console.log(address.value)
        if(ins.parsed?.info?.wallet?.toString() === address.value) {
            isLegit = true
        }
    })

    if(isTransfer && isLegit) {
        await axios.post(`http://localhost:3000/api/degen/${degen.value.name}`, degen.value)
        done.value = true
    } else {
        toast('Invalid transaction')
    }
    
}
</script>

<template>
    <div class="px-8 py-4">
        <div v-if="!done" class="flex flex-col flex-wrap items-center justify-center -m-2">
            <p>Come back here to submit your TRANSACTION ID after sending your favourite rug</p>
            <input
                type="text"
                placeholder="Transaction ID"
                class="py-2 pl-10 pr-4 text-black bg-gray-100 rounded-full"
                v-model="degen.tx"
            >
            <button
                class="px-4 py-2 font-semibold text-white bg-red-600 rounded-full"
                @click="save"
            
            >Submit</button>
        </div>
        <div v-if="done" class="px-8 py-4 border-b ">
            <img id="santape" src="../assets/santape.png" alt="">
            <p>Merry fkin christmas degen, thank you for participating</p>
            <p>Rugged Santa will drop you some Gold Stars when he's done getting shitfaced</p>
        </div>
    </div>
</template>
