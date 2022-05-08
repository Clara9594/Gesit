<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
        <v-row no-gutters>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">MONITORING RPTI</p>
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
              <v-spacer></v-spacer>
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

      <v-row class="px-5">
        <v-col>
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
                 <template v-slot:[`item.StatusInfo[0].Status`]= "{ item }">
                  <v-chip color="#DD2C00" outlined v-if="item.StatusInfo[0].Status=='Uncomplete'" dark>
                    Uncompleted
                  </v-chip>
                  <v-chip color="#00C853" outlined v-if="item.StatusInfo[0].Status=='Completed'" dark>
                    Completed
                  </v-chip>
                </template>
              </v-data-table>
              <v-data-table v-else
                :headers="headerGrafik"
                :items="project"
                class="textTable"
                item-key = "aipId"
                :search = "search"
                :loading="loading"
                loading-text="Loading... Please wait"
                fixed-header
                :items-per-page="5">
                <template v-slot:[`item.StatusInfo[0].Status`]= "{ item }">
                  <v-chip color="#DD2C00" outlined v-if="item.StatusInfo[0].Status=='Uncomplete'" dark>
                    Uncompleted
                  </v-chip>
                  <v-chip color="#00C853" outlined v-if="item.StatusInfo[0].Status=='Completed'" dark>
                    Completed
                  </v-chip>
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

      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px" >
          <v-card>
            <v-card-title class="font-weight-bold">Project List :</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="textTable">
              <div v-if="listStatus=='Completed'" class="mt-3">
                <div v-for="i in data" :key="i.no">
                  <p class="text-left mb-1" v-if="i.status=='100'"> 
                    <v-icon>mdi-circle-small</v-icon>
                    {{ i.projectName }} </p>
                </div>
              </div>
              <div v-else class="mt-3">
                <div v-for="i in data" :key="i.no">
                  <p class="text-left mb-1" v-if="i.status!='100'">
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
import ApexChart from "vue-apexcharts";

export default {
name : "MonitoringRPTI",
components: {
  ApexChart
},
created () {
  document.title = "Monitoring RPTI";
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
    listStatusFilter: '',
    statusPie: null,
    tgl: [],
    project: [],
    pieChartAll: [],
    menu2: false,
    color: '',
    loading : true,
    filter:'',
    listId:'',
    listStatus:'',
    listDivisi:'All',
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
          value : "aip_id",
          class : "orange accent-3 white--text"
      },
      { text : "Project Name", align : "center", value : "nama_project", class : "orange accent-3 white--text"},
      { text : "Division", align : "center", value : "divisi", class : "orange accent-3 white--text"},
      { text : "Status", align : "center", value : "StatusInfo[0].Status", class : "orange accent-3 white--text"},
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

    dataG :[
      { nomor: 1, status: "Completed",persen : "40%" },
      { nomor: 3, status: "Uncomplete",persen : "20%"},
    ],

    routing: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'Monitoring RPTI',
        disabled: true,
      },  
    ],

    //ini pie chart
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
          'STI', 'ISU', 'BCC'
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
            return val + "%" //val ini dapetnya dari mana?
          }
        }
      }
    },

    //Ini list divisi untuk di autocomplete "Select Division"
    daftarDivisi : ['ALL','STI', 'ISU', 'BCC'],
  };
},

methods: {
  readProject(){ //Read RHA Files
    var url =  this.$api+'/Reporting/All'
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("audit",response)
      this.project = response.data.progoproject;
      if(this.project!=[])
        this.loading = false;
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
      this.barChart = response.data; 
      var completedProgo = null;
      var uncompletedProgo = null;
      var dataC = [];
      var dataU = [];
    for(let i = 0; i < this.barChart.length; i++){
      completedProgo = Math.round((this.barChart[i].Status[0].CompletedFromProgo/(this.barChart[i].TotalProject))*100);
      uncompletedProgo = Math.round((this.barChart[i].Status[0].UncompleteFromProgo/this.barChart[i].TotalProject)*100);

      dataC.push(completedProgo);
      dataU.push(uncompletedProgo);
      // console.log(this.barChart[i].Division, this.barChart[i].Status[0].CompletedFromProgo, this.barChart[i].TotalProject, completedProgo);//isi datanya tu sebenernya dah benr, tp kenapa ya
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
    // console.log(this.series)
    return this.series;
    })
  },
  readPieChartRPTI(){ //Read project status for pie chart
    this.apexPie.series = [];
    var url =  this.$api+'/Monitoring/All/' + this.listDivisi;
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.pieChart = response.data;
      var complete = null;
      var uncomplete = null;
      complete = Math.round((this.pieChart[0].status[0].completedFromProgo/this.pieChart[0].totalProject)*100);
      uncomplete = Math.round((this.pieChart[0].status[0].uncompleteFromProgo/this.pieChart[0].totalProject)*100);
      this.apexPie.series.push(uncomplete,complete)
    })
  },
  readPieChartRPTIAll(){ //Read project status for pie chart untuk data All
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
      completeAll = Math.round((this.pieChartAll.completedCountFromProgo/this.pieChartAll.projectCount)*100);
      uncompleteAll = Math.round((this.pieChartAll.uncompleteCountFromProgo/this.pieChartAll.projectCount)*100);
      this.apexPie.series.push(uncompleteAll,completeAll);
    })
  },

  pilihPie(){
    if(this.listDivisi!='ALL'){
      this.readPieChartRPTI();
    }
    else{
      this.readPieChartRPTIAll();
    }
  },
  
  listHandler(item){
    this.listId = item.nomor;
    this.listStatus = item.status;
    this.dialog = true;
  }
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
          return !this.daftarDivisi || (i.divisi === this.listDivisi);
        })
      }
    },
  },
  
  mounted(){
    this.readProject();
    this.readBarChart();
    this.readPieChartRPTIAll();
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
