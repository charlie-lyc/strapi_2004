'use strict';

/**
 * product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

/////////////////////////////////////////////////////////////////////
// module.exports = createCoreService('api::product.product');

/////////////////////////////////////////////////////////////////////
module.exports = createCoreService('api::product.product', ({ strapi }) => ({
    async find(...args) { 
        /**
         * Wrapping a core action (leaves core logic in place)
         */
        const { results, pagination } = await super.find(...args);
        results.forEach(result => {
            result.counter = 1;
        });
        return { results, pagination };
    },
    async findOne(entityId, params = {}) {
        /**
         * Replacing a core action
         */
        return strapi.entityService.findOne('api::product.product', entityId, this.getFetchParams(params));
    }
}));