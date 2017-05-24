import path from 'path';
import grpc from 'grpc';
import moment from 'moment';
import createDBClient from './lib/create-db';

const PROTO_PATH = path.resolve(__dirname, './protos/lot.proto');

const server = new grpc.Server();
const lot_proto = grpc.load(PROTO_PATH).lot;

function injectClients({ dbConn }) {
  const LotService = {
    saveLot(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lot');

      try {
        return collection.insert(data)
            .then((response) => {
              const newRecord = response.ops[0];
              console.log('Saved Data! ', newRecord);

              cb(null, {
                id: newRecord._id.toString(),
                name: newRecord.name
              });
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('save lot error', err);
        cb(err);
      }
    },

    getLots(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lot');
      console.log('REQUEST PARAMS: ', data);

      try {
        return collection.find().toArray()
            .then((response) => {
              console.log('Found Data! ', response);

              const mappedData = response.map((record) => {
                return {
                  id: record._id.toString(),
                  name: record.name
                }
              })

              cb(null, mappedData);
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('find lots error', err);
        cb(err);
      }
    }
  };

  process.once('SIGINT', () => {
    dbConn.close();
  });

  server.addService(
    lot_proto.Lot.service,
    LotService
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  console.log('Consume grpc server ready');

  server.start();
}

async function startServer() {
  try {
    const dbConn = await createDBClient({ dbUrl: 'mongodb://lot-db/lot' });

    injectClients({ dbConn });
  } catch (err) {
    console.log('Error Starting Server', err);
  }
}

startServer();
