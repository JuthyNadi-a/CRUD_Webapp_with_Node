'use strict';

function adapt(item) {
    return Object.assign(item, {
        id: +item.id
    })
}

module.exports = {adapt}