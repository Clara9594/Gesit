<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-layout align-center justify-center>
            <p>Ini Konten Home nya disini!</p>
        </v-layout>
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

</style>
