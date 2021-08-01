<template>
<v-app>
  <v-main class="checklist">
    <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
    
    <v-layout justify-center>
      <v-sheet class="rounded-lg mx-5 mt-3 pa-5" width="700px" elevation="2">
        <h2 class="text judul text-center px-5" style="font-size:xx-large;">CHECKLIST PROJECT</h2>
        <p class="greetings text-center px-5">Check the Project what you want</p>
        <v-divider class="mb-4"></v-divider>
        <v-card color="#ffeede" class="mb-5 mt-5" flat>
          <v-row>
            <v-col>
              <p class="ml-5 mb-2 font-weight-bold detailFont text-center">Category Project </p>
              <p class="ml-5 mb-0 detailFont text-center">{{category}}</p>
            </v-col>
            <v-col>
              <p class="mb-2 font-weight-bold detailFont text-center">Project Title </p>
              <p class="mb-0 detailFont text-center">{{judul}}</p>
            </v-col>
            <v-col>
              <p class="ml-5 mb-2 font-weight-bold detailFont text-center">Persentase </p>
              <p class="ml-5 mb-0 detailFont text-center">50 / 100</p>
            </v-col>
          </v-row>
        </v-card>
        <template>
          <div>
            <v-stepper non-linear vertical v-model="e6">
              <v-stepper-step step="1"  :complete="e6 > 1">
                Requirement
                <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <p class="pt-5">
                    <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                    Document Title.pdf</p>
                    <v-spacer></v-spacer>
                    </v-col><v-col cols="3" sm="3" md="3">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              <v-menu 
                  v-model="menu2" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_req" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_req" 
                    @input="menu2 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="2"  :complete="e6 > 2">
                Cost & Benefit Analysis
                <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                  Document Title.pdf</p>
                  <v-spacer></v-spacer>
                </v-col><v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col>
                </v-row>
                <v-menu 
                  v-model="menu3" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_cost" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_cost" 
                    @input="menu3 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>

              <v-stepper-step step="3" editable>
                Target Implementasi  
                <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  27 Agustus 2021</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu4" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_implementasi" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_implementasi" 
                    @input="menu4 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>

              <v-stepper-step step="4" editable>
                Arsitektur / Topologi
              <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                  Document Title.pdf</p>
                  <v-spacer></v-spacer>
                </v-col><v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col>
                </v-row>
                <v-menu 
                  v-model="menu5" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_arsi" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_arsi" 
                    @input="menu5 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="5" editable>
                Kategori Project
              <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  Compliance</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu6" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_kategori" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_kategori" 
                    @input="menu6 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="6" editable>
                New / Echance
                <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="6">
               <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  Enhance</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu7" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_enhance" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_enhance" 
                    @input="menu7 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="7" editable>
                Pengadaan / In House
              </v-stepper-step>
              <v-stepper-content step="7">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  In House</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu8" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_pengadaan" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_pengadaan" 
                    @input="menu8 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="8" editable>
                Budgeting Copex / Opex
              </v-stepper-step>
              <v-stepper-content step="8">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  Rp. xxxxxxx</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu9" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_budget" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_budget" 
                    @input="menu9 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>


              <v-stepper-step step="9" editable>
                Izin / Lapor Regulator
              </v-stepper-step>
              <v-stepper-content step="9">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                  Document Title.pdf</p>
                  <v-spacer></v-spacer>
                </v-col><v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col>
                </v-row>
                <v-menu 
                  v-model="menu10" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_izin" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_izin" 
                    @input="menu10 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>

              <v-stepper-step step="10" editable>
                Severity / BIA
              </v-stepper-step>
              <v-stepper-content step="10">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                  Document Title.pdf</p>
                  <v-spacer></v-spacer>
                </v-col><v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col>
                </v-row>
                <v-menu 
                  v-model="menu11" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_bia" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_bia" 
                    @input="menu11 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>

              <v-stepper-step step="11" editable>
                Sistem / App Impact
                <small class="mt-1">This field is required</small>
              </v-stepper-step>
              <v-stepper-content step="11">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-checkbox-blank-circle-outline
                    </v-icon>
                  App 1, App 2, etc.</p>
                  <v-spacer></v-spacer>
                </v-col>
                <!-- <v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col> -->
                </v-row>
                <v-menu 
                  v-model="menu12" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_impact" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_impact" 
                    @input="menu12 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>

              <v-stepper-step step="12" editable>
                Risk
              </v-stepper-step>
              <v-stepper-content step="12">
                <v-row>
                <v-col cols="9" sm="9" md="9">
                  <p class="pt-5">
                  <v-icon class="mr-4 ml-5">
                      mdi-file
                    </v-icon>
                  Document Title.pdf</p>
                  <v-spacer></v-spacer>
                </v-col><v-col cols="3" sm="3" md="3">
                 <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                <v-icon>mdi-download</v-icon>
              </v-btn>
              </v-col>
                </v-row>
                <v-menu 
                  v-model="menu13" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field class="ml-5"
                      v-model="tgl_risk" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_risk" 
                    @input="menu13 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-stepper-content>
            </v-stepper>
          </div>
        </template>
      </v-sheet>
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
        <!--
          <v-spacer></v-spacer> 
            <v-toolbar-items dense> 
              <v-btn icon @click="closeDialog"> 
                <v-icon class="ml-5">mdi-close-circle</v-icon> 
              </v-btn> 
            </v-toolbar-items> 
        -->
        </v-toolbar>
        <v-card flat>
          <h1 class="judul text-center">APPROVED!</h1>
          <p class="greetings text-center">Files succesfully uploaded!</p>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png">
          </v-flex>
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:xx-large;">{{count}}/11</h4>
        </v-card>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark @click = "dialog2 = true">
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model = "dialog2" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense> 
        <!--
          <v-spacer></v-spacer> 
          <v-toolbar-items dense> 
            <v-btn icon @click="closeRemainder()"> 
              <v-icon class="ml-5">mdi-close-circle</v-icon> 
            </v-btn> 
          </v-toolbar-items> 
        -->
        </v-toolbar>
        <v-card flat>
          <h1 class="red--text judul text-center">REMINDER!</h1>
          <v-flex class="px-10 pt-5 pb-2 text-center">
            <img id="pic" src="../assets/reminder.png">
          </v-flex>
          <p class="text4 text-center mb-0">- Don't Forget to fill Cost & Benefit Analyst</p>
          <p class="text4 text-center">- Don't Forget to fill Severity</p>
        </v-card>
        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark to="/home">
            OK
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
      tgl: [],
      menu2: '',
      menu3:'',
      menu4:'',
      menu5:'',
      menu6:'',
      menu7:'',
      menu8:'',
      menu9:'',
      menu10:'',
      menu11:'',
      menu12:'',
      menu13:'',
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
      tgl_req: new Date().toISOString().substr(0, 10),
      tgl_cost : new Date().toISOString().substr(0, 10),
      tgl_implementasi : new Date().toISOString().substr(0, 10),
      tgl_arsi : new Date().toISOString().substr(0, 10),
      tgl_kategori : new Date().toISOString().substr(0, 10),
      tgl_enhance : new Date().toISOString().substr(0, 10),
      tgl_pengadaan : new Date().toISOString().substr(0, 10),
      tgl_budget : new Date().toISOString().substr(0, 10),
      tgl_izin : new Date().toISOString().substr(0, 10),
      tgl_bia : new Date().toISOString().substr(0, 10),
      tgl_impact : new Date().toISOString().substr(0, 10),
      tgl_risk : new Date().toISOString().substr(0, 10),
      category: localStorage.getItem('category'),
      judul: localStorage.getItem('judul'),
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      count:0,
    };
},
methods: {
  back(){
    this.$router.back();
    localStorage.removeItem('category');
    localStorage.removeItem('judul');
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
  cancel(){
    this.tgl=[];
    this.menu2=false;
    this.menu3=false;
    this.menu4=false;
    this.menu5=false;
    this.menu6=false;
    this.menu7=false;
    this.menu8=false;
    this.menu9=false;
    this.menu10=false;
    this.menu11=false;
    this.menu12=false;
    this.menu13=false;
  },
  closeRemainder(){
    this.dialog = false;
    this.dialog2 = false;
  },
},
};
</script>
<style scope>
  
  .detailFont{
    font-family: 'Questrial', sans-serif;
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
  }
  .judul{
      color:#005E6A;
      font-family: 'Secular One', sans-serif;
  }
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
    font-family: 'Questrial', sans-serif;
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