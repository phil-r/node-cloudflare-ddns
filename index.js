#!/usr/bin/env node

require('dotenv').config();
const { PROXIED, ZONE, SUBDOMAIN } = process.env;
const axios = require('axios');
const {
  getUser,
  getZone,
  getRecord,
  updateRecord,
  createRecord
} = require('./cf');

async function getIP() {
  const { data: { ip } } = await axios.get('https://ifconfig.co/json');
  return ip;
}

console.log('Getting started');

(async () => {
  try {
    const ip = await getIP();
    console.log('ip:', ip);
    const zone = await getZone(ZONE);
    console.log('zone.id', zone.id);
    const record = await getRecord(zone, SUBDOMAIN);
    console.log('record', record);
    const recordObj = {
      name: SUBDOMAIN,
      content: ip,
      type: 'A',
      proxied: PROXIED === 'true'
    };
    let newRecord;
    if (!record) {
      newRecord = await createRecord(zone, recordObj);
      console.log('New record', newRecord);
    } else if (record.content !== ip) {
      newRecord = await updateRecord(zone, record, recordObj);
      console.log('Updated record', newRecord);
    } else {
      console.log('No update required');
    }
  } catch (e) {
    if (e.response) {
      console.error(e.response.data);
    } else {
      console.error(e);
    }
  }
})();
