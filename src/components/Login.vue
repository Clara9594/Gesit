<template>
  <v-app>
    <v-main>
        <v-row no-gutters class="fill-height" justify="center">
          <v-col cols="12" sm="7" md="7" class="hidden-sm-and-down">
            <v-card flat color="#fdf9ed">
              <v-flex class="text-center">
                <img src="../assets/loginPic.png" class="mt-14 pr-10" contain height="550">
              </v-flex>
            </v-card>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="">
            <v-card flat color="#fdf9ed" max-width="500" class="fill-height textTable">
              <v-flex class="px-10 pt-16 pb-2 text-center">
                <img src="../assets/gesit.png" justify="center" contain height="100">
                <h1 class="text-center greenText">SIGN IN</h1>
                <p class="text-center greetings orangeText">Welcome to GESIT, Please Sign In!</p>
              </v-flex>
            
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field 
                    label="Enter your NPP" 
                    v-model="npp"
                    :rules="nppRules" 
                    placeholder="P0xxxxx"
                    prepend-inner-icon="mdi-account"
                    rounded
                    filled
                    required>
                  </v-text-field>

                  <v-text-field 
                    label="Enter your password" 
                    v-model="password"
                    :rules="passwordRules" 
                    prepend-inner-icon="mdi-lock" 
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                    placeholder="xxxx@bni.co.id"
                    hint="Password consists of uppercase, lowercase, and characters"
                    rounded
                    filled
                    required>
                  </v-text-field>

                  <v-card-actions class="text--secondary pt-0">
                    <a href="/forgotPass" class="pl-2" style="color: black">Forgot your password?</a>
                  </v-card-actions>

                  <v-btn 
                    class="mt-5"
                    color="#094f59" 
                    x-large 
                    block
                    rounded
                    dark
                    @click="login()"
                    >Sign In
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'login',
  created () {
    document.title = "Login";
  },
  data (){
    return {
      show1: false,
      valid: false,
      password: '',
      passwordRules: [
          (v) => !!v || 'Password cannot be empty',
          //v => /.+@.+/.test(v) || 'Password is not valid',
      ],
      npp: '',
      nppRules: [
          (v) => !!v || 'NPP cannot be empty',
          (v) => (v && v.length > 5) || 'NPP is too short',
          (v) => (/P0.+/.test(v)) || 'NPP is not valid',
      ],
    };
  },
  methods: {
    login() {
    var url = this.$api+'/rest/users/npp?npp='+this.npp
    this.$http.get(url,{
      headers:{
        'x-hasura-admin-secret': 'K6ib0Lj8V8fY33OxHhqPjdfDlJXqk8QU8ZU11w3yFApXL31Ex0baObiA3s3uJ0Vu'
      }
    }).then(response => { 
          localStorage.setItem('user_id', response.data.user[0].user_id);
          localStorage.setItem('npp', response.data.user[0].npp);
          localStorage.setItem('name', response.data.user[0].name);
          localStorage.setItem('role', response.data.user[0].role);
          this.$router.push('/home');
            // console.log(response.data.user)
            // console.log(response.data.user[0].user_id)
      })
    },
    // async login() {
    // if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid
    //   await axios
    //   .get(this.$api + '/rest/users/npp?npp='+this.npp, {
    //   //"npp": this.npp,
    //   //"password": this.password
    //   }).then(response => {
    //     console.log(response);
    //       localStorage.setItem('user_id', response.data.user_id);
    //       localStorage.setItem('npp', response.data.npp);
    //       localStorage.setItem('name', response.data.name);
    //       localStorage.setItem('role', response.data.role);
          
    //       // if(localStorage.getItem('email').localeCompare('john.doe@gmail.com') == 0){
    //       //     this.$router.push('/coursesAdmin')
    //       // }
    //       // else {
    //       //     this.$router.push('/profile')
    //       // }
    //       this.$router.push('/home');
    //       this.clear();
    //   })
    //       // }
    //   }
    },
    clear() {
      this.$refs.form.reset() //Clear form login
   },
}
</script>

<style lang="css" scoped>

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.orangeText{
  color:#F15A23;
}

.greenText{
    color:#005E6A;
  font-family: 'Secular One', sans-serif;
}
</style>