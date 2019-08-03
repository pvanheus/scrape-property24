export async function handler(event, context, callback) {
    const axios = require('axios');
    const $ = require('cheerio');

    let url = event.queryStringParameters.infourl;
    let url_parts = url.split('/');  // we will get ['https:', '', 'host']
    let base_url = url_parts.slice(0,3).join('/');
    let response = await axios.get(url);
    let info = $('div.p24_alphabet div.col-xs-4 > a', response.data);
    let streets = Array();
    for (let i = 0; i < info.length; i++ ) {
        streets.push({
            name: info[i].children[0].data,
            url: base_url + info[i].attribs.href
        });
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: streets})
    })

}
