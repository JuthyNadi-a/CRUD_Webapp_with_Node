'use strict';

const Datastorage = require('./storage/dataStorageLayer');

const storage = new Datastorage();

//storage.getAll().then(console.log).catch(console.log);
// storage.getOne().then(console.log).catch(console.log);
// storage.remove(90).then(console.log).catch(console.log);
// (async ()=>{
//     // try{
//     //     const result = await storage.getOne();
//     //     console.log(result);
//     // }
//     // catch(err){
//     //     console.log(err);
//     //     if(err.code===storage.CODES.NOT_FOUND){
//     //         console.log('This is missing')
//     //     }
//     // }
/* (async ()=>{
    try{
        const status = await storage.update({
        "flowerId": 90,
        "name": "tulip",
        "farmer": "Poisoned",
        "site": "bucketz",
        "stock": 512
        }
        );
        console.log(status);
    }
    catch(err){
        console.log(err);
    }
    
})() */
// })();
