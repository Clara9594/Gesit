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
      <template>
        <v-stepper v-model="e6" vertical non-linear>
          <v-stepper-step :complete="e6 > 1" step="1">
            Requirement
            <small class="mt-1">This field is required</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-file-input
              v-model="file1"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn v-if="file1!=null" color="#005E6A" dark @click="e6 = 2">
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Cost & Benefit Analysis
            <small class="mt-1">This field is required</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-file-input
              v-model="file2"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" v-if="file2!=null" @click="e6 = 3" dark>
              Continue
            </v-btn>
            <v-btn v-if="file2!=null" text @click="e6 = 1">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Target Implementasi  
            <small class="mt-1">This field is required</small>          
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-file-input
              v-model="file3"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn v-if="file3!=null" color="#005E6A" dark @click="e6 = 4">
              Continue
            </v-btn>
            <v-btn v-if="file3!=null" text @click="e6 = 2">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4" :complete="e6 > 4">
            Arsitektur / Topologi
            <small class="mt-1">This field is required</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-file-input
              v-model="file4"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn v-if="file4!=null" color="#005E6A" dark @click="e6 = 5">
              Continue
            </v-btn>
            <v-btn v-if="file4!=null" text @click="e6 = 3">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="5" :complete="e6 > 5">
            New / Echance
            <small class="mt-1">This field is required</small>
          </v-stepper-step>
          <v-stepper-content step="5">
            <v-file-input
              v-model="file5"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn v-if="file5!=null" color="#005E6A" dark @click="e6 = 6">
              Continue
            </v-btn>
            <v-btn v-if="file5!=null" text @click="e6 = 4">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="6" :complete="e6 > 6">
            Pengadaan / In House
          </v-stepper-step>
          <v-stepper-content step="6">
            <v-file-input
              v-model="file6"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" dark @click="e6 = 7">
              Continue
            </v-btn>
            <v-btn text @click="e6 = 5">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="7" :complete="e6 > 7">
            Budgeting Copex / Opex
          </v-stepper-step>
          <v-stepper-content step="7">
            <v-file-input
              v-model="file7"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" dark @click="e6 = 8">
              Continue
            </v-btn>
            <v-btn text @click="e6 = 6">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="8" :complete="e6 > 8">
            Izin / Lapor Regulator
          </v-stepper-step>
          <v-stepper-content step="8">
            <v-file-input
              v-model="file8"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" dark @click="e6 = 9">
              Continue
            </v-btn>
            <v-btn text @click="e6 = 7">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="9" :complete="e6 > 9">
            Severity / BIA
          </v-stepper-step>
          <v-stepper-content step="9">
            <v-file-input
              v-model="file9"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" dark @click="e6 = 10">
              Continue
            </v-btn>
            <v-btn text @click="e6 = 8">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="10" :complete="e6 > 10">
            Sistem / App Impact
            <small class="mt-1">This field is required</small>
          </v-stepper-step>
          <v-stepper-content step="10">
            <v-file-input
              v-model="file10"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn v-if="file10!=null" color="#005E6A" dark @click="e6 = 11">
              Continue
            </v-btn>
            <v-btn v-if="file10!=null" text @click="e6 = 9">
              Back
            </v-btn>
          </v-stepper-content>

          <v-stepper-step step="11" :complete="e6 > 11">
            Risk
          </v-stepper-step>
          <v-stepper-content step="11">
            <v-file-input
              v-model="file11"
              label="File input"
              class="mt-1"
              outlined
              dense
            ></v-file-input>
            <v-btn color="#005E6A" dark @click="e6 = 1">
              Continue
            </v-btn>
            <v-btn text @click="e6 = 10">
              Back
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </template>
    </v-card>
    </v-layout>
    <br>
    <br>
    <v-layout justify-center class="mb-10">
      <v-btn 
          color = "#005E6A"
          dark
          :style="{left: '50%', transform:'translateX(-50%)'}"
          @click = "counterFile" :right="true" :absolute="true"
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
            <v-btn icon @click="closeDialog"> 
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
          <h4 class="text3" style="font-weight:bolder; font-size:xx-large; justify-content:center">{{count}}/11</h4>
        </v-card>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark @click = "dialog2 = true">
            Reminder
          </v-btn>
          <v-btn class="mb-2" outlined color = "#005E6A" dark link to="/home">
            Back
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
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      file5: null,
      file6: null,
      file7: null,
      file8: null,
      file9: null,
      file10: null,
      file11: null,
      e6: 1,
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      count:0,
    };
},

methods: {
  back(){
    this.$router.back();
  },
  closeDialog(){
    this.counter= 6;
    this.dialog=false;
  },
  close() {
    this.dialog = false;
  },
  counterFile(){
    if(this.file6 != null)
      this.count = this.count+1;
    if(this.file7 != null)
      this.count = this.count+1;
    if(this.file8!= null)
      this.count = this.count+1;
    if(this.file9 != null)
      this.count = this.count+1;
    if(this.file11 != null)
      this.count = this.count+1;
    this.dialog=true;
  },
  closeRemainder(){
    this.dialog = false;
    this.dialog2 = false;
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
.context{
  color:black;
  font-size:x-large; font-weight:bolder; text-align:center;
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

@media screen and (max-width: 600px) {
  .context{
    font-size: small;
  }
}
</style>