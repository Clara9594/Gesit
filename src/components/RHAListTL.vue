<template>
  <v-app>
    <v-main>
      <v-toolbar-title v-if="role=='ADMIN' || role=='AMGR'" class="title text-left font-weight-bold ml-6 mb-8">
        <v-row no-gutters>
          <v-col cols="2" sm="1" md="1">
            <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">INPUT TINDAK LANJUT</p>
            <v-breadcrumbs :items="routing" class="pa-0 textTable">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <v-toolbar-title v-else class="title text-left font-weight-bold ml-6 mb-8">
        <v-row no-gutters>
          <v-col cols="2" sm="1" md="1">
            <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10" sm="11" md="11">
            <v-toolbar-title class="mb-0 judul font-weight-bold">INPUT TINDAK LANJUT</v-toolbar-title>
            <v-breadcrumbs :items="routingPIC" class="pa-0 textTable">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <!--<v-toolbar-title v-if="role!='ADMIN'" class="title text-left font-weight-bold ml-6 mb-8">
        <p class="text-left ml-5 mb-3 judul" v-else style="font-size:x-large;">UPLOAD RHA</p>
      </v-toolbar-title>-->

      <v-card color="#fffcf5" class="pb-1" flat>
        <v-card class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
          <v-card-title class="pl-0 py-0">
            <v-text-field
              v-model="searchRHA"
              append-icon="mdi-magnify"
              label="Search RHA"
              color="#FC9039"
              class="mb-5 mt-6 textTable"
              dense
              solo
              flat
              background-color="#EEEEEE"
              filled
              hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers = "headers" 
            :search = "searchRHA"
            :items = "rhaIndexNew" 
            :loading="loading"
            loading-text="Loading... Please wait"
            item-key = "id" 
            class="textTable">
            <template v-slot:[`item.statusInfo`]= "{ item }">
              <v-progress-linear color="#DD2C00" :value="item.statusInfo[0].statusCompletedPercentage" height="25">
                <strong v-if="item.statusInfo[0].statusCompletedPercentage<100" class="white--text" color="red">{{ item.statusInfo[0].statusCompletedPercentage }}%</strong>
                <strong v-else color="green">{{ item.statusInfo[0].statusCompletedPercentage }}%</strong>
              </v-progress-linear>
            </template>

            <template v-slot:[`item.actions`]= "{ item }">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list class="textTable">
                  <v-list-item @click="subRHAHandler(item)">
                    <v-list-item-title>Show Sub RHA</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-card>

      <!--Dialog Sub RHA-->
      <v-dialog v-model="showSubRHA" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card color="#fffcf5" flat>
          <v-toolbar-title v-if="role=='PIC'" class="title text-left font-weight-bold pt-15 ml-6 mb-8">
            <v-row no-gutters>
              <v-col cols="2" sm="1" md="1">
                <v-btn class="mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="11" md="11">
                <v-toolbar-title class="mb-0 judul font-weight-bold">SUB RHA</v-toolbar-title>
                <v-breadcrumbs :items="routingSubRHAPIC" class="pa-0 textTable">
                  <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                  </template>
                </v-breadcrumbs>
              </v-col>
            </v-row>
          </v-toolbar-title>

          <v-toolbar-title v-else class="title text-left font-weight-bold pt-15 ml-6 mb-8">
            <v-row no-gutters>
              <v-col cols="2" sm="1" md="1">
                <v-btn class="mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="11" md="11">
                <v-toolbar-title class="mb-0 judul font-weight-bold">SUB RHA</v-toolbar-title>
                <v-breadcrumbs :items="routingSubRHA" class="pa-0 textTable">
                  <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                  </template>
                </v-breadcrumbs>
              </v-col>
            </v-row>
          </v-toolbar-title>
          
          <v-card class="pt-2 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="pa-0">
              <v-row>
                <v-col cols="6" class="pb-0 pt-6">
                  <v-select 
                    v-model="hideColumn" 
                    :items="showHeader" 
                    label="Select Columns" 
                    multiple
                    return-object
                    color="#FC9039"
                    class="mb-5 textTable"
                    dense
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details>
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index < 2">
                        <span>{{ item.text }}</span>
                      </v-chip>
                      <span v-if="index === 2" class="grey--text caption">(+{{ hideColumn.length - 2 }} others)</span>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="6" class="pb-0 pt-6">
                  <v-text-field
                    v-model="searchSubRHA"
                    append-icon="mdi-magnify"
                    label="Search Sub RHA"
                    color="#FC9039"
                    class="mb-5 textTable"
                    dense
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2" class="pt-0">
                  <v-select
                    v-model="temuanSts"
                    :items="daftarStatus"
                    required
                    color="#FC9039"
                    class="mb-5 textTable"
                    label = "Filter by Status Temuan"
                    dense
                    solo
                    flat
                    clearable
                    background-color="#EEEEEE"
                    filled
                    hide-details
                  ></v-select>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-select
                    v-model="divisi"
                    :items="daftarDivisi"
                    required
                    label = "Filter by Divisi"
                    color="#FC9039"
                    class="mb-5 textTable"
                    dense
                    solo
                    flat
                    clearable
                    background-color="#EEEEEE"
                    filled
                    hide-details
                  ></v-select>
                </v-col>

                <v-col cols="2" class="pt-0">
                  <v-select
                    v-model="kelompok"
                    :items="daftarKelompok"
                    required
                    label = "Filter by Kelompok"
                    color="#FC9039"
                    class="mb-5 textTable"
                    dense
                    solo
                    flat
                    clearable
                    background-color="#EEEEEE"
                    filled
                    hide-details
                  ></v-select>
                </v-col>

                <v-col cols="3" class="pt-0">
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
                        label="Filter by Tahun Temuan"
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
                
                <v-col cols="3" class="pt-0">
                  <v-select
                    v-model="jTempo"
                    :items="daftarJT"
                    required
                    label = "Filter by Status Jatuh Tempo"
                    color="#FC9039"
                    class="mb-5 textTable"
                    dense
                    solo
                    flat
                    clearable
                    background-color="#EEEEEE"
                    filled
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers = "headersShow"
              :search = "searchSubRHA"
              :items = "filterData"
              item-key = "no" 
              class="textTable"
              :loading="loadingSub"
              loading-text="Loading... Please wait">

              <template v-slot:[`item.masalah`]="{ item }">
                <div class="text-justify mb-0" style="white-space:pre-wrap;" outlined dark v-html="item.masalah">
                </div>
              </template>

              <template v-slot:[`item.pendapat`]="{ item }">
                <div class="text-justify mb-0" style="white-space:pre-wrap;" outlined dark v-html="item.pendapat">
                </div>
              </template>

              <template v-slot:[`item.usulClose`]="{ item }">
                <v-chip color="#095866" v-if="item.usulClose!=null" label outlined dark>
                  {{ item.usulClose }}
                </v-chip>
              </template>
              
              <template v-slot:[`item.openClose`]="{ item }">
                <v-chip color="green" v-if="item.openClose=='Open'" outlined label dark>
                  {{ item.openClose}}
                </v-chip>
                <v-chip color="red" v-else outlined label dark>
                  {{ item.openClose }}
                </v-chip>
              </template>
              
              <template v-slot:[`item.tindakLanjuts`]="{ item }">
                <div class="text-justify mb-0" style="white-space:pre-wrap;" outlined dark v-for="i in item.tindakLanjuts" :key="i.id" v-html="i.notes">
                </div>
              </template>

              <template v-slot:[`item.subRhaevidences`]="{ item }">
                <p color="orange" class="text-justify" style="white-space:pre-wrap;" v-for="i in item.subRhaevidences" :key="i.id" outlined dark>
                  {{ i.notes }} - {{ i.fileName}}
                </p>
              </template>

              <template v-slot:[`item.actions`]= "{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list class="textTable">
                    <v-list-item @click="pageInputTL(item.id)">
                      <v-list-item-title>Input Tindak Lanjut</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-dialog>
      
      <!--Halaman Input TL-->
      <v-dialog v-model="showInputTL" scrollable class="mx-auto" max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center textTable path py-5">Input Tindak Lanjut</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 pt-2 pb-0 textTable">
            <v-form fluid ref = "form">
              <p class="mb-1 font-weight-bold path">Tindak Lanjut</p>
              <!--<vue-editor 
                v-model="notes"
                id="editor"
                :editorToolbar="customToolbar">
              </vue-editor>-->
              <v-textarea v-model="notes" outlined color="#FC9039" hide-details></v-textarea>

              <p class="mb-1 mt-3 path font-weight-bold">Surat / Memo</p>
              <div>
                <div v-if="!file">
                  <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                    <div class="dropZone-info" @drag="onChange">
                      <span class="fa fa-cloud-upload dropZone-title"></span>
                      <span class="dropZone-title">Drop file or click to upload</span>
                      <div class="dropZone-upload-limit-info">
                        <div>Extension support: pdf,docs,csv,xlsx,xls</div>
                        <div>Max file size: 10 MB</div>
                      </div>
                    </div>
                    <input type="file" @change="onChange">
                  </div>
                </div>
                <div v-else class="dropZone-uploaded">
                  <div class="dropZone-uploaded-info">
                    <span class="dropZone-title">fileName: {{ file.name }}</span>
                    <v-btn dark color="#FC9039" text class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                  </div>
                </div>
              </div>

              <p class="mb-1 mt-3 font-weight-bold path">Evidence File</p>
              <div class="mb-5">
                <div v-if="!fileEvidence">
                  <div :class="['dropZone', draggingEvidence ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="draggingEvidence = false">
                    <div class="dropZone-info" @drag="onChangeEvidence">
                      <span class="fa fa-cloud-upload dropZone-title"></span>
                      <span class="dropZone-title">Drop file or click to upload</span>
                      <div class="dropZone-upload-limit-info">
                        <div>Extension support: pdf,docs,csv,xlsx,xls</div>
                        <div>Max file size: 10 MB</div>
                      </div>
                    </div>
                    <input type="file" @change="onChangeEvidence">
                  </div>
                </div>
                <div v-else class="dropZone-uploaded">
                  <div class="dropZone-uploaded-info">
                    <span class="dropZone-title">fileName: {{ fileEvidence.name }}</span>
                    <v-btn dark color="#FC9039" text class="btn btn-primary removeFile mt-3" @click="removeFileEvidence">Remove File</v-btn>
                  </div>
                </div>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions class="my-2">
            <v-row>
              <v-col class="pb-0">
                <v-btn color="#FC9039" @click="closeInputTL" block class="ml-2 mb-3" outlined>
                  Cancel
                </v-btn>
              </v-col>
              <v-col class="pb-0">
                <v-btn color="#FC9039" 
                  @click="submitTL" 
                  class="ml-2 mb-3" 
                  dark 
                  block
                  v-if="file!=null && notes!=null && fileEvidence!=null">
                  Save
                </v-btn>
                <v-btn depressed block dark color="#ffb880" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
// import { VueEditor } from "vue2-editor";

export default {
name : "Monitoring",
// components: {
//   VueEditor
// },
created () {
  document.title = "RHA";
  this.showHeader = Object.values(this.headersRHABaru);
  this.hideColumn = this.showHeader;
},
data() {
  return {
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ],

    error_message:'',
    menu: false,
    menu2: false,
    search : null,
    inputType: 'Add',
    dragging: false,
    draggingEvidence: false,
    e1: 1,
    role: localStorage.getItem('role'),
    loading : true,
    loadingSub : true,
    
    date : null,
    year : null,
    divisi : null,
    temuanSts : 'Open',
    kelompok : null,
    jTempo : null,
    daftarStatus : ['Open','Closed'],
    daftarDivisi : ['PDM','BSK','CLN','STI'],
    daftarJT : ['Sudah Jatuh Tempo','Belum Jatuh Tempo'],
    daftarKelompok : ['LCS','CBS','CGT','SIC','MID','TID','TFS','GRI','ACR','BUM','RST','PPO','ISP','IEA',
    'INO','RMS','QAS','QAO','GRC','BUM','MBC','IBL','EDM','BBC','RPV','WSS','CLS','APM','NLO','SLS','HCS',
    'SPS','DOM','BUM'],
    activePicker: null, 

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expandedSub:[],
    readRHAFile:[],
    subRhaById:[],
    imageSubRHA :[],
    expanded : [],
    hideColumn: [],
    showHeader: [],

    addEvidence:false,
    notes:null,
    checkbox: false,
    searchRHA : null,
    searchSubRHA : null,
    showSubRHA : false,
    showInputTL : false,
    addFile:false,
    addFileNew:false,
    color: '',
    cek:null,
    file:null,
    fileEvidence:null,
    rhaId : null,
    alert: false,
    message:'',
    formData : new FormData,
      suratRules: [
      (v) => !!v || 'This Field is required',
      (v) => (!v || v.size < 5000000) || 'File size should be less than 5 MB!',
    ],
    rules: [
      (v) => !!v || 'This Field is required',
    ],
    //Header RHA Utama
    headers : [
      {
        text : "No",
        align : "center",
        sortable : false,
        value : "index",
        class : "orange accent-3 white--text"
      },
      { text : "Auditee",align : "center", sortable : false, value : "uic", class : "orange accent-3 white--text"},
      { text : "Conditions",align : "center", sortable : false, value : "kondisi", class : "orange accent-3 white--text"},
      { text : "Dir Sector", align : "center",sortable : false, value : "dirSekor", class : "orange accent-3 white--text"},
      { text : "File Name", align : "center", sortable : false, value : "fileName", class : "orange accent-3 white--text"},
      { text : "Jatuh Tempo", align : "center", sortable : false, value : "statusJt", class : "orange accent-3 white--text"},
      { text : "Progress", align : "center", sortable : false, value : "statusInfo", class : "orange accent-3 white--text"},
      { text : "Actions", align : "center", sortable : false, value : "actions", class : "orange accent-3 white--text"},
    ],

    //Header Sub RHA
    headersRHABaru : [ 
      {
        text : "No",
        align : "center",
        value : "no",
        sortable: false,
        class : "orange accent-3 white--text",
      },
      { text : "UIC Lama", align : "center",value : "uicLama",sortable: false, class : "orange accent-3 white--text"},
      { text : "Divisi Baru",align : "center",value : "divisiBaru",sortable: false, class : "orange accent-3 white--text"},
      { text : "UIC Baru", align : "center",value : "uicBaru",sortable: false, class : "orange accent-3 white--text"},
      { text : "Nama Audit", align : "center",value : "namaAudit",sortable: false, class : "orange accent-3 white--text",width: "200px"},
      { text : "Lokasi", align : "center",value : "lokasi",sortable: false, class : "orange accent-3 white--text"},
      { text : "Nomor", align : "center",value : "nomor",sortable: false, class : "orange accent-3 white--text"},
      { text : "Masalah", align : "center",value : "masalah",sortable: false, class : "orange accent-3 white--text",width: "500px"},
      { text : "Pendapat", align : "center",value : "pendapat",sortable: false, class : "orange accent-3 white--text",width: "400px"},
      { text : "Tindak Lanjut", align : "center",value : "tindakLanjuts",sortable: false, class : "orange accent-3 white--text",width: "400px"},
      { text : "Tahun Temuan", align : "center",value : "tahunTemuan",sortable: false, class : "orange accent-3 white--text"},
      { text : "Assign", align : "center",value : "assign",sortable: false, class : "orange accent-3 white--text"},
      { text : "Evidence", align : "center",value : "subRhaevidences", sortable: false, class : "orange accent-3 white--text",width: "250px"},
      { text : "Status", align : "center",value : "status",sortable: false, class : "orange accent-3 white--text"},
      { text : "Tanggal Jatuh Tempo", align : "center",value : "jatuhTempo",sortable: false, class : "orange accent-3 white--text",width: "120px"},
      { text : "Status Jatuh Tempo", align : "center",value : "statusJatuhTempo",sortable: false, class : "orange accent-3 white--text",width: "120px"},
      { text : "Open/Closed", align : "center",value : "openClose",sortable: false, class : "orange accent-3 white--text"},
      { text : "Usul Close", align : "center",value : "usulClose",sortable: false, class : "orange accent-3 white--text"},
      { text : "Actions", align : "center",value : "actions",sortable: false, class : "orange accent-3 white--text"},
      // { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],

    //Path RHA Admin
    routing: [
      {
        text: 'Home',
        disabled: false,
        href: '#/homeAdmin',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homeAdmin',
      },  
      {
        text: 'Audit',
        disabled: false,
        href: '#/auditAdmin',
      },
      {
        text: 'Input Tindak Lanjut',
        disabled: true,
        href: '#/InputTLAdmin',
      },
    ],

    //Path RHA PIC
    routingPIC: [
      {
        text: 'Home',
        disabled: false,
        href: '#/homePIC',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homePIC',
      },
      {
        text: 'Input Tindak Lanjut',
        disabled: true,
        href: '#/InputTL',
      },
    ],

    //Path Sub RHA Admin
    routingSubRHA: [
      {
        text: 'Home',
        disabled: false,
        href: '#/homeAdmin',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homeAdmin',
      },  
      {
        text: 'Audit',
        disabled: false,
        href: '#/auditAdmin',
      },
      {
        text: 'Input Tindak Lanjut',
        disabled: false,
        href: '#/InputTLAdmin',
      },
      {
        text: 'Sub RHA',
        disabled: true,
        href: '#/InputTLAdmin',
      },
    ],

    //Path SubRHA PIC
    routingSubRHAPIC: [ 
      {
        text: 'Home',
        disabled: false,
        href: '#/homePIC',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homePIC',
      },  
      {
        text: 'Input Tindak Lanjut',
        disabled: false,
        href: '#/InputTL',
      },
      {
        text: 'Sub RHA',
        disabled: true,
        href: '#/InputTL',
      },
    ],

    form : {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      assign : null,
      statusCompleted : 20,
    },

    dialogId:'',
    getRHA:'',
    temp:'',
    idRHA:'',
    idSubRHA: '',
    idTL:'',
    userLogin: localStorage.getItem('npp'),
    subRHABaru:[],
    temp1:[],
    my:[],
  };
},

methods: {
  //Operasi CRU
  cekOperasi(){ //ngecek dia add file atau update
    if(this.inputType === 'Add'){
      this.saveFile()
    }else{
      this.updateFile()
    }
  },
  
  submitTL(){//Ini untuk validasi fields
    if(this.fileEvidence!=null && this.file!=null && this.notes!=null){
      this.saveFile();
    }
    else{
      this.message = "Please fill all fields!"
      this.color="red";
      this.alert=true;
    }
  },

  readRHA(){ //Read RHA Files
    var url = null;
    if(this.role == 'ADMIN')
      url =  this.$api+'/Rha/GetBySubRhaAssign/' + this.userLogin
    else
      url =  this.$api+'/Rha/GetBySubRhaAssign/P0' + this.userLogin
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data;
      if(this.rha.length==0){
        this.loading = false;
        this.alert = true;
        this.message = 'RHA is empty!';
        this.color = 'red';
        return 0;
      }
      this.loading = false;
      for(let i=0; i<this.rha.length; i++){
        this.rha[i].statusInfo[0].statusCompletedPercentage = Math.round(this.rha[i].statusInfo[0].countSubRHAClosed/this.rha[i].statusInfo[0].countSubRha*100);
      }
    }).catch(error => {
      this.error_message=error;
      this.alert = true;
      this.message = 'RHA is empty!';
      this.color = 'red';
      this.loading = false;
    })
  },

  readSubRHAbyId(id){ //Read Sub RHA Files by ID
    var url = this.$api+'/SubRha/GetByRhaIDandAssign/' + id +'/' +this.userLogin
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.subRhaById = response.data;
      // console.log(this.subRhaById)
      this.loadingSub = false;
    }).catch(error => {
      this.error_message=error;
      this.alert = true;
      this.message = 'Sub RHA is empty!';
      this.color = 'red';
      this.loading = false;
    })
  },
  
  pageInputTL(id){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showInputTL = true;
    this.idSubRHA = id;
  },

  saveFile(){ //Upload Tindak Lanjut
      this.formData.append('SubRhaId', this.idSubRHA);
      this.formData.append('Notes', this.notes);
      this.formData.append('file', this.file);

      var url = this.$api+'/TindakLanjut/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.idTL = response.data.id;
          // console.log(this.idTL)
          this.error_message=response;
          this.alert = true;
          this.message = "Upload Tindak Lanjut Successfully!"
          this.color="green"
          // if(this.fileEvidence != null)
          this.uploadEvidence(this.idTL);
          this.readSubRHAbyId(this.idRHA);
          this.closeInputTL();
          this.resetForm();
      }).catch(error => {
          this.error_message=error;
          this.snackbar = true;
          this.message = "Upload failed!"
          this.color="red"
      })
  },

  uploadEvidence(idTL){ //Upload File Evidence
    this.formData.append('file', this.fileEvidence);
    this.formData.append('tindakLanjutID',idTL);
    var url = this.$api+'/TindakLanjutEvidence/Upload'
    this.$http.post(url, this.formData, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
    }).then(response => {
        // console.log(response)
        this.error_message=response;
        this.alert = true;
        this.message = "Upload Successfully!"
        this.color="green"
        this.fileEvidence = '';
        this.resetForm();
        this.readSubRHAbyId(this.idRHA);
    }).catch(error => {
        this.error_message=error;
        this.alert = true;
        this.message = "Upload failed!"
        this.color="red"
        this.fileEvidence = '';
        this.resetForm();
    })
  },

  subRHAHandler(item){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showSubRHA = true;
    this.idRHA = item.id;
    this.getRHA = item.fileName;
    this.readSubRHAbyId(this.idRHA);
  },


  dialogHandler(item){ //Munculin dialog berdasarkan Id
    this.getRHA = item.fileName;
    this.dialogId = item.id;
    this.addEvidence = true;
  },


  //Fungsi Drag n Drop Tindak Lanjut
  onChange(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    
    if (!files.length) {
      this.dragging = false;
      return;
    }
    
    this.createFile(files[0]);
  },

  createFile(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t == 'mp4' && t == 'mp3') {
      this.alert = true;
      this.message = "Please select other than mp3 or mp4!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 10000000) {
      this.alert = true;
      this.message = "Please check file size no over 5 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    this.file = file;
    this.dragging = false;
  },

  removeFile() {//hapus file yang di upload
    this.file = null;
  },
  

  //Fungsi Drag n Drop Evidence
  onChangeEvidence(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    
    if (!files.length) {
      this.draggingEvidence = false;
      return;
    }
    
    this.createFileEvidence(files[0]);
  },

  createFileEvidence(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t == 'mp4' && t == 'mp3') {
      this.alert = true;
      this.message = "Please select other than mp3 or mp4!"
      this.color="red"
      this.draggingEvidence = false;
      return;
    }
    
    if (file.size > 10000000) {
      this.alert = true;
      this.message = "Please check file size no over 5 MB!"
      this.color="red"
      this.draggingEvidence = false;
      return;
    }
    
    this.fileEvidence = file;
    this.draggingEvidence = false;
  },

  removeFileEvidence() {//hapus file yang di upload
    this.fileEvidence = null;
  },

  //Filter berdasarkan tanggal --> MASIH PAKE UpdateAt HEHE :)
  cekTanggal(){
    this.rhaFilter = [];
    for(let x = 0; x<this.rhaIndex.length; x++){
      var bulanDB = new Date(this.rhaIndex[x].updatedAt);
      var rangeAwal = new Date(this.tgl[0]);
      var rangeAkhir = new Date(this.tgl[1]);
      if(bulanDB.getMonth() >= rangeAwal.getMonth() && bulanDB.getMonth() <= rangeAkhir.getMonth()){
        this.rhaFilter.push(this.rhaIndex[x]);
        this.cek='isi';
      }
    }
    return this.rhaFilter;
  },

  //Fungsi tambahan
  cancel(){  //ngeclose dialog tanggal
    this.tgl=[];
    this.menu2=false;
  },

  back(){ //router page sebelumnya
    this.$router.back();
  },

  closeSubRHA(){ //Nutup dialog sub RHA
    this.showSubRHA = false;
    this.subRhaById = [];
    this.year = null;
    this.date = null;
    this.tempTL = [];
    this.temuanSts = 'Open';
    this.kelompok = null;
    this.divisi = null;
    this.jTempo = null;
    this.idEvidence = null;
    this.radioGroup = null;
  },

  closeInputTL(){ //Nutup dialog Input TL
    this.showInputTL = false;
    this.resetForm();
  },

  resetForm(){ //ngereset semua field
    this.form = {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      uploadRha : null,
      assign : null,
      action : null,
    },
    this.file=null;
    this.fileEvidence=null;
    this.notes=null;
    this.bioEvidence = null;
    this.formData = new FormData;
  },

  closeDialog(){ //ngeclose semua dialog dan meriset validasi
    this.addFile = false;
    this.addFileNew = false;
    this.addEvidence = false;
    this.file = null;
    this.inputType = 'Add'
    this.temp = null;
    this.resetForm();
  },

  closeDialogEvidence(){ // close dialog evidence
    this.addEvidence = false;
    this.addFileNew = false;
    this.resetForm();
  },
  
  save(date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.menu = false;
  },

  //FILTER SUB RHA
  filteredStatus(item) {
    return item.openClose.toLowerCase().includes(this.temuanSts.toLowerCase());
  },
  
  filteredDivisi(item) {
    return item.divisiBaru.toLowerCase().includes(this.divisi.toLowerCase());
  },

  filteredTahun(item){
    return item.tahunTemuan.toString().includes(this.year);
  },

  filteredJT(item){
    return item.statusJatuhTempo.toString().includes(this.jTempo);
  },

  filteredKelompok(item) {
    return item.uicBaru.toLowerCase().includes(this.kelompok.toLowerCase());
  },
},

mounted(){
  this.readRHA();
},
  computed: {
    headersShow () { //menyeleksi kolom yang akan di show
      return this.showHeader.filter(s => this.hideColumn.includes(s));
    },

    filterData(){ //ini multiple filter
      var items = [];
      if(this.temuanSts)
        items.push(this.filteredStatus);
      if(this.divisi)
        items.push(this.filteredDivisi);
      if(this.year)
        items.push(this.filteredTahun);
      if(this.jTempo)
        items.push(this.filteredJT);
      if(this.kelompok)
        items.push(this.filteredKelompok);
      
      if(items.length > 0 ){
        return this.subRhaIndex.filter((i) => {
          return items.every((data) => {
            return data(i);
          })
        })
      }
      return this.subRhaIndex;
    },

    formTitle() {
      return this.inputType
    },

    subRhaIndex() { //Ini munculin nomor tabel untuk subRHA by ID
      if(this.subRhaById != null){
        return this.subRhaById.map(
          (subRhaById, no) => ({
            ...subRhaById,
            no: no + 1
          }))
      }else
        return 0;
    },
    
    rhaIndexNew() { //Ini munculin nomor table untuk RHA
      // if(this.rha.length != 0){
        return this.rha.map(
          (rha, index) => ({
            ...rha,
            index: index + 1
          }))
      // }else
      //   return (<h1>NUll data</h1>);
    },
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    },
  },
};
</script>

<style scope>
  .title{
    color:#005E6A;
    font-size:xx-large;
  }

 .dropZone {
  width: 100%;
  height: 100px;
  position: relative;
  border: 3px dashed #ffc9b5;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 100px;
  position: relative;
  border: 2px dashed #ffc9b5;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}

.path{
  color:#005E6A;
}

.judul{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
  font-size:x-large;
}
</style>
