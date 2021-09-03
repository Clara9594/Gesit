<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-1">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-card color="#fdf9ed" class="pb-1 pt-5" flat>
        <v-card class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
          <v-card-title class="py-0 pl-0">
            <v-toolbar flat class="textTable">
              <v-toolbar-title class="font-weight-bold">Upload RHA</v-toolbar-title>
              <v-divider
                class="mx-4"
                inseta
                vertical
              ></v-divider>
              <v-text-field
                v-model="searchRHA"
                append-icon="mdi-magnify"
                label="Search RHA"
                single-line
                rounded
                class="mb-5 mt-6 textTable"
                dense
                filled
                hide-details>
              </v-text-field>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-btn color="#F15A23" class="textTable text-none" dark @click="addFileNew=true">+ Add RHA File</v-btn>
          </v-card-title>
          <v-data-table
            :headers = "headers" 
            :search = "searchRHA"
            :items = "rhaIndexNew" 
            item-key = "id" 
            class="textTable">
            <template v-slot:[`item.statusCompleted`]= "{ item }">
              <v-progress-linear color="teal" v-model="form.statusCompleted" height="25">
                <strong>{{ Math.ceil(form.statusCompleted) }}%</strong>
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
                  
                  <v-list-item @click="downloadHandler(item.id)">
                    <v-list-item-title>Download RHA</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-card>

      <!--Dialog Sub RHA-->
      <v-dialog v-model="showSubRHA" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card color="#fdf9ed" flat>
          <v-toolbar color="#fdf9ed" flat class="pt-8 mb-15 textTable">
            <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card class="pt-2 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="py-0 pl-0">
              <v-toolbar flat class="textTable">
                <v-toolbar-title class="font-weight-bold">{{getRHA}}</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchSubRHA"
                  append-icon="mdi-magnify"
                  label="Search Sub RHA"
                  single-line
                  rounded
                  class="mb-5 mt-6 textTable"
                  dense
                  filled
                  hide-details>
                </v-text-field>
              </v-toolbar>
            </v-card-title>
            <v-data-table
              :headers = "headersRHABaru"
              :search = "searchSubRHA"
              :items = "subRhaIndex"
              item-key = "no" 
              class="textTable"
              :expanded.sync="expanded"
              show-expand>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <p class="font-weight-bold mt-4 mb-0">Masalah</p>
                  <p>
                    {{item.masalah}}
                  </p>
                  <p class="font-weight-bold mt-4 mb-0">Pendapat</p>
                  <p>
                    {{item.pendapat}}
                  </p>
                  <p class="font-weight-bold mt-4 mb-0">Tindak Lanjut</p>
                  <div v-for="i in item.tindakLanjuts" :key="i.fileName">
                    <p class="mb-0">
                      <v-icon class="mr-2">
                        mdi-circle-small
                      </v-icon>
                      {{i.notes}}
                    </p>
                  </div>
                  <p class="font-weight-bold mt-4 mb-0">Evidence Files</p>
                  <div v-for="i in item.subRhaevidences" :key="i.id">
                    <v-row>
                      <v-col cols="11" sm="11" md="11">
                        <p class="mb-0">
                          <v-icon class="mr-2">
                            mdi-circle-small
                          </v-icon>
                          {{i.fileName}}
                        </p>
                      </v-col>
                      <v-col cols="1" sm="1" md="1" class="pl-0">
                        <v-spacer></v-spacer>
                        <v-icon color="orange" @click="downloadEvidence(i.id)" class="mr-5">mdi-download</v-icon>
                      </v-col>
                    </v-row>
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
                    <v-list-item @click="dialogHandler(item)">
                      <v-list-item-title>Add Evidence File</v-list-item-title>
                    </v-list-item>
                    <!--<v-list-item @click="downloadHandler(item.id)">
                      <v-list-item-title>Update RHA</v-list-item-title>
                    </v-list-item>-->
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-dialog>

      <!--Upload File RHA Excel-->
      <v-dialog v-model="addFileNew" scrollable max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">{{ formTitle }} RHA FILE</h3>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 mt-5 pt-1 pb-0">
            <v-alert text dense color="teal" class="textTable" icon="mdi-file" border="left">
              <v-row align="center">
                <v-col class="grow">
                  Template RHA File
                </v-col>
                <v-col class="shrink">
                  <v-btn small text color="teal" @click="downloadTemplete">Download Here</v-btn>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
            </v-alert>

            <v-form ref="form" class="textTable">
              <v-text-field
                v-model = "form.subKondisi"
                label = "Sub Kondisi"
                required
                outlined
                :rules="fieldRules"
                dense
              ></v-text-field>
              <v-text-field
                v-model = "form.kondisi"
                label = "Kondisi"
                required
                :rules="fieldRules"
                outlined
                dense
              ></v-text-field>
              <v-textarea
                v-model = "form.rekomendasi"
                label = "Rekomendasi"
                required
                outlined
                :rules="fieldRules"
              ></v-textarea>

              <v-menu 
                  v-model="menu" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                > 
                <template v-slot:activator="{ on, attrs }"> 
                  <v-text-field 
                    dense
                    v-model="form.date" 
                    label="Target Date" 
                    prepend-inner-icon="mdi-calendar" 
                    readonly 
                    :rules="fieldRules"
                    outlined 
                    v-bind="attrs" 
                    v-on="on" 
                  ></v-text-field> 
                </template> 
                <v-date-picker 
                  v-model="form.date" 
                  @input="menu = false" 
                  :min="new Date().toISOString().substr(0, 10)" 
                ></v-date-picker> 
              </v-menu>

              <div v-if="inputType=='Add'">
                <div v-if="!file">
                  <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                    <div class="dropZone-info" @drag="onChange">
                      <span class="fa fa-cloud-upload dropZone-title"></span>
                      <span class="dropZone-title">Drop file or click to upload</span>
                      <div class="dropZone-upload-limit-info">
                        <div>Extension support: xlsx, xls</div>
                        <div>Max file size: 2 MB</div>
                      </div>
                    </div>
                    <input type="file" @change="onChange">
                  </div>
                </div>
                <div v-else class="dropZone-uploaded">
                  <div class="dropZone-uploaded-info">
                    <span class="dropZone-title">fileName: {{ file.name }}</span>
                    <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                  </div>
                </div>
              </div>
              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="I have filled in the RHA according to the template"
                required
              ></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions class="mr-5 my-2">
            <v-spacer></v-spacer>

            <v-btn color="#F15A23" text @click = "closeDialogEvidence()">
              Cancel
            </v-btn>

            <v-btn 
              depressed 
              dark 
              color="#F15A23" 
              @click="saveFile"
              v-if="form.subKondisi!=null&&form.kondisi!=null&&
              form.rekomendasi!=null&&form.date!=null&&file!=null
              &&checkbox!=false">
              Save
            </v-btn>

            <v-btn depressed dark color="rgba(242, 90, 40, 0.5)" v-else>
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog upload Evidence file -->
      <v-dialog v-model="addEvidence" scrollable max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">Add Evidence File</h3>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">
            <div v-if="!file">
              <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Drop file or click to upload</span>
                  <div class="dropZone-upload-limit-info">
                    <div>Extension support: png,jpeg,jpg,csv,txt,xlsx,xls</div>
                    <div>Max file size: 2 MB</div>
                  </div>
                </div>
                <input type="file" @change="onChange">
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">fileName: {{ file.name }}</span>
                <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
              </div>
            </div>
            <p class="mb-0 mt-4 black--text textTable">Other</p>
            <v-textarea
              v-model="bioEvidence"
              outlined 
            ></v-textarea>
          </v-card-text>

          <v-card-actions class="mr-5 my-2">
            <v-spacer></v-spacer>

            <v-btn color="#F15A23" text @click = "closeDialogEvidence()">
                Cancel
            </v-btn>

            <v-btn depressed dark color="#F15A23" @click="uploadFileEvidence">
                Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
      <br>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

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

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expanded:[],
    readRHAFile:[],
    subRha:[],
    subRhaById:[],
    checkbox: false,
    searchRHA : null,
    searchSubRHA : null,
    showSubRHA : false,
    addFile:false,
    addFileNew:false,
    addEvidence:false,
    color: '',
    cek:null,
    file:null,
    rhaId : null,
    alert: false,
    message:'',
    formData : new FormData,

    //Header RHA Utama
    headers : [
    {
      text : "No",
      align : "center",
      sortable : true,
      value : "index",
    },
      { text : "Sub Kondisi",align : "center",value : "subKondisi"},
      { text : "Kondisi",align : "center",value : "kondisi"},
      { text : "Rekomendasi", align : "center",value : "rekomendasi"},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjut"},
      { text : "File Name", align : "center",value : "fileName"},
      { text : "Target Date", align : "center",value : "targetDate"},
      { text : "Status", align : "center",value : "statusCompleted"},
      { text : "Actions", align : "center",value : "actions"},
    ],

    //Header Sub RHA
    headersRHABaru : [ 
      {
        text : "No",
        align : "center",
        value : "no",
        sortable: false,
      },
      { text : "Divisi Baru",align : "center",value : "divisiBaru",sortable: false},
      { text : "UIC Baru", align : "center",value : "uicBaru",sortable: false},
      { text : "Nama Audit", align : "center",value : "namaAudit",sortable: false},
      { text : "Lokasi", align : "center",value : "lokasi",sortable: false},
      { text : "Nomor", align : "center",value : "nomor",sortable: false},
      // { text : "Masalah",align : "center",value : "masalah",sortable: false},
      // { text : "Pendapat", align : "center",value : "pendapat",sortable: false},
      { text : "Status", align : "center",value : "status",sortable: false},
      { text : "Jatuh Tempo", align : "center",value : "jatuhTempo",sortable: false},
      { text : "Tahun Temuan", align : "center",value : "tahunTemuan",sortable: false},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjuts",sortable: false},
      { text : "Assign", align : "center",value : "assign",sortable: false},
      { text : "Actions", align : "center",value : "actions",sortable: false},
    ],

    form : {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      assign : null,
      statusCompleted :20,
    },

    tabs: ['RHA Files', 'Evidence Files'],
    tab: null,
    fieldRules: [
      (v) => !!v || 'Field cannot be empty',
    ],
    fileRules: [
      (v) => !v || (v.size < 2_097_152) || 'File size should be less than 2 MB!',
    ],
    dialogId:'',
    getRHA:'',
    temp:'',
    idRHA:'',
    bioEvidence: null,
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

  readRHA(){ //Read RHA Files
    var url =  this.$api+'/Rha'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data.data;
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

  readSubRHAbyId(id){ //Read Sub RHA Files by ID
    var url = this.$api+'/SubRha/GetByRhaId/'+id
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.subRhaById = response.data.data;
      if(this.subRhaById != null){
        for(let i = 0; i < this.subRhaById.length; i++){
          var jTempo = this.subRhaById[i].jatuhTempo;
          this.subRhaById[i].jatuhTempo = moment(jTempo).format('YYYY-MM-DD');
        }
      }
    })
  },

  saveFile(){//upload RHA sistem lama
    if (this.$refs.form.validate()) {
      this.formData.append('SubKondisi', this.form.subKondisi);
      this.formData.append('Kondisi', this.form.kondisi);
      this.formData.append('Rekomendasi', this.form.rekomendasi);
      this.formData.append('TargetDate', this.form.date);
      this.formData.append('formFile', this.file);
      this.formData.append('Assign', 'none');

      var url = this.$api+'/Rha/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          var temp = response.data.id;
          this.uploadSubRha(temp);
      }).catch(error => {
          this.error_message=error;
          this.alert = true;
          this.message = "Upload RHA failed!";
          this.color="red"
          this.$refs.form.resetValidation();
      })
    }
  },

  uploadSubRha(id){ //Ini upload Sub RHA
    this.formData.append('id',id);
    this.formData.append('file', this.file);
    var url = this.$api+'/SubRha/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.error_message=response;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.inputType = 'Add';
          this.readRHA();
          this.closeDialog();
          this.$refs.form.resetValidation();
      }).catch(error => {
          this.deleteRHA(id);
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "RHA file does not match!"
          this.color="red"
      })
  },

  deleteRHA(id){ //delete RHA yang templatenya tidak sesuai
    var url = 'http://35.219.8.90:90/api/Rha/' + id
    this.$http.delete(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.error_message=response;
    })
  },

  updateHandler(id){ //Handler untuk update RHA sistem lama
    this.addFile = true;
    this.rhaId = id.id;
    this.inputType = 'Update';
    this.form.subKondisi = id.subKondisi;
    this.form.kondisi = id.kondisi;
    this.form.rekomendasi = id.rekomendasi;
    this.form.date = id.targetDate;
    this.form.assign = id.assign;
  },

  updateFile(){ //Update RHA sistem lama
    if (this.$refs.form.validate()) {
      if(this.form.assign ==  null || this.form.assign == "")
        this.form.assign = 'none';
      let newData = {
        subKondisi : this.form.subKondisi,
        kondisi : this.form.kondisi,
        rekomendasi : this.form.rekomendasi,
        targetDate : this.form.date,
        assign : this.form.assign,
      };

      var url = this.$api+'/RHAFiles/' + this.rhaId
      this.$http.put(url, newData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response)
          this.error_message=response;
          this.alert = true;
          this.message = "Update Successfully!"
          this.color="green"
          this.closeDialog();
          this.inputType = 'Add';
          this.readRHA(); //mengambil data
          this.$refs.form.resetValidation();
          this.closeDialog();
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Update failed!"
          this.color="red"
          this.$refs.form.resetValidation();
          this.closeDialog();
      })
    }
  },

  uploadRHANew(){//Upload RHA sistem baru
    this.formData.append('formFile', this.file);
    var url = this.$api+'/ExcelReader'
    this.$http.post(url, this.formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
        this.error_message=response;
        this.readRHAFile = response.data.data;
        this.alert = true;
        this.message = "Upload Successfully!"
        this.color="green"
        this.inputType = 'Add';
        this.closeDialog();
    }).catch(error => {
        this.error_message=error.response.data.message;
        this.alert = true;
        this.message = "Upload failed!"
        this.color="red"
    })
  },

  uploadFileEvidence(){ //Upload File Evidence
    if(this.file==null){
      this.alert = true;
      this.color = 'red';
      this.message = 'Please fill the field!';
      return 0;
    }else{
      this.formData.append('formFile', this.file);
      this.formData.append('SubRhaId', this.dialogId);
      // this.formData.append('status', false);
      // this.formData.append('createdby', localStorage.getItem('npp'));
      var url = this.$api+'/SubRhaEvidence/Upload'
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
          this.addEvidence = false;
          // this.readSubRHAbyId(id)
          this.readRHA();
          this.file = '';
          this.inputType = 'Add'
          this.temp = null;
          this.resetForm();
      }).catch(error => {
          this.error_message=error;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.file = '';
          this.inputType = 'Add'
          this.temp = null;
          this.resetForm();
      })
    }
  },

  subRHAHandler(item){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showSubRHA = true;
    this.idRHA = item.id;
    this.getRHA = item.fileName;
    this.readSubRHAbyId(this.idRHA);
  },

  dialogHandler(item){ //Munculin dialog berdasarkan Id
    this.dialogId = item.id;
    this.addEvidence = true;
    this.temp = 'evidence';
  },


  //Fungsi Drag n Drop
  onChange(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    
    if (!files.length) {
      this.dragging = false;
      return;
    }
    if(this.temp=='evidence')
      this.createFileEvidence(files[0]);
    else
      this.createFile(files[0]);
  },

  createFile(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t != 'xlsx' && t != 'xls') {
      this.alert = true;
      this.message = "Please select xlsx or xls file!"
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

  createFileEvidence(file) {//validasi dan menyimpan file ke variabel this.file (evidence)
    this.file = '';
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t == 'mp4' && t == 'mp3' && t == 'zip') {
      this.alert = true;
      this.message = "Please select other than mp3, mp4, and zip!"
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


  //download File
  async downloadHandler(id){ //download RHA 
    axios({
      url: this.$api+'/Rha/Download/'+id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'RHA Files'
      link.click();
    }).catch(console.error);
  },

  async downloadEvidence(id){ //download evidence satu satu
    axios({
      url: this.$api+'/SubRhaEvidence/Download/'+id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence Files'
      link.click();
    }).catch(console.error);
  },

  async downloadBundle(item){ //download all evidence
    axios({
      url: this.$api+'/RHAFilesEvidence/GetBundleFiles/'+item.id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence All'
      link.click();
    }).catch(console.error);
  },

  async downloadTemplete(){ //download template RHA
    axios({
      url: this.$api+'/Rha/DownloadTemplate',
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'RHA Template'
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
    this.subRhaById = [];
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
    this.temp = null;
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
    this.$refs.form.resetValidation();
  },

  closeDialogEvidence(){ // close dialog evidence
    this.addEvidence = false;
    this.addFileNew = false;
    this.resetForm();
  }
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
    
    rhaIndexNew() { //Ini munculin nomor table untuk RHA dan evidence
      return this.rha.map(
        (rha, index) => ({
          ...rha,
          index: index + 1
        }))
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
</style>
