<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row no-gutters justify="center">
          <v-col cols="12" sm="7" md="7" class="hidden-sm-and-down">
            <v-card flat color="#fffcf5">
              <v-flex class="text-center">
                <img src="../assets/loginPic.png" class="mt-5 pr-10" contain height="550">
              </v-flex>
            </v-card>
          </v-col>
          <v-col cols="12" sm="5" md="5">
            <v-card flat color="#fffcf5" max-width="500" class="mt-5 textTable">
              <v-flex class="px-10 pt-16 pb-2 text-center">
                <img src="../assets/logoGesit.png" justify="center" contain height="90">
                <p class="text-center greetings orangeText">Welcome to GESIT, Please Sign In!</p>
              </v-flex>
            
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field 
                    @keypress.enter="login()"
                    label="Enter your NPP" 
                    v-model="npp"
                    :rules="nppRules" 
                    @input="(val) => (npp = npp.toUpperCase())"
                    placeholder="P0xxxxx"
                    prepend-inner-icon="mdi-account"
                    rounded
                    filled
                    color="#F15A23"
                    required>
                  </v-text-field>

                  <v-text-field 
                    @keypress.enter="login()"
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
                    color="#F15A23"
                    hide-details
                    required>
                  </v-text-field>

                  <v-card-actions class="text--secondary pt-0">
                    <v-spacer></v-spacer>
                    <p class="pt-1" @click="to"><a class="linkText">Forgot your password?</a></p>
                  </v-card-actions>

                  <v-btn 
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
      </v-container>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
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
      error:null,
      alert: false,
      color: '',
      message:null,
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
      if (this.$refs.form.validate()) { 
        var url = this.$api+'/Authentication?npp='+this.npp+'&password='+this.password
        this.$http.get(url,{
          headers:{
            'Content-Type' : 'application/json',
          }
        }).then(response => { 
            localStorage.setItem('npp', response.data.data.npp);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('role', response.data.data.role);
            localStorage.setItem('token', response.data.data.token);
            if(response.data.data.role == 'GOV')
              this.$router.push('/monitoringGov');
            else if(response.data.data.role == 'MANAGEMENT')
              this.$router.push('/monitoringMGR');
            else if(response.data.data.role == 'PM')
              this.$router.push('/homePM');
            else if(response.data.data.role == 'ADMIN')
              this.$router.push('/homeAdmin');
            else 
              this.$router.push('/homePIC');
        }).catch(error => {
            this.error = error;
            this.message="Please Check your NPP and Password!";
            this.color="red"
            this.alert=true;
            localStorage.removeItem('token')
        })
       }
    },
    to(){
      this.$router.push('/forgotPass');
    },
    clear() {
      this.$refs.form.reset() //Clear form login
    },
  }
}
</script>

<style lang="css" scoped>

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.linkText{
  color:#005E6A;
}

.greenText{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
}
</style>