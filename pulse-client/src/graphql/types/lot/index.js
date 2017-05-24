import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import promisize from '../../../lib/promisize';
import entranceClient from '../../../clients/entrance_client';
import entranceType from '../entrance';

const getEntrancesByLotId = promisize(entranceClient.getEntrancesByLotId, entranceClient);

export default new GraphQLObjectType({
  name: 'Lot',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    entrances: {
      type: new GraphQLList(entranceType),
      args: {
        lotId: {
          name: 'lotId',
          type: GraphQLString
        }
      },
      resolve: (lot) => {
        console.log('THIS IS THE LOT: ', lot)
        return getEntrancesByLotId({ lotId: lot.id })
          .then((resp) => {
            console.log('RESPONSE FROM ENTRANCES: ', resp);
            return resp.entrances
          })
      }
    }
  }
});
