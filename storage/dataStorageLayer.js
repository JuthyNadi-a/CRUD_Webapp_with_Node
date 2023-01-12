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
                if(!flower.id){
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if(await getFromStorage(flower.id)){
                    reject(MESSAGES.ALREADY_IN_USE(flower.id))
                }
                else if(await addToStorage(flower)){
                    resolve(MESSAGES.INSERT_OK(flower.id))
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
                    resolve(MESSAGES.UPDATE_OK(flower.id));
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

    remove(id){
        return new Promise(async (resolve,reject)=>{
            if(!id){
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else if(await removeFromStorage(id)){
                resolve(MESSAGES.REMOVE_OK(id));
            }
            else{
                reject(MESSAGES.NOT_REMOVED(id));
            }
        });
    } //end of remove
}