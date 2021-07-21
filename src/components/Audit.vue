<template>
<v-app>
<v-main class="audit">
    <v-btn class="mt-8 ml-7" outlined fab color="#005E6A" @click="back">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  
    <v-flex class="px-10 pt-2 pb-2 text-center">
      <h2 class="page-title mt-5 mb-2 ml-5 text" style="font-size:xx-large;">AUDIT</h2>
    </v-flex>

    <v-row class="mx-5 mb-16" style="justify-content: center;" align="center">
      <v-col lg="4" sm="6" cols="12">
        <v-hover v-slot="{ hover }" open-delay="200">
        <v-card class="mb-1" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
          <v-card-title class="pa-6 pb-3">
          <img src="../assets/lapInput.png" height="100px">
          <br>
          </v-card-title>
           <p class="text">Input Tindak Lanjut</p>
           <v-btn
            rounded
            color = "#F15A23"
            dark
            :style="{left: '50%', transform:'translateX(-50%)'}"
          link to="/InputTL">
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
        <v-card class="mb-1" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
          <v-card-title class="pa-6 pb-3">
            <img src="../assets/rha.png" align="right" height="100px">
          </v-card-title>
          <p class="text">Upload RHA</p>
           <v-btn
            rounded
            color = "#F15A23"
            dark
            :style="{left: '50%', transform:'translateX(-50%)'}"
            link to="/RHA"
            
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
  </v-main>
  </v-app>
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
    back(){
    this.$router.back();
  }
}
};
</script>

<style scope>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.audit{
  padding:10px;
}
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
@media screen and (max-width: 600px) {
  .text{
    font-size: medium;
  }
}
                                                                                                                                                            
</style>
