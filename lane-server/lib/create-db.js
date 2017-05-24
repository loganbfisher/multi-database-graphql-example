import Mongo from 'mongodb';

const MongoClient = Mongo.MongoClient;

async function createDBClient({ dbUrl } = {}) {
  return await MongoClient.connect(dbUrl);
}

export default createDBClient;
