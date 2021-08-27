<template>
  <v-app>
    <v-main>
    <v-container fluid>
        <p class="text-left mt-6 ml-2 judul" style="font-size:x-large;" >Laporan {{tipe}}</p>
        </v-container>
        <v-card class="mb-5 mx-5" elevation="2" outlined>
          <v-toolbar height="100px" flat>
            <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
              <v-select 
                v-model="tipe"
                :items="report"
                label="Type of Report"
                class="textTable"
                outlined
                dense>
              </v-select>
            </v-card>
          <v-spacer></v-spacer>
          <v-btn color="#F15A23" dark class="mr-5 textTable text-none">
            <download-excel
                :data   = "audit"
                :fields = "columns"
                type = "xls"
                name = "RPTI.xls"
                title = "LAPORAN RENCANA PENGEMBANGAN TEKNOLOGI INFORMASI">
                Export to Excel
            </download-excel>
          </v-btn>
          </v-toolbar>
        </v-card>
        <v-card v-if="tipe=='Rencana Pengembangan Teknologi Informasi (RPTI)' || tipe=='Insertion' || tipe=='Revisi Rencana Pengembangan Teknologi Informasi (Revisi RPTI)'" class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
          <v-data-table
            :headers="upHeaders"
            class="textTable"
            ref="exportable_table"
            :items = "audit" 
            :search = "search" 
            :sort-by="['no']" 
            item-key = "no" 
            fixed-header
            height="300px"
            :items-per-page="5">
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
            <!--<template v-slot:body="{ items }">
              <thead>
                <tr>
                  <template v-for="(headerItem1, idx1) in upHeaders">
                    <th :rowspan="headerItem1.rowspan" :colspan="headerItem1.colspan" :key="'header1'+idx1" :style="{ textAlign: headerItem1.align }">{{ headerItem1.text }}</th>
                  </template>
                </tr>
                
                <tr>
                  <template v-for="(headerItem2, idx2) in downHeaders">
                    <th :key="'header2'+idx2" :style="{ textAlign: headerItem2.align }">{{ headerItem2.text }}</th>
                  </template>
                </tr>
              </thead>
              <tbody class="cell-border">
                <tr v-for="(item,index) in items" :key="index">
                  <td class="text-center">{{item.no}}</td>
                  <td class="text-center">{{item.aplikasi}}</td>
                  <td class="text-center">{{item.deskripsi}}</td>
                  <td class="text-center">{{item.kategori}}</td>
                  <td class="text-center">{{item.jenis}}</td>
                  <td class="text-center">{{item.pengembang}}</td>
                  <td class="text-center">{{item.penyedia}}</td>
                  <td class="text-center">{{item.dc}}</td>
                  <td class="text-center">{{item.drc}}</td>
                  <td class="text-center">{{item.waktu}}</td>
                  <td class="text-center">{{item.capex}}</td>
                  <td class="text-center">{{item.opex}}</td>
                  <td class="text-center">{{item.keterangan}}</td>
                </tr>
              </tbody>
            </template>-->
          </v-data-table>
        </v-card>
        <v-row class="mx-2" v-if="tipe=='Audit'" >
          <v-col cols="12" sm="6" md="6">
            <v-card class="px-5" style="height: 210px">
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12">
                    <ApexChart
                      height="200"
                      type="pie"
                      :options="apexPie.options"
                      :series="dataGrafik"
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
                :items="arrayReport"
                class="textTable"
                item-key = "nomor"
                :hide-default-footer="true">
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
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
    load: false,
    search : null,
    dialog : false,
    editCheck: true,
    modalDelete: false,
    modalEdit: false,
    snackbar :false,
    reportCount: null,
    error_message:'',

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
        { text : "No", rowspan: 2, colspan: 1, align : "center", sortable : true, value : "AIPId"},
        { text : "Nama Aplikasi/Infras Bank",align : "center", rowspan: 2, colspan: 1, value : "aplikasi"},
        { text : "Deskripsi", rowspan: 2, colspan: 1,  align : "center",value : "NamaProject"},
        { text : "Kategori", rowspan: 2, colspan: 1, align : "center", value : ""},
        { text : "Jenis Pengembangan", rowspan: 2, colspan: 1, align : "center", value : "jenis"},
        { text : "Pengembang", rowspan: 2, colspan: 1, align : "center", value : "pengembang"},
        { text : "Pihak Penyedia", rowspan: 2, colspan: 1, align : "center", value : "penyedia"},
        { text : "Lokasi DC", rowspan: 2, colspan: 1, align : "center", value : "dc"},
        { text : "Lokasi DRC", rowspan: 2, colspan: 1, align : "center", value : "drc"},
        { text : "Waktu Rencana Implementasi", rowspan: 2, colspan: 1,  align : "center", value : "waktu"},
        { text : "Estimasi Biaya Capex", rowspan: 2, colspan: 1, align : "center", value : "ProjectBudget"},
        { text : "Estimasi Biaya Opex", rowspan: 2, colspan: 1, align : "center", value : "ProjectBudget"},
        { text : "Keterangan", rowspan: 2, colspan: 1,  align : "center", value : "StrategicImportance"},
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
            value : "no",
        },
        { text : "Status", align : "center", value : "status"},
        { text : "Persen", align : "center", value : "jumlah"},
    ],
  
    report:['Rencana Pengembangan Teknologi Informasi (RPTI)','Revisi Rencana Pengembangan Teknologi Informasi (Revisi RPTI)','Insertion','Audit'],
    columns: {
      'No': 'AIPId',
      'Nama Aplikasi/Insfrastruktur Bank': 'aplikasi',
      'Deskripsi': 'NamaProject',
      'Kategori' : 'kategori',
      'pengembang Pengembangan' : 'pengembang',
      'Pengembang' :'pengembang',
      'Pihak Penyedia Jasa TI Pihak Terkait':'penyedia',
      'Lokasi DC':'dc',
      'Lokasi DRC' :'drc',
      'Waktu Rencana Implementasi':'EksImplementasi',
      'Estimasi Biaya Capex':'ProjectBudget',
      'Estimasi Biaya Opex':'ProjectBudget',
      'Keterangan':'StrategicImportance'
    },
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: [ '#ff9800', '#4caf50'],
        labels: ["Pending", "Completed"],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        }
      },
    },
  };
},
methods: {
  readReportingAudit(){ //Read RHA Files
    var url =  'http://35.219.107.102/progo/api/project?kategori=All'
    this.$http.get(url,{
      headers:{
          'progo-key':'progo123',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("audit",response)
      this.audit = response.data.data;
    })
  },
  readRHAPending(){ //Read RHA yang masing Pending
    var url =  this.$api+'/Reporting/RHAPending'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("Pending",response)
      this.rhaPending = response.data.data;
    })
  },

   readRHADone(){ //Read RHA yang Done
    var url =  this.$api+'/Reporting/RHADone'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log("Done",response)
      this.rhaDone = response.data.data;
    })
  },

  readReporting(){ //Read Reporting
    var dataReport = {};
    var statusLaporan = null;
    var jumlahPersen = null;
    var url =  this.$api+'/Reporting/CountRHA'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.reportCount = response.data;
      for(let y=0;y<=1;y++){
        if(y==0){
          statusLaporan='Pending',
          jumlahPersen=(this.reportCount.rha_count_pending/this.reportCount.rha_count_all)*100;
        }
        else{
          statusLaporan='Complete',
          jumlahPersen=(this.reportCount.rha_count_done/this.reportCount.rha_count_all)*100;
        }
        dataReport[y] = {
          no:y+1,
          status: statusLaporan,
          jumlah: jumlahPersen+'%',
        };
        this.arrayReport.push(dataReport[y]);
      }
      this.dataGrafik.push(this.reportCount.rha_count_pending,this.reportCount.rha_count_done);
    })
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  mounted(){
    this.readRHADone();
    this.readRHAPending();
    this.readReporting();
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
