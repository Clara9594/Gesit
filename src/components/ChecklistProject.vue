<template>
<v-app>
  <v-main class="checklist">
    <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
   <h2 class="text text-center mt-5 mb-2" style="font-size:xx-large;">CHECKLIST PROJECT</h2>
   <p class="text--secondary text-center">Check the Project what you want</p>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 class="mt-3">
        <v-row>
          <v-col sm="7">
            <v-card class="" flat v-for="item in files" :key="item.fileName" color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">{{item.fileName}}</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card flat>
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting" @click="onButtonClick">
                {{ buttonText }}
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                @change="onFileChanged">
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <br>
    <br>
    <br>
    <br>
  <v-dialog v-model = "dialog" persistent max-width = "600px">
        <v-card>
        <v-toolbar flat dense> 
        <v-spacer></v-spacer> 
        <v-toolbar-items dense> 
        <v-btn icon @click="dialog = false"> 
        <v-icon>mdi-close-circle</v-icon> 
        </v-btn> 
        </v-toolbar-items> 
        </v-toolbar>
          <v-card flat class="pl-9 pr-9 mt-16">
              <h1>APPROVED!</h1>
              <p class="text3">Files succesfully uploaded</p>
              <v-flex class="px-10 pt-5 pb-2 text-center">
              <img id="pic" src="../assets/checked 1.png"></v-flex>
              <h4 class="text3" style="font-weight:bolder; font-size:xx-large; justify-content:center">6/12</h4>
          </v-card>
        <br>
      <v-card-actions class="mr-8" style="justify-content:center" >
          <v-btn outlined color = "#005E6A" dark link to="/home">
              Back
          </v-btn>
          <v-btn color = "#005E6A" dark>
              Reminder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-main>
</v-app>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
name : "Checklist",
created () {
  document.title = "Checklist";
},
data() {
    return {
      dialog: false,
      singleSelect: false,
      selected: [],
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      files:[
        {fileName: 'Requirement'},
        {fileName: 'Cost & Benefit Analysis'},
        {fileName: 'Target Implementasi'},
        {fileName: 'Arsitektur /Topologi'},
        {fileName: 'New/Echance'},
        {fileName: 'Pengadaan / In House'},
        {fileName: 'Budgeting Copex / Opex'},
        {fileName: 'Izin / Lapor Requlator'},
        {fileName: 'Severity / BIA'},
        {fileName: 'Sistem / App Impact'},
        {fileName: 'Risk'},
      ],
    };
},

methods: {
  back(){
    this.$router.back();
  },
  close() {
    this.dialog = false;
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
  }
},
computed: {
  buttonText() {
    return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
  }
},
};
</script>
<style scope>

.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
.text2{
text-align: center;
}
.text3{
  color: #F15A23;
  text-align: center;
}
.kotak{
  height:70px;
}
#pic{
height:110px;
align-content: center;
}
#icon{
  align-content: right;
}
h1{
  color:#005E6A;
  text-align: center;
  
}

                                                                                                                                                            
</style>