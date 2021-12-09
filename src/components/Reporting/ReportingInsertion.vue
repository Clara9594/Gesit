<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
        <v-row no-gutters>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">LAPORAN INSERTION</p>
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
            min-width="auto"
            >
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
            :data   = "getOnlyInsertion"
            :fields = "columns"
            type = "xls"
            name = "Insertion.xls"
            title = "LAPORAN INSERTION">
            Export to Excel
            </download-excel>
            <v-icon right dark>mdi-download</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table 
          :headers="upHeaders"
          class="textTable"
          ref="exportable_table"
          :items = "getOnlyInsertion" 
          :search = "searchRPTI" 
          :sort-by="['no']" 
          item-key = "AIPId" 
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
      <br>
      <br>
      <v-snackbar v-model="alert" color="red" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

export default {
name : "RPTI",
created () {
  document.title = "Reporting RPTI";
},
data() {
  return {
    message: null,
    color: '',
    alert: false,
    inputType: 'Add',
    searchRPTI : null,
    dialog : false,
    editCheck: true,
    menu: false,
    activePicker: null,
    year: 2021,
    date: null,
    reportCount: null,
    loading:true,

    //List Array
    tgl: [],
    expanded:[],
    arrayReport:[],
    dataGrafik:[],
    rhaPending:[],
    rhaDone:[],
    insertion:[],
    getOnlyInsertion:[],

    menu2: false,
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
      { text : "Biaya Opex", align : "center", value : "EstimasiBiayaOpex", sortable : false,class : "orange accent-3 white--text"},
      // { text : "Keterangan", align : "center", value : "StrategicImportance", sortable : false,class : "orange accent-3 white--text"},
      { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],
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
      'Estimasi Biaya Opex':'EstimasiBiayaOpex',
      'Keterangan':'StrategicImportance'
    },
    routing: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'laporan Insertion',
        disabled: true,
      },  
    ],
  };
},
methods: {
  readReportiongInsertion(){ //Read RHA Files
    var url =  'http://35.219.107.102/progodev/api/project?kategori=All&periode='+this.year;
    this.$http.get(url,{
      headers:{
        'progo-key':'progo123',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.insertion = response.data.data;
      if(this.insertion.length != 0){
        this.loading = false;
        var tampung = null;
        for(let i = 0; i < this.insertion.length; i++){
          tampung = this.insertion[i].EksImplementasi.split(' ');
          if(this.insertion[i].EksImplementasi!=null ||this.insertion[i].EksImplementasi!=''){
            if(tampung.length != 1){
              var array = this.insertion[i].EksImplementasi.split(' ');
              this.insertion[i].EksImplementasi = array[0] + ' ' + array[1];
            }
          }

          var getDC = this.insertion[i].LokasiDC;
          var getDRC = this.insertion[i].LokasiDRC;
          if(getDC == "DC Slipi - Jakarta")
            this.insertion[i].LokasiDC = "Jakarta, Indonesia";
          if(getDRC == "DC Slipi - Jakarta")
            this.insertion[i].LokasiDRC = "Jakarta, Indonesia";
          if(getDC == "DC Sudirman Jakarta")
            this.insertion[i].LokasiDC = "Jakarta, Indonesia";
          if(getDRC == "DC Sudirman Jakarta")
            this.insertion[i].LokasiDRC = "Jakarta, Indonesia";
          
          if(getDC == "DC Purwakarta")
            this.insertion[i].LokasiDC = "Purwakarta, Indonesia";
          if(getDRC == "DRC Purwakarta")
            this.insertion[i].LokasiDRC = "Purwakarta, Indonesia";
          if(getDC == "DRC Purwakarta")
            this.insertion[i].LokasiDC = "Purwakarta, Indonesia";
          if(getDRC == "DC Purwakarta")
            this.insertion[i].LokasiDRC = "Purwakarta, Indonesia";
          
          if(getDC == "KCLN Singapore")
            this.insertion[i].LokasiDC = "Singapore, Singapore";
          if(getDRC == "KCLN Singapore")
            this.insertion[i].LokasiDRC = "Singapore, Singapore";
          
          if(getDC == "KCLN Tokyo")
            this.insertion[i].LokasiDC = "Tokyo, Jepang";
          if(getDRC == "KCLN Tokyo")
            this.insertion[i].LokasiDRC = "Tokyo, Jepang";
          
          if(getDC == "KCLN Seoul")
            this.insertion[i].LokasiDC = "Seoul, Korea Selatan";
          if(getDRC == "KCLN Seoul")
            this.insertion[i].LokasiDRC = "Seoul, Korea Selatan";
          
          if(getDC == "KCLN London")
            this.insertion[i].LokasiDC = "London, UK";
          if(getDRC == "KCLN London")
            this.insertion[i].LokasiDRC = "London, UK";
          
          if(getDC == "KCLN HongKong")
            this.insertion[i].LokasiDC = "Hongkong, Hongkong";
          if(getDRC == "KCLN HongKong")
            this.insertion[i].LokasiDRC = "Hongkong, Hongkong";
          
          if(getDC == "New York")
            this.insertion[i].LokasiDC = "New York, US";
          if(getDRC == "New York")
            this.insertion[i].LokasiDRC = "New York, US";
          
          if(this.insertion[i].EstimasiBiayaCapex!= 0)
            this.insertion[i].EstimasiBiayaCapex = "Rp"+this.insertion[i].EstimasiBiayaCapex;
          if(this.insertion[i].EstimasiBiayaOpex!=0)
            this.insertion[i].EstimasiBiayaOpex = "Rp"+this.insertion[i].EstimasiBiayaOpex;
          
          if(this.insertion[i].EstimasiBiayaCapex == 0)
            this.insertion[i].EstimasiBiayaCapex = null;
          if(this.insertion[i].EstimasiBiayaOpex == 0)
            this.insertion[i].EstimasiBiayaOpex = null;
        }
        this.insertData();
      }
      else{
        this.getOnlyInsertion = [];
        this.loading = false;
      }
    })
  },

  insertData(){
    this.getOnlyInsertion = [];
    this.insertion.forEach(e => {
      var tempAip = e.AIPId;
      if(tempAip.substring(0,2) == 'IN'){
        this.getOnlyInsertion.push(e);
      }
    })
    return this.getOnlyInsertion;
  },

  cekIsi(){
    if(this.getOnlyInsertion.length == 0){
      this.alert=true;
      this.message="Export Failed because data is empty";
    }
    else
      return this.getOnlyInsertion;
  },
  
  save(date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.menu = false;
    this.readReportiongInsertion();
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  mounted(){
    this.readReportiongInsertion();
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