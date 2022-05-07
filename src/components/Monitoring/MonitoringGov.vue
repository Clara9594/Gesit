<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
        <v-row no-gutters>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">MONITORING PROJECT GOVERNANCE</p>
            <v-breadcrumbs :items="routing" class="pa-0 textTable warna">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <v-row>
        <v-col>
          <v-card class="px-5 py-2 mx-5" max-width="100%" elevation="2" outlined>
            <v-toolbar flat>
              <p style="font-size:20px;" class="greetings mb-0 mt-2">Project Division Traffic</p>
              <!--<v-spacer></v-spacer>
              <v-btn
                v-if="cekFilter==null"
                class="my-2 mr-2"
                small
                color="#F15A23"
                dark
                @click="cekFilter=null">
                All
              </v-btn>
              <v-btn
                v-else
                class="my-2 mr-2"
                small
                outlined
                color="#F15A23"
                dark
                @click="cekFilter=null">
                All
              </v-btn>
              <v-btn
                v-if="cekFilter==null"
                class="ma-2"
                outlined
                small
                color="#F15A23"
                dark
                @click="cekFilter=1">
                Not Comply
              </v-btn>
              <v-btn
                v-else
                class="ma-2"
                small
                color="#F15A23"
                dark>
                Not Comply
              </v-btn>-->
            </v-toolbar>
            <div>
              <ApexChart
                height="400"
                type="bar"
                :options="chartOptions"
                :series="series"
              ></ApexChart>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mx-2">
        <v-col cols="12" sm="8" md="8">
          <v-card class="px-5" elevation="2" outlined style="overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row class="mb-3">
                <v-col cols="12" sm="5" md="5">
                  <p class="greetings mt-2 mb-0" v-if="listDivisi=='ALL'">Details Project All</p>
                  <p class="greetings mt-2 mb-0" v-else>Details Project {{listDivisi}}</p>
                </v-col>
                <v-col cols="6" sm="5" md="5">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Project"
                    class="textTable"
                    color="#26A69A"
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details
                    dense>
                  </v-text-field>
                </v-col>
                <v-col cols="6" sm="2" md="2" class="pr-0">
                  <v-autocomplete
                    v-model="listDivisi"
                    :items = "daftarDivisi"
                    @change="pilihPie()"
                    label ="Select Division"
                    class="textTable"
                    color="#26A69A"
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details
                    dense>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-card-title>
            <div>
              <v-data-table v-if="listDivisi!='All'"
                :headers="headerGrafik"
                :items="filteredItems"
                class="textTable"
                item-key = "aipId"
                :search = "search"
                fixed-header
                :loading="loading"
                loading-text="Loading... Please wait"
                :items-per-page="5">
                <template v-slot:[`item.StatusInfo`]= "{ item }">
                  <v-progress-linear color="#DD2C00" v-if="item.StatusInfo[0].PercentageCompleted < 100" :value="item.StatusInfo[0].PercentageCompleted" height="25">
                    <strong class="white--text">{{item.StatusInfo[0].PercentageCompleted}}%</strong>
                  </v-progress-linear>
                  <v-progress-linear color="#00C853" v-if="item.StatusInfo[0].PercentageCompleted == 100" :value="item.StatusInfo[0].PercentageCompleted" height="25">
                    <strong>{{item.StatusInfo[0].PercentageCompleted}}%</strong>
                  </v-progress-linear>
                </template>
              </v-data-table>
              <v-data-table v-else
                :headers="headerGrafik"
                :items="project"
                class="textTable"
                item-key = "aipId"
                :search = "search"
                fixed-header
                :loading="loading"
                loading-text="Loading... Please wait"
                :items-per-page="5">
                <template v-slot:[`item.StatusInfo`]= "{ item }">
                  <v-progress-linear color="#DD2C00" v-if="item.StatusInfo[0].PercentageCompleted < 100" :value="item.StatusInfo[0].PercentageCompleted" height="25">
                    <strong class="white--text">{{item.StatusInfo[0].PercentageCompleted}}%</strong>
                  </v-progress-linear>
                  <v-progress-linear color="#00C853" v-if="item.StatusInfo[0].PercentageCompleted == 100" :value="item.StatusInfo[0].PercentageCompleted" height="25">
                    <strong>{{item.StatusInfo[0].PercentageCompleted}}%</strong>
                  </v-progress-linear>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-card class="px-5" elevation="2" outlined style="height:437px">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <!--<v-row>
                <v-col cols="7">-->
                  <p class="greetings mt-2" v-if="listDivisi=='ALL'">Project Traffic All</p>
                  <p class="greetings mt-2" v-else>Project Traffic {{listDivisi}}</p>
                <!--</v-col>
              </v-row>-->
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="350"
                    type="pie"
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
  </v-app>
</template>

<script>
import ApexChart from "vue-apexcharts";

export default {
name : "Monitoring",
components: {
  ApexChart
},
created () {
  document.title = "Monitoring Governance";
},
data() {
  return {
    cekFilter:null,
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
    status:45,
    tgl: [],
    project: [],
    barChart: [],
    pieValue: [],
    pieChartAll:[],
    loading : true,
    menu2: false,
    color: '',
    getStatus : null,
    filter:'',
    listId:'',
    listStatus:'',
    listDivisi:'All',
    statusPie: null,
    filterStatusPie : ['All', 'Completed', 'Uncomplete'],
    headerDetail : [
        {
          text : "No",
          align : "center",
          sortable : true,
          value : "nomor",
          class : "orange accent-3 white--text"
      },
      { text : "Status", align : "center", value : "status", class : "orange accent-3 white--text"},
      { text : "Persen", align : "center", value : "persen", class : "orange accent-3 white--text"},
      { text : "Actions", align : "center", value : "actions", class : "orange accent-3 white--text"},
    ],

    //header table
    headerGrafik : [
      {
          text : "AIP ID",
          align : "center",
          sortable : true,
          value : "AIPId",
          class : "orange accent-3 white--text"
      },
      { text : "Project Name", align : "center", value : "NamaProject", class : "orange accent-3 white--text"},
      { text : "Division", align : "center", value : "Divisi", class : "orange accent-3 white--text"},
      { text : "Percentage", align : "center", value : "StatusInfo", class : "orange accent-3 white--text"},
    ],

    routing: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'Monitoring Governance Project',
        disabled: true,
      },  
    ],

    //ini pie chart
    pieChart:[],
    apexPie: {
      options: {
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        colors: ['#DD2C00', '#00C853'],
        labels: ["Uncomplete", "Completed"],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
        tooltip: {
          enabled: false,
        }
      },
      series : [],
      
    },

    //ini bar chart
    series: [],
    chartOptions: {
      chart: { //Ini pengaturan jenis chart dan tingginya
        type: 'bar',
        height: 350,
      },

      plotOptions: { //Ini pengaturan besar bar nya
        bar: {  
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded'
        },  
      },
      dataLabels: { //Ini ngasih detail nilai di bar chartnya
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },

      xaxis: { //Ini ngasih detail nama divisi untuk bagian bawah
        //49
        tickPlacement: 'on',
        categories: [
          'PDM','ISU','WEM','SLN','BCC','EBK','JAL','TBS','DLK','BSL1',
          'BMN','BSL2','PKU','HLB','SSK','BSK','CLN','CMR','LMC1','ERM',
          'ADK','OPR','RRM','INT','TRS','PFA','REN','DGO','PGV','OTI',
          'STI','DMA','RTL','HCT','BCV','KPN','PPA -','HUK','WHS','PPA',
          'SAI','KMP'
        ],
        labels: {
          style: {
            fontSize: '10px',
          },
        },
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
    daftarDivisi : [
      'ALL','PDM','ISU','WEM','SLN','BCC','EBK','JAL','TBS','DLK','BSL1',
      'BMN','BSL2','PKU','HLB','SSK','BSK','CLN','CMR','LMC1','ERM',
      'ADK','OPR','RRM','INT','TRS','PFA','REN','DGO','PGV','OTI',
      'STI','DMA','RTL','HCT','BCV','KPN','PPA -','HUK','WHS','PPA',
      'SAI','KMP'],
  };
},

methods: {
  readProject(){ //Read all data project from reporting for monitoring
    var url =  this.$api+'/Reporting/All'
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.project = response.data.progoproject;
      console.log(this.project)
      if(this.project!=[])
        this.loading = false;

      for(let i = 0; i < this.project.length; i++){
        var persen = this.project[i].StatusInfo[0].PercentageCompleted;
        this.project[i].StatusInfo[0].PercentageCompleted = Math.round(persen*100);
      }
    })
  },

  readBarChart(){ //Read project status for bar chart
    var url =  this.$api+'/Monitoring/All'
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.barChart = response.data.progoproject;
      this.barChartFiller();
    })
  },

  barChartFiller(){ // Make a new object for bar chart
    var complete = null;
    var uncomplete = null;
    var dataC = [];
    var dataU = [];
    var listCategory = this.chartOptions.xaxis.categories;
    // console.log("Ini categori",this.chartOptions.xaxis.categories.length);
    for(let i = 0; i < this.barChart.length; i++){
      for(let j = 0; j < listCategory.length; j++){
        if(this.barChart[i].Division == listCategory[j]){
          complete = Math.round(this.barChart[i].CompletedPercentage*100);
          uncomplete = (100-complete);
          dataC.push(complete);
          dataU.push(uncomplete);
          // console.log(i+1,this.barChart[i].Division,listCategory[j])
          // console.log(this.barChart[i].Division,complete,uncomplete)
        }
      }
    }
    this.series = [
      {
        name: 'Completed',
        color: '#00C853',
        data: dataC,
      },
      {
        name: 'Uncompleted',
        color: '#DD2C00',
        data: dataU,
      }
    ];
    return this.series;
  },

  readPieChart(){ //Read project status for pie chart
    this.apexPie.series = [];
    var url =  this.$api+'/Monitoring/All/' + this.listDivisi;
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.pieChart = response.data.progoproject;
      var complete = null;
      var uncomplete = null;
      complete = Math.round(this.pieChart[0].completedPercentage*100);
      uncomplete = (100-complete);
      this.apexPie.series.push(uncomplete,complete)
    })
  },

  readPieChartGovAll(){ //Read project status for pie chart untuk data All
    this.apexPie.series = [];
    var url =  this.$api+'/Monitoring/StatusAll/All'
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.pieChartAll = response.data;
      var completeAll = null;
      var uncompleteAll = null;
      completeAll = Math.round((this.pieChartAll.completedCountFromPercentage/this.pieChartAll.projectCount)*100);
      uncompleteAll = Math.round((this.pieChartAll.uncompleteCountFromPercentage/this.pieChartAll.projectCount)*100);
      this.apexPie.series.push(uncompleteAll,completeAll);
    })
  },

  pilihPie(){
    if(this.listDivisi!='ALL'){
      this.readPieChart();
    }
    else{
      this.readPieChartGovAll();
    }
  },
},
computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
    filteredItems() {
      if(this.listDivisi=='ALL'){
       return this.project;
      }
      else{
        return this.project.filter((i) => {
          return !this.daftarDivisi || (i.Divisi === this.listDivisi);
        })
      }
    },
  },
  
  mounted(){
    this.readProject();
    this.readBarChart();
    this.readPieChartGovAll();
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

.graphic-container {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space:nowrap;
  min-width: 1200px;
  max-width: 1200px;
}

.warna{
  color:#2196F3;
}
</style>
