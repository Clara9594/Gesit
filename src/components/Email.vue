<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" color="#fdf9ed">
              <v-flex class="px-5 pb-2 text-center">
                <h1 class="text-center greenText">PLEASE CHECK YOUR EMAIL!</h1>
                <img src="../assets/email.png" class="mt-5" justify="center" alt="Logo Gesit" contain height="300">
                <v-btn
                  rounded
                  color = "#005E6A"
                  dark
                  class="mt-3"
                  link to="/login">
                  Back To Sign In
                </v-btn>
              </v-flex>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'confirm',
  created () {
    document.title = "Forgot Password";
  },
  data (){
    return {
      
    };
  },
  methods: {
  
  },
}
</script>

<style lang="css" scoped>

.greenText{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
</style>