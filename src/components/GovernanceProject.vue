<template>
<v-app>
  <v-main class="gov">
    <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-16">
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
          dense
          color="#F15A23"
        ></v-autocomplete>

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
Vue.component('downloadExcel', JsonExcel)
  export default {
    created () {
      document.title = "Project Planning";
    },
    data: () => ({
      selected:"",
      judul:null,
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

      //Path Checklist Admin
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
    readProject(){ //Read Project
      if(this.category!=null){
        var url =  'http://35.219.107.102/progodev/api/project?kategori='+this.category
        this.$http.get(url,{
          headers:{
            'progo-key':'progo123',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => { 
            // console.log(response)
            this.project = response.data.data;
            this.dropdownItem();
        })
      }
    },

    next(){
      if (this.category !=null && this.judul !=null) {
        localStorage.setItem('category', this.category);
        localStorage.setItem('judul', this.judul);
        localStorage.setItem('kodeAIP',this.kodeAIP);
        if(this.role=='GOV')
          this.$router.push('/checklist');
        else if(this.role=='PM')
          this.$router.push('/checklistPM');
        else 
          this.$router.push('/checklistAdmin');
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

    back(){
      if(this.role=='PM')
        this.$router.push('/homePM');
      else if(this.role=='ADMIN')
        this.$router.push('/homeAdmin');

    },

    dropdownItem(){
      var namaAIP='';
      this.itemsProject.splice(0,this.itemsProject.length);
      for(let x= 0 ; x< this.project.length;x++){
        namaAIP = this.project[x].NamaAIP;
        this.itemsProject.push(namaAIP);
      }
      // console.log(this.kodeAIP)
      return this.itemsProject;
    },

    cekProjectTitle(){
      for(let x= 0 ; x< this.project.length;x++){
        if(this.judul == this.project[x].NamaAIP)
          this.kodeAIP = this.project[x].AIPId;
      }
    },

    cekCategory(){
      if(this.category==null)
        this.alertProject=true;
    }
  },
  mounted(){
    this.readProject();
    this.hide_alert();
  },
}
</script>


<style scope>
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.path{
  color:#005E6A;
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
    font-family: 'Questrial', sans-serif;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
</style>