<template>
  <v-app>
    <v-main>
      <p class="text-left mt-6 ml-5 judul" style="font-size:x-large;">MONITORING PROJECT GOVERNANCE</p>
      <v-row>
        <v-col>
          <v-card class="pt-5 px-5 mx-5" max-width="100%" elevation="2" outlined>
            <v-card-title class="flex-nowrap pb-0">
              <v-row>
                <v-col cols="7">
                  <p class="greetings">Project Division Traffic</p>
                </v-col>
                <v-col cols="5">
                  <v-spacer></v-spacer>
                  <v-select
                    :items = "['All', 'Top 10 not comply']"
                    outlined
                    label ="Filter"
                    dense>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-title>
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

      <v-row>
        <v-col>
          <v-card class="pt-5 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="pb-0 mb-2">
              <v-autocomplete
                v-model="listDivisi"
                :items = "daftarDivisi"
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
          <v-card class="px-5" elevation="2" outlined style="height: 300px;">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row>
                <v-col cols="7">
                  <p class="greetings">Project Traffic {{listDivisi}}</p>
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
          <v-card class="px-5" elevation="2" outlined style="height: 300px; overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row>
                <v-col cols="7" class="pb-0">
                  <p class="greetings mb-0">Details Graphic {{listDivisi}}</p>
                </v-col>
              </v-row>
            </v-card-title>
            <div class="mt-5">
              <v-data-table
                :headers="headerDetail"
                :items="dataG"
                class="textTable"
                item-key = "nomor"
                :hide-default-footer="true">
                <template v-slot:[`item.actions`]= "{ item }">
                  <v-icon color="orange" @click="listHandler(item)" class="mr-5">mdi-format-list-bulleted</v-icon>
                </template>
              </v-data-table>
            </div>
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

      <v-row class="px-5">
        <v-col>
           <v-card class="px-5" elevation="2" outlined style="overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row>
                <v-col cols="7" class="pb-0">
                  <p class="greetings mb-0">Details Project {{listDivisi}}</p>
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
              <v-data-table v-if="listDivisi!='All'"
                :headers="headerGrafik"
                :items="filteredItems"
                class="textTable"
                item-key = "aipId"
                :search = "search"
                fixed-header
                :items-per-page="5">
                <template v-slot:[`item.status`]= "{ item }">
                  <v-progress-linear dark v-if="item.status < 100" color="red" v-model="item.status" height="25">
                    <strong>{{ Math.ceil(item.status) }}%</strong>
                  </v-progress-linear>
                  <v-progress-linear dark v-else-if="item.status==100" color="green" v-model="item.status" height="25">
                    <strong>{{ Math.ceil(item.status) }}%</strong>
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
                :items-per-page="5">
                <template v-slot:[`item.status`]= "{ item }">
                  <v-progress-linear dark v-if="item.status!= null" color="red" v-model="item.status" height="25">
                    <strong>{{ Math.ceil(item.status) }}%</strong>
                  </v-progress-linear>
                  <v-progress-linear dark color="green" v-model="status" height="25">
                    <strong>{{ Math.ceil(status) }}%</strong>
                  </v-progress-linear>
                </template>
              </v-data-table>
              
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
    status:45,
    tgl: [],
    project: [],
    menu2: false,
    color: '',
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
      },
      { text : "Status", align : "center", value : "status"},
      { text : "Persen", align : "center", value : "persen"},
      { text : "", align : "center", value : "actions"},
    ],

    //header table
    headerGrafik : [
      {
          text : "AIP ID",
          align : "center",
          sortable : true,
          value : "AIPId",
      },
      { text : "Project Name", align : "center", value : "NamaProject"},
      { text : "Division", align : "center", value : "Divisi"},
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
        name: 'Completed',
        color: '#4caf50',
        data: [13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28, 10,
        13, 23, 20, 8, 13, 27, 33, 45, 28]
      }, 
      {
        name: 'Uncompleted',
        color: '#f44336',
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
            return val + "%"
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
    var url =  'http://35.219.107.102/progodev/api/project?kategori=All'
    this.$http.get(url,{
      headers:{
          'progo-key':'progo123',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("audit",response)
      this.project = response.data.data;
    })
  },
  hitungStatus(){

  },
  listHandler(item){
    this.listId = item.nomor;
    this.listStatus = item.status;
    this.dialog = true;
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
