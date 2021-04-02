const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    hymnsCount(where: JSON): Int!
    hymnBySlug(id: ID slug: String): Hymn
  `,
  resolver: {
    Query: {
      hymnsCount: {
        description: 'Return the count of hymns',
        resolverOf: 'application::hymn.hymn.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.hymn.services.hymn.count(options.where || {});
        },
      },
      hymnBySlug: {
        resolverOf: 'Hymn.findOne',
        async resolver(_, { slug }) {
          const entity = await strapi.services.hymn.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.hymn });
        },
      },
    },
  },
};
