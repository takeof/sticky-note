// @ts-nocheck
import { json } from '@sveltejs/kit';
import { Twilio } from 'twilio';

const accountSid = 'AC6f3aa9045df387be43f57805de676287';
const authToken = '2611006ab90cc76a32eb55d7ce3d349'; 
const syncServiceSid = 'IS4eaa7cb1252aa072dca3a8eb14020b81';
const syncListSid = 'ESf0a8237d4035be5be1f4f84ad9fbe04e';

const client = new Twilio(accountSid, authToken);
const syncList = client.sync.v1.services(syncServiceSid).syncLists(syncListSid);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    console.log(`get start: ${Date.now()}`);
    var list = [];
    await syncList.syncListItems.list().then((items) => {
        console.log(`syncList loop start: ${Date.now()}`);
        items.sort((a, b) => {
            if (a.limit == b.limit) {
                if (a.top > b.top) return 1;
                else return 0;
            }
            else if (a.limit > b.limit) return 1;
            else return -1;
        })
        items.forEach((item, i) => {
            list.push({
                index: item.index,
                text: item.data.text,
                limit: item.data.limit,
                memo: item.data.memo,
                top: (i + 1) * 70,
                color: item.data.color,
            })
            console.log(`syncList item: ${item.data.memo} ${item.data.text} ${Date.now()}`);
        });
    })
    .catch((error) => {
        console.log(error);
        list.push({index: 0, text: error.message, top: 0});
    });
    // list.sort((a, b) => {
    //     if (a.limit == b.limit) {
    //         if (a.top > b.top) return 1;
    //         else return 0;
    //     }
    //     else if (a.limit > b.limit) return 1;
    //     else return -1;
    // })
    console.log(`get end: ${Date.now()}`);
    return json({sticky_notes: list});
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { text, limit, memo, color } = await request.json();
    var item;
    await syncList.syncListItems.create({
        data: {
            text: text,
            limit: limit,
            memo: memo,
            top: 50,
            color: color,
        }
    })
    .then((item) => {
        item = {sticky_note: {
                    index: item.index, 
                    text: item.data.text,
                    limit: item.data.limit,
                    memo: item.data.memo,
                }}
    });
    return json(item);
}