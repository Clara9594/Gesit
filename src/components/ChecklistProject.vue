<template>
<v-app>
<v-main class="checklist">
  <v-toolbar-title class="mt-8 ml-6 mb-0">
        <v-icon right dark class="mr-3 ml-0" color="#005E6A" @click="back">
                        mdi-arrow-left
                      </v-icon>
  </v-toolbar-title>
   <h2 class="page-title mt-5 mb-2 ml-5 text" style="font-size:xx-large;">CHECKLIST PROJECT</h2>
   <p class="text--secondary ml-5 greetings text2">Check the Project what you want</p>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card class="mt-5" flat>
        <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
    :hide-default-header="true"
    :hide-default-footer="true"
  >
   <template v-slot:[`item.actions`]= "{ item }">
                  <v-btn color="orange" @click="listHandler(item)" class="mr-5" dark>BROWSE</v-btn>
                </template>
  </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn class="mt-16"
      color = "#005E6A"
      dark
      :style="{left: '50%', transform:'translateX(-50%)'}"
      @click = "dialog = true" :right="true" :absolute="true"
      >
      Submit
  </v-btn>
  <v-dialog v-model = "dialog" persistent max-width = "600px">
        <v-card>
        <v-toolbar flat dense> 
        <v-spacer></v-spacer> 
        <v-toolbar-items dense> 
        <v-btn icon @click="dialog = false"> 
        <v-icon>mdi-close-circle</v-icon> 
        </v-btn> 
        </v-toolbar-items> 
        </v-toolbar>
          <v-card flat class="pl-9 pr-9 mt-16">
              <h1>APPROVED!</h1>
              <p class="text3">Files succesfully uploaded</p>
              <v-flex class="px-10 pt-5 pb-2 text-center">
              <img id="pic" src="../assets/checked 1.png"></v-flex>
              <h4 class="text3" style="font-weight:bolder; font-size:xx-large; justify-content:center">6/12</h4>
          </v-card>
        <br>
      <v-card-actions class="mr-8" style="justify-content:center" >
          <v-btn outlined color = "#005E6A" dark link to="/home">
              Back
          </v-btn>
          <v-btn color = "#005E6A" dark>
              Reminder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  

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
      dialog: false,
      singleSelect: false,
      selected: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '', value: 'actions' },
          
        ],
        desserts: [
          {
            name: 'Requirements',
            calories: 159,
          },
          {
            name: 'Cost & Benefit Analysis',
            calories: 237,
          },
          {
            name: 'Target Implementasi',
            calories: 262,
          },
          {
            name: 'Arsitektur / Topologi',
            calories: 305,
          },
        ],
    };
},

methods: {
    back(){
    this.$router.back();
  },
  close() {
      this.dialog = false;
    },
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
.text3{
  color: #F15A23;
  text-align: center;
}
.kotak{
  height:70px;
}
#pic{
height:110px;
align-content: center;
}
#icon{
  align-content: right;
}
h1{
  color:#005E6A;
  text-align: center;
  
}

                                                                                                                                                            
</style>