<template>
<v-app>
  <v-main class="checklist">
    <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
   <h2 class="text text-center mb-2 ma-5" style="font-size:xx-large;">CHECKLIST PROJECT</h2>
   <p class="text--secondary text-center">Check the Project what you want</p>
    <v-layout justify-center>
    <v-card width="700px" elevation="2" class="px-3 mx-5 py-3 mt-3" outlined>
      <v-row v-for="item in laporan" :key="item.text" class="mt-0">
        <v-col cols="1" sm="1" md="1" class="pb-0 pa-0">
          <v-checkbox class="ml-3 py-0" v-model="checkbox1"></v-checkbox>
        </v-col>
        <v-col cols="8" sm="9" md="9" class="pb-0 pr-0">
          <span class="text-h6 font-weight-light">{{item.text}}</span>
        </v-col>
        <v-col cols="3" sm="1" md="1" class="pb-0 pl-1">
          <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting1" @click="onButtonClick1">
            {{ buttonText1 }}
          </v-btn>
          <input
            ref="uploader1"
            class="d-none"
            type="file"
            @change="onFileChanged1()">
        </v-col>
      </v-row>
    </v-card>
    </v-layout>
    <br>
    <br>
    <v-layout justify-center class="mb-10">
      <v-btn 
          color = "#005E6A"
          dark
          :style="{left: '50%', transform:'translateX(-50%)'}"
          @click = "dialog = true" :right="true" :absolute="true"
        >
        Submit
      </v-btn>
    </v-layout>
    <br>
    <br>
    <v-dialog v-model = "dialog" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense> 
          <v-spacer></v-spacer> 
          <v-toolbar-items dense> 
            <v-btn icon @click="dialog = false"> 
              <v-icon class="ml-5">mdi-close-circle</v-icon> 
            </v-btn> 
          </v-toolbar-items> 
        </v-toolbar>
        <v-card flat>
          <h1 id="approved">APPROVED!</h1>
          <p class="text3">Files succesfully uploaded</p>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png">
          </v-flex>
          <h4 class="text3" style="font-weight:bolder; font-size:xx-large; justify-content:center">6/12</h4>
        </v-card>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" outlined color = "#005E6A" dark link to="/home">
            Back
          </v-btn>
          <v-btn class="mb-2" color = "#005E6A" dark @click = "dialog2 = true">
            Reminder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model = "dialog2" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense> 
          <v-spacer></v-spacer> 
          <v-toolbar-items dense> 
            <v-btn icon @click="closeRemainder()"> 
              <v-icon class="ml-5">mdi-close-circle</v-icon> 
            </v-btn> 
          </v-toolbar-items> 
        </v-toolbar>
        <v-card flat>
          <h1 id="reminder">REMINDER!</h1>
          <v-flex class="px-10 pt-5 pb-2 text-center">
            <img id="pic" src="../assets/reminder.png">
          </v-flex>
          <p class="text4 text-center mb-0">- Don't Forget to fill Cost & Benefit Analyst</p>
          <p class="text4 text-center">- Don't Forget to fill Severity</p>
        </v-card>
        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark>
              Edit
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
      dialog2: false,
      singleSelect: false,
      checkbox1: false,
      selected: [],
      laporan : [
        { text : "Requirement *"},
        { text : "Cost & Benefit Analysis *"},
        { text : "Target Implementasi *"},
        { text : "Arsitektur / Topologi *"},
        { text : "New / Echance *"},
        { text : "Pengadaan / In House"},
        { text : "Budgeting Copex / Opex"},
        { text : "Izin / Lapor Regulator"},
        { text : "Severity / BIA"},
        { text : "Sistem / App Impact *"},
        { text : "Risk"},
      ],
      isSelecting1: false,

      selectedFile1: null,

      defaultButtonText1: 'Browse',
      
    };
},

methods: {
  back(){
    this.$router.back();
  },
  close() {
    this.dialog = false;
  },

  closeRemainder(){
    this.dialog = false;
    this.dialog2 = false;
  },

  //====== 1 ======
  onButtonClick1() {
    this.isSelecting1 = true
    window.addEventListener('focus', () => {
      this.isSelecting1 = false
    }, { once: true })

    this.$refs.uploader1.click()
  },
  onFileChanged1(e) {
    this.selectedFile1 = e.target.files[0]
  },

},
computed: {
  buttonText1() {
    return this.selectedFile1 ? this.selectedFile1.name : this.defaultButtonText1
  },
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
.text4{
  color:#005E6A;
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
#reminder{
color:#FF0000;
font-size:xx-large; font-weight:bolder; text-align:center;
}
#approved{
  color:#005E6A;
  text-align: center;
}                                                                                                                                                    
</style>