<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-6 ml-9 mb-6">MONITORING</v-toolbar-title>
      <v-card max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
        <v-toolbar height="100px">
          <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
            <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="tgl"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Tanggal"
                  append-icon="mdi-calendar"
                  readonly
                  @change="cekTanggal()"
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tgl"
                type="month"
                scrollable
                range>
                <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="cancel()">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu2.save(tgl)">
                    OK
                  </v-btn>
              </v-date-picker>
            </v-menu>
          </v-card>
          <v-spacer></v-spacer>
          <v-btn fab small color="#F15A23" dark class="mr-5">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
      <v-row>
        <v-col>
          <v-card max-width="1600" class="pt-5 px-5 mx-5" elevation="2" outlined>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                rounded
                dense
                filled
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers = "headers" :items = "data" :search = "search" :sort-by="['no']" item-key = "data" :items-per-page="5">
              <template v-slot:[`item.traffic`]="{ item }" >
                <td>
                  <v-chip v-if="item.traffic == 'Canceled'" color="red" dark>
                      {{ item.traffic }}
                  </v-chip>

                  <v-chip v-else-if="item.traffic == 'Completed'" color="green" dark>
                      {{ item.traffic }}
                  </v-chip>

                  <v-chip v-else color="orange" dark>
                      {{ item.traffic }}
                  </v-chip>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col lg="4" sm="5" md="4" cols="12">
          <v-card class="mx-5 mb-16 pb-16" style="height: 228px" max-width="400">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">Project Traffic</p>
            </v-card-title>
            <v-card-text class="pa-2">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="100"
                    type="donut"
                    :options="apexPie.options"
                    :series="apexPie.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <br>
    <br>
    <br>
    <br>
  </v-app>
</template>

<script>
// import VcPiechart from 'vc-piechart'
// import 'vc-piechart/dist/lib/vc-piechart.min.css'

import ApexChart from "vue-apexcharts";

export default {
name : "Monitoring",
components: {
  // VcPiechart
  ApexChart
},
created () {
  document.title = "Monitoring";
},
data() {
  return {
    inputType: 'Add',
    load: false,
    search : null,
    dialog : false,
    editCheck: true,
    modalDelete: false,
    modalEdit: false,
    snackbar :false,
    error_message:'',
    tgl: [],
    menu2: false,
    color: '',
    headers : [
        {
            text : "No",
            align : "start",
            sortable : true,
            value : "no",
        },
        { text : "Traffic", value : "traffic"},
        { text : "Project Name", value : "projectName"},
        { text : "Kelompok", value : "kelompok"},
        { text : "Start Date", value : "startDate"},
        { text : "Due Date", value : "dueDate"},
    ],
    data : [
      { no : "#1211", traffic:"Pending",projectName:"ProTeam",kelompok:"3",startDate:"05/7/2021", dueDate:"10/9/2021"},
      { no : "#1212", traffic:"Canceled",projectName:"Ensiklopedia",kelompok:"2",startDate:"12/7/2021", dueDate:"27/9/2021"},
      { no : "#1213", traffic:"Completed",projectName:"Gesit",kelompok:"4",startDate:"12/7/2021", dueDate:"27/9/2021"},
      { no : "#1214", traffic:"Pending",projectName:"ProGo",kelompok:"1",startDate:"05/7/2021", dueDate:"10/9/2021"},
      { no : "#1215", traffic:"Completed",projectName:".EXE",kelompok:"5",startDate:"12/7/2021", dueDate:"27/9/2021"},
    ],
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#f44336', '#ff9800', '#4caf50'],
        labels: ["Canceled", "Pending", "Completed"],
        legend: {

        }
      },
      series: [1, 2, 2],
    },
  };
},

methods: {
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
  // cekTanggal(){
  //   var dataTable = [];
  //   var awal = new Date(this.tgl[0]);
  //   var akhir = new Date(this.tgl[1]);
  //   // alert(awal+akhir);
  //   for(let i = 0;i<this.data.length;i++){
  //     var tglAwal = new Date(this.data[i].startDate);
  //     var tglAkhir = new Date(this.data[i].endDate);
  //     if(tglAwal.getMonth() == awal.getMonth() 
  //       && tglAkhir.getFullYear() == akhir.getFullYear()){
  //       dataTable.push(this.data[i])
  //     }
  //   }
  //   return dataTable;
  // }
},
computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
  },
};
</script>

<style scope>
.title{
    color:#005E6A;
}
</style>
