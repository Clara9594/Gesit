<template>
  <v-app>
    <v-main>
      <p class="text-left ml-5 judul" style="font-size:x-large;">MONITORING PROJECT RPTI</p>
      <v-row>
        <v-col>
          <v-card class="px-5 py-2 mx-5" max-width="100%" elevation="2" outlined>
            <v-toolbar flat>
              <p style="font-size:20px;" class="greetings mb-0 mt-2">Project Division Traffic</p>
              <v-spacer></v-spacer>
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
              </v-btn>
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
                  <p class="greetings mt-2 mb-0">Details Project {{listDivisi}}</p>
                </v-col>
                <v-col cols="6" sm="5" md="5">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Project"
                    class="textTable"
                    color="#F15A23"
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
                    @change="readPieChart()"
                    label ="Select Division"
                    class="textTable"
                    color="#F15A23"
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
                <template v-slot:[`item.StatusInfo`]= "{ item }">
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
              <v-row>
                <v-col cols="7">
                  <p class="greetings mt-2">Project Traffic {{listDivisi}}</p>
                </v-col>
                <v-col cols="5">
                  <v-spacer></v-spacer>
                  <v-select
                    :items = "['All', 'Completed', 'Uncomplete']"
                    label ="Filter"
                    class="textTable"
                    color="#F15A23"
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details
                    dense>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-title>
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
          value : "AIPId",
          class : "orange accent-3 white--text"
      },
      { text : "Project Name", align : "center", value : "NamaProject", class : "orange accent-3 white--text"},
      { text : "Division", align : "center", value : "Divisi", class : "orange accent-3 white--text"},
      { text : "Status", align : "center", value : "StatusInfo", class : "orange accent-3 white--text"},
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

    //ini pie chart
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#DD2C00', '#00C853'],
        labels: ["Uncomplete", "Completed"],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
          }
      },
       series : [51,49],
    },

    //ini bar chart
    series: [ //ini untuk legend dan isi data chartnya
      {
        name: 'Completed',
        color: '#00C853',
        data: [13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28]
      }, 
      {
        name: 'Uncompleted',
        color: '#DD2C00',
        data: [44, 55, 41, 67, 22, 43, 55, 32, 12, 34,
        44, 55, 41, 67, 22, 43, 55, 32, 12, 34,
        44, 55, 41, 67, 22, 43, 55, 32, 12, 34,
        44, 55, 41, 67, 22, 43, 55, 32, 12, 34,
        44, 55, 41, 67, 22, 43, 55, 32, 12]
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
        'DIVISI PERENCANAAN STRATEGIS	( REN )',
        'DIVISI KOMUNIKASI PERUSAHAAN & KESEKRETARIATAN	( KMP )',
        'DIVISI BISNIS KORPORASI 1	( KPS1 )',
        'DIVISI BISNIS KORPORASI 2	( KPS2 )',
        'DIVISI BISNIS KORPORASI 3	( KPS3 )',
        'DIVISI SINDIKASI & SOLUSI KOPORASI	( SSK )',
        'DIVISI BISNIS KOMERSIAL 1	( KOM1 )',
        'DIVISI BISNIS KOMERSIAL 2	( KOM2 )',
        'DIVISI BISNIS SME	( SME )',
        'DIVISI INTERNASIONAL	( INT )',

        'DIVISI TRESURI	( TRS )',
        'DIVISI DANA PENSIUN LEMBAGA KEUANGAN	( DLK )',
        'DIVISI MANAJEMEN RISIKO BANK	( ERM )',
        'DIVISI RISIKO KREDIT KORPORASI	( BNR )',
        'DIVISI RISIKO KREDIT KOMERSIAL & SME	( CMR )',
        'DIVISI PEMROSESAN & PENAGIHAN KREDIT KONSUMER	( CLN )',
        'DIVISI REMEDIAL & RECOVERY KORPORASI	( RRC )',
        'DIVISI REMEDIAL & RECOVERY KOMERSIAL & SME	( RRM )',
        'DIVISI PENGANGGARAN & PENGENDALIAN KEUANGAN	( PKU )',
        'DIVISI PENGELOLAAN ASET & PENGADAAN	( PFA )',
        
        'DIVISI MANAJEMEN DATA & ANALYTICS	( DMA )',
        'DIVISI PENGEMBANGAN PERUSAHAAN ANAK	( PPA )',
        'DIVISI INVESTOR RELATIONS ( IRN ) ',
        'DIVISI STRATEGI & ARSITEKTUR TI	( STI )',
        'DIVISI PENGEMBANGAN TI	( MTI )',
        'DIVISI PENGEMBANGAN DIGITAL	( DGL )',
        'DIVISI OPERASIONAL TI	( OTI )',
        'DIVISI KEAMANAN INFORMASI	( ISU )',
        'DIVISI OPERASIONAL	( OPR )',
        'DIVISI OPERASIONAL DIGITAL	( DGO )',

        'DIVISI OPERASIONAL KREDIT	( OPK )',
        'DIVISI KEPATUHAN	( KPN )',
        'DIVISI HUKUM	( HUK )',
        'DIVISI HUMAN CAPITAL STRATEGY	( HCT )',
        'DIVISI HUMAN CAPITAL SERVICES	( HCE )',
        'DIVISI PENGELOLAAN JARINGAN	( JAL )',
        'DIVISI PENJUALAN	( SLN )',
        'DIVISI KUALITASI LAYANAN	( SQU )',
        'DIVISI PUSAT LAYANAN PELANGGAN	( BCC )',
        'DIVISI HUBUNGAN KELEMBAGAAN 1	( HLB1 )',

        'DIVISI HUBUNGAN KELEMBAGAAN 2	( HLB2 )',
        'DIVISI BISNIS USAHA KECIL & PROGRAM	( BSP )',
        'DIVISI MANAJEMEN PRODUK KONSUMER	( PDM )',
        'DIVISI BISNIS KARTU	( BSK )',
        'DIVISI MANAJEMEN WEALTH	( WEM )',
        'DIVISI KOMUNIKASI PEMASARAN	( MCM )',
        'DIVISI SOLUSI WHOLESALE	( WHS )',
        'DIVISI SOLUSI RITEL	( RTL )',
        'DIVISI TATA KELOLA KEBIJAKAN	( PGV )',
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
    daftarDivisi : ['ALL','KPN','HUK','HCT','BCV','BIN','HLB','VCU',
    'JAL','BCC','SQU','LMC1','LMC2','SSK','PDM','BSK','WEM','MCM','PPA','PKU',
    'PFA','DMA','PPA - BNI Syariah','BMN','BSL1','BSL2','ERM','BNR','CMR','CLN','ADK','SAF',
    'STI','OTI','DGO','OPR','ISU','INT','SAI','KMP','REN','SCT','TBS','EBK','DGB','SLN','OPB',
    'Head Of Strategic Project','RRC','RRM','TRS','DLK','SBB','PGV','RTL','KOM1','OPK','KPS3',
    'KOM2','SME','BSP','HLB1','HLB2','IRN','KPS1','KPS2','COE','MTI','DGL','WHS'],
  };
},

methods: {
  readProject(){ //Read RHA Files
    var url =  this.$api+'/Reporting/All'
    this.$http.get(url,{
      headers:{
          'progo-key':'progo123',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("audit",response)
      this.project = response.data.data;
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
      // if(this.listDivisi == '')
      //   this.apexPie.series = [53,47];
      var completedProgo = null;
      var uncompletedProgo = null;
      var dataC = [];
      var dataU = [];
    for(let i = 0; i < this.barChart.length; i++){
        completedProgo = Math.round((this.barChart[i].Status[0].CompletedFromProgo/(this.barChart[i].TotalProject))*100);
        uncompletedProgo = Math.round((this.barChart[i].Status[0].UncompleteFromProgo/this.barChart[i].TotalProject)*100);

      dataC.push(completedProgo);
      dataU.push(uncompletedProgo);
   
    }
    console.log("haha1", this.barChart);
    console.log("haha", dataU);//isi datanya tu sebenernya dah benr, tp kenapa ya
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
    })
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
      this.pieChart = response.data;
      var complete = null;
      var uncomplete = null;
      complete = Math.round((this.pieChart[0].Status[0].CompletedFromProgo/this.pieChart[0].TotalProject)*100);
      uncomplete = Math.round((this.pieChart[0].Status[0].UncompleteFromProgo/this.pieChart[0].TotalProject)*100);
      //uncomplete = Math.round((this.pieChart[0].Status[0].UncompletePercentage/this.pieChart[0].TotalProject)*100);
      this.apexPie.series.push(uncomplete,complete)
    })
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
            return !this.daftarDivisi || (i.Divisi === this.listDivisi);
          })
      }
        },
  },
  
  mounted(){
    this.readProject();
    this.readBarChart();
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
</style>
