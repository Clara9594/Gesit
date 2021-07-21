<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">Upload RHA</v-toolbar-title>
      <v-card color="konten" flat>
        <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#F15A23">
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="#F2F6F6" class="pb-1 pt-5" flat> 
              <v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
              <v-toolbar height="100px">
                <v-card max-width="700" elevation="0" class="ml-5 mt-6 pr-5">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="file"
                        label="Select File"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn
                      color="#F15A23"
                      class="text-none"
                      round
                      dark
                      :loading="isSelecting"
                      @click="onButtonClick">
                      <v-icon right dark class="mr-3 ml-0">
                        mdi-cloud-upload
                      </v-icon>
                      Browse
                    </v-btn>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      @change="onFileChanged(selectedFile)">
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
          </v-tab-item>

          <v-tab-item>
            <v-card color="#F2F6F6" class="pb-1 pt-5" flat> 
              <v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
                <v-toolbar height="100px">
                  <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="tgl"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateRangeText"
                          label="Tanggal"
                          append-icon="mdi-calendar"
                          readonly
                          @change="cekTanggal()"
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="tgl"
                        type="month"
                        scrollable
                        range>
                        <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="cancel()">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(tgl)">
                            OK
                          </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-card>
                </v-toolbar>
              </v-card>
              <v-row>
                <v-col>
                  <v-card class="mx-5 pl-5 pt-5" outlined elevation="2">
                    <v-data-table
                      :headers = "headersRHA" 
                      :items = "items" 
                      :sort-by="['nomor']">
                      <template v-slot:[`item.status`]="{ item }" >
                        <td class="d-flex justify-center">
                          <v-chip v-if="item.status == 'Assigned'" color="green" dark label>
                              {{ item.status }}
                          </v-chip>
                        </td>
                      </template>
                      <template v-slot:[`item.actions`]= "{ item }">
                        <v-icon color="orange" @click="downloadHandler(item)" class="mr-5">mdi-download</v-icon>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
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
  document.title = "RHA";
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
  onButtonClick() {
    this.isSelecting = true
    window.addEventListener('focus', () => {
      this.isSelecting = false
    }, { once: true })

    this.$refs.uploader.click()
  },
  onFileChanged(e) {
    this.selectedFile = e.target.files[0]
      if (this.selectedFile[0] !== undefined) {
        this.file = this.selectedFile[0].name
        if (this.file.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(this.selectedFile[0])
        fr.addEventListener('load', () => {
          this.file = this.selectedFile[0] // this is an image file that can be sent to server...
        })
      } else {
        this.file = ''
      }
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
