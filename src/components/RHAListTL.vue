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
          <v-card-title class="py-0">
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
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers = "headers" 
            :search = "searchRHA"
            :items = "rhaIndexNew" 
            item-key = "id" 
            class="textTable">
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
        <v-card color="#fdf9ed" flat>
          <v-toolbar color="#fdf9ed" flat class="pt-8 mb-15 textTable">
            <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card class="pt-2 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="py-0">
              <v-toolbar flat class="textTable">
                <v-toolbar-title>{{getRHA}}</v-toolbar-title>
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
                    <v-list-item @click="addEvidence=true">
                      <v-list-item-title>Add Evidence</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-dialog>
      
      <!--Halaman Input TL-->
      <v-dialog v-model="showInputTL" max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">Input Tindak Lanjut</h3>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 mt-5 pt-1 pb-0">
            <v-form fluid ref = "form">
              <p class="mb-1 greenText font-weight-bold">Surat / Memo</p>
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
                    <v-btn dark color="#F15A23" text class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                  </div>
                </div>
              </div>
                
              <v-row>
                <v-col style="color:red" class="textTable">
                  <v-divider class="mt-4 mb-2"></v-divider>
                    Other
                  <br>
                  <v-textarea 
                    v-model="notes"
                    :rules="rules"
                    outlined />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#F15A23" @click="showInputTL=false" class="ml-2 mb-3" outlined>
              Cancel
            </v-btn>
            <v-btn color="#F15A23" @click="next" class="ml-2 mb-3" dark>
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
                    <div>Extension support: png,jpeg,jpg,csv,zip,txt,xlsx,xls</div>
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
          </v-card-text>

          <v-card-actions class="mr-5 my-2">
            <v-spacer></v-spacer>

            <v-btn color="#F15A23" text @click = "closeDialogEvidence()">
              Cancel
            </v-btn>

            <v-btn depressed dark color="#F15A23" @click="uploadEvidence">
              Save
            </v-btn>
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
    e1: 1,

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expanded:[],
    readRHAFile:[],
    subRha:[],
    subRhaById:[],
    
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
    file:'',
    rhaId : null,
    alert: false,
    message:'',
    formData : new FormData,
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
      },
      { text : "Divisi Baru",align : "center",value : "divisiBaru"},
      { text : "UIC Baru", align : "center",value : "uicBaru"},
      { text : "Nama Audit", align : "center",value : "namaAudit"},
      { text : "Lokasi", align : "center",value : "lokasi"},
      { text : "Nomor", align : "center",value : "nomor"},
      // { text : "Masalah",align : "center",value : "masalah"},
      // { text : "Pendapat", align : "center",value : "pendapat"},
      { text : "Status", align : "center",value : "status"},
      { text : "Jatuh Tempo", align : "center",value : "jatuhTempo"},
      { text : "Tahun Temuan", align : "center",value : "tahunTemuan"},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjuts"},
      { text : "Assign", align : "center",value : "assign"},
      { text : "Actions", align : "center",value : "actions"},
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

    form : {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      assign : null,
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
    idSubRHA: '',
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
  
  pageInputTL(id){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showInputTL = true;
    this.idSubRHA = id;
  },

  saveFile(){ //Upload Tindak Lanjut
    if (this.$refs.form.validate()) {
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
          // console.log(response)
          this.error_message=response;
          // this.alert = true;
          // this.message = "Upload Successfully!"
          // this.color="green"
          this.e1 = 2;
          this.formData = new FormData;
          this.fileId = response.data.id
          console.log(this.fileId)
          // this.readRHA(); //mengambil data
      }).catch(error => {
          this.error_message=error;
          this.snackbar = true;
          this.message = "Upload failed!"
          this.color="red"
      })
    }
  },

  uploadEvidence(){ //Upload File Evidence
    this.formData.append('formFile', this.file);
    this.formData.append('RhafilesId', this.dialogId);
    this.formData.append('status', false);
    this.formData.append('createdby', localStorage.getItem('npp'));
    var url = this.$api+'/RHAFilesEvidence/Upload'
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
        this.file = '';
        this.inputType = 'Add'
        this.temp = null;
        this.resetForm();
        this.readRHA();
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
  },

  subRHAHandler(item){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showSubRHA = true;
    this.idRHA = item.id;
    // alert(this.idRHA)
    this.getRHA = item.fileName;
    this.readSubRHAbyId(this.idRHA);
  },


  dialogHandler(item){ //Munculin dialog berdasarkan Id
    this.getRHA = item.fileName;
    this.dialogId = item.id;
    this.addEvidence = true;
    this.temp = 'evidence';
    // this.file='';
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

  createFileEvidence(file) {//validasi dan menyimpan file ke variabel this.file (evidence)
    this.file = '';
    var fileName = file.name
    var t = fileName.split('.').pop();
    // console.log(t)
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
    // console.log(this.file);
    this.dragging = false;
  },

  removeFile() {//hapus file yang di upload
    this.file = '';
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

  next(){
    if(this.$refs.form.validate()){
      this.saveFile();
    }
    else{
      this.message = "Please fill all the field!"
      this.color="red";
      this.alert=true;
    }
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
    //this.subRhaById = [];
  },
  closeInputTL(){ //Nutup dialog Input TL
    this.showInputTL = false;
    //this.showSubRHA = true;
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
    this.$refs.form.resetValidation();
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
    
    rhaIndexNew() { //Ini munculin nomor table untuk RHA
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
