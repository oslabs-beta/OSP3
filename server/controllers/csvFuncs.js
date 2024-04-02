/*
This file contains all the function for data manipulation to extract and do calculation on data from the CSV file 
*/

const fs = require ('fs');
const parse = require ('csv-parser');
const path = require('path');
const { start } = require('repl');

const csvFuncs = {}; 
// returns array of objects, each object is a row with key = column name and value = value in cell 
csvFuncs.getAllRows = async (fileName) => {
    return new Promise ((resolve, reject)=> {
        const results = []; 
        fs.createReadStream(fileName)
        .pipe(parse())
        .on('data', (data)=> results.push(data))
        .on('end', ()=>{
            resolve(results); 
        })

    })
    
}

// takes in returns daily total number of runs for a function 
/**
 *
 * Given a function id, startdate string and enddate string, returns number of runs in that period 
 *
 * @param {number} funcID : number 
 * @param {number} startDate : the time in miliseconds that represents start of period of calculation
 * @param {number} endDate : the time in miliseconds that represents end of period of calculation
 */
csvFuncs.getTotalRuns = (arr, funcID, startDate, endDate) => {
    const selectedRows = []
    arr.forEach(row=>{
        if (row.invokeTime>= startDate && row.invokeTime <= endDate && row.funcID === funcID){
            selectedRows.push(row); 
        }
    })
    return selectedRows.length
}

csvFuncs.getCold = (arr, funcID, value, startDate, endDate)=>{
    const selectedRows = []
    arr.forEach(row=>{
        if (row.invokeTime>= startDate && row.invokeTime <= endDate && row.funcID === funcID ){
            if (row.firstRun === value){
                selectedRows.push(row); 
            }
        }
    })
    return selectedRows.length
}


csvFuncs.getSum = (arr, funcID, avColumn, startDate, endDate, firstRun = null) => {
    let total = 0; 
    arr.forEach(row=>{
        if (row.invokeTime>= startDate && row.invokeTime <= endDate && row.funcID === funcID ){
            if(firstRun !==null){
                if (row.firstRun === firstRun){
                    total = total + Number(row[avColumn])
                }
            }
            else {
                total = total + Number(row[avColumn])
            }
        }
    })
    return total
    
}



// csvFuncs.getAllDaily = async(startDate, endDate, userfileName, datafileName) => { 
//     const records =  await csvFuncs.getAllRows(userfileName);
//     const result = []
//     records.forEach(element => {
//       csvFuncs.getTotalRuns(element.funcID, startDate, endDate, datafileName)
//       .then(data => result.push(data))
//       .then (()=> result)
//     });
//     return result
// }

module.exports = csvFuncs;

