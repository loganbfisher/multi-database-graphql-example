import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/lot.proto');

const lotProto = grpc.load(PROTO_PATH).lot;

const NODE_NAME = 'lot-server';
const PORT = '50051';

const lotClient = new lotProto.Lot(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default lotClient;
