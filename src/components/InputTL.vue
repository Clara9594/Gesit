<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
       <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        Input Tindak Lanjut
      </v-toolbar-title>

      <v-card color="konten" flat>
            <v-card color="#F2F6F6" class="pb-1 pt-5" flat> 
              <v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
              <v-toolbar height="100px">
                <v-card width="700" elevation="0" class="ml-5 mt-6 pr-5">
                  <v-row>
                    <v-col sm="6" class="px-0">
                      <v-file-input
                        show-size
                        counter
                        label="Surat/Memo"
                        outlined
                        dense
                      ></v-file-input>
                    </v-col>
                    <v-col>
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
                </v-card>
              </v-toolbar>
            </v-card>
            <v-card max-width="1600" class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
              <v-data-table
                :headers = "headers" 
                :items = "data" 
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
                <template v-slot:[`item.status`]="{ item }" >
                  <td>
                    <v-chip v-if="item.status == 'Canceled'" color="red" dark>
                        {{ item.status }}
                    </v-chip>

                    <v-chip v-else-if="item.status == 'Completed'" color="green" dark>
                        {{ item.status }}
                    </v-chip>

                    <v-chip v-else color="orange" dark>
                        {{ item.status }}
                    </v-chip>
                  </td>
                </template>
              </v-data-table>
            </v-card>
            </v-card>
      </v-card>
        <br>
        <br>
        <br>
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
