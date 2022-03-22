<template>
<v-app>
  <v-main class="checklist">
    <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-8">
      <v-row no-gutters>
        <v-col cols="2" sm="1" md="1">
          <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" sm="11" md="11">
          <v-toolbar-title class="judul font-weight-bold font-weight-bold">CHECKLIST PROJECT</v-toolbar-title>
          <v-breadcrumbs :items="routing" class="pa-0 textTable">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-toolbar-title>
    
    <v-layout justify-center>
      <v-sheet class="rounded mx-5 mt-1 pa-5 textTable" width="700px" elevation="2" style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
        <v-card outlined class="mb-5" flat :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="#4A8A99"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-row class="mt-2">
            <v-col class="px-8">
              <p class="mb-1 font-weight-bold path text-center">Project Title</p>
              <p class="mb-0 text-center" style="font-size:large">{{judul}}</p>
            </v-col>
          </v-row>
          <v-row class="mb-2" no gutters>
            <v-col cols="6" md="6" sm="9" class="pr-0">
              <p class="ml-5 mb-1 path font-weight-bold text-center">Category Project</p>
              <p class="ml-5 mb-0 text-center" v-if="category=='ITPlanses'" style="font-size:large">IT Planning</p>
              <p class="ml-5 mb-0 text-center" v-else-if="category=='All'" style="font-size:large">RPTI</p>
              <p class="ml-5 mb-0 text-center" v-else style="font-size:large">{{category}}</p>
            </v-col>
            <v-col cols="6" md="6" sm="3">
              <p class="mr-5 mb-1 path font-weight-bold text-center">Project Code</p>
              <p class="mr-5 mb-0 text-center" style="font-size:large">{{kodeAIP}}</p>
            </v-col>
          </v-row>
        </v-card>
        <template>
          <v-expansion-panels focusable class="textTable" v-for="i in checklist" :key="i.id">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col v-model="jumlah" cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayRequirement[0]!=null">
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
                  <template v-if="arrayRequirement[0]!=null">
                    <v-col >
                      <p class="pt-5 mb-0" v-for="x in arrayRequirement" :key="x.id">
                        <v-icon small class="mr-2">
                          mdi-file
                        </v-icon>
                        {{x.namaFile}} 
                      </p>
                      <v-spacer></v-spacer>
                    </v-col>
                    <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayRequirement" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                  </template>
                    <v-col v-else>
                      <p class="pt-5">
                        <v-icon small class="mr-4">
                          mdi-checkbox-blank-circle
                        </v-icon>
                        None
                      </p>
                      <v-menu 
                        v-model="menu1" 
                        :close-on-content-click="false" 
                        :nudge-right="40" 
                        transition="scale-transition" 
                        offset-y 
                        min-width="auto" 
                        > 
                        <template v-slot:activator="{ on, attrs }"> 
                          <v-text-field v-if="tgl_req==null"
                            v-model="tgl_req" 
                            label="Target Date" 
                            prepend-inner-icon="mdi-calendar" 
                            readonly 
                            color="#F15A23"
                            class="mb-5 mt-6 ml-0 textTable"
                            dense
                            solo
                            flat
                            background-color="#EEEEEE"
                            filled
                            hide-details
                            v-bind="attrs" 
                            v-on="on" 
                          ></v-text-field> 
                          <v-text-field v-else
                            v-model="tgl_req" 
                            placeholder="tgl_req" 
                            prepend-inner-icon="mdi-calendar" 
                            readonly 
                            color="#F15A23"
                            class="mb-5 mt-6 ml-0 textTable"
                            dense
                            solo
                            flat
                            background-color="#EEEEEE"
                            filled
                            hide-details
                            v-bind="attrs" 
                            v-on="on" 
                          ></v-text-field> 
                        </template> 
                        <v-date-picker 
                          v-model="tgl_req" 
                          :min="new Date().toISOString().substr(0, 10)"
                          @input="menu1 = false" 
                        ></v-date-picker> 
                      </v-menu>
                      
                      <v-spacer></v-spacer>
                    </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayCostBenefit[0]!=null">
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
                  <template v-if="arrayCostBenefit[0]!=null">
                  <v-col cols="11" sm="11" md="11" >
                    <p class="pt-5" v-for="x in arrayCostBenefit" :key="x.id">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      {{x.namaFile}}
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                  </template>
                  <v-col cols="11" sm="11" md="11" v-else>
                    <p class="pt-5 mb-3">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      None
                    </p>
                  </v-col>
                  <v-col cols="2" sm="1" md="1"  v-if="arrayCostBenefit[0]!=null">
                    <v-btn color="#FC9039" dark icon outlined class="mt-3 ml-1">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-menu v-if="arrayCostBenefit[0]==null"
                  v-model="menu2" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field v-if="tgl_cost==null"
                      v-model="tgl_cost" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_cost" 
                      placeholder="tgl_cost"
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_cost" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu2 = false" 
                  ></v-date-picker> 
                </v-menu>
                
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="i.implementasi!=null">
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
                  <v-col cols="9" sm="9" md="10" v-if="i.implementasi!=null">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.implementasi}}
                    </p>
                  </v-col>
                  <v-col cols="9" sm="9" md="10" v-else>
                      <p class="pt-5">
                        <v-icon small class="mr-2">
                          mdi-checkbox-blank-circle
                        </v-icon>
                        None
                      </p>
                    <v-spacer></v-spacer>
                    <v-menu 
                      v-model="menu3" 
                      :close-on-content-click="false" 
                      :nudge-right="40" 
                      transition="scale-transition" 
                      offset-y 
                      min-width="auto" 
                      > 
                      <template v-slot:activator="{ on, attrs }"> 
                        <v-text-field v-if="tgl_implementasi==null"
                          v-model="tgl_implementasi" 
                          label="Target Date" 
                          prepend-inner-icon="mdi-calendar" 
                          readonly 
                          color="#F15A23"
                          class="mb-5 mt-6 ml-0 textTable"
                          dense
                          solo
                          flat
                          background-color="#EEEEEE"
                          filled
                          hide-details
                          v-bind="attrs" 
                          v-on="on" 
                        ></v-text-field> 
                        <v-text-field v-else
                          v-model="tgl_implementasi" 
                          placeholder="tgl_implementasi"
                          prepend-inner-icon="mdi-calendar" 
                          readonly 
                          color="#F15A23"
                          class="mb-5 mt-6 ml-0 textTable"
                          dense
                          solo
                          flat
                          background-color="#EEEEEE"
                          filled
                          hide-details
                          v-bind="attrs" 
                          v-on="on" 
                        ></v-text-field> 
                      </template> 
                      <v-date-picker 
                        v-model="tgl_implementasi" 
                        :min="new Date().toISOString().substr(0, 10)"
                        @input="menu3 = false" 
                      ></v-date-picker> 
                    </v-menu>
                    
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayArsitektur[0]!=null">
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
                  <template v-if="arrayArsitektur[0] != null">
                  <v-col cols="11" sm="11" md="11" >
                    <p class="pt-5 mb-3" >
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      {{x.namaFile}}
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayArsitektur" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                  </template>
                  <v-col cols="11" sm="11" md="11" v-else>
                    <p class="pt-5 mb-3">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                      None
                    </p>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" v-if="arrayArsitektur[0]!=null">
                    <v-btn color="#FC9039" dark icon outlined class="mt-3 ml-4">
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
                    <v-text-field v-if="tgl_arsi==null"
                      v-model="tgl_arsi" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_arsi" 
                      placeholder="tgl_arsi"
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_arsi" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu4 = false" 
                  ></v-date-picker> 
                </v-menu>
                
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="i.kategoriproject!=''">
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
                <v-row v-if="i.kategoriproject!=''">
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.kategoriproject}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
                <v-row v-else>
                   <v-col cols="11" sm="11" md="11">
                    <p class="pt-5 mb-3">
                      <v-icon class="mr-4">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      None
                    </p>
                  </v-col>
                <v-menu 
                  v-model="menu30" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field v-if="tgl_kategori==null"
                      v-model="tgl_kategori"
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_kategori"
                      placeholder="tgl_kategori"
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_kategori"
                    :min="new Date().toISOString().substr(0, 10)" 
                    @input="menu30 = false" 
                  ></v-date-picker> 
                </v-menu>
                
              </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="i.jenis!=''">
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
                <v-row v-if="i.jenis!=''">
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.jenis}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
                <v-row v-else>
                 <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                    None
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                <v-menu 
                  v-model="menu7" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field v-if="tgl_enhance==null"
                      v-model="tgl_enhance" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_enhance" 
                      placeholder="tgl_enhance" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
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
                
              </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="i.pengembang!=''">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Pengadaan / In House
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-if="i.pengembang!=''">
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.pengembang}}
                    </p>
                  </v-col>
                </v-row>
                <v-row v-else>
                 <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      None
                    </p>
                  </v-col>
                <v-menu 
                  v-model="menu8" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field v-if="tgl_pengadaan==null"
                      v-model="tgl_pengadaan" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_pengadaan" 
                      placeholder="tgl_pengadaan"
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
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
                
              </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayCapexOpex[0]!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Budgeting Capex / Opex</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-if="arrayCapexOpex[0]!=null">
                  <v-col class="mb-0">
                    <p class="pt-5 mb-0" v-for="x in arrayCapexOpex" :key="x.id">
                      <v-icon small class="mr-2">
                        mdi-file
                      </v-icon>
                      {{x.namaFile}}
                    </p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayCapexOpex" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-4">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      Division Name : {{i.divisi}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
                <v-row class="mt-2" v-else>
                  <v-col class="pr-0">
                    <p class="pr-0">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      None
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
                    <v-text-field v-if="tgl_budget==null"
                      v-model="tgl_budget" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_budget" 
                      placeholder="tgl_budget"
                      prepend-inner-icon="mdi-calendar" 
                      readonly 
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_budget" 
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu9 = false" 
                  ></v-date-picker> 
                </v-menu>
                
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayIzinLapor[0]!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Izin / Lapor Regulator</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters v-if="arrayIzinLapor[0]!=null">
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5" v-for="x in arrayIzinLapor" :key="x.id">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    {{x.namaFile}}</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayIzinLapor" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters v-else>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    None</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-menu 
                    v-model="menu10" 
                    :close-on-content-click="false" 
                    :nudge-right="40" 
                    transition="scale-transition" 
                    offset-y 
                    min-width="auto" 
                    > 
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-text-field v-if="tgl_izin==null"
                        v-model="tgl_izin" 
                        label="Target Date" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                      <v-text-field v-else
                        v-model="tgl_izin" 
                        placeholder="tgl_izin" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                    </template> 
                    <v-date-picker 
                      v-model="tgl_izin" 
                      :min="new Date().toISOString().substr(0, 10)"
                      @input="menu10 = false" 
                    ></v-date-picker> 
                  </v-menu>
                
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arraySeverity[0]!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Severity Sistem</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters v-if="arraySeverity[0]!=null">
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5" v-for="x in arraySeverity" :key="x.id">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    {{x.namaFile}}</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arraySeverity" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters v-else>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    none</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-menu 
                    v-model="menu11" 
                    :close-on-content-click="false" 
                    :nudge-right="40" 
                    transition="scale-transition" 
                    offset-y 
                    min-width="auto" 
                    > 
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-text-field v-if="tgl_severity==null"
                        v-model="tgl_severity" 
                        label="Target Date" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                      <v-text-field v-else
                        v-model="tgl_severity" 
                        placeholder="tgl_severity" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                    </template> 
                    <v-date-picker 
                      v-model="tgl_severity" 
                      :min="new Date().toISOString().substr(0, 10)"
                      @input="menu11 = false" 
                    ></v-date-picker> 
                  </v-menu>
                  
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayBIA[0]!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">BIA ( Business Impact Analysis )</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters v-if="arrayBIA[0]!=null">
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5" v-for="x in arrayBIA" :key="x.id">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    {{x.namaFile}}</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayBIA" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters else>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    None</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-menu 
                    v-model="menu12" 
                    :close-on-content-click="false" 
                    :nudge-right="40" 
                    transition="scale-transition" 
                    offset-y 
                    min-width="auto" 
                    > 
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-text-field v-if="tgl_bia==null"
                        v-model="tgl_bia" 
                        label="Target Date" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                      <v-text-field v-else
                        v-model="tgl_bia" 
                        placeholder="tgl_bia"
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                    </template> 
                    <v-date-picker 
                      v-model="tgl_bia" 
                      :min="new Date().toISOString().substr(0, 10)"
                      @input="menu12 = false" 
                    ></v-date-picker> 
                  </v-menu>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="i.aplikasiterdampak!=''">
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
                <v-row v-if="i.aplikasiterdampak!=''">
                  <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                      {{i.aplikasiterdampak}}
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                </v-row>
                <v-row v-else>
                 <v-col cols="9" sm="9" md="10" class="pr-0">
                    <p class="pt-5">
                      <v-icon small class="mr-2">
                        mdi-checkbox-blank-circle
                      </v-icon>
                    None
                    </p>
                  <v-spacer></v-spacer>
                  </v-col>
                <v-menu 
                  v-model="menu5" 
                  :close-on-content-click="false" 
                  :nudge-right="40" 
                  transition="scale-transition" 
                  offset-y 
                  min-width="auto" 
                  > 
                  <template v-slot:activator="{ on, attrs }"> 
                    <v-text-field v-if="tgl_impact==null"
                      v-model="tgl_impact" 
                      label="Target Date" 
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                    <v-text-field v-else
                      v-model="tgl_impact" 
                      placeholder="tgl_impact"
                      prepend-inner-icon="mdi-calendar" 
                      readonly
                      color="#F15A23"
                      class="mb-5 mt-6 ml-0 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="tgl_impact"
                    :min="new Date().toISOString().substr(0, 10)" 
                    @input="menu5 = false" 
                  ></v-date-picker> 
                </v-menu>
              </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
         
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-row>
                  <v-col cols="2" sm="1" md="1">
                    <v-icon color="#FC9039" v-if="arrayRisk[0]!=null">
                      mdi-check-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" sm="11" md="11">
                    <p class="mb-0 mt-1">Risk</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters v-if="arrayRisk[0]!=null">
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5" v-for="x in arrayRisk" :key="x.id">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    {{x.namaFile}}</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" >
                    <v-btn  color="#FC9039" dark icon outlined class="mt-3 ml-1" v-for="x in arrayRisk" :key="x.id">
                      <v-icon @click="downloadFile(x.urlDownloadFile)">mdi-download</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters v-else>
                  <v-col cols="10" sm="11" md="11">
                    <p class="pt-5">
                      <v-icon class="mr-4">
                        mdi-file
                      </v-icon>
                    None</p>
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-menu 
                    v-model="menu6" 
                    :close-on-content-click="false" 
                    :nudge-right="40" 
                    transition="scale-transition" 
                    offset-y 
                    min-width="auto" 
                    > 
                    <template v-slot:activator="{ on, attrs }"> 
                      <v-text-field v-if="tgl_risk==null"
                        v-model="tgl_risk" 
                        label="Target Date" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                      <v-text-field v-else
                        v-model="tgl_risk" 
                        placeholder= "tgl_risk" 
                        prepend-inner-icon="mdi-calendar" 
                        readonly 
                        color="#F15A23"
                        class="mb-5 mt-6 ml-0 textTable"
                        dense
                        solo
                        flat
                        background-color="#EEEEEE"
                        filled
                        hide-details
                        v-bind="attrs" 
                        v-on="on" 
                      ></v-text-field> 
                    </template> 
                    <v-date-picker 
                      v-model="tgl_risk" 
                      :min="new Date().toISOString().substr(0, 10)"
                      @input="menu6 = false" 
                    ></v-date-picker> 
                  </v-menu>
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

    <v-dialog v-model = "dialogCheck" persistent max-width = "400px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="closeReload">mdi-close-octagon</v-icon>
        </v-card-actions>
        <v-card flat>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/Alert.png" height="60px" width="60px">
          </v-flex>
          <h1 class="alert text-center">Failed!</h1>
          <p class="greetings text-center mb-1" style="color:#FF0000;">Please fill all Target Dates</p>
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:large;"> {{countDate}} / {{lessDate}}</h4>
        </v-card>
        <v-card-actions class="mt-2" style="justify-content:center" >
          <v-btn class="mb-2" block color = "#005E6A" @click="closeReload" dark>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model = "dialogComplete" persistent max-width = "400px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="closepopup">mdi-close-octagon</v-icon>
        </v-card-actions>
        <v-card flat>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png" height="60px" width="60px">
          </v-flex>
          <h1 class="judul text-center">Complete!</h1>
          <p class="greetings text-center mb-1">Project {{kodeAIP}} is complete!</p>
        </v-card>
        <v-card-actions class="mt-2" style="justify-content:center" >
          <v-btn class="mb-2" block color = "#005E6A" @click="closeComplete" dark>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model = "dialogEmpty" persistent max-width = "400px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="closeReload">mdi-close-octagon</v-icon>
        </v-card-actions>
        <v-card flat>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/Alert.png" height="60px" width="60px">
          </v-flex>
          <h1 class="alert text-center">Failed!</h1>
          <p class="greetings text-center mb-1" style="color:#FF0000;">Please fill all Target Dates</p>
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:large;"> {{countDate}} / {{lessDate}}</h4>
        </v-card>
        <v-card-actions class="mt-2" style="justify-content:center" >
          <v-btn class="mb-2" block color = "#005E6A" @click="closeReload" dark>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model = "dialog" persistent max-width = "400px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="closepopup">mdi-close-octagon</v-icon>
        </v-card-actions>
        <v-card flat>
          <v-flex class="px-10 pb-2 text-center">
            <img id="pic" src="../assets/checked 1.png" height="60px" width="60px">
          </v-flex>
          <h1 class="judul text-center">APPROVED!</h1>
          <p class="greetings text-center mb-1">Document has been scheduled!</p>
          <h4 class="greetings text-center" style="font-weight:bolder; font-size:large;"> {{count}} / 13</h4>
        </v-card>
        <v-card-actions class="mt-2" style="justify-content:center" >
          <v-btn class="mb-2" block color = "#005E6A" @click="CekCount" dark>
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model = "dialog2" persistent max-width = "400px">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="dialog2 = false">mdi-close-octagon</v-icon></v-card-actions>
          
          <v-card flat>
            <v-flex class="px-10 pb-2 text-center">
              <img id="pic" src="../assets/reminder.png" height="60px" width="60px">
            </v-flex>
            <h1 class="judul mb-0 judul text-center">REMINDER!</h1>
            <p class="greetings text-center mb-3">Don't forget to fill the documents below!</p>
            <p class="greetings  mb-1 text-center" v-bind:key="index" v-for="(label,index) in this.arrJudul">-{{ label }}</p>
          </v-card>
        <br>
        <v-card-actions style="justify-content:center" >
          <v-btn class="mb-2" block color = "#005E6A" dark @click="createNotif">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogCheck: false,
      dialogEmpty :false,
      responseHandling: '',
      tgl: [],
      thnSkrg : new Date(),

      // menu untuk checklist
      menu1:'',
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
      menu30:'',

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
      tgl_severity : null,

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
      periode: localStorage.getItem('periode'),
      isSelecting: false,
      selectedFile: null,
      defaultButtonText: 'Browse',
      count:0,
      countDate:0,
      lessDate:0,
      jumlah:0,
      dialogComplete: false,

      tampungTanggal: [],
      arrJudul:[],
      projectProgo:[],
      checklist:[],
      arrayRequirement:[],
      arrayCostBenefit:[],
      arrayArsitektur:[],
      arraySeverity:[],
      arrayBIA:[],
      arrayIzinLapor:[],
      arrayCapexOpex:[],
      arrayRisk:[],
      arrayAppImpact:[],
      arrDue:[],
      pdoc:'',
      loading: true,
      isEmpty: 0,
      projectNotification:[],
      listNotification:[],
      arrJudulNotif:[],

      //Path Checklist Admin
      routing: [
        {
          text: 'Home',
          disabled: false,
          href: '#/homeAdmin',
        },
        {
          text: 'Governance Project',
          disabled: false,
          href: '#/GovernanceProjectAdmin',
        },
        {
          text: 'Checklist Project',
          disabled: true,
          href: '#/checklistAdmin',
        },
      ],
    };
},
methods: {
  readProjectProgo(){ //Read Project Progo
    var url =  'http://192.168.131.125/progo/api/project?kategori='+this.category+'&periode='+this.periode;
    this.$http.get(url,{
      headers:{
        'progo-key':'progo123',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
        this.projectProgo = response.data.data;
        if(this.projectProgo != []){
          this.loading = false;
        }
        else{
          this.isEmpty+=1;
        }
        this.getData();
      })
  },

  readProjectDokumen(){ //Read Dokumen
    var url =  'http://192.168.131.125/progo/api/dokumen?AIPId='+this.kodeAIP+'-'+ this.thnSkrg.getFullYear();
    this.$http.get(url,{
      headers:{
        'progo-key':'progo123',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    
    }).then(response => { 
        this.projectProgoDokumen = response.data.data;
        if(this.projectProgoDokumen != []){   
          this.getDataDokumen();
        }
        else{
          this.isEmpty+=1;
        }
        this.loading = false;
        this.checkEmpty();
        this.readNotification;
      })
  },

   readNotification(){ //Read Dokumen
  //  console.log(this.kodeAIP)
    var url =  'http://192.168.131.124:90/api/Notification/GetNotificationByProjectId/'+this.kodeAIP;
    this.$http.get(url,{
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
    }).then(response => { 
        this.projectNotification = response.data;
        this.projectNotification.forEach(i => {
          let notifData = {
            notifId : i.id,
            notifDocument : i.projectDocument,
            notifDate : i.targetDate
          }

          if(notifData.notifDocument=='Requirement'){
            this.tgl_req = notifData.notifDate;
          }
          else if(notifData.notifDocument== 'Cost & Benefit Analysis'){
            this.tgl_cost = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Target Implementasi'){
            this.tgl_implementasi = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Arsitektur / Topologi'){
            this.tgl_arsi = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Kategori Project'){
            this.tgl_kategori = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'New / Enhance'){
            this.tgl_enhance = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Pengadaan / In House'){
            this.tgl_pengadaan = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Budgeting Capex / Opex'){
            this.tgl_budget = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Izin / Lapor Regulator'){
            this.tgl_izin = notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Severity Sistem'){
            this.tgl_severity= notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Business Impact Analysis'){
            this.tgl_bia= notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Sistem / App Impact'){
            this.tgl_impact= notifData.notifDate;
          }
          else if(notifData.notifDocument == 'Risk'){
            this.tgl_risk= notifData.notifDate;
          }

          this.arrJudulNotif.push(notifData.notifDocument);
          this.listNotification.push(notifData);
        })
      })
  },

  checkEmpty(){
    if(this.isEmpty!=0){
      this.dialogEmpty = true;
    }
  },

  getData(){
    var dataChecklist={};
    this.projectProgo.forEach(el => {
      if(this.kodeAIP ===  el.AIPId){
        dataChecklist = {
          id: el.AIPId,
          budget: el.ProjectBudget,
          implementasi: el.EksImplementasi,
          divisi: el.Divisi,
          aplikasiterdampak: el.AplikasiTerdampak,
          jenis: el.JenisPengembangan,
          kategoriproject: el.ProjectCategory,
          pengembang: el.Pengembang,
        };
        this.checklist.push(dataChecklist);
      }
    })
    return this.checklist;
  },

  getDataDokumen(){
    var id = 0;
    this.projectProgoDokumen.forEach(x => {
      if(x.JenisDokumen === 'Memo Requirement'){
        this.arrayRequirement.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Cost and efficiency Benefit  Analysis'){
        this.arrayCostBenefit.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Severity Sistem'){
        this.arraySeverity.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Bussiness Impact Analysis'){
        this.arrayBIA.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Kajian untuk ijin/lapor regulatori'){
        this.arrayIzinLapor.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Anggaran atau Ijin Prinsip (Capex/Opex)'){
        this.arrayCapexOpex.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Arsitektur atau topologi (AAD)'){
        this.arrayArsitektur.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }else if(x.JenisDokumen === 'Asement Risk '){
        this.arrayRisk.push({
          id : id,
          AIPId : x.AIPId,
          namaFile : x.NamaFile,
          urlDownloadFile : x.URLdownloadfile
        })
      }
      id += 1;
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

  closeComplete(){
    if(this.role == "ADMIN" || this.role == "AMGR"){
      this.$router.push('/homeAdmin');
    }
    else
      this.$router.push('/homeOS');
  },

  counterFile(){
    if(this.arrayRequirement[1] != null){
      this.count = this.count+1;
      // console.log("req")
    }
    else{
      this.arrJudul.push('Requirement')
      if(this.tgl_req != null){
        this.arrDue.push(this.tgl_req)
        this.tampungTanggal.push(this.tgl_req)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayCostBenefit[0] != null){
      this.count = this.count+1;
      // console.log("cost")
    }
    else{
      this.arrJudul.push('Cost & Benefit Analysis');
      // console.log(this.arrayCostBenefit[0])
      // console.log(this.arrayCostBenefit[1])
      if(this.tgl_cost != null){
        this.arrDue.push(this.tgl_cost)
        this.tampungTanggal.push(this.tgl_cost)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.checklist[0].implementasi!= null){
      this.count = this.count+1;
      // console.log("implementasi")
    }
    else{
      this.arrJudul.push('Target Implementasi');
      if(this.tgl_implementasi != null){
        this.arrDue.push(this.tgl_implementasi)
        this.tampungTanggal.push(this.tgl_implementasi)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayArsitektur[1] != null){
      this.count = this.count+1;
      // console.log("arsi")
    }
    else{
      this.arrJudul.push('Arsitektur / Topologi');
      if(this.tgl_arsi != null){
        this.arrDue.push(this.tgl_arsi)
        this.tampungTanggal.push(this.tgl_arsi)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.checklist[0].kategoriproject == "" || this.checklist[0].kategoriproject == null){
      this.arrJudul.push('Kategori Project');
      if(this.tgl_kategori != null){
        this.arrDue.push(this.tgl_kategori)
        this.tampungTanggal.push(this.tgl_kategori)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }
    else{
      // console.log("kategori")
      this.count = this.count+1;
    }

    if(this.checklist[0].jenis!=''){
      this.count = this.count+1;
      // console.log("new/enhance")
    }
    else{
      this.arrJudul.push('New / Enhance');
      if(this.tgl_enhance != null){
        this.arrDue.push(this.tgl_enhance)
        this.tampungTanggal.push(this.tgl_enhance)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.checklist[0].pengembang != ''){
      this.count = this.count+1;
      // console.log("inhouse")
    }
    else{
      this.arrJudul.push('Pengadaan / In House');
      if(this.tgl_pengadaan != null){
        this.arrDue.push(this.tgl_pengadaan)
        this.tampungTanggal.push(this.tgl_pengadaan)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayCapexOpex[1] != null && this.divisi != null){
      this.count = this.count+1;
      // console.log("opex")
    }
    else{
      this.arrJudul.push('Budgeting Capex / Opex');
      if(this.tgl_budget != null){
        this.arrDue.push(this.tgl_budget)
        this.tampungTanggal.push(this.tgl_budget)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayIzinLapor[1] != null){
      this.count = this.count+1;
      // console.log("izin")
    }
    else{
      this.arrJudul.push('Izin / Lapor Regulator');
      if(this.tgl_izin != null){
        this.arrDue.push(this.tgl_izin)
        this.tampungTanggal.push(this.tgl_izin)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arraySeverity[1] != null){
      this.count = this.count+1;
      // console.log("severity")
    }
    else{
      this.arrJudul.push('Severity Sistem');
      if(this.tgl_severity != null){
        this.arrDue.push(this.tgl_severity)
        this.tampungTanggal.push(this.tgl_severity)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayBIA[1] != null){
      this.count = this.count+1;
      // console.log("bia")
    }
    else{
      this.arrJudul.push('Business Impact Analysis');
      if(this.tgl_bia != null){
        this.arrDue.push(this.tgl_bia)
        this.tampungTanggal.push(this.tgl_bia)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.checklist[0].aplikasiterdampak != ''){
      this.count = this.count+1;
      // console.log("impact")
    }
    else{
      this.arrJudul.push('Sistem / App Impact');
      if(this.tgl_impact != null){
        this.arrDue.push(this.tgl_impact)
        this.tampungTanggal.push(this.tgl_impact)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    if(this.arrayRisk[1] != null){
      this.count = this.count+1;
      // console.log("risk")
    }
    else{
      this.arrJudul.push('Risk');
      if(this.tgl_risk != null){
        this.arrDue.push(this.tgl_risk)
        this.tampungTanggal.push(this.tgl_risk)
        this.countDate+= 1;
      }
      else 
        this.arrDue.push(null)
    }

    this.lessDate = 13 - this.count 
    // console.log("yang lengkap: ", this.tampungTanggal)
    // console.log("yg blm lengkap:", this.lessDate)
    if(this.lessDate == this.countDate){
      this.dialog=true; // Buka Dialog
    }
    else if (this.lessDate ==0){
      this.dialogComplete=true;
      }
    else{
      this.dialogCheck=true;
    }
    
  },

  CekCount(){
    if(this.count==12)
      this.$router.push('/home');
    else 
      this.dialog2=true;
  },
  
  closeReload(){
    location.reload();
  },

  closepopup(){
    this.dialog=false;
    this.count=0;
    this.lessDate=0;
    this.countDate=0;
    this.dialogCheck=false;
    this.dialogComplete = false;
    this.arrJudul.splice(this.arrJudul);
  
  },
  closeEmpty(){
    this.dialogEmpty=false; 
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
    this.menu30=false;
  },

  closeRemainder(){
    this.dialog = false;
    this.dialog2 = false;
  },

  createNotif(){
    // console.log(this.arrJudul)
    for (var x = 0; x < this.arrJudul.length; x++){
      if(this.category == 'All'){
        this.category = 'RPTI';
      }
      if(this.arrJudulNotif.includes(this.arrJudul[x])){
        let index = this.arrJudul.indexOf(this.arrJudul[x]);
        let id = this.listNotification[index].notifId
        // console.log("Ini ID " + id)
        let updateData={
          ProjectId : this.kodeAIP,
          ProjectCategory: this.category,
          ProjectTitle: this.judul,
          ProjectDocument: this.arrJudul[x],
          TargetDate: this.tampungTanggal[x],
          AssignedBy: localStorage.getItem('npp'),
          AssignedFor : null,
          Status: 0
        }
        this.updateNotif(updateData, id)
      }
      else{
      let newData ={
        ProjectId : this.kodeAIP,
        ProjectCategory: this.category,
        ProjectTitle: this.judul,
        ProjectDocument: this.arrJudul[x],
        TargetDate: this.tampungTanggal[x],
        AssignedBy: localStorage.getItem('npp'),
        AssignedFor : null,
        Status: 0
      }
      // console.log(this.kodeAIP,this.category,this.judul,
      // this.arrJudul[x],this.arrDue[x],localStorage.getItem('npp'))

      this.notif(newData);
      }
    }
    
    if(this.role == "ADMIN" || this.role == "AMGR"){
      this.$router.push('/homeAdmin');
    }
    else{
      this.$router.push('/homeOS');
    }
  },
  
  async notif(newData) {
    await axios
    .create({
      baseURL: this.$api+'/Notification',
      timeout: 10000,
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
    })
    .post( this.$api+'/Notification', newData)
    .then(response => {
      this.responseHandling = response;
    })
  },

  downloadFile(urlFile){ //download File
    window.open(urlFile);
  },

  async updateNotif(updateData,id) {

    await axios
    .create({
      baseURL: this.$api+'/Notification',
      timeout: 10000,
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
    })
    .put( this.$api+'/Notification/'+id, updateData)
    .then(response => {
      this.responseHandling = response;
    })
  },
},

 mounted(){
    this.readProjectProgo();
    this.readProjectDokumen();
    this.readNotification();
  },
};
</script>
<style scope>
  .greetings{
    color:#FC9039;
  }

  .path{
    color:#005E6A;
  }

  .judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
    font-size:x-large;
  }

  .alert{
    color:#FF0000;
    font-family: 'Secular One', sans-serif;
    font-size:x-large;
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