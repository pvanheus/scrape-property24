<template>
  <v-data-table
    :header="headers"
    :items="houseList"
    item-key="name"
    loading
    disable-pagination
  >
  </v-data-table>
</template>

<script>
import Tesseract from "tesseract.js";

const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

const axios = require("axios");

export default {
  name: "HouseTable",
  props: {
    streetName: {
      type: String,
      default: "Albertyn Road (default)"
    },
    streetInfoUrl: {
      type: String,
      default:
        "https://www.property24.com/property-values/albertyn-road/muizenberg/cape-town/western-cape/9025"
    }
  },
  data: () => ({
    headers: [
      { text: "Address", value: "name" },
      { text: "Sale Year", value: "sale_year" },
      { text: "Sale Price", value: "sale_price" }
    ],
    houseList: []
  }),
  mounted() {
    axios
      .get(`/.netlify/functions/houses?infourl=${this.streetInfoUrl}`)
      .then(response => {
        let rawHouseList = response.data.msg;
        this.houseList = [];
        for (let i = 0; i < rawHouseList.length; i++) {
          this.houseList.push({
            name: rawHouseList[i].name,
            sale_price: "<working>",
            sale_year: "<working>"
          });
          worker.recognize(rawHouseList[i].sale_price_img).then(result => {
            let final_text = result.text.replace(/\s+/g, "").replace("R", "R ");
            this.houseList[i].sale_price = final_text;
          });
          worker.recognize(rawHouseList[i].sale_year_img).then(result => {
            let final_text = result.text.replace(/\s+/g, "").replace("R", "R ");
            this.houseList[i].sale_year = final_text;
          });
        }
      });
  }
};
</script>

<style scoped></style>
