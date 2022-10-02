import { j as json } from "../../../../chunks/index2.js";
import Twilio from "twilio";
const accountSid = "AC6f3aa9045df387be43f57805de676287";
const authToken = "a2611006ab90cc76a32eb55d7ce3d349";
const syncServiceSid = "IS4eaa7cb1252aa072dca3a8eb14020b81";
const syncListSid = "ESf0a8237d4035be5be1f4f84ad9fbe04e";
const client = new Twilio(accountSid, authToken);
const syncList = client.sync.v1.services(syncServiceSid).syncLists(syncListSid);
async function PUT({ request, params }) {
  const { data } = await request.json();
  var item;
  await syncList.syncListItems(params.index).update({
    data
  }).then((item2) => {
    item2 = { sticky_note: {
      index: item2.index,
      text: item2.data.text,
      limit: item2.data.limit,
      memo: item2.data.memo
    } };
  }).catch((error) => {
    console.log(error);
    item = { sticky_note: {
      index: 0,
      text: error.message + "-" + error.code
    } };
  });
  return json(item);
}
async function DELETE({ params }) {
  var result;
  await syncList.syncListItems(params.index).remove().then((item) => {
    result = { deleted: item.index };
  }).catch((error) => {
    console.log(error);
    result = { deleted: error.message + "-" + error.code };
  });
  return json(result);
}
export {
  DELETE,
  PUT
};
