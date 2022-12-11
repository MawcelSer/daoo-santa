const { Router } = require('express')
const Degen = require('./models/degen')

const router = Router()

router.get('/degens', async (req, res) => {
    try {
        const degenList = await Degen.find()
        if (!degenList) throw new Error('No Degen List found')
        res.status(200).json(degenList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

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

router.post('/degen', async (req, res) => {
    const newDegen = new Degen(req.body)
    try {
        const degen = await newDegen.save()
        if (!degen) throw new Error('Something went wrong saving the Degen')
        res.status(200).json(degen)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/degen/:wallet', async (req, res) => {
    try {
        const updated = await Degen.findOneAndUpdate({
            starWallet: req.params
        }, req.body)
        if (!updated) throw Error('Something went wrong ')
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router