<template>
<v-app>
<v-main class="checklist" style="justify-content: center;">
  <v-toolbar-title class="mt-8 ml-6 mb-0">
        <v-icon right dark class="mr-3 ml-0" color="#005E6A" @click="back">
                        mdi-arrow-left
                      </v-icon>
  </v-toolbar-title>
   <h2 class="page-title mt-5 mb-2 ml-5 text" style="font-size:xx-large;">CHECKLIST PROJECT</h2>
   <p class="text--secondary ml-5 greetings text2">Check the Project what you want</p>
   <v-row class="mx-5 mb-16 mt-16">
    <p>{{ selected }}</p>
    <v-checkbox style="font-weight:bolder;"
      v-model="selected"
      label="Requirement"
      value="requirement"
      dense
    >
    </v-checkbox>
     <v-btn class="mx-6"
     color = "#F15A23"
     rounded
     dark
     >Browse</v-btn></v-row>
    <v-row class="mx-5 mb-16">
    <p>{{ selected }}</p>
    <v-checkbox style="font-weight:bolder;"
      v-model="selected"
      label="Cost & Benefit Analysis"
      value="cost"
      dense
    >
    </v-checkbox>
     <v-btn class="mx-6"
     color = "#F15A23"
     rounded
     dark
     >Browse</v-btn></v-row>
<v-row class="mx-5 mb-16 mt-16">
    <p>{{ selected }}</p>
    <v-checkbox style="font-weight:bolder;"
      v-model="selected"
      label="Target Implementasi"
      value="target"
      dense
    >
    </v-checkbox>
     <v-btn class="mx-6"
     color = "#F15A23"
     rounded
     dark
     >Browse</v-btn></v-row>
</v-main>
</v-app>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
name : "Checklist",
created () {
  document.title = "Checklist";
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

.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}

.text2{
text-align: center;
}

                                                                                                                                                            
</style>