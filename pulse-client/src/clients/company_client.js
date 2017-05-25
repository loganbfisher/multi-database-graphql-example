import grpc from 'grpc';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../protos/company.proto');

const companyProto = grpc.load(PROTO_PATH).company;

const NODE_NAME = 'company-server';
const PORT = '50051';

const companyClient = new companyProto.Company(`${NODE_NAME}:${PORT}`, grpc.credentials.createInsecure());

export default companyClient;
