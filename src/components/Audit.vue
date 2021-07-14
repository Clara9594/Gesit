<template>

<v-main class="audit">
<v-container fluid>

    <h1 class="page-title mt-10 mb-6">Audit</h1>
    <v-row>
      <v-col>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
          <img src="../assets/gov.png">
          <br>
            <p>Input tidak lanjut</p>
          </v-card-title>
           <v-btn
            class = "d-flex justify-center mb-6"
            rounded
            color = "#FFA500"
            dark
          >
          Choose
         </v-btn>
         <br>
          <!-- <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="typography-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <h1>h1. Heading</h1>
                <h2>h2. Heading</h2>
                <h3>h3. Heading</h3>
                <h4>h4. Heading</h4>
                <h5>h5. Heading</h5>
                <h6>h6. Heading</h6>
              </v-col>
            </v-row>
          </v-card-text> -->
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <img src="../assets/audit.png">
            <p>Upload RHA</p>
          </v-card-title>
           <v-btn
            class = "d-flex justify-center mb-6"
            rounded
            color = "#FFA500"
            dark
          >
           Choose
        </v-btn>
        <br>
          <!-- <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="typography-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <h1 class="primary--text">h1. Heading</h1>
                <h2 class="success--text">h2. Heading</h2>
                <h3 class="secondary--text">h3. Heading</h3>
                <h4 class="warning--text">h4. Heading</h4>
                <h5 class="primary--text">h5. Heading</h5>
                <h6 class="info--text">h6. Heading</h6>
              </v-col>
            </v-row>
          </v-card-text> -->
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

                                                                                                                                                            
</style>
