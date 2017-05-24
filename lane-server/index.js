import path from 'path';
import grpc from 'grpc';
import moment from 'moment';
import createDBClient from './lib/create-db';

const PROTO_PATH = path.resolve(__dirname, './protos/lane.proto');

const server = new grpc.Server();
const lane_proto = grpc.load(PROTO_PATH).lane;

function injectClients({ dbConn }) {
  const LaneService = {
    saveLane(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lane');

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
        console.log('save lane error', err);
        cb(err);
      }
    },

    saveLaneSensor(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lane_sensors');

      try {
        return collection.insert(data)
            .then((response) => {
              const newRecord = response.ops[0];
              console.log('Saved Data! ', response.ops[0]);

              cb(null, {
                id: newRecord._id.toString(),
                name: newRecord.name,
                laneId: newRecord.laneId
              });
          })
          .catch((err) => {
            console.log(err);
            cb(err);
          });

      } catch (err) {
        console.log('save lane sensor error', err);
        cb(err);
      }
    },

    getLanesByEntranceId(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lane');
      console.log('REQUEST PARAMS: ', data);

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
        console.log('find lanes error', err);
        cb(err);
      }
    },

    getLaneSensorsById(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('lane_sensors');

      try {
        return collection.find({ laneId: data.laneId }).toArray()
            .then((response) => {
              console.log('Found Data! ', response);

              const mappedData = response.map((record) => {
                return {
                  id: record._id.toString(),
                  name: record.name,
                  laneId: record.laneId
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
        console.log('find lane sensors error', err);
        cb(err);
      }
    }

  };

  process.once('SIGINT', () => {
    dbConn.close();
  });

  server.addProtoService(
    lane_proto.Lane.service,
    LaneService
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  console.log('Consume grpc server ready');

  server.start();
}

async function startServer() {
  try {
    const dbConn = await createDBClient({ dbUrl: 'mongodb://lane-db/lane' });

    injectClients({ dbConn });
  } catch (err) {
    console.log('Error Starting Server', err);
  }
}

startServer();
