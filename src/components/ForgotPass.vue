<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" color="#F2F6F6">
              <v-flex class="px-10 pt-10 pb-2 text-center">
                <img src="../assets/gesit.png" justify="center" alt="Fedorae Education Log" contain height="100">
                <h1 class="text-center">Forgot Password</h1>
                <p class="text-center text--secondary">We’ll send you a confirmation via email</p>
              </v-flex>
            
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field 
                    label="Enter your NPP" 
                    v-model="npp"
                    :rules="nppRules" 
                    prepend-inner-icon="mdi-account"
                    rounded
                    filled
                    required>
                  </v-text-field>

                  <v-text-field 
                    label="Enter your email" 
                    v-model="email"
                    :rules="emailRules" 
                    prepend-inner-icon="mdi-email" 
                    rounded
                    filled
                    required>
                  </v-text-field>

                  <v-btn 
                    color="#01646A" 
                    x-large
                    rounded
                    block 
                    dark
                    @click="confirm()"
                    >Confirm</v-btn>
                </v-form>
              </v-card-text>
            <v-card-actions class="text--secondary pt-0">
            <a href="/" class="pl-2" style="color: #000000">Back to Sign In</a>
            </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'confirm',
  created () {
    document.title = "Forgot Password";
  },
  data (){
    return {
      show1: false,
      valid: false,
      npp: '',
      nppRules: [
          (v) => !!v || 'NPP cannot be empty',
          (v) => (v && v.length > 6) || 'NPP is too short',
          (v) => (/P0.+/.test(v)) || 'NPP is not valid',
      ],
      email: '',
      emailRules: [
          (v) => !!v || 'Email cannot be empty',
          v => /.+@.+/.test(v) || 'E-mail is not valid',
      ],
    };
  },
  methods: {
  confirm() {
    if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid
      // await axios
      // .post(this.$api + '/api/auth/confirm', {
      //   "username": this.username,
      //   "npp": this.npp
      // }).then(response => {
      //     localStorage.setItem('token', response.data.token);
      //     localStorage.setItem('email', this.username);
      //     if(localStorage.getItem('email').localeCompare('john.doe@gmail.com') == 0){
      //         this.$router.push('/coursesAdmin')
      //     }
      //     else {
      //         this.$router.push('/profile')
      //     }
        this.$router.push('/confirmation')
      }
    },
    clear() {
      this.$refs.form.reset() //Clear form confirm
    }
   },
}
</script>

<style lang="css" scoped>
</style>