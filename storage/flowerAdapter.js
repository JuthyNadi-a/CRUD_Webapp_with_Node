'use strict';

function adapt(item) {
    return {
        id: +item.id,
        name: item.name,
        farmer: item.farmer,
        site: item.site,
        stock: item.stock
    }
}

module.exports = {adapt}