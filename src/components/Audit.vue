<template>

<v-main class="audit">
<v-container fluid>
<br>
    <h1 class="page-title mt-10 mb-6 teal--text">Audit</h1>
    <v-row>
      <v-col>
        <v-card class="mx-1 mb-1" style="justify-content: center;">
          <v-card-title class="pa-6 pb-3">
          <img src="../assets/lapInput.png" height="100px">
          <br>
          </v-card-title>
           <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="teal--text">Input Tindak Lanjut</p>
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
            <img src="../assets/rha.png" align="right" height="100px">
          </v-card-title>
          <p style="font-size:x-large; font-weight:bolder; text-align:center;" class="teal--text">Upload RHA</p>
           <v-btn
            rounded
            color = "#F15A23"
            dark
            :style="{left: '50%', transform:'translateX(-50%)'}"
            link to= "/audit"
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
name : "Audit",
created () {
  document.title = "Audit";
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
