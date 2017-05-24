import { buildSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import promisize from './lib/promisize';
import entranceClient from './clients/entrance_client';

const getEntrancesByLotId = promisize(entranceClient.getEntrancesByLotId, entranceClient);

const schema = buildSchema(`
  type Entrance {
    id: String,
    name: String,
    lotId: String
  }

  type Lot {
    id: String,
    name: String,
    entrances: [Entrance]
  }

  type Query {
    lots: [Lot]
  }
`);

export default schema;
