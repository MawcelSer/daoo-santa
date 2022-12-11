<script setup>
/* eslint-disable */
import { ref, watchEffect } from 'vue'
import { fetchTweets } from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import { useWorkspace } from '@/composables'

const tweets = ref([])
const loading = ref(true)
const { wallet } = useWorkspace()

// ...
</script>

<template>
    <div v-if="wallet" class="px-8 py-4 border-b bg-gray-50">
        {{ wallet.publicKey.toBase58() }}
    </div>
    <tweet-form @added="addTweet"></tweet-form>
    <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>