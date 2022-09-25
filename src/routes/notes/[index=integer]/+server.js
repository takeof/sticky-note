// @ts-nocheck
import { json } from '@sveltejs/kit';
import Twilio from 'twilio';

const accountSid = 'AC6f3aa9045df387be43f57805de676287';
const authToken = 'a2611006ab90cc76a32eb55d7ce3d349'; 
const syncServiceSid = 'IS4eaa7cb1252aa072dca3a8eb14020b81';
const syncListSid = 'ESf0a8237d4035be5be1f4f84ad9fbe04e';

const client = new Twilio(accountSid, authToken);
const syncList = client.sync.v1.services(syncServiceSid).syncLists(syncListSid);

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    var result;
    await syncList.syncListItems(params.index).remove()
    .then((item) => {
        result = {deleted: item.index}
    });
    return json(result);
}