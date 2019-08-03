<template>
    <v-container>
        <v-layout wrap>
            <v-flex v-for="street in streetList" :key="street.name" xs6>
                <router-link :to="{ name: 'houses', params: { streetName: street.name, streetInfoUrl: street.url }}">{{ street.name }}</router-link>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    const axios = require('axios');

    export default {
        name: "StreetList",
        data: () =>  ({
            streetList: []
        }),
        mounted() {
            axios.get('/.netlify/functions/streets?infourl=https://www.property24.com/property-values/muizenberg/cape-town/western-cape/9025')
                .then(response => {
                        this.streetList = response.data.msg
                    }

                )
        }
    }
</script>

<style scoped>

</style>