<template>
<v-app>
  <v-main class="gov">
<v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
    <h2 class="text text-center mb-2 mt-5 px-5" style="font-size:xx-large;">PROJECT PLANNING</h2>
    <p class="text--secondary text-center px-5">Choose the Project Planning what you want</p>
<v-layout justify-center>
        <v-card width="700px" elevation="2" class="px-3 mx-5 py-3 mt-3" outlined>
        <v-row>
          <v-col cols="7" sm="9" md="9" class="pb-0">
            <v-select v-model="category" class="mr-3" @click = "judulproject = true"
            :items="items"
            label="Select Category"
            outlined
            dense
            ></v-select>
          </v-col>
          <v-col cols="5" sm="3" md="3" class="pl-0 pb-0">
          <span>Selected: {{ category }}</span>
            <v-btn
            color = "#F15A23"
            dark>Download</v-btn>
          </v-col>
        </v-row>
        <v-row v-model="judulproject">
          <v-col cols="7" sm="9" md="9" class="pb-0">
            <v-select v-model="judul" class="mr-3" 
            :items="filteredItems"
            label="Select Project Title"
            outlined
            dense
            >
            </v-select>
          </v-col>
          <v-col cols="5" sm="3" md="3" class="pl-0 pb-0">
          <span>Selected: {{ judul }}</span>
            <v-btn
            color = "#F15A23"
            dark>Download</v-btn>
          </v-col>
        </v-row>
        </v-card>
      </v-layout>
      <v-layout justify-center class="mt-10 mb-10">
      <v-btn 
          color = "#005E6A"
          dark
          large
          link to="/checklist"
        >
        Next
      </v-btn>
      </v-layout>
</v-main>
</v-app>
</template>

<script>
  export default {
    created () {
      document.title = "Project Planning";
    },
    data: () => ({
      selected:"",
      judul:"",
      judulproject: false,
      projecttitle: [
        { name: 'BPJS', type: 'RPTI'},
        { name: 'Pertamina', type: 'RPTI'},
        { name: 'PLN', type: 'RPTI'},
        { name: 'BNI', type: 'RPTI'},
      ],
      category:null,
      items: ['IT Planning Session','RPTI','RBB', 'Insertion'],
    }),
    computed: {
    filteredItems() {
      return this.projecttitle.filter((i) => {
        return !this.category || (i.type === this.category);
      })
    }
},
    methods: {
    back(){
    this.$router.back();
  },
  }}
</script>


<style scope>
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
</style>