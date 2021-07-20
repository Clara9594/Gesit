<template>
<v-app>
<v-main class="homepage">
<v-container fluid>
 <v-card class="card ma-5 mb-10" style="justify-content:center" color="#FFCBB8" elevation="0" height="120px" outlined>
    <img id="pic" src="../assets/Mention-bro 1.png" align="right" class="mt-1 mr-5">
    <v-list-item-title style="font-weight:bolder; font-size:xx-large;" class="ml-5 mt-7 title">Welcome, ACM!</v-list-item-title>
    <p class="text--secondary ml-5 greetings">Have a nice day at work!</p>
  </v-card>
    <h2 class="page-title mt-8 mb-6 ml-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</h2>
    <v-row class="mx-5 mb-16" style="justify-content: center;">
      <v-col lg="4" sm="6" cols="12">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card  :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <v-card-title class="pa-6 pb-3">
            <img src="../assets/gov.png" height="100px">
            <br>
            </v-card-title>
            <p class="text">Governance Project</p>
            <v-btn
              rounded
              color = "#F15A23"
              dark
              :style="{left: '50%', transform:'translateX(-50%)'}"
               link to="/checklist"
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
        </v-hover>
      </v-col>
      <v-col lg="4" sm="6" cols="12">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <v-card-title class="pa-6 pb-3">
              <img src="../assets/audit.png" align="right" height="100px">
            </v-card-title>
            <p class="text">Temuan Audit</p>
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
        </v-hover>
      </v-col>
    </v-row>
    <br>
    <br>
    <br>
  </v-container>
  </v-main>
  </v-app>
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
.title{
    color:#005E6A;
}
.text{
  color:#d2faff;
  font-size:x-large; font-weight:bolder; text-align:center;
}
#pic{
height:110px;
}

@media screen and (max-width: 600px) {
  .text{
    font-size: medium;
  }
  .title{
  font-size: small;
  }
  #pic{
  display: none;
  
  }

}
                                                                                                                                                            
</style>
