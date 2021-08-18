<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-1">
       <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <!-- Konten PM -->
      <v-card color="#fdf9ed" flat v-if="role=='PM'">
        <v-card color="#fdf9ed" class="pb-1 pt-5" flat >
          <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
            {{message}}
          </v-alert>
          <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
            <v-toolbar flat>
              <v-toolbar-title class="judul">RHA FILES</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
            </v-toolbar>
            <v-data-table
              :headers = "headers" 
              :items = "data" 
              :sort-by="['no']" 
              item-key = "no" 
              class="textTable"
              :items-per-page="5">
              <template v-slot:[`item.actions`]= "{ item }">
                <v-icon color="orange" @click="downloadHandler(item.id)">mdi-download</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-card>

      <!-- INI batas bukan PM -->
      <v-card color="#fdf9ed" flat v-else>
        <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#fe713c">
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat>
              <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
                {{message}}
              </v-alert>
              <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
                <v-toolbar flat>
                  <v-toolbar-title class="judul">RHA FILES</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
                </v-toolbar>
                <v-data-table
                  :headers = "headers" 
                  :items = "rha" 
                  :sort-by="['id']" 
                  item-key = "id" 
                  class="textTable"
                  :items-per-page="5">
                  <template v-slot:[`item.actions`]= "{ item }">
                    <v-icon color="orange" @click="downloadHandler(item.id)">mdi-download</v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-card>
            <v-dialog v-model="addFile" scrollable max-width = "600px">
              <v-card>
                <v-card class="kotak" tile color="#F15A23">
                  <h3 class="text-center white--text py-5">Add RHA FILE</h3>
                </v-card>

                <v-card-text flat class="pl-9 pr-9 mt-5 pt-1">
                  <v-form ref="form">
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
                      ></v-date-picker> 
                    </v-menu>

                    <v-text-field
                      v-model = "form.assign"
                      label = "Assign"
                      required
                      outlined
                      :rules="fieldRules"
                      dense
                    ></v-text-field>

                    <v-file-input
                      label="Select File"
                      :rules="fileRules"
                      v-model="form.uploadRha"
                      outlined
                      accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.zip,.rar"
                      dense
                    ></v-file-input>
                  </v-form>
                </v-card-text>

                <v-card-actions class="mr-8">
                  <v-spacer></v-spacer>

                  <v-btn color = "black" text @click = "closeDialog">
                      Cancel
                  </v-btn>

                  <v-btn depressed dark large color="#F15A23" @click="saveFile">
                      Save
                  </v-btn>
                </v-card-actions>
                <br>
              </v-card>
            </v-dialog>
          </v-tab-item>

          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat> 
              <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
                {{message}}
              </v-alert>
              <!--<v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="2" outlined>
                <v-toolbar height="100px" flat>
                  <v-card width="700px" flat class="ml-5 mt-6 pr-5">
                    <v-form fluid ref="form">
                      <v-row>
                        <v-col sm="6" class="px-0">
                          <v-file-input
                            label="Select File"
                            outlined
                            type="file"
                            show-size
                            :rules="fileRules"
                            accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.zip,.rar"
                            v-model="fileUpload"
                            dense
                          ></v-file-input>
                        </v-col>
                        <v-col>
                          <v-btn
                            color="#F15A23"
                            class="text-none textTable"
                            dark
                            :loading="isSelecting">
                            <v-icon right dark class="mr-3 ml-0">
                              mdi-cloud-upload
                            </v-icon>
                            Upload
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-toolbar>
              </v-card>-->
              <v-row>
                <v-col>
                  <v-card class="mx-5 px-5 pt-5" outlined elevation="2">
                    <v-card-title class="pb-0">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        rounded
                        class="mb-5 textTable"
                        dense
                        filled
                        hide-details
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
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
                            label="Filter Date"
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
                    </v-card-title>
                    <v-data-table
                      class="textTable"
                      :headers = "headersEvidence" 
                      :search = "search"
                      :items = "rha" 
                      :sort-by="['id']"
                      item-key="id"
                      :expanded.sync="expanded"
                      show-expand>
                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <p class="font-weight-bold mt-4"> Evidence Files :</p>
                          <div v-for="i in item.rhafilesEvidences" :key="i.id">
                            <p>
                              <v-icon class="mr-2">
                                mdi-circle-small
                              </v-icon>
                              {{i.fileName}}
                            </p>
                          </div>
                        </td>
                      </template>
                      <template v-slot:[`item.status`]="{ item }" >
                        <td class="d-flex justify-center">
                          <v-chip v-if="item.status == 'Assigned'" color="green" dark label>
                            {{ item.status }}
                          </v-chip>
                        </td>
                      </template>
                      <template v-slot:[`item.actions`]= "{ item }">
                        <v-icon color="orange" @click="dialogHandler(item)" class="mr-5">mdi-plus-thick</v-icon>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <!-- Dialog upload Evidence file -->
      <v-dialog v-model="addEvidence" scrollable max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">Add Evidence File</h3>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">
            <v-form ref="form">
              <v-text-Field
                v-model="getRHA"
                label="RHA Files"
                outlined
                dense
                readonly
              ></v-text-field>
              <v-file-input
                label="Select File"
                :rules="fileRules"
                v-model="fileUpload"
                outlined
                accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.zip,.rar"
                dense
              ></v-file-input>
            </v-form>
          </v-card-text>

          <v-card-actions class="mr-8">
            <v-spacer></v-spacer>

            <v-btn color = "black" text @click = "closeDialog">
                Cancel
            </v-btn>

            <v-btn depressed dark large color="#F15A23" @click="uploadFileEvidence">
                Save
            </v-btn>
          </v-card-actions>
          <br>
        </v-card>
      </v-dialog>
      <br>
      <br>
      <br>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{message}}
    </v-snackbar>
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
    tgl: [],
    tipe:'',
    search : null,
    snackbar :false,
    rha:[],
    evidence:[],
    role: localStorage.getItem('role'),
    addFile:false,
    addEvidence:false,
    expanded:[],
    color: '',
    file:'',
    fileUpload:null,
    imageName: '',
    defaultButtonText: '',
    selectedFile: null,
    isSelecting: false,
    alert: false,
    message:'',
    formData : new FormData,
    headers : [
      {
          text : "No",
          align : "center",
          sortable : true,
          value : "id",
      },
      { text : "File Name",align : "center",value : "fileName"},
      { text : "Sub Kondisi",align : "center",value : "subKondisi"},
      { text : "Kondisi",align : "center",value : "kondisi"},
      { text : "Rekomendasi", align : "center",value : "rekomendasi"},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjut"},
      { text : "Target Date", align : "center",value : "targetDate"},
      { text : "Assign", align : "center",value : "assign"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    headersEvidence : [
      {
          text : "No",
          align : "center",
          sortable : true,
          value : "id",
      },
      { text : "File RHA", align : "center",value : "fileName"},
      { text : "Time", align : "center",value : "createdAt"},
      { text : "Status", align : "center",value : "status"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    form : {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      assign : null,
      uploadRha : null,
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
  };
},

methods: {
  readRHA(){ //Read RHA Files
    var url =  this.$api+'/RHAFiles'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log(response)
      this.rha = response.data.data;
      for(let i = 0; i < this.rha.length; i++){
        var tanggal = this.rha[i].targetDate;
        
        if(tanggal != null){
          var createdTime = this.rha[i].createdAt;
          // console.log(createdTime)
          this.rha[i].targetDate = moment(tanggal).format('L');
          this.rha[i].createdAt = moment(createdTime).fromNow();
        }
      }
    })
  },

  saveFile(){
    if (this.$refs.form.validate()) {
      this.formData.append('subKondisi', this.form.subKondisi);
      this.formData.append('kondisi', this.form.kondisi);
      this.formData.append('rekomendasi', this.form.rekomendasi);
      this.formData.append('targetDate', this.form.date);
      this.formData.append('assign', this.form.assign);
      this.formData.append('formFile', this.form.uploadRha);

      var url = 'http://35.219.8.90:90/api/RHAFiles/Upload'
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
          this.closeDialog();
          this.readRHA(); //mengambil data
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.snackbar = true;
          this.message = "Upload failed!"
          this.color="red"
      })
    }
  },

  //download RHA File
  async downloadHandler(id){
    axios({
      url: 'http://35.219.8.90:90/api/RHAFiles/GetOnlyFile/'+id,
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

  dialogHandler(item){
    //alizahanum
    this.getRHA = item.fileName;
    this.dialogId = item.id;
    this.addEvidence = true;
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },

  back(){
    this.$router.back();
  },

  uploadFileEvidence(){
    if (this.$refs.form.validate()) { 
      this.formData.append('formFile', this.fileUpload);
      this.formData.append('RhafilesId', this.dialogId);
      this.formData.append('status', false);
      this.formData.append('createdby', localStorage.getItem('npp'));
      // console.log(this.formData)
      var url = this.$api+'/RHAFilesEvidence/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
      }).then(response => {
          this.error_message=response.data.message;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.closeDialog();
          this.readRHA();
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.closeDialog();
          this.readRHA();
      })
    }
  },

  resetForm(){
    this.form = {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      uploadRha : null,
      assign : null,
      action : null,
      // testpush
      //cobapush ya
      //testtest
      //abaikan
    }
  },
  closeDialog(){
    this.addFile = false;
    this.addEvidence = false;
    this.fileUpload = null;
    this.resetForm();
    this.$refs.form.resetValidation();
  },

  hide_alert() {
    window.setInterval(() => {
      this.alert = false;
    }, 5000)    
  }
},

mounted(){
  this.hide_alert();
  this.readRHA();
  // this.readEvidence();
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
  },
};
</script>

<style scope>
.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
.title{
    color:#005E6A;
    font-size:xx-large;
}
.textbutton{
    color:#005E6A;
}
.konten{
   background-color:#fdf9ed ;
}

.v-window__container {
  height: 0%;
}

</style>
