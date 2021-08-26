<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-1">
       <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar-title>

      <!-- Konten PM -->
      <v-card color="#fdf9ed" flat v-if="role=='PM'">
        <v-card color="#fdf9ed" class="pb-1 pt-5" flat >
          <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
            <v-card-title class="py-0">
              <v-text-field
                v-model="searchRHA"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                rounded
                class="mb-5 mt-6 textTable"
                dense
                filled
                hide-details>
              </v-text-field>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
            </v-card-title>
            <v-data-table
              :headers = "headers" 
              :search = "searchRHA"
              :items = "rhaIndex" 
              item-key = "id" 
              class="textTable">
              <template v-slot:[`item.statusCompleted`]="{ item }">
                <v-chip v-if="item.statusCompleted == 0" color="#FF9800" dark label>
                  Pending
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]= "{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list class="textTable">
                    <v-list-item @click="updateHandler(item)">
                      <v-list-item-title>Update RHA</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item @click="downloadHandler(item.id)">
                      <v-list-item-title>Download RHA</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-card>

      <!-- INI batas selain PM -->
      <v-card color="#fdf9ed" flat v-else>
        <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#fe713c">
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat>
              <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
                <v-card-title class="py-0">
                  <v-text-field
                    v-model="searchRHA"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    rounded
                    class="mb-5 mt-6 textTable"
                    dense
                    filled
                    hide-details>
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
                </v-card-title>
                <v-data-table
                  :headers = "headers" 
                  :search = "searchRHA"
                  :items = "rhaIndex" 
                  item-key = "id" 
                  class="textTable">
                  <template v-slot:[`item.statusCompleted`]="{ item }">
                    <v-chip v-if="item.statusCompleted == 0" color="#FF9800" dark label>
                      Pending
                    </v-chip>
                  </template>
                  <template v-slot:[`item.actions`]= "{ item }">
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="textTable">
                        <v-list-item @click="updateHandler(item)">
                          <v-list-item-title>Update RHA</v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item @click="downloadHandler(item.id)">
                          <v-list-item-title>Download RHA</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
              </v-card>
            </v-card>
            <v-dialog v-model="addFile" scrollable max-width = "600px">
              <v-card>
                <v-card class="kotak" tile color="#F15A23">
                  <h3 class="text-center white--text py-5">{{ formTitle }} RHA FILE</h3>
                </v-card>

                <v-card-text flat class="pl-9 pr-9 mt-5 pt-1">
                  <v-form ref="form">
                    <v-text-field
                      v-model = "form.subKondisi"
                      label = "Sub Kondisi"
                      required
                      outlined
                      :rules="fieldRules"
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model = "form.kondisi"
                      label = "Kondisi"
                      required
                      :rules="fieldRules"
                      outlined
                      dense
                    ></v-text-field>
                    <v-textarea
                      v-model = "form.rekomendasi"
                      label = "Rekomendasi"
                      required
                      outlined
                      :rules="fieldRules"
                    ></v-textarea>

                    <v-menu 
                        v-model="menu" 
                        :close-on-content-click="false" 
                        :nudge-right="40" 
                        transition="scale-transition" 
                        offset-y 
                        min-width="auto" 
                      > 
                      <template v-slot:activator="{ on, attrs }"> 
                        <v-text-field 
                          dense
                          v-model="form.date" 
                          label="Target Date" 
                          prepend-inner-icon="mdi-calendar" 
                          readonly 
                          :rules="fieldRules"
                          outlined 
                          v-bind="attrs" 
                          v-on="on" 
                        ></v-text-field> 
                      </template> 
                      <v-date-picker 
                        v-model="form.date" 
                        @input="menu = false" 
                        :min="new Date().toISOString().substr(0, 10)" 
                      ></v-date-picker> 
                    </v-menu>

                    <v-text-field
                      v-model = "form.assign"
                      label = "Assign"
                      required
                      outlined
                      dense
                    ></v-text-field>

                    <div v-if="!file && inputType=='Add'">
                      <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                        <div class="dropZone-info" @drag="onChange">
                          <span class="fa fa-cloud-upload dropZone-title"></span>
                          <span class="dropZone-title">Drop file or click to upload</span>
                          <div class="dropZone-upload-limit-info">
                            <div>Extension support: xlsx, xls</div>
                            <div>Max file size: 2 MB</div>
                          </div>
                        </div>
                        <input type="file" @change="onChange">
                      </div>
                    </div>
                    <div v-else class="dropZone-uploaded">
                      <div class="dropZone-uploaded-info">
                        <span class="dropZone-title">fileName: {{ file.name }}</span>
                        <v-btn dark color="#F15A23" text class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                      </div>
                    </div>

                    <!--<v-file-input
                      v-if="inputType=='Add'"
                      label="Select File"
                      :rules="fileRules"
                      v-model="form.uploadRha"
                      outlined
                      accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.zip,.rar"
                      dense
                    ></v-file-input>-->
                  </v-form>
                </v-card-text>

                <v-card-actions class="mr-8">
                  <v-spacer></v-spacer>

                  <v-btn color = "black" text @click = "closeDialog">
                      Cancel
                  </v-btn>

                  <v-btn depressed dark large color="#F15A23" @click="cekOperasi">
                      Save
                  </v-btn>
                </v-card-actions>
                <br>
              </v-card>
            </v-dialog>
          </v-tab-item>
          
          <!--RHA New-->
          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat>
              <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
                <v-card-title class="py-0">
                  <v-text-field
                    v-model="searchRHA"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    rounded
                    class="mb-5 mt-6 textTable"
                    dense
                    filled
                    hide-details>
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-btn color="#F15A23" class="textTable text-none" dark @click="addFileNew=true">+ Add File</v-btn>
                </v-card-title>
                <v-data-table
                  :headers = "headersRHABaru" 
                  :search = "searchRHA"
                  :items = "rhaIndexNew" 
                  item-key = "id" 
                  class="textTable">
                  <template v-slot:[`item.statusCompleted`]="{ item }">
                    <v-chip v-if="item.statusCompleted == 0" color="#FF9800" dark label>
                      Pending
                    </v-chip>
                  </template>
                  <template v-slot:[`item.actions`]= "{ item }">
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="textTable">
                        <v-list-item @click="updateHandler(item)">
                          <v-list-item-title>Update RHA</v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item @click="downloadHandler(item.id)">
                          <v-list-item-title>Download RHA</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-data-table>
              </v-card>
            </v-card>
            <v-dialog v-model="addFileNew" scrollable max-width = "600px">
              <v-card>
                <v-card class="kotak" tile color="#F15A23">
                  <h3 class="text-center white--text py-5">{{ formTitle }} RHA FILE</h3>
                </v-card>

                <v-card-text flat class="pl-9 pr-9 mt-5 pt-1">
                  <v-form ref="form">
                    <div v-if="!file">
                      <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                        <div class="dropZone-info" @drag="onChange">
                          <span class="fa fa-cloud-upload dropZone-title"></span>
                          <span class="dropZone-title">Drop file or click to upload</span>
                          <div class="dropZone-upload-limit-info">
                            <div>Extension support: xlsx, xls</div>
                            <div>Max file size: 2 MB</div>
                          </div>
                        </div>
                        <input type="file" @change="onChange">
                      </div>
                    </div>
                    <div v-else class="dropZone-uploaded">
                      <div class="dropZone-uploaded-info">
                        <span class="dropZone-title">fileName: {{ file.name }}</span>
                        <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                      </div>
                    </div>
                    <!--<v-file-input
                      v-if="inputType=='Add'"
                      label="Select File"
                      :rules="fileRules"
                      v-model="form.uploadRha"
                      outlined
                      accept=".xls,.xlsx"
                      dense
                    ></v-file-input>-->
                  </v-form>
                </v-card-text>

                <v-card-actions class="mr-8">
                  <v-spacer></v-spacer>

                  <v-btn color = "black" text @click = "closeDialog()">
                      Cancel
                  </v-btn>

                  <v-btn depressed dark large color="#F15A23" @click="uploadRHANew">
                      Save
                  </v-btn>
                </v-card-actions>
                <br>
              </v-card>
            </v-dialog>
          </v-tab-item>

          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat> 
              <v-row>
                <v-col>
                  <v-card class="mx-5 px-5 pt-5" outlined elevation="2">
                    <v-card-title class="pb-0">
                      <v-row>
                        <v-col cols="12" sm="4" md="4">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            rounded
                            class="mb-5 textTable"
                            dense
                            filled
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>

                        <v-col cols="6" sm="3" md="3">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="tgl"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateRangeText"
                                label="Filter Date"
                                append-icon="mdi-calendar"
                                readonly
                                outlined
                                dense
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="tgl"
                              @change="cekTanggal()"
                              type="month"
                              scrollable
                              range>
                              <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="cancel()">
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu2.save(tgl)">
                                  OK
                                </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-card-title>

                    <v-data-table
                      v-if="cek!=null"
                      class="textTable"
                      :headers = "headersEvidence" 
                      :search = "search"
                      :items = "rhaFilter" 
                      item-key="id"
                      :expanded.sync="expanded"
                      show-expand>
                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <p class="font-weight-bold mt-4"> Evidence Files :</p>
                          <div v-for="i in item.rhafilesEvidences" :key="i.id">
                            <v-row>
                              <v-col cols="11" sm="11" md="11">
                                <p>
                                  <v-icon class="mr-2">
                                    mdi-circle-small
                                  </v-icon>
                                  {{i.fileName}}
                                </p>
                              </v-col>
                              <v-col cols="1" sm="1" md="1" class="pl-0">
                                <v-spacer></v-spacer>
                                <v-icon color="orange" @click="downloadEvidence(i.id)" class="mr-5">mdi-download</v-icon>
                              </v-col>
                            </v-row>
                          </div>
                        </td>
                      </template>
                      <template v-slot:[`item.assign`]="{ item }" >
                        <td class="d-flex justify-center">
                          <v-chip v-if="item.assign!=='none'" color="green" dark label>
                            Assigned
                          </v-chip>
                           <v-chip v-else color="red" dark label>
                            Not Assigned
                          </v-chip>
                        </td>
                      </template>

                      <template v-slot:[`item.actions`]= "{ item }">
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon>
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list class="textTable">
                            <v-list-item @click="dialogHandler(item)">
                              <v-list-item-title>Add Evidence</v-list-item-title>
                            </v-list-item>

                            <v-list-item @click="downloadBundle(item)">
                              <v-list-item-title>Download All</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-data-table>

                    <v-data-table
                      v-else
                      class="textTable"
                      :headers = "headersEvidence" 
                      :search = "search"
                      :items = "rhaIndex" 
                      item-key="id"
                      :expanded.sync="expanded"
                      show-expand>
                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <p class="font-weight-bold mt-4"> Evidence Files :</p>
                          <div v-for="i in item.rhafilesEvidences" :key="i.id">
                            <v-row>
                              <v-col cols="11" sm="11" md="11">
                                <p>
                                  <v-icon class="mr-2">
                                    mdi-circle-small
                                  </v-icon>
                                  {{i.fileName}}
                                </p>
                              </v-col>
                              <v-col cols="1" sm="1" md="1" class="pl-0">
                                <v-spacer></v-spacer>
                                <v-icon color="orange" @click="downloadEvidence(i.id)" class="mr-5">mdi-download</v-icon>
                              </v-col>
                            </v-row>
                          </div>
                        </td>
                      </template>
                      <template v-slot:[`item.assign`]="{ item }" >
                        <td class="d-flex justify-center">
                          <v-chip v-if="item.assign!=='none'" color="green" dark label>
                            Assigned
                          </v-chip>
                           <v-chip v-else color="red" dark label>
                            Not Assigned
                          </v-chip>
                        </td>
                      </template>

                      <template v-slot:[`item.actions`]= "{ item }">
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon>
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list class="textTable">
                            <v-list-item @click="dialogHandler(item)">
                              <v-list-item-title>Add Evidence</v-list-item-title>
                            </v-list-item>

                            <v-list-item @click="downloadBundle(item)">
                              <v-list-item-title>Download All</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>
                    </v-data-table>
                  </v-card>
                  <br>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <!-- Dialog upload Evidence file -->
      <v-dialog v-model="addEvidence" scrollable max-width = "600px">
        <v-card>
          <v-card class="kotak" tile color="#F15A23">
            <h3 class="text-center white--text py-5">Add Evidence File</h3>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">
            <div v-if="!file">
              <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Drop file or click to upload</span>
                  <div class="dropZone-upload-limit-info">
                    <div>Extension support: xlsx, xls</div>
                    <div>Max file size: 2 MB</div>
                  </div>
                </div>
                <input type="file" @change="onChange">
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">fileName: {{ file.name }}</span>
                <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="mr-8">
            <v-spacer></v-spacer>

            <v-btn color = "black" text @click = "closeDialogEvidence()">
                Cancel
            </v-btn>

            <v-btn depressed dark large color="#F15A23" @click="uploadFileEvidence">
                Save
            </v-btn>
          </v-card-actions>
          <br>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
name : "Monitoring",
created () {
  document.title = "RHA";
},
data() {
  return {
    error_message:'',
    menu: false,
    menu2: false,
    search : null,
    inputType: 'Add',
    dragging: false,

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expanded:[],
    readRHAFile:[],

    searchRHA : null,
    role: localStorage.getItem('role'),
    addFile:false,
    addFileNew:false,
    addEvidence:false,
    color: '',
    cek:null,
    file:'',
    fileUpload:null,
    rhaId : null,
    alert: false,
    message:'',
    formData : new FormData,
    headers : [
    {
        text : "No",
        align : "center",
        sortable : true,
        value : "index",
      },
      { text : "Sub Kondisi",align : "center",value : "subKondisi"},
      { text : "Kondisi",align : "center",value : "kondisi"},
      { text : "Rekomendasi", align : "center",value : "rekomendasi"},
      // { text : "Tindak Lanjut", align : "center",value : "tindakLanjut"},
      { text : "File Name", align : "center",value : "fileName"},
      { text : "Target Date", align : "center",value : "targetDate"},
      { text : "Assign Status", align : "center",value : "assign"},
      { text : "Status", align : "center",value : "statusCompleted"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    headersRHABaru : [
    {
        text : "No",
        align : "center",
        value : "index",
      },
      { text : "Sub Kondisi",align : "center",value : "subkondisi"},
      { text : "Penjelasan", align : "center",value : "penjelasan"},
      { text : "Status", align : "center",value : "statusCompleted"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    headersEvidence : [
      {
        text : "No",
        align : "center",
        sortable : true,
        value : "index",
      },
      { text : "File RHA", align : "center",value : "fileName"},
      { text : "Time", align : "center",value : "createdAt"},
      { text : "Assign Status", align : "center",value : "assign"},
      { text : "Actions", align : "center",value : "actions"},
    ],
    form : {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      assign : null,
    },
    tabs: ['RHA Files','RHA Files New', 'Evidence Files'],
    tab: null,
    fieldRules: [
      (v) => !!v || 'Field cannot be empty',
    ],
    fileRules: [
      (v) => !v || (v.size < 2_097_152) || 'File size should be less than 2 MB!',
    ],
    dialogId:'',
    getRHA:'',
    temp:'',
  };
},

methods: {
  //Operasi CRU
  cekOperasi(){ //ngecek dia add file atau update
    if(this.inputType === 'Add'){
      this.saveFile()
    }else{
      this.updateFile()
    }
  },

  readRHA(){ //Read RHA Files
    var url =  this.$api+'/RHAFiles'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      // console.log(response)
      this.rha = response.data.data;
      for(let i = 0; i < this.rha.length; i++){
        var tanggal = this.rha[i].targetDate;
        if(tanggal != null){
          var createdTime = this.rha[i].createdAt;
          var target = this.rha[i].targetDate;
          this.rha[i].targetDate = moment(target).format('YYYY-MM-DD');
          this.rha[i].createdAt = moment(createdTime).fromNow();
        }
      }
    })
  },

  saveFile(){//upload RHA sistem lama
    if (this.$refs.form.validate()) {
      this.formData.append('subKondisi', this.form.subKondisi);
      this.formData.append('kondisi', this.form.kondisi);
      this.formData.append('rekomendasi', this.form.rekomendasi);
      this.formData.append('targetDate', this.form.date);
      if(this.form.assign == null || this.form.assign == "")
        this.formData.append('assign', 'none');
      else
        this.formData.append('assign', this.form.assign);
      this.formData.append('formFile', this.file);

      var url = this.$api+'/RHAFiles/Upload'
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
          this.inputType = 'Add';
          this.closeDialog();
          this.$refs.form.resetValidation();
          this.readRHA(); //mengambil data
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.$refs.form.resetValidation();
          this.closeDialog();
      })
    }
  },

  updateHandler(id){ //Handler untuk update RHA sistem lama
    this.addFile = true;
    this.rhaId = id.id;
    this.inputType = 'Update';
    this.form.subKondisi = id.subKondisi;
    this.form.kondisi = id.kondisi;
    this.form.rekomendasi = id.rekomendasi;
    this.form.date = id.targetDate;
    this.form.assign = id.assign;
  },

  updateFile(){ //Update RHA sistem lama
    if (this.$refs.form.validate()) {
      if(this.form.assign ==  null || this.form.assign == "")
        this.form.assign = 'none';
      let newData = {
        subKondisi : this.form.subKondisi,
        kondisi : this.form.kondisi,
        rekomendasi : this.form.rekomendasi,
        targetDate : this.form.date,
        assign : this.form.assign,
      };

      var url = this.$api+'/RHAFiles/' + this.rhaId
      this.$http.put(url, newData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response)
          this.error_message=response;
          this.alert = true;
          this.message = "Update Successfully!"
          this.color="green"
          this.closeDialog();
          this.inputType = 'Add';
          this.readRHA(); //mengambil data
          this.$refs.form.resetValidation();
          this.closeDialog();
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Update failed!"
          this.color="red"
          this.$refs.form.resetValidation();
          this.closeDialog();
      })
    }
  },

  uploadRHANew(){//Upload RHA sistem baru
    if (this.$refs.form.validate()) {
      this.formData.append('formFile', this.file);
      var url = this.$api+'/ExcelReader'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.error_message=response;
          this.readRHAFile = response.data.data;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.inputType = 'Add';
          this.closeDialog();
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.closeDialog();
      })
    }
  },

  uploadFileEvidence(){ //Upload File Evidence
    this.formData.append('formFile', this.file);
    this.formData.append('RhafilesId', this.dialogId);
    this.formData.append('status', false);
    this.formData.append('createdby', localStorage.getItem('npp'));
    // console.log(this.formData)
    var url = this.$api+'/RHAFilesEvidence/Upload'
    this.$http.post(url, this.formData, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
    }).then(response => {
        this.error_message=response;
        this.alert = true;
        this.message = "Upload Successfully!"
        this.color="green"
        this.closeDialog();
        this.readRHA();
    }).catch(error => {
        this.error_message=error;
        this.alert = true;
        this.message = "Upload failed!"
        this.color="red"
        this.closeDialog();
        this.readRHA();
    })
  },

  dialogHandler(item){ //Munculin dialog berdasarkan Id
    this.getRHA = item.fileName;
    this.dialogId = item.id;
    this.addEvidence = true;
    this.temp = 'evidence';
  },


  //Fungsi Drag n Drop
  onChange(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    
    if (!files.length) {
      this.dragging = false;
      return;
    }
    if(this.temp=='evidence')
      this.createFileEvidence(files[0]);
    else
      this.createFile(files[0]);
  },

  createFile(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    // console.log(t)
    if (t != 'xlsx' && t != 'xls') {
      this.alert = true;
      this.message = "Please select xlsx or xls file!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 2000000) {
      this.alert = true;
      this.message = "Please check file size no over 2 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    this.file = file;
    // console.log(this.file);
    this.dragging = false;
  },

  createFileEvidence(file) {//validasi dan menyimpan file ke variabel this.file (evidence)
    var fileName = file.name
    var t = fileName.split('.').pop();
    // console.log(t)
    if (t == 'mp4' && t == 'mp3') {
      this.alert = true;
      this.message = "Please select other than mp3 or mp4!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 2000000) {
      this.alert = true;
      this.message = "Please check file size no over 2 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    this.file = file;
    // console.log(this.file);
    this.dragging = false;
  },
  removeFile() {//hapus file yang di upload
    this.file = '';
  },


  //Filter berdasarkan tanggal --> MASIH PAKE UpdateAt HEHE :)
  cekTanggal(){
    this.rhaFilter = [];
    for(let x = 0; x<this.rhaIndex.length; x++){
      var bulanDB = new Date(this.rhaIndex[x].updatedAt);
      var rangeAwal = new Date(this.tgl[0]);
      var rangeAkhir = new Date(this.tgl[1]);
      if(bulanDB.getMonth() >= rangeAwal.getMonth() && bulanDB.getMonth() <= rangeAkhir.getMonth()){
        this.rhaFilter.push(this.rhaIndex[x]);
        this.cek='isi';
      }
    }
    return this.rhaFilter;
  },


  //download File
  async downloadHandler(id){ //download RHA 
    axios({
      url: this.$api+'/RHAFiles/GetOnlyFile/'+id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'RHA Files'
      link.click();
    }).catch(console.error);
  },

  async downloadEvidence(id){ //download evidence satu satu
    axios({
      url: this.$api+'/RHAFilesEvidence/GetOnlyFile/'+id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence Files'
      link.click();
    }).catch(console.error);
  },

  async downloadBundle(item){ //download all evidence
    axios({
      url: this.$api+'/RHAFilesEvidence/GetBundleFiles/'+item.id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence All'
      link.click();
    }).catch(console.error);
  },


  //Fungsi tambahan
  cancel(){  //ngeclose dialog tanggal
    this.tgl=[];
    this.menu2=false;
  },

  back(){
    this.$router.back();
  },

  resetForm(){ //ngereset semua field
    this.form = {
      subKondisi : null,
      kondisi : null,
      rekomendasi : null,
      date : null,
      uploadRha : null,
      assign : null,
      action : null,
    },
    this.file=null;
    this.temp = null;
  },

  closeDialog(){ //ngeclose semua dialog dan meriset validasi
    this.addFile = false;
    this.addFileNew = false;
    this.addEvidence = false;
    this.fileUpload = null;
    this.file = null;
    this.temp = null;
    this.resetForm();
  },

  closeDialogEvidence(){
    this.addEvidence = false;
    this.resetForm();
  }
},

mounted(){
  this.readRHA();
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
    formTitle() {
      return this.inputType
    },
    rhaIndex() {
      return this.rha.map(
        (rha, index) => ({
          ...rha,
          index: index + 1
        }))
    },
    rhaIndexNew() {
      return this.readRHAFile.map(
        (readRHAFile, index) => ({
          ...readRHAFile,
          index: index + 1
        }))
    },
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    }
  },
};
</script>

<style scope>
.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
.title{
    color:#005E6A;
    font-size:xx-large;
}
.textbutton{
    color:#005E6A;
}
.konten{
   background-color:#fdf9ed ;
}

.v-window__container {
  height: 0%;
}

 .dropZone {
  width: 100%;
  height: 100px;
  position: relative;
  border: 3px dashed #ffc9b5;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

..dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 100px;
  position: relative;
  border: 2px dashed #ffc9b5;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
