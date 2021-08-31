<template>
<v-app>
  <v-main class="gov">
    <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-layout justify-center>
      <v-sheet class="rounded-lg mx-5 mt-3 pa-5" width="700px" elevation="2">
        <v-form fluid ref="form">
          <h2 class="text judul text-center px-5" style="font-size:xx-large;">PROJECT PLANNING</h2>
          <p class="greetings text-center px-5">Choose the Project Planning that you want</p>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="10" sm="11" md="11" class="pr-0">
              <p class="mb-1 greenText font-weight-bold">Select Category</p>
              <v-autocomplete
                v-model="category" 
                :items="items"
                required
                @change="readProject()"
                :rules="categoryRules"
                outlined
                dense
              ></v-autocomplete>
            </v-col>
            <v-col cols="2" sm="1" md="1" class="px-0">
              <v-btn color="#F15A23" dark icon outlined class="mt-7 ml-2">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <p class="mb-1 greenText font-weight-bold">Select Project Title</p>
          <v-autocomplete
            v-model="judul" 
            :items="itemsProject"
            outlined
            @change="cekProjectTitle()"
            :rules="projectRules"
            required
            dense>
          </v-autocomplete>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color = "#005E6A" dark fab link @click="next">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-sheet>
    </v-layout>
    <br>
    <br>
    <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
      {{message}}
    </v-snackbar>
  </v-main>
</v-app>
</template>

<script>
  export default {
    created () {
      document.title = "Project Planning";
    },
    data: () => ({
      selected:"",
      judul:"",
      filter:"",
      alert: false,
      message:null,
      role: localStorage.getItem('role'),
      color: '',
      kodeAIP:null,
      project: [],
      itemsProject:[],
      dataChecklist:[],
      judulproject: false,
      category:null,
      items: ['All',  'ITPlanses',  'RBB',  'Insertion'],
      categoryRules: [
        (v) => !!v || 'Category is required',
      ],
      projectRules:[
        (v) => !!v || 'Project Title is required',
      ],
    }),
  methods: {
    readProject(){ //Read Project
      if(this.category!=null){
        var url =  'http://35.219.107.102/progo/api/project?kategori='+this.category
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
      if (this.$refs.form.validate()) {
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
      this.$router.back();
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