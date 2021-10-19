<template>
    <v-app>
        <v-main>
            <p class="text-left ml-5 judul" style="font-size:x-large;">Laporan Revisi Rencana Pengembangan Teknologi Informasi (RPTI)</p>
            <v-card class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
                <v-toolbar flat class="textTable">
                <v-row>
                <v-col cols="6" class="pt-0">
                    <v-text-field
                        v-model="searchRPTI"
                        append-icon="mdi-magnify"
                        label="Search"
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

                    <v-col cols="6" class="pt-0">
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
                    color="#FC9039"
                    class="mb-5 textTable"
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
        </v-col>
                </v-row>
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
            <br>
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
  document.title = "Reporting RPTI";
},
data() {
  return {
    inputType: 'Add',
    tipe:'Rencana Pengembangan Teknologi Informasi (RPTI)',
    searchRPTI : null,
    dialog : false,
    editCheck: true,
    menu: false,
    activePicker: null,
    year: 2021,
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
  };
},
methods: {
  readReportingAudit(){ //Read RHA Files
    var url =  'http://35.219.107.102/progodev/api/project?kategori=All&periode='+this.year;
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
        if(this.audit[i].EksImplementasi!=null ||this.audit[i].EksImplementasi!=''){
          var array = this.audit[i].EksImplementasi.split(' ');
          this.audit[i].EksImplementasi = array[0] + ' '+array[1];
        }
        var getDC = this.audit[i].LokasiDC;
        var getDRC = this.audit[i].LokasiDRC;
        if(getDC == "DC Slipi - Jakarta")
          this.audit[i].LokasiDC = "Jakarta, Indonesia";
        if(getDRC == "DC Slipi - Jakarta")
          this.audit[i].LokasiDRC = "Jakarta, Indonesia";
        if(getDC == "DC Sudirman Jakarta")
          this.audit[i].LokasiDC = "Jakarta, Indonesia";
        if(getDRC == "DC Sudirman Jakarta")
          this.audit[i].LokasiDRC = "Jakarta, Indonesia";

        if(getDC == "DC Purwakarta")
          this.audit[i].LokasiDC = "Purwakarta, Indonesia";
        if(getDRC == "DRC Purwakarta")
          this.audit[i].LokasiDRC = "Purwakarta, Indonesia";
        if(getDC == "DRC Purwakarta")
          this.audit[i].LokasiDC = "Purwakarta, Indonesia";
        if(getDRC == "DC Purwakarta")
          this.audit[i].LokasiDRC = "Purwakarta, Indonesia";

        if(getDC == "KCLN Singapore")
          this.audit[i].LokasiDC = "Singapore, Singapore";
        if(getDRC == "KCLN Singapore")
          this.audit[i].LokasiDRC = "Singapore, Singapore";
        
        if(getDC == "KCLN Tokyo")
          this.audit[i].LokasiDC = "Tokyo, Jepang";
        if(getDRC == "KCLN Tokyo")
          this.audit[i].LokasiDRC = "Tokyo, Jepang";
        
        if(getDC == "KCLN Seoul")
          this.audit[i].LokasiDC = "Seoul, Korea Selatan";
        if(getDRC == "KCLN Seoul")
          this.audit[i].LokasiDRC = "Seoul, Korea Selatan";
        
        if(getDC == "KCLN London")
          this.audit[i].LokasiDC = "London, UK";
        if(getDRC == "KCLN London")
          this.audit[i].LokasiDRC = "London, UK";
        
        if(getDC == "KCLN HongKong")
          this.audit[i].LokasiDC = "Hongkong, Hongkong";
        if(getDRC == "KCLN HongKong")
          this.audit[i].LokasiDRC = "Hongkong, Hongkong";
        
        if(getDC == "New York")
          this.audit[i].LokasiDC = "New York, US";
        if(getDRC == "New York")
          this.audit[i].LokasiDRC = "New York, US";
        
        if(this.audit[i].EstimasiBiayaCapex!= 0)
          this.audit[i].EstimasiBiayaCapex = "Rp"+this.audit[i].EstimasiBiayaCapex;
        if(this.audit[i].EstimasiBiayaOpex!=0)
          this.audit[i].EstimasiBiayaOpex = "Rp"+this.audit[i].EstimasiBiayaOpex;
        
        if(this.audit[i].EstimasiBiayaCapex == 0)
          this.audit[i].EstimasiBiayaCapex = null;
        if(this.audit[i].EstimasiBiayaOpex == 0)
          this.audit[i].EstimasiBiayaOpex = null;
        
      }
    })
  },

  
  save(date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.menu = false;
    this.readReportingAudit();
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  mounted(){
    this.readReportingAudit();
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
</style>
