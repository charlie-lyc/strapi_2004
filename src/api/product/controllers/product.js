'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

/////////////////////////////////////////////////////////////////////
// module.exports = createCoreController('api::product.product');

/////////////////////////////////////////////////////////////////////
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
    async find(ctx) {
        /**
         * Wrapping a core action (leaves core logic in place)
         */
        ctx.query = { ...ctx.query, local: 'en' };
        const { data, meta } = await super.find(ctx);
        meta.date = Date.now();
        return { data, meta };

        /**
         * Customizing
         */
        // const { results, pagination } = await strapi.service('api::product.product').find()
        // return results.map(product => product.title)
    },
    async findOne(ctx) {
        /**
         * Replacing a core action
         */
        const { id } = ctx.params;
        const { query } = ctx;
        const entity = await strapi.service('api::product.product').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);

        /**
         * Customizing
         */
        // const product = await strapi.service('api::product.product').findOne(ctx.params.id) 
        // return product
    },
}));
