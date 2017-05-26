import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/sensor.proto');

const sensorProto = grpc.load(PROTO_PATH).sensor;

const NODE_NAME = 'sensor-server';
const PORT = '50051';

const sensorClient = new sensorProto.Sensor(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default sensorClient;
