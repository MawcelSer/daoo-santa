<script setup>
// import { useRoute } from 'vue-router'
// import TheSidebar from './components/TheSidebar'
import { PhantomWalletAdapter, SolflareWalletAdapter, BackpackWalletAdapter } from '@solana/wallet-adapter-wallets'
import { initWallet } from 'solana-wallets-vue'
import { initWorkspace } from '@/composables'

// const route = useRoute()

const wallets = [
    new BackpackWalletAdapter(),
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
]

initWallet({ wallets, autoConnect: true })
initWorkspace()

</script>

<template>
    <div class="w-full mx-auto">

        <!-- Sidebar. -->
        <!-- <the-sidebar class="fixed w-20 py-4 md:py-8 md:pl-4 md:pr-8 md:w-64"></the-sidebar> -->

        <!-- Main -->
        <main class="flex-1 min-h-screen ml-20">
            <router-view></router-view>
        </main>
    </div>
</template>
