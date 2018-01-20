require('dotenv').config();
const { PROXIED } = process.env;
const {
  getUser,
  getZone,
  getRecord,
  updateRecord,
  createRecord
} = require('./cf');

(async () => {
  try {
    console.log(await getUser());
    const zone = await getZone('rukin.me');
    console.log('zone.id', zone.id);
    const record = await getRecord(zone, 'pi2');
    console.log('record', record);
    let newRecord;
    if (record) {
      newRecord = await updateRecord(zone, record, {
        name: 'pi2',
        content: '127.0.0.2',
        type: 'A',
        proxied: PROXIED === 'true'
      });
    } else {
      newRecord = await createRecord(zone, {
        name: 'pi2',
        content: '127.0.0.1',
        type: 'A',
        proxied: PROXIED === 'true'
      });
    }
    console.log('newRecord', newRecord);
  } catch (e) {
    console.error(e.response.data);
  }
})();
