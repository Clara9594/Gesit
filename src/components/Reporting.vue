<template>
  <v-main class="courses">
    <v-toolbar-title class="text-left font-weight-bold ml-9  mb-6">Laporan Rencana Pengembangan Project IT</v-toolbar-title>
    <v-card max-width="1600" class="ml-9 mr-9 mb-5" elevation="3" outlined>
      <v-row class="mt-3">
        <v-col sm="5" class="ml-10">
          <p class="text-left font-weight-bold">Type of Report</p>
           <v-col
        dense
        class="d-flex"
        cols="100"
        sm="6"
        >
        <v-select
          :items="items"
          label="Report"
          outlined
        ></v-select>
      </v-col>
        </v-col>
      </v-row>
      <br>
    </v-card>
  </v-main>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
name : "Reporting",
created () {
  document.title = "Reporting";
},
data() {
    return {
        
    };
},

methods: {
}
};
</script>

<style scope>

</style>
