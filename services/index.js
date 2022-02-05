const {User, Visits, Client} = require('../framework/modules');
const {getWeekdayNumber} = require('../helper');
async function getLeastVisited(day, from, to) {
    const dayOfWeekNumber = await getWeekdayNumber(day);
    try {
        return await Client.aggregate([
            {
            $lookup: 
                { 
                from: 'visits', 
                localField: '_id', 
                foreignField: 'client', 
                pipeline:[
                {$addFields:{weekDay:{$dayOfWeek:{$toDate:'$time'}}}},
                {$match:{$and:[{time : { $gte :  parseInt(from), $lte : parseInt(to)}},
                {weekDay:dayOfWeekNumber}]}}
                ],
                as: 'visits'
                }
              }, { $addFields: {visitCount: {$size: '$visits'}}
           },{$sort:{visitCount:1}}
        ]);
    } catch (error) {
        console.log(error);
       return false; 
    }
   
}



module.exports ={
    getLeastVisited
}