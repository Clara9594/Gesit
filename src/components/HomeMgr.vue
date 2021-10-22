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

            <v-alert class="mx-5" color="#FFD0AB">
              <v-row align="center">
                <v-col cols="2" md="1" sm="1">
                  <img src="../assets/notification.png" height="60px">
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
                  <v-card outlined to="/RHAMgr">
                    <v-card-title class="pa-6 pb-3">
                      <img src="../assets/file.png" align="right" height="100px">
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
                  <v-card outlined to="/inputTLMgr">
                    <v-card-title class="pa-6 pb-3">
                      <img src="../assets/file.png" align="right" height="100px">
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
     user_login: localStorage.getItem('name'),
     role: localStorage.getItem('role'),
     tabs: ['All','History'],
     //tabs: ['All','Notifications','History'],
     tab: null,
     time: new Date().toISOString().substr(0, 10),
     menu:'',
     status:null,
     selisih:null,
     cek:null,
     dialog:false,
     waktu:'',
     dataTimeline:[],
     dataTgl:[],
     filterDate:[],
     timeline:[],
     notif:[],
     myArr: [],
     nearArr:[],
     minDays:null
  }),
  methods:{
    
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
    this.readDataTimeline();
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