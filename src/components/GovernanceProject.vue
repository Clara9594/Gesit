<template>
<v-app>
  <v-main class="gov">
    <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
      <v-row no-gutters>
        <v-col cols="2" sm="1" md="1">
          <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" sm="11" md="11">
          <v-toolbar-title class="judul font-weight-bold font-weight-bold">PROJECT PLANNING</v-toolbar-title>
          <v-breadcrumbs :items="routing" class="pa-0 textTable">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-toolbar-title>

    <v-layout justify-center>
      <v-sheet class="rounded mx-5 pa-5" width="700px" elevation="2" style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
        <p class="mb-6 font-weight-bold path text-center">Choose the Project Planning that you want</p>
        <v-divider></v-divider>

        <p class="mb-1 mt-5 font-weight-bold">Select Category</p>
        <v-autocomplete
          v-model="category" 
          :items="items"
          required
          @change="readProject()"
          solo
          flat
          label = "All"
          background-color="#EEEEEE"
          filled
          hide-details
          dense
          color="#26A69A" 
        ></v-autocomplete>

        <p class="mb-1 mt-5 font-weight-bold">Select Period</p>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          min-width="auto"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="year"
              label="xxxx"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="attrs" 
              v-on="on" 
              color="#26A69A" 
              class="mb-5 textTable"
              dense
              solo
              flat
              background-color="#EEEEEE"
              filled
              hide-details
            ></v-text-field>
          </template> 
          <v-date-picker
            ref="picker"
            :active-picker.sync="activePicker"
            v-model="date"
            @input="save"
            reactive
            no-title
          ></v-date-picker>
        </v-menu>

        <v-row>
          <v-col cols="8" sm="8" md="10">
            <p class="mb-1 font-weight-bold">Select Project Title</p>
          </v-col>
          <v-col cols="4" sm="4" md="2">
            <v-btn color="#F15A23" small dark text @click = "cekCategory" class="pl-1 pb-1">
              <download-excel
                :data   = "project"
                :fields = "columns"
                type = "xls"
                name = "Daftar Project Governance.xls">Download
              </download-excel>
            </v-btn>
          </v-col>
        </v-row>
        <v-autocomplete
          v-model="judul" 
          :items="itemsProject"
          solo
          flat
          background-color="#EEEEEE"
          filled
          hide-details
          @change="cekProjectTitle()"
          required
          dense
          color="#26A69A" 
          label = "Pengembangan E-form Dalam Negeri">
        </v-autocomplete>

        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-btn color = "#005E6A" dark fab link @click="next">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-sheet>
    </v-layout>
    <br>
    <br>
    <v-snackbar v-if="category==null" v-model="alertProject" color="red" timeout="3000" bottom>
      Please select Project Category 
    </v-snackbar>
    <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
      {{message}}
    </v-snackbar>
  </v-main>
</v-app>
</template>

<script>
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
import moment from 'moment'

Vue.component('downloadExcel', JsonExcel)
  export default {
    created () {
      document.title = "Project Planning";
    },
    data: () => ({
      selected:"",
      activePicker: null,
      menu: false,
      judul:null,
      year : null,
      date : null,
      filter:"",
      alert: false,
      alertProject: false,
      message:null,
      role: localStorage.getItem('role'),
      color: '',
      kodeAIP:null,
      project: [],
      itemsProject:[],
      dataChecklist:[],
      judulproject: false,
      category:'All',
      items: ['All',  'ITPlanses',  'RBB',  'Insertion'],

      columns: {
        'Daftar Project': 'NamaAIP',
      },

      // Path Checklist Admin
      routing: [
        {
          text: 'Home',
          disabled: false,
          href: '#/homeAdmin',
        },
        {
          text: 'Governance Project',
          disabled: true,
          href: '#/GovernanceProjectAdmin',
        },
      ],
    }),
  methods: {
    readProject(){ // Read Project
      if(this.category!=null) {
        var url =  'https://gesit.hasura.app/api/rest/progoproject/kategori/'+this.category+'/periode/'+this.year;
        this.$http.get(url,{
          headers:{
            'x-hasura-admin-secret':'K6ib0Lj8V8fY33OxHhqPjdfDlJXqk8QU8ZU11w3yFApXL31Ex0baObiA3s3uJ0Vu',
            'Content-Type': 'application/json'
          }
        }).then(response => { 
            this.project = response.data.progoproject;
            console.log(this.project);
            this.dropdownItem();
        })
      }
    },
    save(date) { // ini field filter by tahun temuan
      this.$refs.menu.save(date);
      this.$refs.picker.activePicker = 'YEAR';
      this.year = moment(date).format('YYYY');
      this.menu = false;
      this.readProject();
    },

    next(){
      if (this.category !=null && this.year != null && this.judul !=null) {
        localStorage.setItem('category', this.category);
        localStorage.setItem('judul', this.judul);
        localStorage.setItem('kodeAIP',this.kodeAIP);
        localStorage.setItem('periode',this.year);
        if(this.role=='AMGR' || this.role=='ADMIN')
          this.$router.push('/checklistAdmin');
        else if(this.role=='OS')
          this.$router.push('/checklistOS');
      }
      else{
        this.color="red";
        this.message="Please fill all the field!";
        this.alert=true;
      }
    },

    hide_alert() {
      window.setInterval(() => {
        this.alert = false;
      }, 5000)    
    },

    back() {
      if(this.role=='OS')
        this.$router.push('/homeOS');
      else if(this.role=='ADMIN' || this.role=='AMGR')
        this.$router.push('/homeAdmin');
    },

    dropdownItem(){
      var namaAIP='';
      this.itemsProject.splice(0,this.itemsProject.length);
      for(let x= 0 ; x< this.project.length;x++){
        namaAIP = this.project[x].nama_aip;
        this.itemsProject.push(namaAIP);
      }
      return this.itemsProject;
    },

    cekProjectTitle(){
      for(let x= 0 ; x< this.project.length;x++){
        if(this.judul == this.project[x].nama_aip)
          this.kodeAIP = this.project[x].aip_id;
      }
    },

    cekCategory(){
      if(this.category==null)
        this.alertProject=true;
    }
  },
  mounted(){
    // this.readProject();
    this.hide_alert();
  },
  watch:{
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    },
  }
}
</script>


<style scope>
.text {
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}

.greetings {
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.path {
  color:#005E6A;
  font-family: 'Questrial', sans-serif;
}

.orangeFont {
  font-family: 'Secular One', sans-serif;
}

.orangeText {
  color:#F15A23;
}

.greenText {
    color:#005E6A;
    font-family: 'Questrial', sans-serif;
}

.judul {
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
</style>