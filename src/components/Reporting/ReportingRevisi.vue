<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
        <v-row no-gutters>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">LAPORAN REVISI RENCANA PENGEMBANGAN TEKNOLOGI INFORMASI (RPTI)</p>
            <v-breadcrumbs :items="routing" class="pa-0 textTable warna">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <v-card class="pt-2 px-5 mx-5 mb-16" elevation="3" outlined>
        <v-toolbar flat class="textTable">
          <v-text-field
            v-model="searchRPTI"
            append-icon="mdi-magnify"
            label="Search"
            class="pr-5 textTable"
            color="#26A69A"
            solo
            flat
            background-color="#EEEEEE"
            filled
            hide-details
            dense>
          </v-text-field>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="year"
                label="Select Periode"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs" 
                v-on="on" 
                color="#26A69A"
                class="pr-5 textTable"
                dense
                solo
                flat
                background-color="#EEEEEE"
                filled
                hide-details
              ></v-text-field>
            </template> 
            <v-date-picker
              ref="picker"
              :active-picker.sync="activePicker"
              v-model="date"
              @input="save"
              reactive
              no-title
            ></v-date-picker>
          </v-menu>
          <v-btn @click="cekIsi" color="#F15A23" dark class="text-none textTable">
            <download-excel
            :data   = "rpti"
            :fields = "columns"
            type = "xls"
            name = "Revisi RPTI.xls"
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
          :items = "rpti" 
          :search = "searchRPTI" 
          :sort-by="['no']" 
          item-key = "aip_id" 
          fixed-header
          :loading="loading"
          loading-text="Loading... Please wait"
          :items-per-page="10"
          :expanded.sync="expanded"
          show-expand>
          <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
              <p class="font-weight-bold mt-4 mb-0">Deskripsi</p>
              <p>
                  {{item.nama_aip}}
              </p>
              <p class="font-weight-bold mt-4 mb-0">Keterangan</p>
              <p v-if="item.strategic_importance=='' || item.strategic_importance==null">-</p>
              <p v-else>
                  {{item.strategic_importance}}
              </p>
              </td>
          </template>
        </v-data-table>
      </v-card>
      <br>
      <br>
      <v-snackbar v-model="alert" color="red" timeout="3000" bottom>
        Export Failed because data is empty
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
// import ApexChart from "vue-apexcharts";

Vue.component('downloadExcel', JsonExcel)

export default {
name : "RPTI",
created () {
  document.title = "Reporting Revisi RPTI";
},
data() {
  return {
    alert: false,
    inputType: 'Add',
    tipe:'Rencana Pengembangan Teknologi Informasi (RPTI)',
    searchRPTI : null,
    dialog : false,
    editCheck: true,
    menu: false,
    activePicker: null,
    year: 2022,
    date: null,
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
    rpti:[],
    menu2: false,
    color: '',
    upHeaders : [
      { text : "No", align : "center", value : "aip_id", sortable : false, class : "orange accent-3 white--text"},
      { text : "Nama Aplikasi/Infras Bank",align : "center",value : "nama_project", sortable : false, class : "orange accent-3 white--text"},
      // { text : "Deskripsi", align : "center",value : "NamaAIP", sortable : false,},
      { text : "Kategori", align : "center", value : "project_category", sortable : false,class : "orange accent-3 white--text"},
      { text : "Jenis Pengembangan", align : "center", value : "jenis_pengembangan", sortable : false,class : "orange accent-3 white--text"},
      { text : "Pengembang",  align : "center", value : "pengembang", sortable : false,class : "orange accent-3 white--text"},
      { text : "Pihak Penyedia", align : "center", value : "ppjti_pihak_terkait", sortable : false,class : "orange accent-3 white--text"},
      { text : "Lokasi DC", align : "center", value : "lokasi_dc", sortable : false,class : "orange accent-3 white--text"},
      { text : "Lokasi DRC", align : "center", value : "lokasi_drc", sortable : false,class : "orange accent-3 white--text"},
      { text : "Waktu Rencana Implementasi", align : "center", value : "eks_implementasi", sortable : false,class : "orange accent-3 white--text"},
      { text : "Biaya Capex", align : "center", value : "estimasi_biaya_capex", sortable : false,class : "orange accent-3 white--text"},
      { text : "Biaya Opex", align : "center", value : "estimasi_biaya_opex", sortable : false,class : "orange accent-3 white--text"},
      // { text : "Keterangan", align : "center", value : "StrategicImportance", sortable : false,class : "orange accent-3 white--text"},
      { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],
    columns: {
      'No': 'aip_id',
      'Nama Aplikasi/Insfrastruktur Bank': 'nama_project',
      'Deskripsi': 'nama_aip',
      'Kategori' : 'project_category',
      'Jenis Pengembangan' : 'jenis_pengembangan',
      'Pengembang' :'pengembang',
      'Pihak Penyedia Jasa TI Pihak Terkait':'ppjti_pihak_terkait',
      'Lokasi DC':'lokasi_dc',
      'Lokasi DRC' :'lokasi_drc',
      'Waktu Rencana Implementasi':'eks_implementasi',
      'Estimasi Biaya Capex':'estimasi_biaya_capex',
      'Estimasi Biaya Opex':'estimasi_biaya_opex',
      'Keterangan':'strategic_importance'
    },
    routing: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'Laporan Revisi RPTI',
        disabled: true,
      },  
    ],
  };
},
methods: {
  readReportingRPTI(){ //Read RHA Files
    var url = 'https://gesit.hasura.app/api/rest/progoproject/periode/'+ this.year;
    //var url =  'http://35.219.107.102/progodev/api/project?kategori=All&periode='+this.year;
    this.$http.get(url,{
      headers:{
        'x-hasura-admin-secret':'K6ib0Lj8V8fY33OxHhqPjdfDlJXqk8QU8ZU11w3yFApXL31Ex0baObiA3s3uJ0Vu',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rpti = response.data.progoproject;
      console.log(this.rpti)
      if(this.rpti.length != 0){
        this.loading = false;
        var tampung = null;

        for(let i = 0; i < this.rpti.length; i++){
          tampung = this.rpti[i].eks_implementasi.split(' ');
          if(this.rpti[i].eks_implementasi!=null ||this.rpti[i].eks_implementasi!=''){
            if(tampung.length != 1){
              var array = this.rpti[i].eks_implementasi.split(' ');
              this.rpti[i].eks_implementasi = array[0] + ' ' + array[1];
            }
          }

          var getDC = this.rpti[i].lokasi_dc;
          var getDRC = this.rpti[i].lokasi_drc;
          if(getDC == "DC Slipi - Jakarta")
            this.rpti[i].lokasi_dc = "Jakarta, Indonesia";
          if(getDRC == "DC Slipi - Jakarta")
            this.rpti[i].lokasi_drc = "Jakarta, Indonesia";
          if(getDC == "DC Sudirman Jakarta")
            this.rpti[i].lokasi_dc = "Jakarta, Indonesia";
          if(getDRC == "DC Sudirman Jakarta")
            this.rpti[i].lokasi_drc = "Jakarta, Indonesia";

          if(getDC == "DC Purwakarta")
            this.rpti[i].lokasi_dc = "Purwakarta, Indonesia";
          if(getDRC == "DRC Purwakarta")
            this.rpti[i].lokasi_drc = "Purwakarta, Indonesia";
          if(getDC == "DRC Purwakarta")
            this.rpti[i].lokasi_dc = "Purwakarta, Indonesia";
          if(getDRC == "DC Purwakarta")
            this.rpti[i].lokasi_drc = "Purwakarta, Indonesia";

          if(getDC == "KCLN Singapore")
            this.rpti[i].lokasi_dc = "Singapore, Singapore";
          if(getDRC == "KCLN Singapore")
            this.rpti[i].lokasi_drc = "Singapore, Singapore";
          
          if(getDC == "KCLN Tokyo")
            this.rpti[i].lokasi_dc = "Tokyo, Jepang";
          if(getDRC == "KCLN Tokyo")
            this.rpti[i].lokasi_drc = "Tokyo, Jepang";
          
          if(getDC == "KCLN Seoul")
            this.rpti[i].lokasi_dc = "Seoul, Korea Selatan";
          if(getDRC == "KCLN Seoul")
            this.rpti[i].lokasi_drc = "Seoul, Korea Selatan";
          
          if(getDC == "KCLN London")
            this.rpti[i].lokasi_dc = "London, UK";
          if(getDRC == "KCLN London")
            this.rpti[i].lokasi_drc = "London, UK";
          
          if(getDC == "KCLN HongKong")
            this.rpti[i].lokasi_dc = "Hongkong, Hongkong";
          if(getDRC == "KCLN HongKong")
            this.rpti[i].lokasi_drc = "Hongkong, Hongkong";
          
          if(getDC == "New York")
            this.rpti[i].lokasi_dc = "New York, US";
          if(getDRC == "New York")
            this.rpti[i].lokasi_drc = "New York, US";
          
          if(this.rpti[i].estimasi_biaya_capex!= 0)
            this.rpti[i].estimasi_biaya_capex = "Rp"+this.rpti[i].estimasi_biaya_capex;
          if(this.rpti[i].estimasi_biaya_opex!=0)
            this.rpti[i].estimasi_biaya_opex = "Rp"+this.rpti[i].estimasi_biaya_opex;
          
          if(this.rpti[i].estimasi_biaya_capex == 0)
            this.rpti[i].estimasi_biaya_capex = null;
          if(this.rpti[i].estimasi_biaya_opex == 0)
            this.rpti[i].estimasi_biaya_opex = null;
          
        }
        this.insertData();
      }
      else{
        this.getOnlyRPTI = [];  
        this.loading = false;
      }
    })
  },

  // insertData(){
  //   this.getOnlyRPTI = [];
  //   this.rpti.forEach(e => {
  //     var tempAip = e.AIPId;
  //     if(tempAip.substring(0,2) == 'IN'){
  //       this.getOnlyRPTI.push(e);
  //     }
  //   })
  //   return this.getOnlyRPTI;
  // },
  
  cekIsi(){
    if(this.rpti.length == 0)
      this.alert=true;
    else
      return this.rpti;
  },

  save(date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.menu = false;
    this.readReportingRPTI();
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  mounted(){
    this.readReportingRPTI();
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    },
}
};
</script>

<style scope>
.v-toolbar__content {
  padding: 0px !important;
}

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

.warna{
  color:#2196F3;
}
</style>