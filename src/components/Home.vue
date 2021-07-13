<template>
<v-main class="homepage">
   <v-card class="card" tile color="FFC0CB" elevation="3" outlined>
      <v-list-item-title style="font-weight:bolder; font-size:x-large;">Welcome, ACM</v-list-item-title>
     <v-list-item-title>Have a nice day at work!</v-list-item-title>
  </v-card>

  <v-list-item-title style="font-weight:bolder; font-size:x-large;">Project</v-list-item-title>
  <v-card class="ml-9 mr-9 mb-5" max-width="500" elevation="3" outlined>
      <v-row class="mt-3">
        <v-col sm="5" class="ml-10">
         <img class="mt-8 ml-3" height="150px" src="../assets/gov.png">
          <p class="text-subtitle-2 text-center font-weight-bold font-size-x-large">Governance Project</p>
        </v-col>
      </v-row>
      <br>
     
       <v-btn
      class = "mr-10"
      rounded
      color = "#FFA500"
      align="center"
      block
      dark>
      Choose
    </v-btn>
    </v-card>
    
      <v-card class="ml-9 mr-9 mb-5" max-width="500" elevation="3" outlined>
      <v-row class="mt-3">
        <v-col sm="5" class="ml-10">
         <img class="mt-8 ml-3" height="150px" src="../assets/audit.png">
          <p class="text-left font-weight-bold">Temuan Audit</p>
        </v-col>
      </v-row>
      <br>
      <v-btn
      class = "d-flex justify-center mb-6"
      rounded
      color = "#FFA500"
      dark
    >
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
.card{
width:"relative";
position:"absolute"
}


</style>
