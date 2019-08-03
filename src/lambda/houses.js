export async function handler(event, context, callback) {
    const axios = require('axios');
    const $ = require('cheerio');

    let url = event.queryStringParameters.infourl;
    let response = await axios.get(url);
    let info = $('tr.p24_markerRow', response.data);
    let houses = Array();
    let addresses_seen = new Set();
    for (let i = 0; i < info.length; i++ ) {
        if (info[i].children[3].children[1] && info[i].children[5].children[1] &&
            info[0].children[7].children[0]) {
            let address = info[i].children[3].children[1].attribs.title;
            if (!addresses_seen.has(address)) {
                houses.push({
                    name: info[i].children[3].children[1].attribs.title,
                    sale_price_img: info[i].children[5].children[1].attribs.src,
                    sale_year_img: info[i].children[7].children[0].attribs.src
                });
                addresses_seen.add(address);
            }
        }
    }
    // property24 listing for Muizenberg
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: houses})
    })

}
