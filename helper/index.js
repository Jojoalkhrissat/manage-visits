const {cache} = require('../framework/config')
async function getWeekdayNumber(day) {
    const weekDays =['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return weekDays.findIndex((value,)=>{
    return value===day.toLowerCase()
})+1
}
async function checkChanges(day, from, to) {
    return cache.has('visitDetails')&&(JSON.stringify({day, from, to})===JSON.stringify(cache.get('requestParams')))
}
module.exports={
    getWeekdayNumber,
    checkChanges
}