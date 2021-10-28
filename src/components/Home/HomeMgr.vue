<template>
  <v-app>
    <v-main class="homepage">
      <v-layout row>
        <v-flex>
          <v-container>
            <!--KIRI!-->
            <v-row class="mb-7 mt-1" no-gutters>
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
                    <img src="../../assets/calendar.png" class="pa-2">
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

            <v-alert class="mx-5" color="#FFD0AB">
              <v-row align="center">
                <v-col cols="2" md="1" sm="1">
                  <img src="../../assets/notification.png" height="60px">
                </v-col>
                <v-col cols="6" md="9" sm="9">
                  <p class="judul ml-3 mb-0" style="font-size:x-large;">Nearest Deadline</p>
                  <p class="greenText ml-3 mb-0">Complete Your Document!</p>
                </v-col>
                <v-col cols="4" md="2" sm="2" class="pl-0">
                  <v-btn color="#FC9039" dark @click="dialog=true">Details</v-btn>
                </v-col>
              </v-row>
            </v-alert>

            <p class="judul mt-12 mb-6 ml-5 pr-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</p>

            <v-row class="mx-1" style="justify-content: center;">
              <v-col lg="4" sm="6" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined @click="cekDataRHA">
                    <v-card-title class="pa-6 pb-3">
                      <img src="../../assets/upload-file.png" align="right" height="100px">
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

              <v-col lg="4" sm="6" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined @click="cekDataTL">
                    <v-card-title class="pa-6 pb-3">
                      <img src="../../assets/correspondence.png" align="right" height="100px">
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
            </v-row>
          </v-container>
        </v-flex>

        <v-flex md4>
          <v-container class="pb-0">
            <div>
              <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 mx-5 judul">To Do List!</p>
            </div>
            
            <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#fe713c">
              <v-tab v-for="item in tabs" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">   
              <v-tab-item>
                <v-card color="#fffcf5" flat height="480px" class="isiCard fullheight">
                  <v-card-text class="cardText pt-2 pl-2">
                    <v-sheet class="pl-3" color="#fffcf5">
                      <v-list dense v-for="(i,index) in rha" :key="index" color="#fffcf5">
                        <v-list-item>
                          <v-list-item-avatar v-if="i.statusInfo[0].statusCompletedPercentage == 0"
                            rounded
                            size="40"
                            color="#FFE0B2">
                            <v-progress-circular
                              :rotate="360"
                              :value="i.statusInfo[0].statusCompletedPercentage"
                              color="orange">
                              {{ i.statusInfo[0].statusCompletedPercentage }}
                            </v-progress-circular>
                          </v-list-item-avatar>
                          
                          <v-list-item-avatar v-else
                            rounded
                            size="40"
                            color="#CCF0C9">
                            <v-progress-circular
                              :rotate="360"
                              :value="i.statusInfo[0].statusCompletedPercentage"
                              color="teal">
                              {{ i.statusInfo[0].statusCompletedPercentage }}
                            </v-progress-circular>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.uic}}-{{i.dirSekor}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.statusJt}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card color="#fffcf5" flat height="480px" class="isiCard fullheight">
                  <v-card-text class="cardText pt-2 pl-2">
                    <v-sheet class="pl-3" color="#fffcf5">
                      <v-list dense v-for="(i,index) in tl" :key="index" color="#fffcf5">
                        <v-list-item>
                          <v-list-item-avatar v-if="i.statusInfo[0].statusCompletedPercentage == 0"
                            rounded
                            size="40"
                            color="#FFE0B2">
                            <v-progress-circular
                              :rotate="360"
                              :value="i.statusInfo[0].statusCompletedPercentage"
                              color="orange">
                              {{ i.statusInfo[0].statusCompletedPercentage }}
                            </v-progress-circular>
                          </v-list-item-avatar>
                          
                          <v-list-item-avatar v-else
                            rounded
                            size="40"
                            color="#CCF0C9">
                            <v-progress-circular
                              :rotate="360"
                              :value="i.statusInfo[0].statusCompletedPercentage"
                              color="teal">
                              {{ i.statusInfo[0].statusCompletedPercentage }}
                            </v-progress-circular>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.uic}}-{{i.dirSekor}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.statusJt}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-container>
        </v-flex>

        <v-dialog v-model="dialog" scrollable max-width="400" class="mx-auto"> 
          <v-card>
            <h3 class="font-weight-bold text-center my-4" v-if="temp==0">Documents List :<span class="pendingFont text-center"> Today</span></h3>
            <h3 class="font-weight-bold text-center my-4" v-else-if="temp<=3">Documents List : <span class="orangeText text-center"> M-{{temp}}</span></h3>
            <h3 class="font-weight-bold text-center my-4" v-else>Documents List : <span class="orangeText text-center"></span></h3>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="textTable py-0 px-3">
              <p class="mt-3 mb-0 text-center" v-if="lengthRHA != null">List RHA</p>
              <v-list three-line v-if="lengthRHA != 0 || lengthRHA != null">
                <template v-for="(b,index) in rhaNew">
                  <v-list-item :key="index">
                    <v-list-item-avatar>
                      <v-icon class="orange" dark>mdi-clipboard-text</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="b.format"></v-list-item-title>
                      <v-list-item-subtitle class="wrap-text" v-text="b.kondisi"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
              <v-divider v-if="lengthTl != null"></v-divider>
              <p class="mt-3 mb-0 text-center" v-if="lengthTl != null">List Tindak Lanjut</p>
              <v-list three-line v-if="lengthTl != 0 || lengthTl != null">
                <template v-for="(b,index) in tlNew">
                  <v-list-item :key="index">
                    <v-list-item-avatar>
                      <v-icon class="orange" dark>mdi-clipboard-text</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="b.format"></v-list-item-title>
                      <v-list-item-subtitle class="wrap-text" v-text="b.kondisi"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#FC9039" outlined @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
          {{message}}
        </v-snackbar>
      </v-layout>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name : "Home",
  created () {
    document.title = "Home";
  },
  data: () => ({
    color: '',
    alert: false,
    message:'',
    user_login: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
    tabs: ['RHA','Tindak Lanjut'],
    tab: null,
    time: new Date().toISOString().substr(0, 10),
    menu:'',
    status:null,
    selisih:null,
    cek:null,
    dialog:false,
    waktu:'',
    minDays:null,
    temp:null,
    lengthRHA:null,
    lengthTl:null,

    dataTimeline:[],
    dataTgl:[],
    filterDate:[],
    timeline:[],
    notif:[],
    myArr: [],
    nearArr:[],
    rha: [],
    tl:[],
    rhaNew : [],
    tlNew : [],
  }),
  methods:{
    readRHA(){ //Read RHA Files
      var url =  this.$api+'/Rha'
      this.$http.get(url,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => { 
        this.rha = response.data;
        var monthNow = null;
        var yearNow = null;
        var month = null;
        var year = null;
        var intMonth = null;
        var format = null;
        var selisih = null;
        var data = {};
        var selisihThn = null;
        
        for(let i=0; i<this.rha.length; i++){
          monthNow = new Date().getMonth();
          yearNow = new Date().getFullYear();
          month = this.rha[i].statusJt.split(' ')[0];
          year = this.rha[i].statusJt.split(' ')[1];

          if(month == 'Januari')
            intMonth = 0;
          else if (month == 'February')
            intMonth = 1;
          else if (month == 'Maret')
            intMonth = 2;
          else if (month == 'April')
            intMonth = 3;
          else if (month == 'Mei')
            intMonth = 4;
          else if (month == 'Juni')
            intMonth = 5;
          else if (month == 'Juli')
            intMonth = 6;
          else if (month == 'Agustus')
            intMonth = 7;
          else if (month == 'September')
            intMonth = 8;
          else if (month == 'Oktober')
            intMonth = 9;
          else if (month == 'November')
            intMonth = 10;
          else 
            intMonth = 11;
          
          selisih = (Math.round(intMonth-monthNow));
          selisihThn = parseInt(year) - yearNow;

          if(parseInt(year) <= yearNow && monthNow <= intMonth){
            if(this.temp < selisih && this.temp < 4)
              this.temp = selisih;
          }else if (parseInt(year) >= yearNow){
            selisih = (selisihThn * 12) + selisih;
            if(this.temp <= selisih && this.temp < 4)
              this.temp = selisih;
          }
        }
        
        for(let i=0; i<this.rha.length; i++){
          this.rha[i].statusInfo[0].statusCompletedPercentage = Math.round(this.rha[i].statusInfo[0].statusCompletedPercentage*100);
          
          monthNow = new Date().getMonth();
          yearNow = new Date().getFullYear();
          month = this.rha[i].statusJt.split(' ')[0];
          year = this.rha[i].statusJt.split(' ')[1];

          if(month == 'Januari')
            intMonth = 0;
          else if (month == 'February')
            intMonth = 1;
          else if (month == 'Maret')
            intMonth = 2;
          else if (month == 'April')
            intMonth = 3;
          else if (month == 'Mei')
            intMonth = 4;
          else if (month == 'Juni')
            intMonth = 5;
          else if (month == 'Juli')
            intMonth = 6;
          else if (month == 'Agustus')
            intMonth = 7;
          else if (month == 'September')
            intMonth = 8;
          else if (month == 'Oktober')
            intMonth = 9;
          else if (month == 'November')
            intMonth = 10;
          else 
            intMonth = 11;
            
          selisih = (Math.round(intMonth-monthNow));
          selisihThn = parseInt(year) - yearNow;

          if(selisih <= this.temp && parseInt(year) <= yearNow && monthNow <= intMonth && this.temp < 4){
            format = this.rha[i].uic + ' - ' + this.rha[i].dirSekor;
            data = {
              selisih : selisih,
              format : format,
              kondisi : this.rha[i].kondisi
            }
            this.rhaNew.push(data);
          }else if (parseInt(year) >= yearNow && selisih <= this.temp && this.temp < 4){
            format = this.rha[i].uic + ' - ' + this.rha[i].dirSekor;
            data = {
              selisih : selisih,
              format : format,
              kondisi : this.rha[i].kondisi
            }
            this.rhaNew.push(data);
            this.lengthRHA=this.rhaNew.length;
          }
        }
        // console.log(this.lengthRHA)
      })
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
        for(let i=0; i<this.tl.length; i++){
          this.tl[i].statusInfo[0].statusCompletedPercentage = Math.round(this.tl[i].statusInfo[0].countSubRHAClosed/this.tl[i].statusInfo[0].countSubRha*100);
        }
        var monthNow = null;
        var yearNow = null;
        var month = null;
        var year = null;
        var intMonth = null;
        var format = null;
        var selisih = null;
        var data = {};
        var selisihThn = null;
        
        for(let i=0; i<this.tl.length; i++){
          monthNow = new Date().getMonth();
          yearNow = new Date().getFullYear();
          month = this.tl[i].statusJt.split(' ')[0];
          year = this.tl[i].statusJt.split(' ')[1];

          if(month == 'Januari')
            intMonth = 0;
          else if (month == 'February')
            intMonth = 1;
          else if (month == 'Maret')
            intMonth = 2;
          else if (month == 'April')
            intMonth = 3;
          else if (month == 'Mei')
            intMonth = 4;
          else if (month == 'Juni')
            intMonth = 5;
          else if (month == 'Juli')
            intMonth = 6;
          else if (month == 'Agustus')
            intMonth = 7;
          else if (month == 'September')
            intMonth = 8;
          else if (month == 'Oktober')
            intMonth = 9;
          else if (month == 'November')
            intMonth = 10;
          else 
            intMonth = 11;
          
          selisih = (Math.round(intMonth-monthNow));
          selisihThn = parseInt(year) - yearNow;

          if(parseInt(year) <= yearNow && monthNow <= intMonth){
            if(this.temp < selisih && this.temp < 4)
              this.temp = selisih;
          }else if (parseInt(year) >= yearNow){
            selisih = (selisihThn * 12) + selisih;
            if(this.temp <= selisih && this.temp < 4)
              this.temp = selisih;
          }
        }
        
        for(let i=0; i<this.tl.length; i++){
          this.tl[i].statusInfo[0].statusCompletedPercentage = Math.round(this.tl[i].statusInfo[0].countSubRHAClosed/this.tl[i].statusInfo[0].countSubRha*100);
          
          monthNow = new Date().getMonth();
          yearNow = new Date().getFullYear();
          month = this.tl[i].statusJt.split(' ')[0];
          year = this.tl[i].statusJt.split(' ')[1];

          if(month == 'Januari')
            intMonth = 0;
          else if (month == 'February')
            intMonth = 1;
          else if (month == 'Maret')
            intMonth = 2;
          else if (month == 'April')
            intMonth = 3;
          else if (month == 'Mei')
            intMonth = 4;
          else if (month == 'Juni')
            intMonth = 5;
          else if (month == 'Juli')
            intMonth = 6;
          else if (month == 'Agustus')
            intMonth = 7;
          else if (month == 'September')
            intMonth = 8;
          else if (month == 'Oktober')
            intMonth = 9;
          else if (month == 'November')
            intMonth = 10;
          else 
            intMonth = 11;
            
          selisih = (Math.round(intMonth-monthNow));
          selisihThn = parseInt(year) - yearNow;

          if(selisih <= this.temp && parseInt(year) <= yearNow && monthNow <= intMonth && this.temp < 4){
            format = this.tl[i].uic + ' - ' + this.tl[i].dirSekor;
            data = {
              selisih : selisih,
              format : format,
              kondisi : this.tl[i].kondisi
            }
            this.tlNew.push(data);
          }else if (parseInt(year) >= yearNow && selisih <= this.temp && this.temp < 4){
            format = this.tl[i].uic + ' - ' + this.tl[i].dirSekor;
            data = {
              selisih : selisih,
              format : format,
              kondisi : this.rha[i].kondisi
            }
            this.tlNew.push(data);
            this.lengthTl=this.tlNew.length;
          }
        }
        // console.log(this.lengthTl)
      })
    },

    cekDataTL(){
      if(this.tl.length == 0){
        this.alert = true;
        this.message = 'No Data for Tindak Lanjut';
        this.color = "red";
      }else
        this.$router.push('/inputTLMgr');
    },

    cekDataRHA(){
      if(this.rha.length == 0){
        this.alert = true;
        this.message = 'No Data for RHA';
        this.color = "red";
      }else
        this.$router.push('/RHAMgr');
    },

    cancelFilterDate(){
      this.filterDate=[];
      this.menu=false;
    },
  },
  computed: {
    dateRangeText () {
      return this.filterDate.join(' ~ ')
    },
  },
  mounted() {
    this.readRHA();
    this.readTL();
  },
};
</script>
<style scoped>
.wrap-text {
  -webkit-line-clamp: unset !important;
}

.fullheight {
  min-height: 75vh !important;
}
.greetings{
  color:#FC9039;
  font-family: 'Questrial', sans-serif;
}

.size{
  font-size:small;
}

.orangeFont{
  font-family: 'Secular One', sans-serif;
}

.orangeText{
  color:#FC9039;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.homepage{
  padding:10px;
}

.greenText{
  color:#005E6A;
  font-family: 'Questrial', sans-serif;
}

.timelineFont{
  font-family: 'Questrial', sans-serif;
}

.pendingFont{
  font-family: 'Questrial', sans-serif;
  color:#095866;
}

.overdueFont{
  font-family: 'Questrial', sans-serif;
  color:#FC9039;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}

.text{
  color:#005E6A;
  font-size:large; 
  text-align:center;
}

#pic{
  height:110px;
}

.isiCard{
  display: flex !important;
  flex-direction: column;
}

.cardText {
  flex-grow: 1;
  overflow: auto;
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
  .title{
  font-size: small;
  }
  #pic{
  display: none;
  
  }
}

</style>