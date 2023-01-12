'use strict';

const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname,storage.storageFolder,storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'pages'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const menuPath = path.join(__dirname,'menu.html');

app.get('/', (req,res)=>res.sendFile(menuPath));

app.get('/all', (req,res)=>
    dataStorage.getAll().then(data=>res.render('allFlowers',{result:data}))
);

app.get('/getFlower', (req,res)=>
    res.render('getFlower',{
        title:'Get',
        header1:'Get',
        action:'/getFlower'  
    })
);

app.post('/getFlower', (req,res)=>{
    if(!req.body) return res.sendStatus(500);

    const flowerId = req.body.id;
    dataStorage.getOne(flowerId)
        .then(flower=>res.render('flowerPage',{result:flower}))
        .catch(error=>sendErrorPage(res,error));

});

app.get('/inputform', (req,res)=> 
    res.render('form',{
        title:'Add Flower',
        header1:'Add a new Flower',
        action:'/input',
        flowerId:{value:'', readonly:''},
        name: { value: '', readonly: '' },
        farmer: { value: '', readonly: '' },
        site: { value: '', readonly: '' },
        stock: { value: '', readonly: '' }
}));

app.post('/input', (req,res)=>{
    if(!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

app.get('/updateform', (req, res) =>
    res.render('form', {
        title: 'Update Flower',
        header1: 'Update Flower data',
        action: '/updatedata',
        flowerId: { value: '', readonly: '' },
        name: { value: '', readonly: 'readonly' },
        farmer: { value: '', readonly: 'readonly' },
        site: { value: '', readonly: 'readonly' },
        stock: { value: '', readonly: 'readonly' }
    }));

app.post('/updatedata', (req,res)=>{
    if(!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.id)
        .then(flower=>
            res.render('form', {
                title: 'Update Flower',
                header1: 'Update Flower data',
                action: '/update',
                id: { value: flower.flowerId, readonly: 'readonly' },
                name: { value: flower.name, readonly: '' },
                farmer: { value: flower.farmer, readonly: '' },
                site: { value: flower.site, readonly: '' },
                stock: { value: flower.stock, readonly: '' }
            })
        )
        .catch(error=>sendErrorPage(res,error));
});

app.post('/update', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error))
});

app.get('/removeFlower', (req, res) =>
    res.render('getFlower', {
        title: 'Remove',
        header1: 'remove',
        action: '/removeFlower'
    })
);

app.post('/removeFlower', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    const flowerId = req.body.id;
    dataStorage.remove(flowerId)
        .then(status => sendStatusPage(res,status))
        .catch(error => sendErrorPage(res, error));

});

app.listen(port,host, ()=>console.log(`Server ${host}:${port} listening...`));

//helper functions
function sendErrorPage(res, error, title='Error',header1='Error'){
    sendStatusPage(res,error,title,header1);
}

function sendStatusPage(res, status,title='Status',header1='Status'){
    return res.render('statusPage',{title,header1,status});
}
