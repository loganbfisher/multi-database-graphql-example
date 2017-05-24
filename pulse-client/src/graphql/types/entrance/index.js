import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import promisize from '../../../lib/promisize';
import entranceClient from '../../../clients/entrance_client';
import laneClient from '../../../clients/lane_client';
import entranceSensorType from '../sensor/entranceSensor';
import laneType from '../lane';

const getEntranceSensorsById = promisize(entranceClient.getEntranceSensorsById, entranceClient);
const getLanesByEntranceId = promisize(laneClient.getLanesByEntranceId, laneClient);

export default new GraphQLObjectType({
  name: 'Entrance',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    lanes: {
      type: new GraphQLList(laneType),
      args: {
        entranceId: {
          name: 'entranceId',
          type: GraphQLString
        }
      },
      resolve: (entrance) => {
        console.log('###### GOT IN HERE!!! ########')
        console.log(entrance)
        console.log('##############')

        return getLanesByEntranceId({ entranceId: entrance.id })
          .then((resp) => {
            return resp.lanes;
          })
      }
    },
    sensors: {
      type: new GraphQLList(entranceSensorType),
      args: {
        entranceId: {
          name: 'entranceId',
          type: GraphQLString
        }
      },
      resolve: (entrance) => {
        return getEntranceSensorsById({ entranceId: entrance.id })
          .then((resp) => {
            return resp.entranceSensors
          })
      }
    }
  }
});
