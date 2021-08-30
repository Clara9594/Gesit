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
        <p class="greetings text-center px-5">Check the Project that you want</p>
        <v-divider class="mb-4"></v-divider>
        <v-card color="#ffeede" class="mb-5 mt-5" flat>
          <v-row no gutters>
            <v-col cols="6" md="6" sm="9" class="pr-0">
              <p class="ml-5 mb-2 font-weight-bold detailFont text-center">Category Project</p>
              <p class="ml-5 mb-0 detailFont text-center" v-if="category=='ITPlanses'">IT Planning</p>
              <p class="ml-5 mb-0 detailFont text-center" v-else-if="category=='All'">RPTI</p>
              <p class="ml-5 mb-0 detailFont text-center" v-else>{{category}}</p>
            </v-col>
            <v-col cols="6" md="6" sm="3">
              <p class="mr-5 mb-2 font-weight-bold detailFont text-center">Kode Project </p>
              <p class="mr-5 mb-0 detailFont text-center">{{kodeAIP}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-8">
              <p class="mb-2 font-weight-bold detailFont text-center">Project Title</p>
              <p class="mb-0 detailFont text-center">{{judul}}</p>
            </v-col>
          </v-row>
        </v-card>
        <template>
          <v-expansion-panels focusable class="textTable" v-for="i in checklist" :key="i.id">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col v-model="jumlah" cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Requirement
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col class="pr-0">
                    <p class="pt-5 mb-0">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="pr-0">
                    <p class="mb-0">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="pr-0">
                    <p class="mb-0">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Cost & Benefit Analysis
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="i in 3" :key="i" no-gutters>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title{{i}}.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1">
                    <v-btn color="#F15A23" dark icon outlined class="mt-3 ml-4">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="i.implementasi!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Target Implementasi
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.implementasi}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="tgl_arsi!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Arsitektur / Topologi 
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="11" sm="11" md="11">
                    <p class="pt-5 mb-3">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      None
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="1" sm="1" md="1">
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
                    <v-text-field class="ml-0"
                      v-model="tgl_arsi" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      dense
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_arsi" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu5 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="category!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Kategori Project 
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5" v-if="category=='ITPlanses'">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      IT Planning
                    </p>
                    <p class="pt-5" v-else-if="category=='All'">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      RPTI
                    </p>
                    <p class="pt-5" v-else>
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{category}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="enhance!=null || tgl_enhance!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">New / Enhance
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Undefined
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
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
                    <v-text-field class="ml-0"
                      v-model="tgl_enhance" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      dense
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_enhance" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu7 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="pengadaan!=null || tgl_pengadaan!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Pengadaan / In House</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Undefined
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
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
                    <v-text-field class="ml-0"
                      v-model="tgl_pengadaan" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      dense
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_pengadaan" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu8 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="i.budget!=null && i.divisi!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Budgeting Copex / Opex</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mt-5" no-gutters>
                  <v-col>
                    <p class="mb-0" v-if="i.budget==null">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Rp.-
                    </p>
                    <p class="mb-0" v-else>
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Rp.{{i.budget}}
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col>
                    <p class="mb-0">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Division Name : {{i.divisi}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Izin / Lapor Regulator</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="i in 3" :key="i" no-gutters>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title{{i}}.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1">
                    <v-btn color="#F15A23" dark icon outlined class="mt-3 ml-4">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Severity Sistem</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="i in 3" :key="i" no-gutters>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title{{i}}.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1">
                    <v-btn color="#F15A23" dark icon outlined class="mt-3 ml-4">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">BIA ( Business Impact Analysis )</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="i in 3" :key="i" no-gutters>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title{{i}}.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1">
                    <v-btn color="#F15A23" dark icon outlined class="mt-3 ml-4">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23" v-if="impact!=null || tgl_impact!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Sistem / App Impact
                      <small class="red--text">*</small>
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Undefined
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
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
                    <v-text-field class="ml-0"
                      v-model="tgl_impact" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      outlined 
                      v-bind="attrs" 
                      dense
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_impact"
                    :min="new Date().toISOString().substr(0, 10)" 
                    @input="menu12 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Risk</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="i in 3" :key="i" no-gutters>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title{{i}}.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1">
                    <v-btn color="#F15A23" dark icon outlined class="mt-3 ml-4">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
          :right="true" :absolute="true"
          @click="counterFile"
        >
        Submit
      </v-btn>
    </v-layout>
    <br>
    <br>
    <v-dialog v-model = "dialog" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense> 
        </v-toolbar>
        <v-card flat>
          <h1 class="judul text-center">APPROVED!</h1>
          <p class="greetings text-center">Files succesfully uploaded!</p>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png">
          </v-flex>
          <!-- <h4 class="greetings text-center" style="font-weight:bolder; font-size:xx-large;">{{ this.count }} / 12</h4> -->
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:xx-large;"> 8 / 12</h4>
        </v-card>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" @click="CekCount" dark>
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model = "dialog2" persistent max-width = "600px">
      <v-card>
        <v-toolbar flat dense> 
        </v-toolbar>
        <v-card flat>
          <h1 class="red--text judul text-center">REMINDER!</h1>
          <v-flex class="px-10 pt-5 pb-2 text-center">
            <img id="pic" src="../assets/reminder.png">
          </v-flex>
          <p class="text4 text-center" v-bind:key="index" v-for="(label,index) in this.arrCheck">- Don't Forget to fill {{ label }}</p>
        </v-card>

        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" color = "#005E6A" dark @click="createNotif">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--<v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
      {{message}}
    </v-snackbar>-->
  </v-main>
</v-app>
</template>

<script>
import axios from 'axios'
export default {
name : "Checklist",
created () {
  document.title = "Checklist";
},
data() {
    return {
      dialog: false,
      dialog2: false,
      responseHandling: '',
      tgl: [],

      // menu untuk checklist
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

      // Datepicker checklist
      tgl_req: null,
      tgl_cost : null,
      tgl_implementasi : null,
      tgl_arsi : null,
      tgl_kategori : null,
      tgl_enhance : null,
      tgl_pengadaan : null,
      tgl_budget : null,
      tgl_izin : null,
      tgl_bia : null,
      tgl_impact : null,
      tgl_risk : null,

      // v-model untuk checklist
      cekTarget : false,
      cekKategori : false,
      cekEnhance : false,
      cekPengadaan : false,
      cekBudgeting : false,
      textArea1 : null,
      textArea2 : null,
      kategori : null,
      enhance : null,
      pengadaan : null,
      nominal : null,
      divisi : null,
      impact : null,

      i:null,
      category: localStorage.getItem('category'),
      role: localStorage.getItem('role'),
      judul: localStorage.getItem('judul'),
      kodeAIP: localStorage.getItem('kodeAIP'),
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      count:0,
      jumlah:0,
      arrJudul:[],
      projectProgo:[],
      checklist:[],
      arrCheck:["Arsitektur/Topologi", "New/Enhance", "Pengadaan/In House", "Sistem/App Impact"],
      arrDue:[],
      pdoc:''
    };
},
methods: {
  readProjectProgo(){ //Read Project
    var url =  'http://35.219.107.102/progo/api/project?kategori='+this.category
    this.$http.get(url,{
      headers:{
        'progo-key':'progo123',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
        // console.log(response)
        this.projectProgo = response.data.data;
        this.getData();
      })
  },
  getData(){
    var dataChecklist={};
        // alert(this.kodeAIP)
    for(let x=0; x<=this.projectProgo.length; x++){
      // var kode=this.projectProgo[x].AIPId;
      // console.log(kode)
      if(this.kodeAIP == this.projectProgo[x].AIPId){
        dataChecklist = {
          id: this.projectProgo[x].AIPId,
          budget: this.projectProgo[x].ProjectBudget,
          implementasi: this.projectProgo[x].EksImplementasi,
          divisi:this.projectProgo[x].Divisi
        };
        // console.log(dataChecklist.id)
        // console.log(dataChecklist.budget)
        // console.log(dataChecklist.implementasi)
        // console.log(dataChecklist.divisi)
        this.checklist.push(dataChecklist);
        // console.log(this.checklist);
      }
    }
    // console.log(this.checklist)
    return this.checklist;
  },
  readProjectDokumen(){ //Read Project
    var url =  'http://35.219.107.102/progo/api/dokumen?AIPId='+this.kodeAIP
    this.$http.get(url,{
      headers:{
        'progo-key':'progo123',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
        // console.log(response)
        this.projectProgoDokumen = response.data.data;
      })
  },
 
  back(){
    this.$router.back();
    localStorage.removeItem('category');
    localStorage.removeItem('judul');
    localStorage.removeItem('kodeAIP');
  },
  hitung(){
    this.jumlah = this.jumlah+1;
  },
  closeDialog(){
    this.counter= 6;
    this.dialog=false;
  },
  close() {
    this.dialog = false;
  },
  counterFile(){
    this.arrDue.push(this.tgl_arsi);
    this.arrDue.push(this.tgl_enhance);
    this.arrDue.push(this.tgl_pengadaan);
    this.arrDue.push(this.tgl_impact);
    if(this.textArea1 != null && this.textArea2 != null && this.tgl_req != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Requirement')
    }
    if(this.tgl_cost != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Cost & Benefit Analysis');
    }
    if(this.tgl_implementasi!= null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Target Implementasi');
    }
    if(this.tgl_arsi != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Arsitektur / Topologi');
    }
    if(this.kategori != null && this.tgl_kategori != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Kategori Project');
    }
    if(this.enhance != null && this.tgl_enhance != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('New / Enhance');
    }
    if(this.pengadaan != null && this.tgl_pengadaan != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Pengadaan / In House');}
    if(this.nominal != null && this.divisi != null && this.tgl_budget != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Budgeting Copex / Opex');}
    if(this.tgl_izin != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Izin / Lapor Regulator');}
    if(this.tgl_bia != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Severity / BIA');}
    if(this.impact != null && this.tgl_impact != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Sistem / App Impact');
    }
    if(this.tgl_risk != null)
      this.count = this.count+1;
    else{
      this.arrJudul.push('Risk');}

    // if(this.textArea1 == null || this.textArea2 == null 
    //   || this.tgl_req == null || this.tgl_cost == null
    //   || this.tgl_implementasi == null || this.tgl_arsi == null
    //   || this.kategori == null || this.tgl_kategori == null
    //   || this.enhance == null || this.tgl_enhance == null
    //   || this.impact == null || this.tgl_impact == null)
    //   alert('Please fill the required field!')
    // else
      this.dialog=true;
      for(var y=0; y<this.arrDue.length; y++){
        console.log(this.arrDue[y])
      }
  },
  CekCount(){
    if(this.count==12)
      this.$router.push('/home');
    else 
      this.dialog2=true;
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
  createNotif(){
    // console.log("hehe")
    var size = this.arrJudul.length-1;
    for (var i = 0; i < this.arrJudul.length; i++) { 
      if(i == size ){
        this.pdoc += this.arrJudul[i];
        this.pdoc += ".";
      }
      else{
        this.pdoc += this.arrJudul[i];
        this.pdoc += ", ";
      }
    }
    // console.log(this.pdoc)
    for (var x = 0; x < this.arrCheck.length; x++){
      let newData ={
        projectId : 6,
        projectCategory: this.category,
        projectTitle: this.judul,
        projectDocument: this.arrCheck[x],
        targetDate: this.arrDue[x],
        assignedBy: localStorage.getItem('npp'),
        assignedFor : null,
        status: 0
        //  projectId: 13,
        //  projectCategory: "Insertion",
        //  projectTitle: "Telkom",
        //  projectDocument: "Risk",
        //  targetDate: "2021-09-21T00:00:00",
        //  assignedBy: "P02020",
        //  assignedFor: null,
        //  status: 0
      }
      this.notif(newData);
    }
  },

  async notif(newData) {
    await axios
    .create({
      baseURL: this.$api+'/Notifications',
      timeout: 10000,
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
    })
    .post( this.$api+'/Notifications', newData)
    .then(response => {
      this.responseHandling = response;
      if(this.role == "PM"){
        this.$router.push('/homePM');
      }
      else if(this.role == "ADMIN"){
        this.$router.push('/homeAdmin');
      }
      else{
        this.$router.push('/home');
      }
    })
  },
},
 mounted(){
    this.readProjectProgo();
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