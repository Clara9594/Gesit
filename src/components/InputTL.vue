<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-card class="pt-2 px-5 mt-5 mx-5 mb-16" elevation="2" outlined>
        <v-card-title class="py-0">
          <v-toolbar flat class="textTable">
            <v-toolbar-title>Input Tindak Lanjut</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
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
                  <v-list-item-title>Input Tindak Lanjut</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>

      <!--Upload File RHA Excel-->
      <v-dialog v-model="addFileNew" scrollable max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">{{ formTitle }} RHA FILE</h3>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 mt-5 pt-1 pb-0">
            <v-alert
              text
              dense
              color="teal"
              class="textTable"
              icon="mdi-file"
              border="left"
            >
            <v-row align="center">
              <v-col class="grow">
                Template RHA File
              </v-col>
              <v-col class="shrink">
                <v-btn small text color="teal">Download Here</v-btn>
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

              <v-text-field
                v-model = "form.assign"
                label = "Assign"
                required
                outlined
                dense
              ></v-text-field>

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
            </v-form>
          </v-card-text>

          <v-card-actions class="mr-5 my-2">
            <v-spacer></v-spacer>

            <v-btn color="#F15A23" text @click = "closeDialogEvidence()">
                Cancel
            </v-btn>

            <v-btn depressed dark color="#F15A23" @click="saveFile">
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
name : "TL",
created () {
  document.title = "Tindak Lanjut";
},
data() {
  return {
    alert: false,
    menu2: false,
    searchRHA : null,
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
    headers : [
    {
      text : "No",
      align : "center",
      sortable : true,
      value : "index",
    },
      { text : "File Name", align : "center",value : "fileName"},
      { text : "Target Date", align : "center",value : "targetDate"},
      { text : "Actions", align : "center",value : "actions"},
    ],
  };
},
methods: {
  subRHAHandler(item){
    this.showSubRHA = true;
    this.idRHA = item.id;
    // alert(this.idRHA)
    this.getRHA = item.fileName;
    this.readSubRHAbyId(this.idRHA);
  },


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
    var url =  this.$api+'/Rha'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data.data;
      if(this.rha != null){
        for(let i = 0; i < this.rha.length; i++){
          var target = this.rha[i].targetDate;
          this.rha[i].targetDate = moment(target).format('YYYY-MM-DD');
        }
      }
    })
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

    rhaIndexNew() { //Ini munculin nomor table untuk RHA
      return this.rha.map(
        (rha, index) => ({
          ...rha,
          index: index + 1
        }))
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
