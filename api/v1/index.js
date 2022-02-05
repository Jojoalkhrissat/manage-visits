const express = require('express');
const router = express.Router();
const {getLeastVisited} = require('../../services');
const {checkChanges} = require('../../helper');
const {cache} = require('../../framework/config')
const {getLeastVisitedSchema} = require('../../framework/validations')

router.get('/less-visited-clients-per-day', getLeastVisitedSchema, async function(req, res) {
try {
    const {day, from, to} = req.query;
    if(await checkChanges(day, from, to)){
    return res.send(cache.get('visitDetails'));
    }
    const data = await getLeastVisited(day, from, to);
    cache.set('visitDetails', data)
    cache.set('requestParams', {day, from, to})
    return res.send(data);
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}    
})

module.exports = router