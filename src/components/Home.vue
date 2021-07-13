<template>
<v-main class="courses"> 
 <v-toolbar-title class="text-left font-weight-bold ml-9  mb-6">Courses</v-toolbar-title> 
  <v-card max-width="500" class="ml-9 mr-9 mb-5" elevation="3" outlined> 
      <v-row class="mt-3"> 
        <v-col sm="5" class="ml-10"> 
         <img class="mt-8 ml-3" height="150px" src="../assets/checklist-removebg-preview.png"> 
        </v-col>
        <v-col cols="15" sm="100" md="15" lg="90" class="ml-20"> 
          <p class="text-left font-weight-bold">Governance Project</p> 
        </v-col> 
      </v-row> 
      <br> 
      <v-btn class="d-flex justify-center mb-6" color = "#FFA500"> 
            Choose 
    </v-btn>   
    </v-card> 

    <v-card max-width="500" class="ml-9 mr-9 mb-5" elevation="3" outlined> 
      <v-row class="mt-3"> 
        <v-col sm="5" class="ml-10"> 
         <img class="mt-8 ml-3" height="150px" src="../assets/checklist-removebg-preview.png"> 
        </v-col>
        <v-col cols="15" sm="100" md="15" lg="90" class="ml-20"> 
          <p class="text-left font-weight-bold">Temuan Audit</p> 
        </v-col> 
      </v-row> 
      <br> 
      <v-btn  class="d-flex justify-center mb-6" color = "#FFA500"> 
            Choose 
    </v-btn>   
    </v-card> 
 </v-main>

</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
name : "Home",
created () {
  document.title = "Home";
},
data() {
    return {
        
    };
},

methods: {
}
};
</script>

<style scope>

</style>
