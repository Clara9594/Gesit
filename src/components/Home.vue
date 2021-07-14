<template>

<v-main class="homepage">
<v-container fluid>
 <v-card class="card" style="justify-content:center" tile color="#FFC0CB" elevation="3" height="100px" outlined>
      <img src="../assets/Mention-bro 1.png" align="right" height="100px">
      <v-list-item-title style="font-weight:bolder; font-size:xx-large;" class="teal--text ml-5 mt-2">Welcome, ACM!</v-list-item-title>
      <v-list-item-title class="ml-5">Have a nice day at work!</v-list-item-title>
  </v-card>
    <h1 class="page-title mt-10 mb-6 teal--text">Project</h1>
    <v-row>
      <v-col>
        <v-card class="mx-1 mb-1" style="justify-content: center;">
          <v-card-title class="pa-6 pb-3">
          <img src="../assets/gov.png" height="100px">
          <br>
          </v-card-title>
           <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="teal--text">Governance Project</p>
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
      <v-col>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <img src="../assets/audit.png" align="right" height="100px">
          </v-card-title>
          <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="teal--text">Temuan Audit</p>
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
    </v-row>
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
                                                                                                                                                            
</style>
