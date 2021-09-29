<template>
  <v-app>
    <v-main>
      <v-toolbar-title v-if="role=='ADMIN'" class="title text-left font-weight-bold ml-6 mb-8">
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

      <v-toolbar-title v-else-if="role=='PIC'" class="title text-left font-weight-bold ml-6 mb-8">
        <v-row no-gutters>
          <v-col cols="2" sm="1" md="1">
            <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10" sm="11" md="11">
            <v-toolbar-title class="font-weight-bold">INPUT TINDAK LANJUT</v-toolbar-title>
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
            <template v-slot:[`item.statusCompleted`]= "{ item }">
              <v-progress-linear color="#DD2C00" :value="form.statusCompleted" height="25">
                <strong>20%</strong>
                <strong v-if="item.statusCompleted!=null">{{ Math.ceil(item.statusCompleted) }}%</strong>
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
            <v-card-title class="pa-0 mb-3">
              <v-toolbar flat class="textTable">
                <v-toolbar-title class="font-weight-bold">{{getRHA}}</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col cols="4">
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
                          class="mb-5 mt-6 textTable"
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

                  <v-col cols="8">
                    <v-text-field
                      v-model="searchSubRHA"
                      append-icon="mdi-magnify"
                      label="Search Sub RHA"
                      color="#FC9039"
                      class="mb-5 mt-6 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-toolbar>
            </v-card-title>
            <v-data-table
              v-if="year == null"
              :headers = "headersRHABaru"
              :search = "searchSubRHA"
              :items = "subRhaIndex"
              item-key = "no" 
              class="textTable"
              :loading="loadingSub"
              :single-expand="true"
              loading-text="Loading... Please wait"
              :expanded.sync="expandedSub"
              show-expand>
              <template v-slot:item.status="{ item }">
                <v-chip color="orange" outlined v-if="item.status='On Progress'" dark>
                  {{ item.status }}
                </v-chip>
                <v-chip color="green" outlined v-else dark>
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
                <v-icon @click="expand(true);getID(item.id)" v-if="!isExpanded">mdi-chevron-down</v-icon>
                <v-icon @click="expand(false)" v-if="isExpanded">mdi-chevron-up</v-icon>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <div class="row sp-details">
                    <div class="col-8">
                      <p class="font-weight-bold mt-4 mb-0">Masalah</p>
                      <p>
                        {{item.masalah}}
                      </p>
                      <p class="font-weight-bold mt-4 mb-0">Pendapat</p>
                      <p>
                        {{item.pendapat}}
                      </p>
                      <p class="font-weight-bold mt-4 mb-0">Tindak Lanjut</p>
                      <v-treeview :items="tempTL" dense></v-treeview>
                    </div>
                    <div class="col-4">
                      <p class="font-weight-bold mt-4 mb-0">Evidence Sub RHA</p>
                      <v-radio-group v-model="radioGroup" class="mt-0" dense hide-details>
                        <v-radio
                          v-for="i in item.subRhaevidences"
                          :key="i.id"
                          color="orange"
                          @change="getIdEvidence(i.id)"
                          :label="i.notes"
                          :value="i.id">
                          </v-radio>
                        <v-btn v-if="idEvidence!=null" color="orange" @click="downloadEvidence" outlined dark small>Download</v-btn>
                      </v-radio-group>
                    </div>
                  </div>
                </td>
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

            <v-data-table
              v-else
              :headers = "headersRHABaru"
              :search = "searchSubRHA"
              :items = "subRhaFilter"
              item-key = "no" 
              class="textTable"
              :loading="loadingSub"
              :single-expand="true"
              loading-text="Loading... Please wait"
              :expanded.sync="expandedSub"
              show-expand>
              <template v-slot:item.status="{ item }">
                <v-chip color="orange" outlined v-if="item.status='On Progress'" dark>
                  {{ item.status }}
                </v-chip>
                <v-chip color="green" outlined v-else dark>
                  {{ item.status }}
                </v-chip>
              </template>
              
              <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
                <v-icon @click="expand(true);getID(item.id)" v-if="!isExpanded">mdi-chevron-down</v-icon>
                <v-icon @click="expand(false)" v-if="isExpanded">mdi-chevron-up</v-icon>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <div class="row sp-details">
                    <div class="col-6">
                      <p class="font-weight-bold mt-4 mb-0">Masalah</p>
                      <p>
                        {{item.masalah}}
                      </p>
                      <p class="font-weight-bold mt-4 mb-0">Pendapat</p>
                      <p>
                        {{item.pendapat}}
                      </p>
                      <p class="font-weight-bold mt-4 mb-0">Tindak Lanjut</p>
                      <v-treeview :items="tempTL" dense></v-treeview>
                    </div>
                    <div class="col-6">
                      <p class="font-weight-bold mt-4 mb-0">Evidence Sub RHA</p>
                      <v-radio-group v-model="radioGroup" class="mt-0" dense hide-details>
                        <v-radio
                          v-for="i in item.subRhaevidences"
                          :key="i.id"
                          color="orange"
                          @change="getIdEvidence(i.id)"
                          :label="i.notes"
                          :value="i.id">
                          </v-radio>
                        <v-btn v-if="idEvidence!=null" color="orange" @click="downloadEvidence" outlined dark small>Download</v-btn>
                      </v-radio-group>
                    </div>
                  </div>
                </td>
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
                        <div>Max file size: 2 MB</div>
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
                        <div>Max file size: 2 MB</div>
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
                  v-if="file!=null && notes!=null">
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
import axios from 'axios'

export default {
name : "Monitoring",
created () {
  document.title = "RHA";
},
data() {
  return {
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
    activePicker: null, 
    radioGroup: null,

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expandedSub:[],
    readRHAFile:[],
    subRha:[],
    subRhaById:[],
    tindakLanjut:[],
    tempTL:[],
    subFilter:[],

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
    idEvidence : null,
    suratRules: [
      (v) => !!v || 'This Field is required',
      (v) => (!v || v.size < 2000000) || 'File size should be less than 2 MB!',
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
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjut"},
      { text : "File Name", align : "center", sortable : false, value : "fileName", class : "orange accent-3 white--text"},
      { text : "Temuan Status", align : "center", sortable : false, value : "statusTemuan", class : "orange accent-3 white--text"},
      { text : "JT Status", align : "center", sortable : false, value : "statusJt", class : "orange accent-3 white--text"},
      { text : "Year", align : "center", sortable : false, value : "tahun", class : "orange accent-3 white--text"},
      { text : "Progress", align : "center", sortable : false, value : "statusCompleted", class : "orange accent-3 white--text"},
      { text : "Actions", align : "center", sortable : false, value : "actions", class : "orange accent-3 white--text"},
    ],

    //Header Sub RHA
    headersRHABaru : [ 
      {
        text : "No",
        align : "center",
        value : "no",
        sortable: false, 
        class : "orange accent-3 white--text"
      },
      { text : "Divisi Baru",align : "center",value : "divisiBaru", sortable: false, class : "orange accent-3 white--text"},
      { text : "UIC Baru", align : "center",value : "uicBaru", sortable: false, class : "orange accent-3 white--text"},
      { text : "Nama Audit", align : "center",value : "namaAudit", sortable: false, class : "orange accent-3 white--text"},
      { text : "Lokasi", align : "center",value : "lokasi", sortable: false, class : "orange accent-3 white--text"},
      { text : "Nomor", align : "center",value : "nomor", sortable: false, class : "orange accent-3 white--text"},
      // { text : "Masalah",align : "center",value : "masalah"},
      // { text : "Pendapat", align : "center",value : "pendapat"},
      { text : "Status", align : "center",value : "status", sortable: false, class : "orange accent-3 white--text"},
      { text : "Jatuh Tempo", align : "center",value : "jatuhTempo", sortable: false, class : "orange accent-3 white--text"},
      { text : "Tahun Temuan", align : "center",value : "tahunTemuan", sortable: false, class : "orange accent-3 white--text"},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjuts"},
      { text : "Assign", align : "center",value : "assign", sortable: false, class : "orange accent-3 white--text"},
      { text : "Actions", align : "center",value : "actions", sortable: false, class : "orange accent-3 white--text"},
      { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],

    //Header Evidence
    headersEvidence : [
      {
        text : "No",
        align : "center",
        sortable : true,
        value : "index",
      },
      { text : "File RHA", align : "center",value : "fileName"},
      { text : "Time", align : "center",value : "createdAt"},
      { text : "Assign Status", align : "center",value : "assign"},
      { text : "Actions", align : "center",value : "actions"},
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
      statusCompleted : 20,
    },

    tabs: ['RHA Files', 'Evidence Files'],
    tab: null,
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
    if(this.file!=null && this.notes!=null){
      this.saveFile();
    }
    else{
      this.message = "Please fill all fields!"
      this.color="red";
      this.alert=true;
    }
  },

  readRHA(){ //Read RHA Files
    var url =  this.$api+'/Rha/GetBySubRhaAssign/P02020'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data.data;
      if(this.rha != [])
        this.loading = false;
      for(let i = 0; i < this.rha.length; i++){
        var tanggal = this.rha[i].targetDate;
        if(tanggal != null){
          var createdTime = this.rha[i].createdAt;
          var target = this.rha[i].targetDate;
          this.rha[i].targetDate = moment(target).format('YYYY-MM-DD');
          this.rha[i].createdAt = moment(createdTime).fromNow();
        }
      }
    })
  },

  readSubRHAbyId(id){ //Read Sub RHA Files by RHA ID and assign
    var url = this.$api+'/SubRha/GetByRhaIDandAssign/' + id +'/P02020'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.subRhaById = response.data.data;
      // console.log(this.subRhaById)
      if(this.subRhaById!=[])
        this.loadingSub = false;
        
      if(this.subRhaById != null){
        for(let i = 0; i < this.subRhaById.length; i++){
          var jTempo = this.subRhaById[i].jatuhTempo;
          this.subRhaById[i].jatuhTempo = moment(jTempo).format('YYYY-MM-DD');
        }
      }
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
        this.error_message=response;
        this.alert = true;
        this.message = "Upload Tindak Lanjut Successfully!"
        this.color="green"
        if(this.fileEvidence != null)
          this.uploadEvidence(this.idTL);
        this.getID(this.idSubRHA);
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
    
    if (file.size > 2000000) {
      this.alert = true;
      this.message = "Please check file size no over 2 MB!"
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
    
    if (file.size > 2000000) {
      this.alert = true;
      this.message = "Please check file size no over 2 MB!"
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

  getIdEvidence(item){ //get id evidence dari radio button
    this.idEvidence = item;
  },

  async downloadEvidence(){ //download evidence satu satu
    axios({
      url: this.$api+'/SubRhaEvidence/Download/'+this.idEvidence,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence File'
      link.click();
    }).catch(console.error);
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
    this.subRHABaru = [];
    this.year = null;
    this.date = null;
    this.tempTL = [];
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

  save (date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.filterTahunTemuan();
    this.menu = false;
  },

  filterTahunTemuan(){
    this.subFilter = [];
    for(let x=0; x < this.subRhaById.length; x++){
      var tahunDB = this.subRhaById[x].tahunTemuan;
      if(this.year == tahunDB)
        this.subFilter.push(this.subRhaById[x])
    }
    return this.subFilter;
  },

  getID(id){ //get ID sub RHA and read the attributes
    var url = this.$api+'/SubRha/' + id;
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.tempTL = [];
      this.tindakLanjut = response.data.data;
      var tl = {};
      if(this.tindakLanjut != []){ //ini bagian untuk buat array baru khusus treeview
        for(let j = 0; j < this.tindakLanjut.tindakLanjuts.length; j++){
          var tlLength = this.tindakLanjut.tindakLanjuts[j].tindakLanjutEvidences;
          if(tlLength.length == 0){
            tl = 
            {
              name: this.tindakLanjut.tindakLanjuts[j].notes,
            };
            this.tempTL.push(tl);
          }else{
            for(let k = 0 ; k < tlLength.length; k++){
              tl = 
                {
                  name: this.tindakLanjut.tindakLanjuts[j].notes,
                  children: [
                    { name: this.tindakLanjut.tindakLanjuts[j].tindakLanjutEvidences[k].fileName}
                  ]
                };
              this.tempTL.push(tl);
            }
          }
        }
      }
    })
  },
},

mounted(){
  this.readRHA();
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },

    formTitle() {
      return this.inputType
    },
    
    rhaIndex() { //Ini munculin nomor tabel untuk subRHA
      return this.subRha.map(
        (subRha, index) => ({
          ...subRha,
          index: index + 1
        }))
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

    subRhaFilter() { //Ini munculin nomor tabel untuk subRHA by ID yang difilter
      if(this.subFilter != null){
        return this.subFilter.map(
          (subFilter, no) => ({
            ...subFilter,
            no: no + 1
          }))
      }else
        return 0;
    },
    
    rhaIndexNew() { //Ini munculin nomor table untuk RHA
      return this.rha.map(
        (rha, index) => ({
          ...rha,
          index: index + 1
        }))
    },
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    }
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
