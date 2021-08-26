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
                  <v-file-input
                    v-model="uploadTL"
                    show-size
                    counter
                    @change="fileHandler(uploadTL)"
                    outlined
                    accept=".pdf,.docx,.doc,.xls,.xlsx,.csv"
                    :rules="suratRules"
                    dense>
                  </v-file-input>
                    
                  <v-row>
                    <v-col style="color:red" class="textTable">
                      <v-divider class="mb-4"></v-divider>
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
                    <p class="pt-5 ml-4 greenText">{{namaFile}}</p>
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
                  <v-btn color="#F15A23" @click="uploadEvidence" dark>
                    Submit
                  </v-btn>
                  <v-btn text @click="e1 = 1">
                    Cancel
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
  fileHandler(e) {
    this.namaFile = e.name;
  },

  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
  next(){
    if(this.$refs.form.validate()){
      this.saveFile();
      this.e1 = 2;
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
      this.formData.append('RhafilesId', id);
      this.formData.append('Notes', this.notes);
      this.formData.append('formFile', this.uploadTL);

      var url = this.$api+'/InputTLFiles/Upload'
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
          
          this.fileId = response.data.id
          // console.log(this.fileId)
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
          console.log(response)
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
</style>
