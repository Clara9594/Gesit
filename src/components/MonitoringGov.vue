<template>
  <v-app>
    <v-main>
      <p class="text-left mt-6 ml-5 judul" style="font-size:x-large;">MONITORING PROJECT GOVERNANCE</p>
      <v-row>
        <v-col>
          <v-card class="pt-5 px-5 mx-5" elevation="2" outlined>
            <ApexChart
              height="300"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></ApexChart>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="pt-5 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="pb-0 mb-2">
              <v-autocomplete
                :items = "listDivisi"
                outlined
                label ="Select Division"
                dense>
              </v-autocomplete>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mx-2">
        <v-col cols="12" sm="6" md="6">
          <v-card class="px-5" style="height: 410px; overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row>
                <v-col cols="7">
                  <p class="greetings">Project Traffic</p>
                </v-col>
                <v-col cols="5">
                  <v-spacer></v-spacer>
                  <v-select
                    :items = "['All', 'Completed', 'Uncomplete']"
                    outlined
                    label ="Filter"
                    dense>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="290"
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
          <v-card class="px-5" elevation="2" outlined style="height: 410px; overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row>
                <v-col cols="7" class="pb-0">
                  <p class="greetings mb-0">Details Graphic</p>
                </v-col>
                <v-col cols="5" class="pb-0">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search RHA"
                    single-line
                    rounded
                    class="mb-5 textTable"
                    dense
                    filled
                    hide-details>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <div>
              <v-data-table
                :headers="headerGrafik"
                :items="data"
                class="textTable"
                item-key = "aipId"
                :search = "search"
                fixed-header
                :items-per-page="5"
                hide-default-footer
                @page-count="pageCount = $event"
                :page.sync="page">
                <template v-slot:[`item.status`]= "{ item }">
                  <v-progress-linear dark v-if="item.status < 100" color="red" v-model="item.status" height="25">
                    <strong>{{ Math.ceil(item.status) }}%</strong>
                  </v-progress-linear>
                  <v-progress-linear dark v-else-if="item.status==100" color="green" v-model="item.status" height="25">
                    <strong>{{ Math.ceil(item.status) }}%</strong>
                  </v-progress-linear>
                </template>
              </v-data-table>
              <div class="text-center">
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                  color="#F15A23">
                </v-pagination>
              </div>
            </div>
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
  document.title = "Monitoring Governance";
},
data() {
  return {
    page: 1,
    pageCount: 0,
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

    //header table
    headerGrafik : [
      {
          text : "Aip Id",
          align : "center",
          sortable : true,
          value : "aipId",
      },
      { text : "Project Name", align : "center", value : "projectName"},
      { text : "Division", align : "center", value : "divisi"},
      { text : "Status", align : "center", value : "status"},
    ],

    //data dummy untuk table
    data : [
      { aipId : "#1211", projectName:"ProTeam", divisi:"STI",status:"40"},
      { aipId : "#1212", projectName:"Ensiklopedia", divisi:"STI",status:"45"},
      { aipId : "#1213", projectName:"Gesit", divisi:"STI",status:"75"},
      { aipId : "#1214", projectName:"ProGo", divisi:"STI",status:"63"},
      { aipId : "#1215", projectName:".EXE", divisi:"STI",status:"100"},
      { aipId : "#1216", projectName:"Mobile", divisi:"STI",status:"20"},
      { aipId : "#1217", projectName:"Cardless", divisi:"STI",status:"10"},
    ],

    //ini pie chart
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#f44336', '#4caf50'],
        labels: ["Uncomplete", "Done"],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
          }
      },
      series: [1, 2],
    },

    //ini bar chart
    series: [ //ini untuk legend dan isi data chartnya
      {
        name: 'Uncompleted',
        color: '#f44336',
        data: [44, 55, 41, 67, 22, 43, 55, 32, 12, 34, 73]
      }, 
      {
        name: 'Completed',
        color: '#4caf50',
        data: [13, 23, 20, 8, 13, 27, 33, 45, 28, 10, 5]
      }, 
    ],
    
    chartOptions: {
      chart: { //Ini pengaturan jenis chart dan tingginya
        type: 'bar',
        height: 350,
      },

      plotOptions: { //Ini pengaturan besar bar nya
        bar: {
          horizontal: false,
          columnWidth: '40%',
          endingShape: 'rounded'
        },  
      },

      dataLabels: { //Ini ngasih detail nilai di bar chartnya
        enabled: false
      },

      xaxis: { //Ini ngasih detail nama divisi untuk bagian bawah
        categories: ['Division A', 'Division B', 'Division C', 'Division D', 
        'Division E', 'Division F', 'Division G', 'Division H', 'Division I',
        'Division J', 'Division K'],
        
      },

      yaxis: { //Ini ngasih detail satuan nilai untuk bagian kiri
        title: {
          text: 'Percentage %'
        }
      },

      fill: { //Ini mempertegas warna bar
        opacity: 1
      },

      tooltip: { //Ini ngasih detail nilai untuk setiap bar kalau kursor diarahkan ke bar tsb
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      }
    },

    //Ini list divisi untuk di autocomplete "Select Division"
    listDivisi : ['Division A', 'Division B', 'Division C', 'Division D', 
      'Division E', 'Division F', 'Division G', 'Division H', 'Division I',
      'Division J', 'Division K'],
  };
},

methods: {

},
computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
  },
};
</script>

<style scope>
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.orangeFont{
  font-family: 'Secular One', sans-serif;
}

.orangeText{
  color:#F15A23;
}

.greenText{
  color:#005E6A;
}

.judul{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
}

</style>
