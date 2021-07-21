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
      link to="/checklist"
      >
      Submit
  </v-btn>
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