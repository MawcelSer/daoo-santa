import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import idl from '../../src/degenerate_star.json'

const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    console.log("init")
    const wallet = useAnchorWallet()
    console.log(wallet.value)
    const connection = new Connection('https://api.mainnet-beta.solana.com')
    const provider = computed(() => new AnchorProvider(connection, wallet.value))
    const program = computed(() => new Program(idl, programID, provider.value))

    workspace = {
        wallet,
        connection,
        provider,
        program,
    }
    
}
