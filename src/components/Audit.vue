<template>
<v-app>
  <v-main class="audit">
    <v-toolbar-title class="title text-left font-weight-bold ml-6">
      <v-btn class="mr-1 ml-1" outlined fab color="#095866" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar-title>
  
    <h2 class="text judul text-center mt-8 px-5" style="font-size:xx-large;">AUDIT</h2>
    
    <v-row class="mx-5 mt-5 mb-16" style="justify-content: center;" align="center">
      <v-col lg="3" sm="6" cols="12" v-if="role=='ADMIN' || role=='AMGR'">
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined to="/InputTLAdmin">
            <v-card-title class="pa-6 pb-3">
            <img src="../assets/correspondence.png" height="100px">
            <br>
            </v-card-title>
            <p class="text-center greenText">Input Tindak Lanjut</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
       <v-col lg="3" sm="6" cols="12" v-else-if="role=='OS'">
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined @click="cekDataTL">
            <v-card-title class="pa-6 pb-3">
            <img src="../assets/correspondence.png" height="100px">
            <br>
            </v-card-title>
            <p class="text-center greenText">Input Tindak Lanjut</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
      <v-col lg="3" sm="6" cols="12" v-else>
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined to="/InputTL">
            <v-card-title class="pa-6 pb-3">
            <img src="../assets/correspondence.png" height="100px">
            <br>
            </v-card-title>
            <p class="text-center greenText">Input Tindak Lanjut</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
      <v-col lg="3" sm="6" cols="12" v-if="role=='ADMIN' || role=='AMGR'">
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined to="/RHAAdmin">
            <v-card-title class="pa-6 pb-3">
              <img src="../assets/upload-file.png" align="right" height="100px">
            </v-card-title>
            <p class="text-center greenText">Upload RHA</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
       <v-col lg="3" sm="6" cols="12" v-else-if="role=='OS'">
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined to="/RHAOS">
            <v-card-title class="pa-6 pb-3">
              <img src="../assets/upload-file.png" align="right" height="100px">
            </v-card-title>
            <p class="text-center greenText">Upload RHA</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
      <v-col lg="3" sm="6" cols="12" v-else>
        <v-hover v-slot:default="{ hover }">
          <v-card max-width="350" outlined to="/RHA">
            <v-card-title class="pa-6 pb-3">
              <img src="../assets/upload-file.png" align="right" height="100px">
            </v-card-title>
            <p class="text-center greenText">Upload RHA</p>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                style="height: 100%;">
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <br>
    
    <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
      {{message}}
    </v-snackbar>
  </v-main>
</v-app>
</template>

<script>
export default {
name : "Audit",
created () {
  document.title = "Audit";
},

data() {
  return {
    role: localStorage.getItem('role'),
    rha:[],
    color: '',
    alert: false,
    message:'',
  };
},

methods: {
    back(){
      this.$router.back();
    },
    
    readTL(){ //Read RHA Files
      var url = null;
      if(this.role == 'ADMIN')
        url =  this.$api+'/Rha/GetBySubRhaAssign/' + this.userLogin
      else
        url =  this.$api+'/Rha/GetBySubRhaAssign/P0' + this.userLogin
      this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
        this.tl = response.data;
      })
    },

    cekDataTL(){
      if(this.tl.length == 0){
        this.alert = true;
        this.message = 'No Data for Tindak Lanjut';
        this.color = "red";
      }else
        this.$router.push('/auditOS');
    },
  },
  mounted() {
    this.readTL();
  },
};
</script>

<style scope>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.audit{
  padding:10px;
}
.text{
  color:#095866;
  font-size:large; 
  text-align:center;
}
.greenText{
  color:#095866;
  font-family: 'Questrial', sans-serif;
}

.judul{
    color:#095866;
    font-family: 'Secular One', sans-serif;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .text{
    font-size: medium;
  }
}
                                                                                                                                                            
</style>
