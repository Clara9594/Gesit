<template>
  <v-app>
    <v-main class="homepage">
      <v-layout row>
        <v-flex>
          <v-container fluid>
            <!--KIRI!-->
            <v-row class="mb-3 mt-1" no-gutters>
              <v-col cols="12" sm="7">
                <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 mx-5 judul">Welcome, {{ user_login }}!</p>
                <p class="ml-5 greetings">Have a nice day at work!</p>
              </v-col>
              <v-col cols="12" sm="5" class="hidden-sm-and-down">
                <v-sheet class="rounded-lg mx-auto mr-5" max-width="223" elevation="1">
                  <v-list-item class="px-3">
                    <v-list-item-avatar
                      rounded
                      size="40">
                    <img src="../assets/calendar.png" class="pa-2">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div>
                        <v-list-item-title class="text-h7 greenText mb-1">
                          {{time|formatTimeline}}
                        </v-list-item-title>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-sheet>
              </v-col>
            </v-row>
            <p class="judul mb-3 mx-5" style="font-size:large;">To Do ({{pjgRHA}}) :</p>
            <v-row class="mx-5 textTable">
              <v-col v-for="item in dataRHA" :key="item.id" ripple md="3" sm="3" class="pa-3 d-flex flex-column">
                <v-card class="elevation-5 flex d-flex flex-column">
                  <v-row no-gutters class="pt-2">
                    <v-col cols="1" md="1" sm="1">
                      <v-icon small class="mt-2 ml-2" color="orange">mdi-circle-medium</v-icon>
                    </v-col>
                    <v-col cols="11" md="11" sm="11">
                      <v-card-title class="pa-0 text font-weight-bold">
                        {{item.uic}}
                      </v-card-title>
                    </v-col>
                  </v-row>

                  <v-card-subtitle class="text-left py-0" v-text="item.kondisi"></v-card-subtitle>

                  <v-card-text class="text-left pt-2 pb-0">
                    <v-icon small class="pb-0">mdi-file-document-edit</v-icon> {{item.jmlSub}} Sub RHA
                  </v-card-text>

                  <v-card-actions class="text-left">
                    <v-progress-linear :value="item.progress" color="red"></v-progress-linear>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>
<script>
// import moment from 'moment'
export default {
    name : "Home",
    created () {
        document.title = "Home";
    },
    data: () => ({
        user_login: localStorage.getItem('name'),
        tab: null,
        time: new Date().toISOString().substr(0, 10),
        npp: localStorage.getItem('npp'),
        menu:'',
        rha :[],
        subRhaByAssign:[],
        dataRHA :[],
        pjgRHA : null,
    }),
    methods:{
      readRHA(){ //Read RHA Files
        var url =  this.$api+'/Rha/GetBySubRhaAssign/' + this.npp
        this.$http.get(url,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
        }).then(response => { 
          this.rha = response.data.data;
          this.pjgRHA = this.rha.length;
        })
      },
      readSubRHAbyAssign(){ //Read Sub RHA Files by Assign
        var url = this.$api+'/SubRha/GetByAssign/'+ this.npp
        this.$http.get(url,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => { 
          this.subRhaByAssign = response.data.data;
          this.arrayTL();
        })
      },
      arrayTL(){ //Menyiapkan array 
        var data = {};
        for(let i = 0 ; i < this.rha.length ; i++){
          var count = 0;
          for(let j = 0 ; j < this.subRhaByAssign.length ; j++){
            if(this.rha[i].id == this.subRhaByAssign[j].rhaId){
              count = count + 1;
            }
          }
          data = {
            id : i,
            uic : this.rha[i].uic,
            kondisi : this.rha[i].kondisi,
            jmlSub : count,
            progress : 15 + count
          };
          this.dataRHA.push(data);
        }
        return this.dataRHA;
      }
    },
    computed: {
    },
    mounted() {
      this.readRHA();
      this.readSubRHAbyAssign();
      this.arrayTL();
    },
};
</script>
<style scoped>
.greetings{
  color:#FC9039;
  font-family: 'Questrial', sans-serif;
}

.orangeFont{
  font-family: 'Secular One', sans-serif;
}

.orangeText{
  color:#FC9039;
}

.greenText{
  color:#005E6A;
  font-family: 'Questrial', sans-serif;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}

.text{
  font-size:14px; 
}

</style>