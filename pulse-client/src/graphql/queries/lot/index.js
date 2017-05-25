import {
  GraphQLList,
  GraphQLString
} from 'graphql';

import promisize from '../../../lib/promisize';
import lotClient from '../../../clients/lot_client';
import lotType from '../../types/lot';

const getLots = promisize(lotClient.getLots, lotClient);

export default {
  type: new GraphQLList(lotType),
  args: {
    companyId: { type: GraphQLString }
  },
  resolve: (_, { companyId }) => {
    return getLots({ companyId })
      .then((resp) => {
        return resp.lots;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
