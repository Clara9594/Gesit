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
          <v-expansion-panels focusable class="textTable">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col v-model="jumlah" cols="2" sm="1" md="1" v-if="tgl_req!=null">
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
                  <v-col cols="9" sm="9" md="9">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
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
                    <v-text-field
                      v-model="tgl_req" 
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
                    v-model="tgl_req" 
                    @input="menu2 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_cost!=null">
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
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
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
                    <v-text-field
                      v-model="tgl_cost" 
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
                    v-model="tgl_cost" 
                    @input="menu3 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_implementasi!=null && cekTarget==true">
                    <v-icon color="#F15A23">
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
                    <v-checkbox
                      v-model="cekTarget"
                      label="27 Agustus 2021"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
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
                    <v-text-field
                      v-model="tgl_implementasi" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      dense
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
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_arsi!=null">
                    <v-icon color="#F15A23">
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
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
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
                    <v-text-field
                      v-model="tgl_arsi" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      dense
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
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_kategori!=null && cekKategori==true">
                    <v-icon color="#F15A23">
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
                    <v-checkbox
                      v-model="cekKategori"
                      label="Compliance"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
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
                    <v-text-field
                      v-model="tgl_kategori" 
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
                    v-model="tgl_kategori" 
                    @input="menu6 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_enhance!=null && cekEnhance==true">
                    <v-icon color="#F15A23">
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
                    <v-checkbox
                      v-model="cekEnhance"
                      label="Enhance"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
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
                    <v-text-field
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
                    @input="menu7 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_pengadaan!=null && cekPengadaan==true">
                    <v-icon color="#F15A23">
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
                    <v-checkbox
                      v-model="cekPengadaan"
                      label="In House"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
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
                    <v-text-field
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
                    @input="menu8 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_budget!=null && cekBudgeting==true">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Budgeting Copex / Opex</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <v-checkbox
                      v-model="cekBudgeting"
                      label="Rp. xxxxxxx"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-col>
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
                    <v-text-field
                      v-model="tgl_budget" 
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
                    v-model="tgl_budget" 
                    @input="menu9 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_izin!=null">
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
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
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
                    <v-text-field
                      v-model="tgl_izin" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      dense
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
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_bia!=null">
                    <v-icon color="#F15A23">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Severity / BIA</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
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
                    <v-text-field
                      v-model="tgl_bia" 
                      label="Target Date" 
                      prepend-icon="mdi-calendar" 
                      readonly 
                      dense
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
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_impact!=null">
                    <v-icon color="#F15A23">
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
                    <v-checkbox
                      class="pb-0"
                      label="App 1"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-checkbox
                      class="pt-0"
                      label="App 2"
                      color="#F15A23"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
                    <v-btn color="#F15A23" dark icon class="mt-3 mr-3">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
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
                    <v-text-field
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
                    @input="menu12 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1" v-if="tgl_risk!=null">
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
                <v-row>
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      Document Title.pdf</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3" sm="3" md="2">
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
                    <v-text-field
                      v-model="tgl_risk" 
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
                    v-model="tgl_risk" 
                    @input="menu13 = false" 
                  ></v-date-picker> 
                </v-menu>
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
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:xx-large;">{{ this.count }} / 12</h4>
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
          <p class="text4 ml-16" v-bind:key="index" v-for="(label,index) in this.arrJudul">- Don't Forget to fill {{ label }}</p>
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
      cekTarget : false,
      cekKategori : false,
      cekEnhance : false,
      cekPengadaan : false,
      cekBudgeting : false,
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
      category: localStorage.getItem('category'),
      judul: localStorage.getItem('judul'),
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      count:0,
      jumlah:0,
      arrJudul:[],
    };
},
methods: {
 
  back(){
    this.$router.back();
    localStorage.removeItem('category');
    localStorage.removeItem('judul');
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
      if(this.tgl_req != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Requirement');}
      if(this.tgl_cost != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Cost & Benefit Analysis');}
      if(this.tgl_implementasi!= null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Target Implementasi');}
      if(this.tgl_arsi != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Arsitektur / Topologi');}
      if(this.tgl_kategori != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Kategori Project');}
      if(this.tgl_enhance != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('New / Enhance');}
      if(this.tgl_pengadaan != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Pengadaan / In House');}
      if(this.tgl_budget != null)
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
      if(this.tgl_impact != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Sistem / App Impact');}
      if(this.tgl_risk != null)
        this.count = this.count+1;
      else{
        this.arrJudul.push('Risk');}
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