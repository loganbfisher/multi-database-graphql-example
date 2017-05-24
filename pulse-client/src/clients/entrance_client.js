import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/entrance.proto');

const entranceProto = grpc.load(PROTO_PATH).entrance;

const NODE_NAME = 'entrance-server';
const PORT = '50051';

const entranceClient = new entranceProto.Entrance(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default entranceClient;
