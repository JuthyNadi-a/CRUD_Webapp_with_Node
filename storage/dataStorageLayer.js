'use strict';

const {CODES,MESSAGES} = require('./statusCodes');

const {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    updateStorage,
    removeFromStorage
}=require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    get CODES(){
        return CODES;
    }

    getAll(){
        return getAllFromStorage();
    } //end getAll

    getOne(id){
        return new Promise(async (resolve,reject)=>{
            if(!id){
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result = await getFromStorage(id);
                if(result){
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(id))
                }
            }
        });
    } //end of getOne

    insert(flower){
        return new Promise(async (resolve,reject)=>{
            if(flower){
                if(!flower.flowerId){
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if(await getFromStorage(flower.flowerId)){
                    reject(MESSAGES.ALREADY_IN_USE(flower.flowerId))
                }
                else if(await addToStorage(flower)){
                    resolve(MESSAGES.INSERT_OK(flower.flowerId))
                }
                else{
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } //end of insert

    update(flower){
        return new Promise(async (resolve,reject)=>{
            if(flower){
                if(await updateStorage(flower)){
                    resolve(MESSAGES.UPDATE_OK(flower.flowerId));
                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    } //end update

    remove(flowerId){
        return new Promise(async (resolve,reject)=>{
            if(!flowerId){
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else if(await removeFromStorage(flowerId)){
                resolve(MESSAGES.REMOVE_OK(flowerId));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(flowerId));
            }
        });
    } //end of remove
}