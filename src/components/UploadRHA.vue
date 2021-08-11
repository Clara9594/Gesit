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
          <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
            {{message}}
          </v-alert>
          <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
            <v-toolbar flat>
              <v-toolbar-title class="judul">RHA FILES</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
            </v-toolbar>
            <v-data-table
              :headers = "headers" 
              :items = "data" 
              :sort-by="['no']" 
              item-key = "no" 
              class="textTable"
              :items-per-page="5"
              :expanded.sync="expanded"
              show-expand>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <br>
                  <p class="font-weight-bold mb-2"> Deskripsi :</p>
                  <p class="text-left"> {{ item.deskripsi }} </p>
                </td>
              </template>
              <template v-slot:[`item.status`]="{ item }" >
                <td>
                  <v-chip v-if="item.status == 'Canceled'" color="red" dark>
                      {{ item.status }}
                  </v-chip>

                  <v-chip v-else-if="item.status == 'Completed'" color="green" dark>
                      {{ item.status }}
                  </v-chip>

                  <v-chip v-else color="orange" dark>
                      {{ item.status }}
                  </v-chip>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
        <v-dialog v-model="addFile" scrollable max-width = "600px">
          <v-card>
            <v-card class="kotak" tile color="#F15A23">
              <h3 class="text-center white--text py-5">Add RHA FILE</h3>
            </v-card>

            <v-card-text flat class="pl-9 pr-9 mt-5 pt-1">
              <v-form ref="form">
                <v-text-field
                  v-model = "form.subkondisi"
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
                    v-model="menu2" 
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
                      append-icon="mdi-calendar" 
                      readonly 
                      :rules="fieldRules"
                      outlined 
                      v-bind="attrs" 
                      v-on="on" 
                    ></v-text-field> 
                  </template> 
                  <v-date-picker 
                    v-model="form.date" 
                    @input="menu2 = false" 
                  ></v-date-picker> 
                </v-menu>
                <v-text-field
                  v-model = "form.assign"
                  label = "Assign"
                  required
                  outlined
                  :rules="fieldRules"
                  dense
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions class="mr-8">
              <v-spacer></v-spacer>

              <v-btn color = "black" text @click = "closeDialog">
                  Cancel
              </v-btn>

              <v-btn depressed dark large color="#F15A23" @click="saveFile">
                  Save
              </v-btn>
            </v-card-actions>
            <br>
          </v-card>
        </v-dialog>
      </v-card>

      <!-- INI batas bukan PM -->
     
      <v-card color="#fdf9ed" flat v-else>
        <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#fe713c">
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat>
              <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
                {{message}}
              </v-alert>
              <v-card max-width="1600" class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
                <v-toolbar flat>
                  <v-toolbar-title class="judul">RHA FILES</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="#F15A23" class="textTable text-none" dark @click="addFile=true">+ Add File</v-btn>
                </v-toolbar>
                <v-data-table
                  :headers = "headers" 
                  :items = "data" 
                  :sort-by="['no']" 
                  item-key = "no" 
                  class="textTable"
                  :items-per-page="5"
                  :expanded.sync="expanded"
                  show-expand>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      <br>
                      <p class="font-weight-bold mb-2"> Deskripsi :</p>
                      <p class="text-left"> {{ item.deskripsi }} </p>
                    </td>
                  </template>
                  <template v-slot:[`item.status`]="{ item }" >
                    <td>
                      <v-chip v-if="item.status == 'Canceled'" color="red" dark>
                          {{ item.status }}
                      </v-chip>

                      <v-chip v-else-if="item.status == 'Completed'" color="green" dark>
                          {{ item.status }}
                      </v-chip>

                      <v-chip v-else color="orange" dark>
                          {{ item.status }}
                      </v-chip>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-card>
            <v-dialog v-model="addFile" scrollable max-width = "600px">
              <v-card>
                <v-card class="kotak" tile color="#F15A23">
                  <h3 class="text-center white--text py-5">Add RHA FILE</h3>
                </v-card>

                <v-card-text flat class="pl-9 pr-9 mt-5 pt-1">
                  <v-form ref="form">
                    <v-text-field
                      v-model = "form.subkondisi"
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
                      ></v-date-picker> 
                    </v-menu>
                    <v-text-field
                      v-model = "form.assign"
                      label = "Assign"
                      required
                      outlined
                      :rules="fieldRules"
                      dense
                    ></v-text-field>

                    <v-file-input
                      label="Select File"
                      :rules="fileRules"
                      outlined
                      dense
                    ></v-file-input>
                  </v-form>
                </v-card-text>

                <v-card-actions class="mr-8">
                  <v-spacer></v-spacer>

                  <v-btn color = "black" text @click = "closeDialog">
                      Cancel
                  </v-btn>

                  <v-btn depressed dark large color="#F15A23" @click="saveFile">
                      Save
                  </v-btn>
                </v-card-actions>
                <br>
              </v-card>
            </v-dialog>
          </v-tab-item>

          <v-tab-item>
            <v-card color="#fdf9ed" class="pb-1 pt-5" flat> 
              <v-alert type="success" timeout="2000" v-model="alert" :color="color" class="mx-5 mb-4 textTable" transition="slide-y-transition">
                {{message}}
              </v-alert>
              <v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="2" outlined>
                <v-toolbar height="100px" flat>
                  <v-card width="700px" flat class="ml-5 mt-6 pr-5">
                    <v-form fluid ref="form">
                      <v-row>
                        <v-col sm="6" class="px-0">
                          <v-file-input
                            label="Select File"
                            outlined
                            type="file"
                            show-size
                            :rules="fileRules"
                            v-model="fileUpload"
                            dense
                            accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf,.csv,.txt,.zip,.rar"
                          ></v-file-input>
                        </v-col>
                        <v-col>
                          <v-btn
                            color="#F15A23"
                            class="text-none textTable"
                            dark
                            @click="uploadFile()"
                            :loading="isSelecting">
                            <v-icon right dark class="mr-3 ml-0">
                              mdi-cloud-upload
                            </v-icon>
                            Upload
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-toolbar>
              </v-card>
              <v-row>
                <v-col>
                  <v-card class="mx-5 pl-5 pt-5" outlined elevation="2">
                    <v-card-title class="pb-0">
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
                            @change="cekTanggal()"
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tgl"
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
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table
                      class="textTable"
                      :headers = "headersRHA" 
                      :items = "items" 
                      :sort-by="['nomor']">
                      <template v-slot:[`item.status`]="{ item }" >
                        <td class="d-flex justify-center">
                          <v-chip v-if="item.status == 'Assigned'" color="green" dark label>
                              {{ item.status }}
                          </v-chip>
                        </td>
                      </template>
                      <template v-slot:[`item.actions`]= "{ item }">
                        <v-icon color="orange" @click="downloadHandler(item)" class="mr-5">mdi-download</v-icon>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <br>
      <br>
      <br>
    </v-main>
  </v-app>
</template>

<script>

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
    tgl: [],
    tipe:'',
    role: localStorage.getItem('role'),
    addFile:false,
    expanded:[],
    color: '',
    file:'',
    fileUpload:null,
    imageName: '',
    defaultButtonText: '',
    selectedFile: null,
    isSelecting: false,
    alert: false,
    message:'',
    formData : new FormData,
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
    form : {
      subkondisi : null,
      kondisi : null,
      rekomendasi : null,
      tindakLanjut : null,
      date : null,
      assign : null,
      action : null,
    },
    tabs: [
      'RHA Files', 'Evidence Files'
    ],
    tab: null,

  // ------------------ DATA DUMMY ---------------------
    report:['Laporan 1','Laporan 2','Laporan 3'],
    items:[
      {nomor:1, fileName: 'RHA1.pdf', time:'Sent 14 days ago', status : 'Assigned'},
      {nomor:2,fileName: 'RHAawal.pdf', time:'Sent 3 days ago', status : 'Assigned'},
      {nomor:3,fileName: 'RHAawal.xls', time:'Sent 23 hours ago', status : 'Assigned'},
    ],
    data : [
      { no : "1", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"ABC",rekomendasi:"BNP",tindaklanjut:"Koordinasi",date:"06/22/21 17:15", assign:"OTF"},
      { no : "2", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"CDE",rekomendasi:"PTM",tindaklanjut:"Koordinasi",date:"06/02/21 14:58", assign:"IOT"},
    ],
    fieldRules: [
      (v) => !!v || 'Field cannot be empty',
    ],
    fileRules: [
      (v) => !v || (v.size < 2_097_152) || 'File size should be less than 2 MB!',
    ],
  };
},

methods: {
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },

  back(){
    this.$router.back();
  },

  uploadFile(){
    if(this.fileUpload == null){
      this.alert = true;
      this.message = "Field cannot be empty"
      this.color="red"
    }
    else if (this.$refs.form.validate()) { 
      this.formData.append('formFiles', this.fileUpload);
      // console.log(this.formData)
      var url = 'https://gesit-governanceproject.azurewebsites.net/api/Files/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : '*/*'
        },
      }).then(response => {
          this.error_message=response.data.message;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.fileUpload = null
      }).catch(error => {
          this.error_message=error.response.data.message;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
      })
    }
  },

  saveFile(){
    if (this.$refs.form.validate()) {
      this.data.push(this.form);
      this.resetForm();
      this.addFile = false;
      // this.tipe = 'success'
      this.alert = true;
      this.message = 'Add File Successfully!';
      this.color="green"
    }
  },
  resetForm(){
    this.form = {
      subkondisi : null,
      kondisi : null,
      rekomendasi : null,
      tindakLanjut : null,
      date : null,
      assign : null,
      action : null,
    }
  },
  closeDialog(){
    this.addFile = false;
    this.resetForm();
    this.$refs.form.resetValidation();
  },

  hide_alert() {
    window.setInterval(() => {
      this.alert = false;
    }, 5000)    
  }
},

mounted: function(){
  if(alert){
    this.hide_alert();
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

</style>
