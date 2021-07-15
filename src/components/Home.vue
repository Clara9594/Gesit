<template>

<v-main class="homepage">
<v-container fluid>
 <v-card class="card mx-5 mt-5" style="justify-content:center" color="#FFCBB8" elevation="0" height="120px" outlined>
    <img src="../assets/Mention-bro 1.png" align="right" class="mt-1 mr-5" height="110px">
    <v-list-item-title style="font-weight:bolder; font-size:xx-large;" class="ml-5 mt-5 text">Welcome, ACM!</v-list-item-title>
    <p class="text--secondary ml-5">Have a nice day at work!</p>
  </v-card>
    <h2 class="page-title mt-5 mb-2 ml-5 text">Project</h2>
    <v-row class="mx-5 mb-16" style="justify-content: center;">
      <v-col lg="4" sm="6" cols="12">
        <v-card class="mb-1" >
          <v-card-title class="pa-6 pb-3">
          <img src="../assets/gov.png" height="100px">
          <br>
          </v-card-title>
           <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="text">Governance Project</p>
           <v-btn
            rounded
            color = "#F15A23"
            dark
            :style="{left: '50%', transform:'translateX(-50%)'}"
          >
          Choose
         </v-btn>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="typography-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" sm="6" cols="12">
        <v-card class="mb-1">
          <v-card-title class="pa-6 pb-3">
            <img src="../assets/audit.png" align="right" height="100px">
          </v-card-title>
          <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="text">Temuan Audit</p>
           <v-btn
            rounded
            color = "#F15A23"
            dark
            :style="{left: '50%', transform:'translateX(-50%)'}"
            link to="/audit"
          >
           Choose
        </v-btn>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="typography-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br>
  </v-container>
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.homepage{
  padding:10px;
}
.text{
  color:#005E6A;
}
                                                                                                                                                            
</style>
