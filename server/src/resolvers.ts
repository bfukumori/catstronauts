import { Resolvers } from './types';

export const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: async (_, __, { dataSources }) => {
      return await dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by ID, for the track page
    track: async (_, { id }, { dataSources }) => {
      return await dataSources.trackAPI.getTrackByID(id);
    },
    // get a single module by ID, for the module detail page
    module: async (_, { id }, { dataSources }) => {
      return await dataSources.trackAPI.getModuleByID(id);
    },
  },
  Track: {
    author: async ({ authorId }, _, { dataSources }) => {
      return await dataSources.trackAPI.getAuthorByID(authorId);
    },
    modules: async ({ id }, _, { dataSources }) => {
      return await dataSources.trackAPI.getTrackModules(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          message: `Successfully incremented number of views for track ${id}`,
          success: true,
          track,
        };
      } catch (error) {
        return {
          code: error.extensions.response.status,
          message: error.extensions.response.body,
          success: false,
          track: null,
        };
      }
    },
  },
};
