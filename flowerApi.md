# Flower data storage

## flower.json

```json
[
    {
    "flowerId":5,
    "name":"marigold",
    "farmer":"Rosamunda",
    "site":"swamp",
    "stock":1
    },
    {
    "flowerId":1,
    "name":"tulip",
    "farmer":"Roses of Rovaniemi oy",
    "site":"shady",
    "stock":7
    }
]
```

flowerId is unique!

### Public API (methods of Datastorage class)

#### dataStorageLayer.js
-   getAll()
    -   returns an array of all flowers / []
-   getOne(id)
    -   returns an flower object / NOT_FOUND
-   insert(newFlower)
    -   returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
-   update(updatedFlower)
    -   returns UPDATE_OK / NOT_UPDATED
-   remove(id)
    -   REMOVE_OK / NOT_FOUND / NOT_REMOVED
-   getters for status codes
    -   returns an array of status codes

### Private API

#### readerWriter.js

-   readStorage(storageFile)
    -   returns an array of flowers / []

-   writeStorage(storageFile, data)
    -   returns true/false

#### storageLayer.js
-   getAllFromStorage()
    -   returns an array of flowers / []

-   getFromStorage(id)
    -   returns an flower object / null

-   addToStorage(newFlower)
    -   returns true / false

-   updateStorage(updatedFlower)
    -   returns true / false

-   removeFromStorage(id)
    -   returns true / false

#### statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ...
}
```

The format of an status/error message is:

```js
const MESSAGES={
    PROGRAM_ERROR: ()=> ({
        message:'Sorry! Error in our program',
        code:CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND: id=>({
        message:`No flower found with id ${id}`,
        code:CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: id=>({
        message:`flower ${id} was inserted`,
        code:CODES.INSERT_OK,
        type:'info'
    })
}
```
status types are `error` or `info`