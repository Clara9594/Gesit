<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" color="#F2F6F6">
                <v-flex class="px-5 pb-2 text-center">
                    <h1 class="text-center">Please Check Your Email!</h1>
                    <img src="../assets/email.png" class="mt-5" justify="center" alt="Fedorae Education Log" contain height="400">
                    <v-btn
                    rounded
                    color = "#005E6A"
                    dark
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
          (v) => !!v || 'Npp cannot be empty',
          (v) => (v && v.length > 6) || 'Npp is too short',
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
        this.$router.push('/home')
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