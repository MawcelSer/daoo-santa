const { Router } = require('express')
const Degen = require('./models/degen')
const axios = require('axios')
const  { Connection } = require('@solana/web3.js')

const router = Router()

// router.get('/rugs', async(req, res) => {   
//     let count = 0 
//     const degens = await Degen.find();
//     const connection = new Connection(
//         "https://old-nameless-bridge.solana-mainnet.discover.quiknode.pro/6fdc470238c40c1c9c3754ed5035c71e0a9b0267",
//         "confirmed"
//     )
//     const rugs = []
//     const promises = []
//     let wallet
//     // const degen = degens[0]
//     degens.map(async degen => {
//         if (degen.tx && !degen.image && count < 5) {
//             count++
//             const tx = await connection.getParsedTransaction(degen.tx, 'finalized').catch(e => console.log(e))
        
//             tx.transaction.message.instructions.map(async ins => {
//                 if(ins.program === 'spl-associated-token-account' && ins.parsed?.type === 'create') {
//                     wallet = ins.parsed.info.wallet
//                 }
//             })

//             // setTimeout(async () => {
//                 if(wallet) {
//                     console.log(wallet)
//                     const config = {
//                         headers: {
//                           "Content-Type": "application/json",
//                         },
//                       };
//                       const data = {
//                         jsonrpc: "2.0",
//                         id: 1,
//                         method: "qn_fetchNFTs",
//                         params: {
//                           wallet,
//                           omitFields: ["provenance", "traits"],
//                           page: 1,
//                           perPage: 10,
//                         },
//                       };

//                     const nft =  await axios.post("https://old-nameless-bridge.solana-mainnet.discover.quiknode.pro/6fdc470238c40c1c9c3754ed5035c71e0a9b0267", data, config)
//                     // console.log(nft.data.result?.assets[0])
//                     degen.image = nft.data.result?.assets[0]?.imageUrl
//                     const updated = await Degen.findOneAndUpdate({
//                         starWallet: degen.starWallet
//                     }, degen)
                
//                     //    console.log(nft.data.result.assets[0].imageUrl)
//                     //   rugs.push(nft.data.result.assets[0].imageUrl)
//                 }
//             // }, 1000)
//         }
//     })

//     Promise.all(promises).then(e => console.log(e))

//     // console.log(e)

//     res.status(200).json({rugs})
// })

router.get('/degens', async (req, res) => {
    let count = 0
    try {
        const degenList = await Degen.find()

        degenList.map(e => {
            if(e.tx) {
                count++
                // wallets.push(e.starWallet)
            }
        })
        console.log(degenList.length)
        console.log(count)
        if (!degenList) throw new Error('No Degen List found')
        res.status(200).json(degenList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// router.get('/degen/:name', async (req, res) => {
//     const { name } = req.params

//     try {
//         const degen = await Degen.findOne({name: name})
//         if (!degen) throw Error('Something went wrong ')
//         res.status(200).json(degen)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.get('/degen/:wallet', async (req, res) => {
//         const { wallet } = req.params
    
//         try {
//             const degen = await Degen.findOne({starWallet: wallet})
//             if (!degen) throw Error('Something went wrong ')
//             res.status(200).json(degen)
//         } catch (error) {
//             res.status(500).json({ message: error.message })
//         }
//     })

//     router.post('/degen/get', async (req, res) => {
//         const { name } = req.body
//     console.log(name)
//         try {
//             const degen = await Degen.findOne({name: name})
//             if (!degen) throw Error('Something went wrong ')
//             res.status(200).json(degen)
//         } catch (error) {
//             res.status(500).json({ message: error.message })
//         }
//     })

// router.post('/degen', async (req, res) => {
//     const newDegen = new Degen(req.body)
//     try {
//         const degen = await newDegen.save()
//         if (!degen) throw new Error('Something went wrong saving the Degen')
//         res.status(200).json(degen)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })



// router.post('/degen/:wallet', async (req, res) => {
//     try {
//         const updated = await Degen.findOneAndUpdate({
//             starWallet: req.params.wallet
//         }, req.body)
//         if (!updated) throw Error('Something went wrong ')
//         res.status(200).json(updated)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.get('/degen/delete/:name', async (req, res) => {
//     try {
//         await Degen.deleteOne({name: req.params.name})
//         res.status(200).json('deleted')
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

module.exports = router