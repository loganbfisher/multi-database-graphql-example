import path from 'path';
import grpc from 'grpc';
import moment from 'moment';
import createDBClient from './lib/create-db';

const PROTO_PATH = path.resolve(__dirname, './protos/entrance.proto');

const server = new grpc.Server();
const entrance_proto = grpc.load(PROTO_PATH).entrance;

function injectClients({ dbConn }) {
  const EntranceService = {
    saveEntrance(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('entrance');

      try {
        return collection.insert(data)
            .then((response) => {
              const newRecord = response.ops[0];
              console.log('Saved Data! ', response.ops[0]);

              cb(null, {
                id: newRecord._id.toString(),
                name: newRecord.name,
                lotId: newRecord.lotId
              });
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('save entrance error', err);
        cb(err);
      }
    },

    saveEntranceSensor(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('entrance_sensors');

      try {
        return collection.insert(data)
            .then((response) => {
              const newRecord = response.ops[0];
              console.log('Saved Data! ', response.ops[0]);

              cb(null, {
                id: newRecord._id.toString(),
                name: newRecord.name,
                entranceId: newRecord.entranceId
              });
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('save entrance sensor error', err);
        cb(err);
      }
    },

    getEntrancesByLotId(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('entrance');
      console.log('REQUEST PARAMS: ', data);

      try {
        return collection.find({ lotId: data.lotId }).toArray()
            .then((response) => {
              console.log('Found Data! ', response);

              const mappedData = response.map((record) => {
                return {
                  id: record._id.toString(),
                  name: record.name,
                  lotId: record.lotId
                }
              })

              console.log('MAPPED DATA: ', mappedData)

              cb(null, mappedData);
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('find entrances error', err);
        cb(err);
      }
    },

    getEntranceSensorsById(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('entrance_sensors');

      try {
        return collection.find({ entranceId: data.entranceId }).toArray()
            .then((response) => {
              console.log('Found Data! ', response);

              const mappedData = response.map((record) => {
                return {
                  id: record._id.toString(),
                  name: record.name,
                  entranceId: record.entranceId
                }
              })

              console.log('MAPPED DATA: ', mappedData)

              cb(null, mappedData);
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('find entrance sensors error', err);
        cb(err);
      }
    }

  };

  process.once('SIGINT', () => {
    dbConn.close();
  });

  server.addProtoService(
    entrance_proto.Entrance.service,
    EntranceService
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  console.log('Consume grpc server ready');

  server.start();
}

async function startServer() {
  try {
    const dbConn = await createDBClient({ dbUrl: 'mongodb://entrance-db/entrance' });

    injectClients({ dbConn });
  } catch (err) {
    console.log('Error Starting Server', err);
  }
}

startServer();
