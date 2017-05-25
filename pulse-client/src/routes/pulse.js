import express from 'express';
import entranceClient from '../clients/entrance_client';
import lotClient from '../clients/lot_client';
import laneClient from '../clients/lane_client';
import companyClient from '../clients/company_client';

import promisize from '../lib/promisize';

const saveLot = promisize(lotClient.saveLot, lotClient);
const saveEntrance = promisize(entranceClient.saveEntrance, entranceClient);
const saveLane = promisize(laneClient.saveLane, laneClient);
const saveEntranceSensor = promisize(entranceClient.saveEntranceSensor, entranceClient);
const saveLaneSensor = promisize(laneClient.saveLaneSensor, laneClient);
const saveCompany = promisize(companyClient.saveCompany, companyClient);

const client = express.Router();

client.post('/lots', (req, res) => {
  return saveLot(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.post('/entrances', (req, res) => {
  return saveEntrance(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.post('/lanes', (req, res) => {
  return saveLane(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.post('/companies', (req, res) => {
  return saveCompany(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.post('/entranceSensors', (req, res) => {
  return saveEntranceSensor(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

client.post('/laneSensors', (req, res) => {
  return saveLaneSensor(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});


export default client;
