'use strict';

const path = require('path');

const { key, adapterFile, storageFile } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');

const storageFilePath= path.join(__dirname, storageFile)

const {adapt} =require(path.join(__dirname, adapterFile));


async function getAllFromStorage(){
    return readStorage(storageFilePath);
}
//getAllFromStorage().then(console.log).catch(console.log)
async function getFromStorage(id){
    return (await readStorage(storageFilePath)).find(item=>item[key]==id) || null;
}
//getFromStorage(6).then(console.log).catch(console.log)

async function addToStorage(newObject){
    const storageData = await readStorage(storageFilePath);
    storageData.push(adapt(newObject));
    return await writeStorage(storageFilePath,storageData)
}

/*  addToStorage({
    flowerId: '41',
    name: 'mushboom',
    farmer: 'Fungus',
    site: 'rainy',
    stock: '18'
}).then(console.log).catch(console.log) */ 

async function updateStorage(modifiedObject){
    const storageData = await readStorage(storageFilePath);
    const oldObject = storageData.find(item => item[key] == modifiedObject[key]);
    if(oldObject){
        Object.assign(oldObject, adapt(modifiedObject));
        return await writeStorage(storageFilePath,storageData);
    }
    return false;
}

/* updateStorage({
    flowerId: '41',
  name: 'boom',
  farmer: 'gus',
  site: 'rainy',
  stock: '1'
}).then(console.log).catch(console.log) */

async function removeFromStorage(id){
    const storageData = await readStorage(storageFilePath);
    const i = storageData.findIndex(item=>item[key]==id);
    if(i<0) return false;
    storageData.splice(i,1);
    return await writeStorage(storageFilePath, storageData);
}
//removeFromStorage(41).then(console.log).catch(console.log)

module.exports = {
    getAllFromStorage, 
    getFromStorage, 
    addToStorage, 
    updateStorage, 
    removeFromStorage
}