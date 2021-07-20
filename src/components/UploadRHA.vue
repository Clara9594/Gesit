<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">Upload RHA</v-toolbar-title>
      <v-card color="konten" flat>
        <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#F15A23">
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="#F2F6F6" class="pb-1 pt-5" flat> 
              <v-card color="konten" max-width="1600" class="mb-5 mx-5" elevation="0" outlined>
              <v-toolbar height="100px">
                <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
                  <v-file-input 
                    color="#F15A23"
                    counter
                    label="RHA File"
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                    dense
                    >
                  </v-file-input>
                </v-card>
              </v-toolbar>
            </v-card>
            <v-card max-width="1600" class="pt-5 px-5 mx-5 mb-16" elevation="3" outlined>
              <v-data-table
                :headers = "headers" 
                :items = "data" 
                :sort-by="['no']" 
                item-key = "no" 
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
                <template v-slot:[`item.keterangan`]="{ item }" >
                  <td>
                    <v-chip v-if="item.keterangan == 'Canceled'" color="red" dark>
                        {{ item.keterangan }}
                    </v-chip>

                    <v-chip v-else-if="item.keterangan == 'Completed'" color="green" dark>
                        {{ item.keterangan }}
                    </v-chip>

                    <v-chip v-else color="orange" dark>
                        {{ item.keterangan }}
                    </v-chip>
                  </td>
                </template>
              </v-data-table>
            </v-card>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card color="#F2F6F6" class="pb-1 pt-5" flat> 
              <v-card color="konten" max-width="1600" class="mb-8 mx-5" elevation="0" outlined>
                <v-toolbar height="100px">
                  <v-card max-width="400" elevation="0" class="ml-5 mt-6 pr-5">
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
                          label="Tanggal"
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
                  </v-card>
                </v-toolbar>
              </v-card>
              <v-row>
                <v-col v-for="item in items" :key="item.fileName" ripple cols="12" class="py-0 pb-3">
                  <v-card height="100px" class="mx-5 pl-5" style="border-left: 9px solid cyan" outlined>
                    <v-row>
                      <v-col cols="6">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <v-list-item-title class="text-h6 mt-2">
                              {{item.fileName}}
                            </v-list-item-title>
                            <v-list-item-subtitle>{{item.time}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col>
                        <v-btn fab small color="#F15A23" dark class="mt-7">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-chip v-if="item.keterangan == 'Assigned'" color="green" dark label class="mt-8">
                            {{ item.keterangan }}
                        </v-chip>
                      </v-col>
                    </v-row>
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
    snackbar :false,
    error_message:'',
    alert: true,
    menu2: false,
    tgl: [],
    expanded:[],
    color: '',
    headers : [
      {
          text : "No",
          align : "start",
          sortable : true,
          value : "no",
      },
      { text : "Sub Kondisi", value : "subkondisi"},
      { text : "Kondisi", value : "kondisi"},
      { text : "Rekomendasi", value : "rekomendasi"},
      { text : "Tindak Lanjut", value : "tindaklanjut"},
      { text : "Target Date", value : "date"},
      { text : "Assign", value : "assign"},
    ],
    data : [
      { no : "#2458", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"ABC",rekomendasi:"BNP",tindaklanjut:"Koordinasi",date:"06/22/21 17:15", assign:"OTF"},
      { no : "#3530", subkondisi:"Pengawasan Aktif Manajemen",kondisi:"CDE",rekomendasi:"PTM",tindaklanjut:"Koordinasi",date:"06/02/21 14:58", assign:"IOT"},
    ],
    tabs: [
      'RHA Files', 'Upload Files'
    ],
    tab: null,
    report:['Laporan 1','Laporan 2','Laporan 3'],
    items:[
      {fileName: 'RHA1.pdf', time:'Sent 14 days ago', keterangan : 'Assigned'},
      {fileName: 'RHAawal.pdf', time:'Sent 3 days ago', keterangan : 'Assigned'},
      {fileName: 'RHAawal.xls', time:'Sent 23 hours ago', keterangan : 'Assigned'},
    ],
  };
},

methods: {
  cancel(){
    this.tgl=[];
    this.menu2=false;
  },
},
  computed: {
    dateRangeText () {
      return this.tgl.join(' ~ ')
    },
  },
};
</script>

<style scope>
.title{
    color:#005E6A;
    font-size:xx-large;
}
.textbutton{
    color:#005E6A;
}
.konten{
   background-color:#F2F6F6 !important;
}

.v-window__container {
  height: 0%;
}

</style>
