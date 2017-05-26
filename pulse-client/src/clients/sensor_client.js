import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/sensor.proto');

const sensorProto = grpc.load(PROTO_PATH).sensor;

const NODE_NAME = process.env.NODE_NAME || 'sensor-server';
const PORT = process.env.NODE_NAME ? '4143' : '50051';

const sensorClient = new sensorProto.Sensor(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default sensorClient;
