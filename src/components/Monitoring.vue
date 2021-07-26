<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-6 ml-9 mb-6">MONITORING</v-toolbar-title>
      <v-card max-width="1600" class="mb-5 mx-5" elevation="2" outlined>
        <v-toolbar height="100px" flat>
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
              <template v-slot:[`item.traffic`]="{ item }">
                <td class="d-flex justify-center">
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
      </v-row>
      <v-row class="px-5">
        <v-col>
          <v-card style="height: 250px">
            <v-card-title class="flex-nowrap pt-6 pl-6 pb-0">
              <p class="text-truncate">Project Traffic</p>
            </v-card-title>
            <v-card-text class="pa-2">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="170"
                    type="pie"
                    :options="apexPie.options"
                    :series="apexPie.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="2" outlined>
            <v-card-title class="flex-nowrap pt-6 pl-6 pb-0">
              <p class="mb-0">Detail Graphic</p>
            </v-card-title>
              <v-data-table
                :headers="headerGrafik"
                :items="dataG"
                item-key = "nomor"
                :hide-default-footer="true">
                <template v-slot:[`item.actions`]= "{ item }">
                  <v-icon color="orange" @click="listHandler(item)" class="mr-5">mdi-format-list-bulleted</v-icon>
                </template>
              </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px" >
          <v-card>
            <v-card-title class="font-weight-bold">Project List :</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <div v-if="listStatus=='Completed'" class="mt-3">
                <div v-for="i in data" :key="i.no">
                  <p class="text-left mb-1" v-if="i.traffic=='Completed'"> 
                    <v-icon>mdi-circle-small</v-icon>
                    {{ i.projectName }} </p>
                </div>
              </div>
              <div v-else-if="listStatus=='Pending'" class="mt-3">
                <div v-for="i in data" :key="i.no">
                  <p class="text-left mb-1" v-if="i.traffic=='Pending'"> 
                    <v-icon>mdi-circle-small</v-icon>
                    {{ i.projectName }} </p>
                </div>
              </div>
              <div v-else class="mt-3">
                <div v-for="i in data" :key="i.no">
                  <p class="text-left mb-1" v-if="i.traffic=='Canceled'">
                    <v-icon>mdi-circle-small</v-icon>
                    {{ i.projectName }} </p>
                </div>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#005E6A" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    listId:'',
    listStatus:'',
    headers : [
        {
            text : "No",
            align : "center",
            sortable : true,
            value : "no",
        },
        { text : "Traffic", align : "center", value : "traffic"},
        { text : "Project Name", align : "center",value : "projectName"},
        { text : "Kelompok", align : "center",value : "kelompok"},
        { text : "Start Date",align : "center", value : "startDate"},
        { text : "Due Date", align : "center",value : "dueDate"},
    ],
    headerGrafik : [
        {
            text : "No",
            align : "center",
            sortable : true,
            value : "nomor",
        },
        { text : "Status", align : "center", value : "status"},
        { text : "Persen", align : "center", value : "persen"},
        { text : "", align : "center", value : "actions"},
    ],
    dataG :[
      { nomor: 1, status: "Completed",persen : "40%" },
      { nomor: 2, status: "Pending",persen : "40%"},
      { nomor: 3, status: "Canceled",persen : "20%"},
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
            position: 'bottom',
            horizontalAlign: 'center',
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
  listHandler(item){
    this.listId = item.nomor;
    this.listStatus = item.status;
    this.dialog = true;
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
