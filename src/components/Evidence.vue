<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-3">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-layout justify-center class="mb-5">
        <v-sheet class="rounded-lg mx-5 mt-3 pa-5" width="700px" elevation="2">
          <h2 class="text judul text-center px-5" style="font-size:xx-large;">Input Tindak Lanjut</h2>
          <v-divider class="my-4"></v-divider>
          <v-layout justify-center>
            <v-row>
              <v-icon class="ml-6">
                mdi-file
              </v-icon>
              <p class="pt-5 ml-4 greenText">Document Title.pdf</p>
            </v-row>
          </v-layout>
          <v-divider class="my-4"></v-divider>
          <div class="red--text greenText ml-4 mt-4 mb-3">
            Have any Evidence?
          </div>
          <v-layout justify-center>
            <v-row>
              <v-col cols="7" sm="6" md="6" class="px-0 pb-0">
                <v-file-input
                  show-size
                  counter
                  label="Evidence"
                  outlined
                  dense
                  class="ml-5 mr-4"></v-file-input>
              </v-col>
              <v-col cols="5" sm="6" md="6" class="pl-0 pb-0">
                <v-btn
                  color="#F15A23"
                  class="text-none"
                  dark
                  :loading="isSelecting">
                  <v-icon right dark class="mr-3 ml-0">
                    mdi-cloud-upload
                  </v-icon>
                  Upload
                </v-btn>
              </v-col>
            </v-row>
          </v-layout>
        </v-sheet>
      </v-layout>
      <v-layout justify-center class="mb-10">
        <v-btn
          class="mt-5"
          color = "#F15A23"
          dark
          @click = "dialog = true" >
          Submit
         </v-btn>

      </v-layout>
      
      <v-dialog v-model = "dialog" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense></v-toolbar>
        <v-card flat>
          <h1 class="judul text-center">SUBMITTED!</h1>
          <p class="greetings text-center">Your files are succesfully uploaded</p>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png">
          </v-flex>
        </v-card>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark link @click="next">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-main>
  </v-app>
</template>

<script>

export default {
name : "Evidence",
created () {
  document.title = "Evidence";
},
data() {
  return {
    snackbar :false,
    error_message:'',
    dialog: false,
    role: localStorage.getItem('role'),
    alert: true,
    menu2: false,
    tgl: [],
    expanded:[],
    color: '',
    file:'',
    defaultButtonText: '',
    selectedFile: null,
    isSelecting: false,
    headers : [
      {
          text : "No",
          align : "center",
          sortable : true,
          value : "no",
      },
      { text : "Sub Kondisi",align : "center",value : "subkondisi"},
      { text : "Kondisi",align : "center",value : "kondisi"},
      { text : "Rekomendasi", align : "center",value : "rekomendasi"},
      { text : "Tindak Lanjut", align : "center",value : "tindaklanjut"},
      { text : "Target Date", align : "center",value : "date"},
      { text : "Assign", align : "center",value : "assign"},
    ],
    headersRHA : [
      {
          text : "No",
          align : "center",
          sortable : true,
          value : "nomor",
      },
      { text : "File Name", align : "center",value : "fileName"},
      { text : "Time", align : "center",value : "time"},
      { text : "Status", align : "center",value : "status"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    tabs: [
      'RHA Files', 'Upload Files'
    ],
    tab: null,

  // ------------------ DATA DUMMY ---------------------
    report:['Laporan 1','Laporan 2','Laporan 3'],
    items:[
      {nomor:1, fileName: 'RHA1.pdf', time:'Sent 14 days ago', status : 'Assigned'},
      {nomor:2,fileName: 'RHAawal.pdf', time:'Sent 3 days ago', status : 'Assigned'},
      {nomor:3,fileName: 'RHAawal.xls', time:'Sent 23 hours ago', status : 'Assigned'},
    ],
    data : [
      { no : "#2458", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"ABC",rekomendasi:"BNP",tindaklanjut:"Koordinasi",date:"06/22/21 17:15", assign:"OTF"},
      { no : "#3530", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"CDE",rekomendasi:"PTM",tindaklanjut:"Koordinasi",date:"06/02/21 14:58", assign:"IOT"},
    ],
  };
},

methods: {
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
  close() {
    this.dialog = false;
  },
  back(){
    this.$router.back();
  },
  next(){
    if(this.role=='PIC')
      this.$router.push('/homePIC')
    else  
      this.$router.push('/homeAdmin')
  }
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
    fieldText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },
  },
};
</script>

<style scope>
.color{
    color:#005E6A;
}
.textbutton{
    color:#005E6A;
}
.konten{
   background-color:#F2F6F6 !important;
}

.v-window__container {
  height: 0%;
}

.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.greenText{
    color:#005E6A;
    font-family: 'Questrial', sans-serif;
} 
.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
</style>
