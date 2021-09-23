<template>
  <v-app>
    <v-main>
      <p class="text-left ml-5 judul" style="font-size:x-large;">Laporan Audit</p>

      <v-card class="pt-5 px-5 mx-5 mb-16 pb-7" elevation="3" outlined>
        <v-toolbar flat class="mb-3">
          <v-spacer></v-spacer>
          <v-btn color="#F15A23" dark class="textTable text-none">
            <download-excel
              :data   = "audit"
              :fields = "columns"
              type = "xls"
              name = "RPTI.xls"
              title = "LAPORAN RENCANA PENGEMBANGAN TEKNOLOGI INFORMASI">
              Export to Excel
            </download-excel>
            <v-icon right dark>mdi-download</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row class="mx-2">
          <v-col cols="12" sm="6" md="6">
            <v-card class="px-5" style="height: 210px">
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12">
                    <ApexChart
                      height="200"
                      type="pie"
                      :options="apexPie.options"
                      :series="apexPie.series"
                    ></ApexChart>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-card class="pa-5" elevation="2" outlined style="height: 210px">
              <v-data-table
                :headers="headerGrafik"
                :items="dataG"
                class="textTable"
                item-key = "nomor"
                :hide-default-footer="true">
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <br>
      <br>
      <br>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
import ApexChart from "vue-apexcharts";

Vue.component('downloadExcel', JsonExcel)

export default {
name : "Audit",
components: {
  ApexChart
},
created () {
  document.title = "Reporting Audit";
},
data() {
  return {
    reportCount: null,
    error_message:'',
    loading:true,

    //List Array
    tgl: [],
    expanded:[],
    arrayReport:[],
    dataGrafik:[],
    rhaPending:[],
    rhaDone:[],
    audit:[],
    
    headerGrafik : [
      {
          text : "No",
          align : "center",
          sortable : true,
          value : "nomor",
          class : "orange accent-3 white--text"
      },
      { text : "Status", align : "center", value : "status", class : "orange accent-3 white--text"},
      { text : "Persen", align : "center", value : "persen", class : "orange accent-3 white--text"},
    ],

    dataG :[
      { nomor: 1, status: "Completed",persen : "40%" },
      { nomor: 3, status: "Uncomplete",persen : "20%"},
    ],

    columns: {
      'No': 'AIPId',
      'Nama Aplikasi/Insfrastruktur Bank': 'NamaProject',
      'Deskripsi': 'NamaAIP',
      'Kategori' : 'ProjectCategory',
      'Jenis Pengembangan' : 'JenisPengembangan',
      'Pengembang' :'Pengembang',
      'Pihak Penyedia Jasa TI Pihak Terkait':'PPJTIPihakTerkait',
      'Lokasi DC':'LokasiDC',
      'Lokasi DRC' :'LokasiDRC',
      'Waktu Rencana Implementasi':'EksImplementasi',
      'Estimasi Biaya Capex':'EstimasiBiayaCapex',
      'Estimasi Biaya Opex':'EstimasiBiayaCapex',
      'Keterangan':'StrategicImportance'
    },
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#DD2C00', '#00C853'],
        labels: ["Pending", "Completed"],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        }
      },
      series: [1, 2],
    },
  };
},
methods: {

},
  mounted(){
      
  },
};
</script>

<style scope>
.v-toolbar__content {
  padding: 0px !important;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
.title{
    color:#005E6A;
}

@media screen and (max-width: 600px) {
  .title{
  font-size: medium;
  }
}
</style>
