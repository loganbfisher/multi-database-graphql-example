import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/lane.proto');

const laneProto = grpc.load(PROTO_PATH).lane;

const NODE_NAME = process.env.NODE_NAME || 'lane-server';
const PORT = process.env.NODE_NAME ? '4143' : '50051';

const laneClient = new laneProto.Lane(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default laneClient;
