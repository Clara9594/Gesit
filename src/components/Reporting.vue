<template>
  <v-app>
    <v-main>
    <v-container fluid>
        <p class="text-left mt-6 ml-2 judul" style="font-size:x-large;" >Laporan {{tipe}}</p>
        </v-container>
        <v-card max-width="1600" class="mb-5 mx-5" elevation="2" outlined>
          <v-toolbar height="100px" flat>
            <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
              <v-select 
                v-model="tipe"
                :items="report"
                label="Type of Report"
                @change="reporting()"
                class="textTable"
                outlined
                dense>
              </v-select>
            </v-card>
          <v-spacer></v-spacer>
          <v-btn color="#F15A23" dark class="mr-5 textTable text-none">
            <download-excel
                :data   = "data"
                :fields = "columns"
                type = "xls"
                name = "RPTI.xls"
                title = "LAPORAN RENCANA PENGEMBANGAN TEKNOLOGI INFORMASI">
                Export to Excel
            </download-excel>
          </v-btn>
          </v-toolbar>
        </v-card>
        <v-card v-if="tipe=='Rencana Pengembangan Teknologi Informasi (RPTI)' || tipe=='Insertion'" max-width="1600" class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
          <v-data-table
            :headers="upHeaders"
            class="textTable"
            ref="exportable_table"
            :items = "data" 
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
        <v-col cols="12" sm="6" md="6">
          <v-card class="px-5 pb-5" elevation="2" outlined v-if="tipe=='Audit'">
            <v-card-title class="flex-nowrap pt-6 pl-6 pb-0">
              <p class="greetings text-center mb-0">Details Graphic</p>
            </v-card-title>
              <v-data-table
                :headers="headerGrafik"
                :items="reportCount"
                class="textTable"
                item-key = "rha_count_done">
              </v-data-table>
          </v-card>
        </v-col>
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
Vue.component('downloadExcel', JsonExcel)

export default {
name : "Monitoring",
// mixins: [VueJsExcel],
created () {
  document.title = "Reporting";
},
data() {
  return {
    inputType: 'Add',
    tipe: localStorage.getItem('tipe'),
    load: false,
    search : null,
    dialog : false,
    editCheck: true,
    modalDelete: false,
    modalEdit: false,
    snackbar :false,
    reportCount: null,
    error_message:'',
    tgl: [],
    expanded:[],
    arrayReport:[],
    menu2: false,
    color: '',
    upHeaders : [
        { text : "No", rowspan: 2, colspan: 1, align : "center", sortable : true, value : "no"},
        { text : "Nama Aplikasi/Infras Bank",align : "center", rowspan: 2, colspan: 1, value : "aplikasi"},
        { text : "Deskripsi", rowspan: 2, colspan: 1,  align : "center",value : "deskripsi"},
        { text : "Kategori", rowspan: 2, colspan: 1, align : "center", value : "kategori"},
        { text : "Jenis Pengembangan", rowspan: 2, colspan: 1, align : "center", value : "jenis"},
        { text : "Pengembang", rowspan: 2, colspan: 1, align : "center", value : "pengembang"},
        { text : "Pihak Penyedia", rowspan: 2, colspan: 1, align : "center", value : "penyedia"},
        { text : "Lokasi DC", rowspan: 2, colspan: 1, align : "center", value : "dc"},
        { text : "Lokasi DRC", rowspan: 2, colspan: 1, align : "center", value : "drc"},
        { text : "Waktu Rencana Implementasi", rowspan: 2, colspan: 1,  align : "center", value : "waktu"},
        { text : "Estimasi Biaya Capex", rowspan: 2, colspan: 1, align : "center", value : "capex"},
        { text : "Estimasi Biaya Opex", rowspan: 2, colspan: 1, align : "center", value : "opex"},
        { text : "Keterangan", rowspan: 2, colspan: 1,  align : "center", value : "keterangan"},
    ],
    // downHeaders : [
    //     { text : "DC", align : "center", value : "dc"},
    //     { text : "DRC", align : "center", value : "drc"},
    //     { text : "Capex", align : "center", value : "capex"},
    //     { text : "Opex", align : "center", value : "opex"},
    // ],
    data : [
      { no : 1, aplikasi:"Account Maintance",deskripsi:"On Process",kategori:"Pengelolaan Nasabah",jenis:"Baru",pengembang:"Inhouse",penyedia:"Ya", dc:"Jakarta", drc:"Purwakarta",waktu:"14/07/2021", capex: "Rp1.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 2, aplikasi:"BB Online",deskripsi:"On Process",kategori:"Pembayaran",jenis:"Baru",pengembang:"PPJTI",penyedia:"Ya", dc:"Kalimantan", drc:"Yogyakarta",waktu:"14/07/2021", capex: "Rp2.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 3, aplikasi:"CelenganQu",deskripsi:"On Process",kategori:"Layanan Perbankan Elektronik",jenis:"Upgrade",pengembang:"PPJTI",penyedia:"Ya", dc:"Jakarta", drc:"Tegal",waktu:"14/07/2021", capex: "Rp5.000.000", opex: "Rp1.000.000",keterangan:""},
      { no : 4, aplikasi:"Digimap",deskripsi:"On Process",kategori:"Manajemen Sistem Informasi",jenis:"Baru",pengembang:"Inhouse",penyedia:"Ya", dc:"Bekasi", drc:"Jakarta",waktu:"14/07/2021", capex: "Rp4.000.000", opex: "Rp1.000.000",keterangan:""},
    ],
    headerGrafik : [
        {
            text : "No",
            align : "center",
            sortable : true,
            value : "nomor",
        },
        { text : "Status", align : "center", value : "rha_count_done"},
        { text : "Persen", align : "center", value : "rha_count_all"},
    ],
  
    report:['Rencana Pengembangan Teknologi Informasi (RPTI)','Revisi Rencana Pengembangan Teknologi Informasi (Revisi RPTI)','Insertion','Audit'],
    columns: {
      'No': 'no',
      'Nama Aplikasi/Insfrastruktur Bank': 'aplikasi',
      'Deskripsi': 'deskripsi',
      'Kategori' : 'kategori',
      'pengembang Pengembangan' : 'pengembang',
      'Pengembang' :'pengembang',
      'Pihak Penyedia Jasa TI Pihak Terkait':'penyedia',
      'Lokasi DC':'dc',
      'Lokasi DRC' :'drc',
      'Waktu Rencana Implementasi':'waktu',
      'Estimasi Biaya Capex':'capex',
      'Estimasi Biaya Opex':'opex',
      'Keterangan':'keterangan'
    },
  };
  
},


methods: {
  readReporting(){ //Read Reporting
    var url =  this.$api+'/Reporting/CountRHA'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      console.log(response)
      this.reportCount = response.data.rha_count_all;
      this.arrReporting();
    })
  },

  arrReporting(){
    var dataReport = {};
    console.log('test '+this.reportCount)
    for(let x=0;x<=this.reportCount.length;x++){
      for(let y=0;y<=this.reportCount[x];y++){
      dataReport = {
        statusPending: 'Pending',
        jumlahPending: this.reportCount[x].rha_count_pending,
        statuDone: 'Completed',
        jumlahDone: this.reportCount[x].rha_count_done,
      };
      this.arrayReport.push(dataReport);
    }}
    console.log(this.arrayReport)
    return this.arrayReport;
    
    
  },
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
  reporting(){
    localStorage.setItem('tipe',this.tipe);
  }
  // ExcelExport(){
  //   this.VueJsExcelExport(this.data,"Laporan RPTI",this.columns)
  // }
},
mounted(){
  this.readReporting();
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
