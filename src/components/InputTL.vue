<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Input Tindak Lanjut
      </v-toolbar-title>
      <br>
      <br>
      <v-layout justify-center class="mb-10">
        <v-card width="70%" class="d-flex flex-row mx-5 pl-10 pt-10 pr-10 pb-5">
          <v-layout justify-center>
            <v-row>
                    
                      <v-file-input
                        show-size
                        counter
                        label="SURAT / MEMO"
                        outlined
                        dense
                       class="mr-4"></v-file-input>
                 
                  
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
                    
                  </v-row>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout justify-center class="mb-10">
        <v-card width="70%" class=" mx-5 pl-10 pt-5 pr-10 pb-5" style="color:red">
          
          Other
          <br>
          <v-textarea outlined />
        
         
        </v-card>
      
              <br>

      </v-layout>
      <v-layout justify-center class="mb-10">
        <v-btn
            
            color = "#F15A23"
            dark
           
          link to="/home">
          Next
         </v-btn>

      </v-layout>
    </v-main>
  </v-app>
</template>

<script>

export default {
name : "TL",
created () {
  document.title = "Tindak Lanjut";
},
data() {
  return {
    snackbar :false,
    error_message:'',
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
  // onButtonClick() {
  //   this.isSelecting = true
  //   window.addEventListener('focus', () => {
  //     this.isSelecting = false
  //   }, { once: true })

  //   this.$refs.uploader.click()
  // },
  // onFileChanged(e) {
  //   this.selectedFile = e.target.files[0]
  //     if (this.selectedFile[0] !== undefined) {
  //       this.file = this.selectedFile[0].name
  //       if (this.file.lastIndexOf('.') <= 0) {
  //         return
  //       }
  //       const fr = new FileReader()
  //       fr.readAsDataURL(this.selectedFile[0])
  //       fr.addEventListener('load', () => {
  //         this.file = this.selectedFile[0] // this is an image file that can be sent to server...
  //       })
  //     } else {
  //       this.file = ''
  //     }
  // },
  back(){
    this.$router.back();
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
.title{
    color:#005E6A;
    font-size:xx-large;
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

</style>
