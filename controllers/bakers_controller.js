// dependencies
const express = require('express')
const bakers = express.Router()
const baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

bakers.get('/data/seed',(req,res) => {
    baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})

// show 
bakers.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 2 }
        })
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

// export
module.exports = baker