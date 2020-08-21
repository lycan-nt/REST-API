const Subscriber = require('../models/subscriber');

const express = require('express');

const router = express.Router();

//Getting all
router.get('/', async (req, res) => {
    try 
    {
        const subscriber = await Subscriber.find();
        res.status(200).json(subscriber);
    }
    catch (error)
    {
        res.status(500).json({ message: error.message });
    }
});

//Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

//Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeChannel: req.body.subscribeChannel
    });

    try
    {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch(error)
    {
        res.status(400).json({ message: error });
    }
});

//Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null)
    {
        res.subscriber.name = req.body.name;
    }

    if (req.body.subscribeChannel != null)
    {
        res.subscriber.subscribeChannel = req.body.subscribeChannel;
    }

    try
    {
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);
    }
    catch (error)
    {
        res.status(400).json({ message: error.message });
    }
});

//Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try
    {
        await res.subscriber.remove();
        res.json({ message: 'Delete Subscriber' })
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
}); 

async function getSubscriber(req, res, next) {
    let subscriber;

    try
    {
        subscriber = await Subscriber.findById(req.params.id);
        
        if (subscriber == null)
        {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    }
    catch(error)
    {
        return res.status(500).json({ message: error.message });
    }

    res.subscriber = subscriber;

    next();
}

module.exports = router;