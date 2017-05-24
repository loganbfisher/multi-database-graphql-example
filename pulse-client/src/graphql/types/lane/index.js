import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import promisize from '../../../lib/promisize';
import laneClient from '../../../clients/lane_client';
import laneSensorType from '../sensor/laneSensor';

const getLaneSensorsById = promisize(laneClient.getLaneSensorsById, laneClient);

export default new GraphQLObjectType({
  name: 'Lane',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    entranceId: {
      type: GraphQLString
    },
    sensors: {
      type: new GraphQLList(laneSensorType),
      args: {
        laneId: {
          name: 'laneId',
          type: GraphQLString
        }
      },
      resolve: (lane) => {
        return getLaneSensorsById({ laneId: lane.id })
          .then((resp) => {
            return resp.laneSensors
          })
      }
    }
  }
});
