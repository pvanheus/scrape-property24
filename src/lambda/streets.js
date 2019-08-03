export async function handler(event, context, callback) {
    const axios = require('axios');
    const $ = require('cheerio');

    // const url = 'https://www.property24.com/property-values/muizenberg/cape-town/western-cape/9025'
    let url = event.queryStringParameters.infourl;
    let url_parts = url.split('/');  // we will get ['https:', '', 'host']
    let base_url = url_parts.slice(0,3).join('/');
    console.log('base_url: ' + base_url);
    let response = await axios.get(url);
    let info = $('div.p24_alphabet div.col-xs-4 > a', response.data);
    // console.log(info[0]);
    let streets = Array();
    for (let i = 0; i < info.length; i++ ) {
        streets.push({
            name: info[i].children[0].data,
            url: base_url + info[i].attribs.href
        });
    }
    // console.log(url);
    // property24 listing for Muizenberg
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: streets})
    })

}
