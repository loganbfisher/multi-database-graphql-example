import promisize from './lib/promisize';
import lotClient from './clients/lot_client';
import entranceClient from './clients/entrance_client';

const getLots = promisize(lotClient.getLots, lotClient);
const getEntrancesByLotId = promisize(entranceClient.getEntrancesByLotId, entranceClient);

const rootResolvers = {
  lots: () => {
    return getLots({})
      .then((resp) => {
        return resp.lots;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default rootResolvers;
