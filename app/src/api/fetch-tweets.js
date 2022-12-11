import { useWorkspace } from '@/composables'
import { PublicKey } from '@solana/web3.js';

export const fetchTweets = async () => {
    const { program } = useWorkspace()
    // const tweets = await program.value.account.book.all([
    //     {
    //         memcmp: {
    //             offset: 8, // Discriminator.
    //             bytes: new PublicKey("ByMBFEkYFxgqHgbgFVuAph3veiYn6RYEZQZJ2UWrpLgh").toBase58(),
    //         }
    //     }
    // ]);
    console.log(program)

    const meta = await program.value.account.metadata.all([
        {
            memcmp: {
                offset: 8 + // Discriminator.
                32, // Author public key.
                bytes: new PublicKey("9RjydfPTdjXaejf7dToTYd4jzUVWF17kTMgwKHKoVbE3").toBase58(),
            }
        }
    ])
    // console.log(tweets)
    const account = meta[0].account


    const stars = account.rewardsRemaining * account.starsPerRedemption
    console.log(stars);
    
    return stars
}