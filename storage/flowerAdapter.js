'use strict';

function adapt(item) {
    return Object.assign(item, {
        flowerId: +item.flowerId,
        stock: +item.stock
    })
}

module.exports = {adapt}