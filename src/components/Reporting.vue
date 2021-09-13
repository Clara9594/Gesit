<template>
  <v-app>
    <v-main>
      <p class="text-left ml-5 judul" style="font-size:x-large;">Laporan {{tipe}}</p>
      <v-card v-if="tipe=='Rencana Pengembangan Teknologi Informasi (RPTI)' 
      || tipe=='Insertion' 
      || tipe=='Revisi Rencana Pengembangan Teknologi Informasi (Revisi RPTI)'" 
      class="pt-5 px-5 mx-5 mb-16" 
      elevation="3" 
      outlined>
        <v-toolbar flat class="mb-3">
          <v-card max-width="400" elevation="0" class="mt-6 pr-5">
            <v-select 
              v-model="tipe"
              :items="report"
              label="Type of Report"
              class="textTable"
              color="#F15A23"
              outlined
              dense>
            </v-select>
          </v-card>
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
        <v-data-table 
          :headers="upHeaders"
          class="textTable"
          ref="exportable_table"
          :items = "audit" 
          :search = "search" 
          :sort-by="['no']" 
          item-key = "AIPId" 
          fixed-header
          :loading="loading"
          loading-text="Loading... Please wait"
          :items-per-page="10"
          :expanded.sync="expanded"
          show-expand>
          <template v-slot:[`item.JenisPengembangan`]= "{ item }">
            <span v-if="item.JenisPengembangan=='' || item.JenisPengembangan==null"> -
            </span>
            <span v-else> {{item.JenisPengembangan}}
            </span>
          </template>
          <template v-slot:[`item.Pengembang`]= "{ item }">
            <span v-if="item.Pengembang=='' || item.Pengembang==null"> -
            </span>
            <span v-else> {{item.Pengembang}}
            </span>
          </template>
          <template v-slot:[`item.LokasiDC`]= "{ item }">
            <span v-if="item.LokasiDC=='' || item.LokasiDC==null"> -
            </span>
            <span v-else-if="item.LokasiDC=='DC Slipi - Jakarta' || item.LokasiDC=='DC Sudirman Jakarta'"> Jakarta, Indonesia
            </span>
            <span v-else-if="item.LokasiDC=='DRC Purwakarta'"> Purwakarta, Indonesia
            </span>
            <span v-else-if="item.LokasiDC=='KCLN Singapore'"> Singapore, Singapore
            </span>
            <span v-else-if="item.LokasiDC=='KCLN Tokyo'"> Tokyo, Jepang
            </span>
            <span v-else-if="item.LokasiDC=='KCLN Seoul'"> Seoul, Korea Selatan
            </span>
            <span v-else-if="item.LokasiDC=='KCLN London'"> London, UK
            </span>
            <span v-else-if="item.LokasiDC=='KCLN HongKong'"> Hongkong, Hongkong
            </span>
            <span v-else-if="item.LokasiDC=='New York'"> New York, US
            </span>
          </template>
          
          <template v-slot:[`item.LokasiDRC`]= "{ item }">
            <span v-if="item.LokasiDRC=='' || item.LokasiDRC==null"> -
            </span>
             <span v-else-if="item.LokasiDRC=='DC Slipi - Jakarta' || item.LokasiDRC=='DC Sudirman Jakarta'"> Jakarta, Indonesia
            </span>
            <span v-else-if="item.LokasiDRC=='DRC Purwakarta'"> Purwakarta, Indonesia
            </span>
            <span v-else-if="item.LokasiDRC=='KCLN Singapore'"> Singapore, Singapore
            </span>
            <span v-else-if="item.LokasiDRC=='KCLN Tokyo'"> Tokyo, Jepang
            </span>
            <span v-else-if="item.LokasiDRC=='KCLN Seoul'"> Seoul, Korea Selatan
            </span>
            <span v-else-if="item.LokasiDRC=='KCLN London'"> London, UK
            </span>
            <span v-else-if="item.LokasiDRC=='KCLN HongKong'"> Hongkong, Hongkong
            </span>
            <span v-else-if="item.LokasiDRC=='New York'"> New York, US
            </span>
          </template>
          <template v-slot:[`item.PPJTIPihakTerkait`]= "{ item }">
            <span v-if="item.PPJTIPihakTerkait=='' || item.PPJTIPihakTerkait==null"> -
            </span>
            <span v-else> {{item.PPJTIPihakTerkait}}
            </span>
          </template>
          <template v-slot:[`item.ProjectCategory`]= "{ item }">
            <span v-if="item.ProjectCategory=='' || item.ProjectCategory==null"> -
            </span>
            <span v-else> {{item.ProjectCategory}}
            </span>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <p class="font-weight-bold mt-4 mb-0">Deskripsi</p>
              <p>
                {{item.NamaAIP}}
              </p>
              <p class="font-weight-bold mt-4 mb-0">Keterangan</p>
              <p v-if="item.StrategicImportance=='' || item.StrategicImportance==null">-</p>
              <p v-else>
                {{item.StrategicImportance}}
              </p>
            </td>
          </template>
        </v-data-table>
      </v-card>

      <v-card 
        v-else 
        class="pt-5 px-5 mx-5 mb-16 pb-7" 
        elevation="3" 
        outlined>
        <v-toolbar flat class="mb-3">
          <v-card max-width="400" elevation="0" class="mt-6 pr-5">
            <v-select 
              v-model="tipe"
              :items="report"
              label="Type of Report"
              class="textTable"
              color="#F15A23"
              outlined
              dense>
            </v-select>
          </v-card>
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
// import {VueJsExcel} from '../mixins/vue-js-excel'
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
import ApexChart from "vue-apexcharts";

Vue.component('downloadExcel', JsonExcel)

export default {
name : "Monitoring",
// mixins: [VueJsExcel],
components: {
  // VcPiechart
  ApexChart
},
created () {
  document.title = "Reporting";
},
data() {
  return {
    inputType: 'Add',
    tipe:'Rencana Pengembangan Teknologi Informasi (RPTI)',
    search : null,
    dialog : false,
    editCheck: true,
    modalDelete: false,
    modalEdit: false,
    snackbar :false,
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
    menu2: false,
    color: '',
    upHeaders : [
        { text : "No", align : "center", value : "AIPId", sortable : false, class : "orange accent-3 white--text"},
        { text : "Nama Aplikasi/Infras Bank",align : "center",value : "NamaProject", sortable : false, class : "orange accent-3 white--text"},
        // { text : "Deskripsi", align : "center",value : "NamaAIP", sortable : false,},
        { text : "Kategori", align : "center", value : "ProjectCategory", sortable : false,class : "orange accent-3 white--text"},
        { text : "Jenis Pengembangan", align : "center", value : "JenisPengembangan", sortable : false,class : "orange accent-3 white--text"},
        { text : "Pengembang",  align : "center", value : "Pengembang", sortable : false,class : "orange accent-3 white--text"},
        { text : "Pihak Penyedia", align : "center", value : "PPJTIPihakTerkait", sortable : false,class : "orange accent-3 white--text"},
        { text : "Lokasi DC", align : "center", value : "LokasiDC", sortable : false,class : "orange accent-3 white--text"},
        { text : "Lokasi DRC", align : "center", value : "LokasiDRC", sortable : false,class : "orange accent-3 white--text"},
        { text : "Waktu Rencana Implementasi", align : "center", value : "EksImplementasi", sortable : false,class : "orange accent-3 white--text"},
        { text : "Biaya Capex", align : "center", value : "EstimasiBiayaCapex", sortable : false,class : "orange accent-3 white--text"},
        { text : "Biaya Opex", align : "center", value : "EstimasiBiayaCapex", sortable : false,class : "orange accent-3 white--text"},
        // { text : "Keterangan", align : "center", value : "StrategicImportance", sortable : false,class : "orange accent-3 white--text"},
        { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],
    // downHeaders : [
    //     { text : "DC", align : "center", value : "dc"},
    //     { text : "DRC", align : "center", value : "drc"},
    //     { text : "Capex", align : "center", value : "capex"},
    //     { text : "Opex", align : "center", value : "opex"},
    // ],
    
    data : [
      { no : 1, aplikasi:"Account Maintance",kategori:"Pengelolaan Nasabah",jenis:"Baru",pengembang:"Inhouse",penyedia:"Ya", dc:"Jakarta", drc:"Purwakarta",waktu:"14/07/2021", capex: "Rp1.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 2, aplikasi:"BB Online",kategori:"Pembayaran",jenis:"Baru",pengembang:"PPJTI",penyedia:"Ya", dc:"Kalimantan", drc:"Yogyakarta",waktu:"14/07/2021", capex: "Rp2.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 3, aplikasi:"CelenganQu",kategori:"Layanan Perbankan Elektronik",jenis:"Upgrade",pengembang:"PPJTI",penyedia:"Ya", dc:"Jakarta", drc:"Tegal",waktu:"14/07/2021", capex: "Rp5.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 4, aplikasi:"Digimap",kategori:"Manajemen Sistem Informasi",jenis:"Baru",pengembang:"Inhouse",penyedia:"Ya", dc:"Bekasi", drc:"Jakarta",waktu:"14/07/2021", capex: "Rp4.000.000", opex: "Rp1.000.000",keterangan:""},
    ],

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

    dataTable : [
      { aipId : "#1211", projectName:"ProTeam", divisi:"STI",status:"40"},
      { aipId : "#1212", projectName:"Ensiklopedia", divisi:"STI",status:"45"},
      { aipId : "#1213", projectName:"Gesit", divisi:"STI",status:"75"},
      { aipId : "#1214", projectName:"ProGo", divisi:"STI",status:"63"},
      { aipId : "#1215", projectName:".EXE", divisi:"STI",status:"100"},
      { aipId : "#1216", projectName:"Mobile", divisi:"STI",status:"20"},
      { aipId : "#1217", projectName:"Cardless", divisi:"STI",status:"10"},
    ],

    report:['Rencana Pengembangan Teknologi Informasi (RPTI)','Revisi Rencana Pengembangan Teknologi Informasi (Revisi RPTI)','Insertion','Audit'],
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
  readReportingAudit(){ //Read RHA Files
    var url =  'http://35.219.107.102/progodev/api/project?kategori=All'
    this.$http.get(url,{
      headers:{
          'progo-key':'progo123',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.audit = response.data.data;
      if(this.audit != [])
        this.loading = false;

      for(let i = 0; i < this.audit.length; i++){
        // Zuzurly ini lumayan banyak filternya ya bun! Zemangat :)
        // var getDC = this.audit[i].LokasiDC;
        // var getDRC = this.audit[i].LokasiDRC;
        // if(getDC == "DC Slipi - Jakarta" || getDC == "DC Sudirman Jakarta")
        //   this.audit[i].LokasiDC = "DC " + getDC.split(" ")[3] + " - Indonesia";
        // else if (getDRC == "DC Slipi - Jakarta" || getDRC == "DC Sudirman Jakarta")
        //   this.audit[i].LokasiDRC = "DRC " + getDRC.split(" ")[3] + " - Indonesia";
        
        if(this.audit[i].EstimasiBiayaCapex!= 0 || this.audit[i].EstimasiBiayaOpex!=0){
          this.audit[i].EstimasiBiayaCapex = "Rp"+this.audit[i].EstimasiBiayaCapex;
          this.audit[i].EstimasiBiayaOpex = "Rp"+this.audit[i].EstimasiBiayaOpex;
        }
      }
    })
  },

  // readRHAPending(){ //Read RHA yang masing Pending
  //   var url =  this.$api+'/Reporting/RHAPending'
  //   this.$http.get(url,{
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Authorization' : 'Bearer ' + localStorage.getItem('token')
  //     }
  //   }).then(response => { 
  //     // console.log("Pending",response)
  //     this.rhaPending = response.data.data;
  //   })
  // },

  //  readRHADone(){ //Read RHA yang Done
  //   var url =  this.$api+'/Reporting/RHADone'
  //   this.$http.get(url,{
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Authorization' : 'Bearer ' + localStorage.getItem('token')
  //     }
  //   }).then(response => { 
  //     // console.log("Done",response)
  //     this.rhaDone = response.data.data;
  //   })
  // },

  // readReporting(){ //Read Reporting
  //   var dataReport = {};
  //   var statusLaporan = null;
  //   var jumlahPersen = null;
  //   var url =  this.$api+'/Reporting/CountRHA'
  //   this.$http.get(url,{
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Authorization' : 'Bearer ' + localStorage.getItem('token')
  //     }
  //   }).then(response => { 
  //     this.reportCount = response.data;
  //     for(let y=0;y<=1;y++){
  //       if(y==0){
  //         statusLaporan='Pending',
  //         jumlahPersen=(this.reportCount.rha_count_pending/this.reportCount.rha_count_all)*100;
  //       }
  //       else{
  //         statusLaporan='Complete',
  //         jumlahPersen=(this.reportCount.rha_count_done/this.reportCount.rha_count_all)*100;
  //       }
  //       dataReport[y] = {
  //         no:y+1,
  //         status: statusLaporan,
  //         jumlah: jumlahPersen+'%',
  //       };
  //       this.arrayReport.push(dataReport[y]);
  //     }
  //     this.dataGrafik.push(this.reportCount.rha_count_pending,this.reportCount.rha_count_done);
  //   })
  // },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  mounted(){
    // this.readRHADone();
    // this.readRHAPending();
    // this.readReporting();
    this.readReportingAudit();
  },
  // this.readEvidence();
};
</script>

<style scope>
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
