import path from 'path';
import grpc from 'grpc';
import moment from 'moment';
import createDBClient from './lib/create-db';

const PROTO_PATH = path.resolve(__dirname, './protos/company.proto');

const server = new grpc.Server();
const company_proto = grpc.load(PROTO_PATH).company;

function injectClients({ dbConn }) {
  const CompanyService = {
    saveCompany(call, cb) {
      const data = call.request;
      const collection = dbConn.collection('company');

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
        console.log('save company error', err);
        cb(err);
      }
    }
  };

  process.once('SIGINT', () => {
    dbConn.close();
  });

  server.addService(
    company_proto.Company.service,
    CompanyService
  );

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  console.log('Consume grpc server ready');

  server.start();
}

const NODE_NAME = process.env.NODE_NAME;
const DB_URL = NODE_NAME ? `mongodb://${NODE_NAME}:7474/company` : 'mongodb://company-db/company';

async function startServer() {
  try {
    const dbConn = await createDBClient({ dbUrl: DB_URL });

    injectClients({ dbConn });
  } catch (err) {
    console.log('Error Starting Server', err);
  }
}

startServer();
