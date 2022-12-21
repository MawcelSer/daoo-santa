const { Router } = require('express')
const Degen = require('./models/degen')

const router = Router()

router.get('/degens', async (req, res) => {
    try {
        const degenList = await Degen.find()
        console.log(degenList.length)
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

router.get('/degen/:wallet', async (req, res) => {
        const { wallet } = req.params
    
        try {
            const degen = await Degen.findOne({starWallet: wallet})
            if (!degen) throw Error('Something went wrong ')
            res.status(200).json(degen)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

    router.post('/degen/get', async (req, res) => {
        const { name } = req.body
    console.log(name)
        try {
            const degen = await Degen.findOne({name: name})
            if (!degen) throw Error('Something went wrong ')
            res.status(200).json(degen)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

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



router.post('/degen/:wallet', async (req, res) => {
    try {
        const updated = await Degen.findOneAndUpdate({
            starWallet: req.params.wallet
        }, req.body)
        if (!updated) throw Error('Something went wrong ')
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// router.get('/degen/delete/:name', async (req, res) => {
//     try {
//         await Degen.deleteOne({name: req.params.name})
//         res.status(200).json('deleted')
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

module.exports = router