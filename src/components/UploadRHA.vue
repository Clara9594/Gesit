<template>
  <v-app>
    <v-main>
        <v-toolbar-title class="title text-left font-weight-bold mt-6 ml-6 mb-6">Upload RHA</v-toolbar-title>
    <v-btn text class="textbutton ml-2">
      RHA Files
    </v-btn>
    <v-btn text>
      Upload Files
    </v-btn>
        <v-card max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
          <v-toolbar height="100px">
            <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
              <v-file-input
    v-model="files"
    color="deep-purple accent-4"
    counter
    label="RHA File"
    multiple
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="10"
    dense
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
      
    </template>
    
  </v-file-input>
  
            </v-card>
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
        { text : "Sub Kondisi", value : "subkondisi"},
        { text : "Kondisi", value : "kondisi"},
        { text : "Rekomendasi", value : "rekomendasi"},
        { text : "Tindak Lanjut", value : "tindaklanjut"},
        { text : "Target Date", value : "date"},
        { text : "Assign", value : "assign"},
    ],
    data : [
    { no : "#2458", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"ABC",rekomendasi:"BNP",tindaklanjut:"Koordinasi",date:"06/22/21 17:15", assign:"OTF"},
    { no : "#3530", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"CDE",rekomendasi:"PTM",tindaklanjut:"Koordinasi",date:"06/02/21 14:58", assign:"IOT"},
      
    ],
    report:['Laporan 1','Laporan 2','Laporan 3'],
    apexPie: {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ['#f44336', '#ff9t00', '#4caf50'],
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
    font-size:xx-large;
}
.textbutton{
    color:#005E6A;
}
</style>
