<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-layout justify-center class="mb-10 px-5">
        <v-stepper v-model="e1" width="700px">
          <v-stepper-header class="textTable">
            <v-stepper-step :complete="e1 > 1" step="1">
              Input Tindak Lanjut
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Add Evidence
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="rounded-lg pa-2" flat>
                <v-form fluid ref = "form">
                  <h2 class="text judul text-center px-5" style="font-size:xx-large;">Input Tindak Lanjut</h2>
                  <v-divider class="my-4"></v-divider>
                  
                  <p class="mb-1 greenText font-weight-bold">Select your file</p>
                  <v-autocomplete 
                    v-model="rhaFile" 
                    :items="rhaName"
                    :rules="rules"
                    required
                    outlined
                    dense
                  ></v-autocomplete>
                
                  <p class="mb-1 greenText font-weight-bold">Surat / Memo</p>
                  <!--<v-file-input
                    v-model="uploadTL"
                    show-size
                    counter
                    @change="fileHandler(uploadTL)"
                    outlined
                    accept=".pdf,.docx,.doc,.xls,.xlsx,.csv"
                    :rules="suratRules"
                    dense>
                  </v-file-input>-->

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
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#F15A23" @click="next" class="ml-2 mb-3" dark>
                    Next
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="rounded-lg pa-2" flat>
                <h2 class="text judul text-center px-5" style="font-size:xx-large;">Input Tindak Lanjut</h2>
                <v-divider class="my-4"></v-divider>
                <v-layout justify-center>
                  <v-row>
                    <v-icon class="ml-6">
                      mdi-file
                    </v-icon>
                    <p class="pt-5 ml-4 greenText">{{file.name}}</p>
                  </v-row>
                </v-layout>
                <v-divider class="my-4"></v-divider>
                <div class="red--text greenText ml-4 mt-4 mb-3">
                  Have any Evidence?
                </div>
                <v-file-input
                  show-size
                  counter
                  v-model="evidence"
                  :rules="suratRules"
                  label="Evidence"
                  outlined
                  dense
                  class="ml-5 mr-4">
                </v-file-input>
                <v-card-actions class="mt-5">
                  <v-spacer></v-spacer>
                  <v-btn outlined color="#F15A23" class="mr-3" @click="e1 = 1">
                    Cancel
                  </v-btn>
                  <v-btn color="#F15A23" @click="uploadEvidence" dark>
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-layout>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
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
    alert: false,
    menu2: false,
    tgl: [],
    expanded:[],
    e1: 1,
    color: '',
    file:'',
    dragging: false,
    message:'',
    rha:[],
    role: localStorage.getItem('role'),
    selectedFile: null,
    rhaFile:null,
    rhaName: [],
    notes:null,
    fileId:null,
    uploadTL:null,
    evidence:null,
    namaFile:null,
    formData:new FormData,
    suratRules: [
      (v) => !!v || 'This Field is required',
      (v) => (!v || v.size < 2000000) || 'File size should be less than 2 MB!',
    ],
    rules: [
      (v) => !!v || 'This Field is required',
    ],
  };
},
methods: {
  //Fungsi Drag n Drop
  onChange(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    // this.namaFile = e.name;

    if (!files.length) {
      this.dragging = false;
      return;
    }
    
    this.createFile(files[0]);
  },

  createFile(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    
    if (t != 'pdf' && t != 'docs' && t != 'csv' && t != 'xlsx' && t != 'xls') {
      this.alert = true;
      this.message = "Please select pdf/docs/csv/xlsx/xls file!"
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
    this.file = '';
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
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
  back(){
    this.$router.back();
  },

  readRHA(){ //Read RHA Files
    var url =  this.$api+'/RHAFiles'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data.data;
      this.getRHA();
    })
  },
  getRHA(){
    var fileName;
    for(let x=0;x<this.rha.length;x++){
      fileName = this.rha[x].fileName,
      this.rhaName.push(fileName);
    }
    return this.rhaName
  },

  saveFile(){
    var id;
    if (this.$refs.form.validate()) {
      for(let x = 0; x<this.rha.length; x++){
        if(this.rha[x].fileName == this.rhaFile)
          id = this.rha[x].id
      }
      // console.log(this.file)
      this.formData.append('RhafilesId', id);
      this.formData.append('Notes', this.notes);
      this.formData.append('formFile', this.file);

      var url = this.$api+'/InputTLFiles/Upload'
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
  uploadEvidence(){
    if (this.$refs.form.validate()) {
      this.formData.append('InputtlfilesId', this.fileId);
      this.formData.append('formFile', this.evidence);

      var url = this.$api+'/InputTLFilesEvidence/Upload'
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
          // console.log(response)
          this.e1=1;
          this.rhaFile=null;
          this.uploadTL=null;
          this.notes=null;
          this.evidence=null;
          this.$refs.form.resetValidation();
          // this.readRHA(); //mengambil data
      }).catch(error => {
          this.error_message=error;
          this.snackbar = true;
          this.message = "Upload failed!"
          this.color="red"
      })
    }
  },
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
  },
  mounted(){
    this.readRHA();
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

.orangeFont{
  font-family: 'Secular One', sans-serif;
}

.orangeText{
  color:#F15A23;
}

.greenText{
    color:#005E6A;
    font-family: 'Questrial', sans-serif;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
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
