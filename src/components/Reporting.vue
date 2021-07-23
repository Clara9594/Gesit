<template>
  <v-app>
    <v-main>
    <v-container fluid>
        <h2 class="page-title title text-left font-weight-bold mt-6 ml-9 mb-6 pr-5">LAPORAN RENCANA PENGEMBANGAN PROJECT IT</h2>
        </v-container>
        <v-card max-width="1600" class="mb-5 mx-5" elevation="2" outlined>
          <v-toolbar height="100px" flat>
            <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
              <v-select 
                :items="report"
                label="Type of Report"
                outlined
                dense>
              </v-select>
            </v-card>
          <v-spacer></v-spacer>
          <v-btn fab small color="#F15A23" dark class="mr-5">
            <v-icon>mdi-download</v-icon>
          </v-btn>
          </v-toolbar>
        </v-card>
        <v-card max-width="1600" class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
          <v-data-table
            :headers = "headers" 
            :items = "data" 
            :search = "search" 
            :sort-by="['no']" 
            item-key = "no" 
            :items-per-page="5"
            :expanded.sync="expanded"
            show-expand>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <br>
                <p class="font-weight-bold mb-2"> Deskripsi :</p>
                <p class="text-left"> {{ item.deskripsi }} </p>
              </td>
            </template>
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
          </v-data-table>
        </v-card>
        <br>
        <br>
        <br>
    </v-main>
  </v-app>
</template>

<script>

export default {
name : "Monitoring",
created () {
  document.title = "Monitoring";
},
data() {
  return {
    inputType: 'Add',
    load: false,
    search : null,
    dialog : false,
    editCheck: true,
    modalDelete: false,
    modalEdit: false,
    snackbar :false,
    error_message:'',
    tgl: [],
    expanded:[],
    menu2: false,
    color: '',
    headers : [
        {
            text : "No",
            align : "start",
            sortable : true,
            value : "no",
        },
        { text : "Nama Aplikasi", value : "aplikasi"},
        { text : "Kategori", value : "kategori"},
        { text : "Jenis Pengembangan", value : "pengembangan"},
        { text : "Pihak Penyedia", value : "penyedia"},
        { text : "Lokasi DC", value : "dc"},
        { text : "Lokasi DRC", value : "drc"},
        { text : "Waktu Rencana Implementasi", value : "waktu"},
        { text : "Estimasi Biaya Capex/Opex", value : "estimasi"},
        { text : "Keterangan", value : "keterangan"},
    ],
    data : [
      { no : 1, aplikasi:"Account Maintance",deskripsi:"On Process",kategori:"Pengelolaan Nasabah",pengembangan:"Inhouse",penyedia:"Ya", dc:"Jakarta", drc:"Purwakarta",waktu:"14/07/2021", estimasi: "Rp1.000.000", keterangan:""},
      { no : 2, aplikasi:"BB Online",deskripsi:"On Process",kategori:"Pembayaran",pengembangan:"PPJTI",penyedia:"Ya", dc:"Kalimantan", drc:"Yogyakarta",waktu:"14/07/2021", estimasi: "Rp2.000.000", keterangan:""},
      { no : 3, aplikasi:"CelenganQu",deskripsi:"On Process",kategori:"Layanan Perbankan Elektronik",pengembangan:"PPJTI",penyedia:"Ya", dc:"Jakarta", drc:"Tegal",waktu:"14/07/2021", estimasi: "Rp5.000.000", keterangan:""},
      { no : 4, aplikasi:"Digimap",deskripsi:"On Process",kategori:"Manajemen Sistem Informasi",pengembangan:"Inhouse",penyedia:"Ya", dc:"Bekasi", drc:"Jakarta",waktu:"14/07/2021", estimasi: "Rp4.000.000", keterangan:""},
      
    ],
    report:['Laporan 1','Laporan 2','Laporan 3'],
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#f44336', '#ff9800', '#4caf50'],
        labels: ["Canceled", "Pending", "Completed"],
        legend: {

        }
      },
      series: [1, 2, 2],
    },
  };
},

methods: {
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
}
};
</script>

<style scope>
.title{
    color:#005E6A;
}
@media screen and (max-width: 600px) {
  .title{
  font-size: medium;
  }
}
</style>
