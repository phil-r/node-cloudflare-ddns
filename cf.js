const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4/',
  headers: {
    'X-Auth-Key': process.env.CF_KEY,
    'X-Auth-Email': process.env.CF_EMAIL,
    'Content-Type': 'application/json',
    responseType: 'json'
  }
});

async function getUser() {
  const { data: { result } } = await api.get('user');
  return result;
}

async function getZone(name) {
  const { data: { result } } = await api.get(`zones?name=${name}`);
  return result[0];
}

async function getRecord(zone, name) {
  const { data: { result } } = await api.get(
    `zones/${zone.id}/dns_records?type=A&name=${name}.${zone.name}`
  );
  return result[0];
}

async function createRecord(zone, { name, content, type, proxied }) {
  const { data: { result } } = await api.post(`zones/${zone.id}/dns_records`, {
    name,
    content,
    type,
    proxied
  });
  return result;
}

async function updateRecord(zone, record, { name, content, type, proxied }) {
  const { data: { result } } = await api.put(
    `zones/${zone.id}/dns_records/${record.id}`,
    {
      name,
      content,
      type,
      proxied
    }
  );
  return result;
}

module.exports = {
  api,
  getZone,
  getRecord,
  updateRecord,
  createRecord
};
