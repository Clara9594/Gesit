<template>
<v-app>
  <v-main class="gov">
<v-toolbar-title class="title text-left font-weight-bold mt-8 ml-6 mb-6">
      <v-btn class="ml-1 mr-3" outlined fab color="#005E6A" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    <h2 class="text text-center mt-5 mb-2" style="font-size:xx-large;">PROJECT PLANNING</h2>
    <p class="text--secondary text-center">Choose the Project Planning what you want</p>
    </v-toolbar-title>
<v-layout justify-center class="mb-16">
        <v-card width="70%" class="mx-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
            <v-select class="mr-4"
            :items="items"
            label="IT Planning Session"
            outlined
            ></v-select>
            <v-btn class="mt-3"
            color = "#F15A23"
            dark>Download</v-btn>
        </v-row>
        <v-row>
            <v-select class="mr-4"
            :items="items"
            label="RPTI"
            outlined
            ></v-select>
            <v-btn class="mt-3"
            color = "#F15A23"
            dark>Download</v-btn>
        </v-row>
        <v-row>
            <v-select class="mr-4"
            :items="items"
            label="RBB"
            outlined
            ></v-select>
            <v-btn class="mt-3"
            color = "#F15A23"
            dark>Download</v-btn></v-row>
        <v-row>
        <v-select class="mr-4"
            :items="items"
            label="Insertion"
            outlined
            ></v-select>
            <v-btn class="mt-3"
            color = "#F15A23"
            dark>Download</v-btn>
        </v-row>
        </v-card>
      </v-layout>
      <v-layout justify-center class="mb-10">
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
    data: () => ({
      items: ['Pertamina', 'BPJS'],
    }),
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