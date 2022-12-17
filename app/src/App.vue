<script setup>
import { PhantomWalletAdapter, SolflareWalletAdapter, BackpackWalletAdapter } from '@solana/wallet-adapter-wallets'
import { initWallet } from 'solana-wallets-vue'

const wallets = [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
]

initWallet({ wallets, autoConnect: true })

</script>

<template>
    <div class="w-full mx-auto" id="main">

        <!-- Sidebar. -->
        <!-- <the-sidebar class="fixed w-20 py-4 md:py-8 md:pl-4 md:pr-8 md:w-64"></the-sidebar> -->

        <!-- Main -->
        <main class>
            <router-view></router-view>
        </main>
    </div>
</template>
