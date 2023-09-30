// @ts-nocheck
import { json } from '@sveltejs/kit';
import Twilio from 'twilio';

const accountSid = 'AC6f3aa9045df387be43f57805de676287';
const authToken = '038fae56260e02b51b8fb26338758e03'; 
const syncServiceSid = 'IS4eaa7cb1252aa072dca3a8eb14020b81';
const syncListSid = 'ESf0a8237d4035be5be1f4f84ad9fbe04e';

const client = new Twilio(accountSid, authToken);
const syncList = client.sync.v1.services(syncServiceSid).syncLists(syncListSid);

export async function PUT({ request, params }) {
    const { data } = await request.json();
    var item;
    await syncList.syncListItems(params.index).update({
        data: data,
    })
    .then((item) => {
        item = {sticky_note: {
                    index: item.index, 
                    text: item.data.text,
                    limit: item.data.limit,
                    memo: item.data.memo,
                }}
    })
    .catch((error) => {
        console.log(error);
        item = {sticky_note: {
            index: 0, 
            text: error.message + '-' + error.code, 
        }};
    });
    return json(item);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    var result;
    await syncList.syncListItems(params.index).remove()
    .then((item) => {
        result = {deleted: item.index}
    })
    .catch((error) => {
        console.log(error);
        result = {deleted: error.message + '-' + error.code};
    });
    return json(result);
}