import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import 'graphql-import-node';
import path from 'path';
import resolvers from '../resolvers';

const loadedFiles = loadFilesSync(path.join(__dirname, '/**/*.gql'));
const typeDefs = mergeTypeDefs(loadedFiles);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
