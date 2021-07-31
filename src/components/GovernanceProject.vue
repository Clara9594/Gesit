<template>
<v-app>
  <v-main class="gov">
    <v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>

    <v-layout justify-center>
      <v-card flat width="700px" color="#fdf9ed" class="mx-5">
        <v-alert type="error" timeout="2000" v-model="alert" :color="color" class="mt-3 mb-2">
          Please fill all the field!
        </v-alert>
      </v-card>
    </v-layout>

    <v-layout justify-center>
      <v-sheet class="rounded-lg mx-5 mt-3 pa-5" width="700px" elevation="2">
        <v-form fluid ref="form">
          <h2 class="text judul text-center px-5" style="font-size:xx-large;">PROJECT PLANNING</h2>
          <p class="greetings text-center px-5">Choose the Project Planning what you want</p>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="11" sm="11" md="10">
              <p class="mb-1 greenText font-weight-bold">Select Category</p>
              <v-select 
                v-model="category" 
                @change= "dropdownItem()"
                :items="items"
                required
                :rules="categoryRules"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="1" sm="1" md="2">
              <v-btn color="#F15A23" dark icon class="mt-7">
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="mb-1 greenText font-weight-bold">Select Project Title</p>
              <v-select 
                class="pr-3"
                v-model="judul" 
                :items="itemsProject"
                outlined
                :rules="projectRules"
                required
                dense
              ></v-select>
            </v-col>
          </v-row>
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
      color: '',
      itemsProject:[],
      judulproject: false,
      projecttitle: [
        { name: 'BPJS', type: 'RPTI'},
        { name: 'Pertamina', type: 'RPTI'},
        { name: 'PLN', type: 'RPTI'},
        { name: 'BNI', type: 'RPTI'},
        { name: 'BNI', type: 'RBB'},
        { name: 'Unilever', type: 'RBB'},
        { name: 'Jasa Raharja', type: 'Insertion'},
        { name: 'Lumintu Logic', type: 'Insertion'},
        { name: 'Telkom', type: 'IT Planning Session'},
        { name: 'Nusantara Sejahtera Raya', type: 'IT Planning Session'},
      ],
      category:null,
      items: ['IT Planning Session','RPTI','RBB', 'Insertion'],
      categoryRules: [
        (v) => !!v || 'Category is required',
      ],
      projectRules:[
        (v) => !!v || 'Project Title is required',
      ],
    }),
    computed: {
    // filteredItems() {
    //   return this.projecttitle.filter((i) => {
    //     return !this.category || (i.type === this.category);
    //   })
    // }
},
    methods: {
    next(){
      if (this.$refs.form.validate()) {
        // this.$categoryProject = this.category;
        // this.$projectTitle = this.judul;
        localStorage.setItem('category', this.category);
        localStorage.setItem('judul', this.judul);
        this.$router.push('/checklist');
      }
      else{
        this.color="red";
        this.alert=true;
      }
    },
    
    back(){
      this.$router.back();
    },
    dropdownItem(){
      // var project=[];
      this.itemsProject.splice(0,this.itemsProject.length);
      console.log('item',this.itemsProject.length);
      for(let x= 0 ; x< this.projecttitle.length;x++){
        if(this.projecttitle[x].type==this.category){
          this.itemsProject.push(this.projecttitle[x].name);
          // console.log('clara');
        }
      }
      return this.itemsProject;
    }
  }}
</script>


<style scope>
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
.greetings{
  color:#F15A23;
  font-family: 'Righteous', cursive;
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
</style>