<template>
<v-main class="courses">
   <v-card background-color="pink" max-width="1000" class="ml-9 mr-9 mb-5" elevation="3" outlined>
      <v-list-item-title style="font-weight:bolder; font-size:x-large;">Welcome, ACM</v-list-item-title>
     <v-list-item-title>Have a nice day at work!</v-list-item-title>
     
    </v-card>
  <v-list-item-title style="font-weight:bolder; font-size:x-large;">Project</v-list-item-title>
  <v-card max-width="400" class="ml-9 mr-9 mb-5" elevation="3" outlined>
      <v-row class="mt-3">
        <v-col sm="5" class="ml-10">
         <img class="mt-8 ml-3" height="150px" src="../assets/gov.png">
          <p class="text-left font-weight-bold font-size-x-large">Governance Project</p>
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

      <v-card max-width="400" class="ml-9 mr-9 mb-5" elevation="3" outlined>
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

</style>
