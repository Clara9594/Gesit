<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
        <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-layout justify-center>
        <v-card flat width="700px" color="#fdf9ed" class="mx-5">
          <v-alert type="error" timeout="2000" v-model="alert" :color="color" class="mt-3 mb-2 textTable">
            Please fill all the field!
          </v-alert>
        </v-card>
      </v-layout>

      <v-layout justify-center>
        <v-sheet class="rounded-lg mx-5 mt-3 pa-5" width="700px" elevation="2">
          <v-form fluid ref = "form">
            <h2 class="text judul text-center px-5" style="font-size:xx-large;">Input Tindak Lanjut</h2>
            <v-divider class="my-4"></v-divider>
            <v-row no-gutters>
              <v-col>
                <p class="mb-1 greenText font-weight-bold">Select your file</p>
                <v-select 
                  v-model="rhaFile" 
                  :rules="categoryRules"
                  :items="items"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="7" sm="7" md="6" class="px-0 pb-0">
                <p class="mb-1 greenText font-weight-bold">Surat / Memo</p>
                <v-file-input
                show-size
                counter
                outlined
                :rules="categoryRules"
                dense
                class="mr-4 ml-1"></v-file-input>
              </v-col>
              <v-col cols="5" sm="5" md="6" class="pl-0 pb-0">
                <v-btn
                  color="#F15A23"
                  class="text-none mt-7"
                  dark
                  :loading="isSelecting">
                  <v-icon right dark class="mr-3 ml-0">
                    mdi-cloud-upload
                  </v-icon>
                  Upload
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col style="color:red">
                <v-divider class="mb-4"></v-divider>
                  Other
                <br>
                <v-textarea 
                  :rules="categoryRules" 
                  outlined />
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-layout>
      <v-layout justify-center class="mt-10 mb-10">
        <v-btn
          color = "#F15A23"
          dark
          @click="next" 
          link>
          Next
         </v-btn>
      </v-layout>
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
    alert: false,
    menu2: false,
    tgl: [],
    expanded:[],
    color: '',
    file:'',
    defaultButtonText: '',
    selectedFile: null,
    isSelecting: false,
    rhaFile:null,
    categoryRules: [
        (v) => !!v || 'This Field is required',
      ],
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
   
    items: ['RHA1','RHA2','RHA3', 'RHA4'],
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
  next(){
    if(this.$refs.form.validate()){
      this.$router.push('/Evidence');
    }
    else{
      this.color="red";
      this.alert=true;
    }
  },

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
