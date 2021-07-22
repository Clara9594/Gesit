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
          <v-col sm="7" class="py-0">
            <v-card flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Requirement</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="py-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting1" @click="onButtonClick1">
                {{ buttonText1 }}
              </v-btn>
              <input
                ref="uploader1"
                class="d-none"
                type="file"
                @change="onFileChanged1">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Cost and Benefit Analysis</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting2" @click="onButtonClick2">
                {{ buttonText2 }}
              </v-btn>
              <input
                ref="uploader2"
                class="d-none"
                type="file"
                @change="onFileChanged2">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Target Implementasi</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting3" @click="onButtonClick3">
                {{ buttonText3 }}
              </v-btn>
              <input
                ref="uploader3"
                class="d-none"
                type="file"
                @change="onFileChanged3">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Arsitektur / Topologi</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting4" @click="onButtonClick4">
                {{ buttonText4 }}
              </v-btn>
              <input
                ref="uploader4"
                class="d-none"
                type="file"
                @change="onFileChanged4">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">New / Echance</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting5" @click="onButtonClick5">
                {{ buttonText5 }}
              </v-btn>
              <input
                ref="uploader5"
                class="d-none"
                type="file"
                @change="onFileChanged5">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Pengadaan / In House</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting6" @click="onButtonClick6">
                {{ buttonText6 }}
              </v-btn>
              <input
                ref="uploader6"
                class="d-none"
                type="file"
                @change="onFileChanged6">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Budgeting Copex / Opex</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting7" @click="onButtonClick7">
                {{ buttonText7 }}
              </v-btn>
              <input
                ref="uploader7"
                class="d-none"
                type="file"
                @change="onFileChanged7">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Izin / Lapor Requlator</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting8" @click="onButtonClick8">
                {{ buttonText8 }}
              </v-btn>
              <input
                ref="uploader8"
                class="d-none"
                type="file"
                @change="onFileChanged8">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Severity / BIA</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting9" @click="onButtonClick9">
                {{ buttonText9 }}
              </v-btn>
              <input
                ref="uploader9"
                class="d-none"
                type="file"
                @change="onFileChanged9">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Sistem / App Impact</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting10" @click="onButtonClick10">
                {{ buttonText10 }}
              </v-btn>
              <input
                ref="uploader10"
                class="d-none"
                type="file"
                @change="onFileChanged10">
            </v-card>
          </v-col>
          <v-col sm="7" class="pb-0">
            <v-card class="" flat color="#F2F6F6">
              <span class="ml-7 text-h6 font-weight-light">Risk</span>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pb-0">
            <v-card flat color="#F2F6F6">
              <v-btn color="#F15A23" dark small class="text-none" :loading="isSelecting11" @click="onButtonClick11">
                {{ buttonText11 }}
              </v-btn>
              <input
                ref="uploader11"
                class="d-none"
                type="file"
                @change="onFileChanged11">
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
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
            <h1 id="approved">APPROVED!</h1>
            <p class="text3">Files succesfully uploaded</p>
            <v-flex class="px-10 pt-5 pb-2 text-center">
              <img id="pic" src="../assets/checked 1.png">
            </v-flex>
            <h4 class="text3" style="font-weight:bolder; font-size:xx-large; justify-content:center">6/12</h4>
        </v-card>
        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn outlined color = "#005E6A" dark link to="/home">
              Back
          </v-btn>

          <v-btn 
          color = "#005E6A"
          dark 
          @click = "dialog2 = true">
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
            <v-btn icon @click="dialog2 = false"> 
              <v-icon>mdi-close-circle</v-icon> 
            </v-btn> 
          </v-toolbar-items> 
        </v-toolbar>
        <v-card flat class="pl-9 pr-9 mt-16">
          <h1 id="reminder">REMINDER!</h1>
          <v-flex class="px-10 pt-5 pb-2 text-center">
            <img id="pic" src="../assets/reminder.png">
          </v-flex>
          <p class="text4 ml-16">Don't Forget to fill Cost & Benefit Analyst</p>
          <p class="text4 ml-16">Don't Forget to fill Severity</p>
        </v-card>
        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn class="ma-2" color = "#005E6A" dark>
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
      selected: [],
      isSelecting1: false,
      isSelecting2: false,
      isSelecting3: false,
      isSelecting4: false,
      isSelecting5: false,
      isSelecting6: false,
      isSelecting7: false,
      isSelecting8: false,
      isSelecting9: false,
      isSelecting10: false,
      isSelecting11: false,

      selectedFile1: null,
      selectedFile2: null,
      selectedFile3: null,
      selectedFile4: null,
      selectedFile5: null,
      selectedFile6: null,
      selectedFile7: null,
      selectedFile8: null,
      selectedFile9: null,
      selectedFile10: null,
      selectedFile11: null,

      defaultButtonText1: 'Browse',
      defaultButtonText2: 'Browse',
      defaultButtonText3: 'Browse',
      defaultButtonText4: 'Browse',
      defaultButtonText5: 'Browse',
      defaultButtonText6: 'Browse',
      defaultButtonText7: 'Browse',
      defaultButtonText8: 'Browse',
      defaultButtonText9: 'Browse',
      defaultButtonText10: 'Browse',
      defaultButtonText11: 'Browse',
      
    };
},

methods: {
  back(){
    this.$router.back();
  },
  close() {
    this.dialog = false;
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

  //====== 2 ======
  onButtonClick2() {
    this.isSelecting2 = true
    window.addEventListener('focus', () => {
      this.isSelecting2 = false
    }, { once: true })

    this.$refs.uploader2.click()
  },
  onFileChanged2(e) {
    this.selectedFile2 = e.target.files[0]
  },

  //====== 3 ======
  onButtonClick3() {
    this.isSelecting3 = true
    window.addEventListener('focus', () => {
      this.isSelecting3 = false
    }, { once: true })

    this.$refs.uploader3.click()
  },
  onFileChanged3(e) {
    this.selectedFile3 = e.target.files[0]
  },

//====== 4 ======
  onButtonClick4() {
    this.isSelecting4 = true
    window.addEventListener('focus', () => {
      this.isSelecting4 = false
    }, { once: true })

    this.$refs.uploader4.click()
  },
  onFileChanged4(e) {
    this.selectedFile4 = e.target.files[0]
  },

  //====== 5 ======
  onButtonClick5() {
    this.isSelecting5 = true
    window.addEventListener('focus', () => {
      this.isSelecting5 = false
    }, { once: true })

    this.$refs.uploader5.click()
  },
  onFileChanged5(e) {
    this.selectedFile5 = e.target.files[0]
  },

  //====== 6 ======
  onButtonClick6() {
    this.isSelecting6 = true
    window.addEventListener('focus', () => {
      this.isSelecting6 = false
    }, { once: true })

    this.$refs.uploader6.click()
  },
  onFileChanged6(e) {
    this.selectedFile6 = e.target.files[0]
  },

  //====== 7 ======
  onButtonClick7() {
    this.isSelecting7 = true
    window.addEventListener('focus', () => {
      this.isSelecting7 = false
    }, { once: true })

    this.$refs.uploader7.click()
  },
  onFileChanged7(e) {
    this.selectedFile7 = e.target.files[0]
  },

  //====== 8 ======
  onButtonClick8() {
    this.isSelecting8 = true
    window.addEventListener('focus', () => {
      this.isSelecting8 = false
    }, { once: true })

    this.$refs.uploader8.click()
  },
  onFileChanged8(e) {
    this.selectedFile8 = e.target.files[0]
  },

  //====== 9 ======
  onButtonClick9() {
    this.isSelecting9 = true
    window.addEventListener('focus', () => {
      this.isSelecting9 = false
    }, { once: true })

    this.$refs.uploader9.click()
  },
  onFileChanged9(e) {
    this.selectedFile9 = e.target.files[0]
  },

  //====== 10 ======
  onButtonClick10() {
    this.isSelecting10 = true
    window.addEventListener('focus', () => {
      this.isSelecting10 = false
    }, { once: true })

    this.$refs.uploader10.click()
  },
  onFileChanged10(e) {
    this.selectedFile10 = e.target.files[0]
  },

  //====== 11 ======
  onButtonClick11() {
    this.isSelecting11 = true
    window.addEventListener('focus', () => {
      this.isSelecting11 = false
    }, { once: true })

    this.$refs.uploader11.click()
  },
  onFileChanged11(e) {
    this.selectedFile11 = e.target.files[0]
  },
},
computed: {
  buttonText1() {
    return this.selectedFile1 ? this.selectedFile1.name : this.defaultButtonText1
  },
  buttonText2() {
    return this.selectedFile2 ? this.selectedFile2.name : this.defaultButtonText2
  },
  buttonText3() {
    return this.selectedFile3 ? this.selectedFile3.name : this.defaultButtonText3
  },
  buttonText4() {
    return this.selectedFile4 ? this.selectedFile4.name : this.defaultButtonText4
  },
  buttonText5() {
    return this.selectedFile5 ? this.selectedFile5.name : this.defaultButtonText5
  },
  buttonText6() {
    return this.selectedFile6 ? this.selectedFile6.name : this.defaultButtonText6
  },
  buttonText7() {
    return this.selectedFile7 ? this.selectedFile7.name : this.defaultButtonText7
  },
  buttonText8() {
    return this.selectedFile8 ? this.selectedFile8.name : this.defaultButtonText8
  },
  buttonText9() {
    return this.selectedFile9 ? this.selectedFile9.name : this.defaultButtonText9
  },
  buttonText10() {
    return this.selectedFile10 ? this.selectedFile10.name : this.defaultButtonText10
  },
  buttonText11() {
    return this.selectedFile11 ? this.selectedFile11.name : this.defaultButtonText11
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