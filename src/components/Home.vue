<template>
  <v-app>
    <v-main class="homepage">
      <v-layout row>
        <v-flex md8>
            <v-container class="pb-0">
            <!--KIRI!-->
              <v-row class="mb-7" no-gutters>
                <V-col cols="12" sm="7">
                  <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 mx-5 judul">Welcome, {{ user_login }}!</p>
                  <p class="ml-5 greetings">Have a nice day at work!</p>
                </v-col>
                <V-col cols="12" sm="5" class="hidden-sm-and-down">
                  <v-sheet class="rounded-lg mx-auto mr-5" max-width="223" elevation="1">
                    <v-list-item class="px-3">
                      <v-list-item-avatar
                        rounded
                        size="50">
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
                    <p class="judul ml-3 mb-0" style="font-weight:bolder; font-size:xx-large;">Day-1</p>
                    <p class="greenText ml-3 mb-0">Complete Your Document!</p>
                  </v-col>
                  <v-col cols="4" md="2" sm="2" class="pl-0">
                    <v-btn color="#F15A23" dark @click="dialog=true">Details</v-btn>
                  </v-col>
                </v-row>
              </v-alert>

              <p class="judul mt-12 mb-6 ml-5 pr-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</p>

              <v-row class="mx-1" style="justify-content: center;">
                <v-col lg="4" sm="6" cols="12" v-if="role=='GOV'">
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/GovernanceProject">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/testing.png" height="100px">
                        <br>
                      </v-card-title>
                      <p class="text-center greenText">Governance Project</p>
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
                <v-col lg="4" sm="6" cols="12" v-else-if="role=='PM'">
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/GovernanceProjectPM">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/testing.png" height="100px">
                        <br>
                      </v-card-title>
                      <p class="text-center greenText">Governance Project</p>
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
                <v-col lg="4" sm="6" cols="12" v-if="role=='GOV'">
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/RHA">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/research.png" align="right" height="100px">
                      </v-card-title>
                      <p class="text-center greenText">Temuan Audit</p>
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
                <v-col lg="4" sm="6" cols="12" v-else-if="role=='PIC'">
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/InputTL">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/research.png" align="right" height="100px">
                      </v-card-title>
                      <p class="text-center greenText">Temuan Audit</p>
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
                <v-col lg="4" sm="6" cols="12" v-else-if="role=='PM'">
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/RHAPM">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/research.png" align="right" height="100px">
                      </v-card-title>
                      <p class="text-center greenText">Temuan Audit</p>
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

                <v-col lg="4" sm="6" cols="12" v-else>
                  <v-hover v-slot:default="{ hover }">
                    <v-card max-width="350" outlined to="/audit">
                      <v-card-title class="pa-6 pb-3">
                        <img src="../assets/research.png" align="right" height="100px">
                      </v-card-title>
                      <p class="text-center greenText">Temuan Audit</p>
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

        <v-dialog v-model="dialog" scrollable max-width="300px">
          <v-card>
            <v-card-title class="font-weight-bold">Documents List :</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;" class="textTable">
                <div class="mt-3">
                  <div>
                    <p class="text-left mb-1"> 
                      <v-icon>mdi-circle-small</v-icon>
                    </p>
                  </div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#005E6A" text @click="dialog = false">
                    Close
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--KANAN!-->
        <v-flex md4>
          <v-container class="pb-0">
            <div>
              <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 mx-5 judul">Timeline!</p>
            </div>
            
            <v-tabs class="pl-5" v-model="tab" background-color="transparent" color="#fe713c">
              <v-tab v-for="item in tabs" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">   
              <v-tab-item>
                <v-card color="#fdf9ed" flat height="480px" class="isiCard">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="filterDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Filter Timeline"
                        append-icon="mdi-calendar"
                        readonly
                        solo
                        class="textTable pr-8 pl-5 mt-5"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="filterDate"
                      @change="filterTimeline()"
                      range>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="cancelFilterDate()">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(filterDate)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <v-card-text class="cardText pt-0 pl-2">
                    <v-sheet class="pl-3" color="#fdf9ed" v-if="cek==null">
                      <v-list dense v-for="(i,index) in dataTimeline" :key="index" color="#fdf9ed" class="pt-0">
                        <v-list-item v-if="i.statusTimeline=='Pending'">
                          <v-list-item-avatar
                            rounded
                            size="40"
                            color="#CCF0C9">
                          <img src="../assets/clock.png" class="pa-3">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.pCategory}}-{{i.pTitle}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.tDate|formatTimeline}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content class="ml-3">
                            <v-list-item-title class="pendingFont">{{i.statusTimeline}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.pDocument}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item v-else>
                          <v-list-item-avatar
                            rounded
                            size="40"
                            color="#FFD0AB">
                          <img src="../assets/danger.png" class="pa-3">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.pCategory}}-{{i.pTitle}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.tDate|formatTimeline}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content class="ml-3">
                            <v-list-item-title class="overdueFont">{{i.statusTimeline}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.pDocument}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-sheet>

                    <v-sheet class="pl-3" color="#fdf9ed" v-else>
                      <v-list dense v-for="(i,index) in filterTimeline()" :key="index" color="#fdf9ed">
                        <v-list-item v-if="i.statusTimeline=='Pending'">
                          <v-list-item-avatar
                            rounded
                            size="40"
                            color="#CCF0C9">
                          <img src="../assets/clock.png" class="pa-3">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.pCategory}}-{{i.pTitle}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.tDate|formatTimeline}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content class="ml-3">
                            <v-list-item-title class="pendingFont">{{i.statusTimeline}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.pDocument}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item v-else>
                          <v-list-item-avatar
                            rounded
                            size="40"
                            color="#FFD0AB">
                          <img src="../assets/danger.png" class="pa-3">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.pCategory}}-{{i.pTitle}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.tDate|formatTimeline}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content class="ml-3">
                            <v-list-item-title class="overdueFont">{{i.statusTimeline}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.pDocument}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="#fdf9ed" flat height="480px" class="isiCard">
                  <v-card-text class="cardText pt-0 pl-2">
                    <v-sheet class="pl-3" color="#fdf9ed" v-if="cek==null">
                      <v-list dense v-for="(i,index) in dataTimeline" :key="index"  color="#fdf9ed" class="pt-0">
                        <v-list-item v-if="i.statusTimeline=='Pending'">
                          <v-list-item-avatar
                            rounded
                            size="40"
                            color="#CCF0C9">
                          <img src="../assets/clock.png" class="pa-3">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="timelineFont">{{i.pCategory}}-{{i.pTitle}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.tDate|formatTimeline}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content class="ml-3">
                            <v-list-item-title :key="index" class="pendingFont">H-{{i.selisihTimeline}}</v-list-item-title>
                            <v-list-item-subtitle class="timelineFont">{{i.pDocument}}</v-list-item-subtitle>
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
     tabs: ['All','Notifications','History'],
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
  }),
  methods:{
    //read data timeline
    readDataTimeline() {
    // var listData = [];
    var url = 'https://gesit-governanceproject.azurewebsites.net/api/notifications'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'text/plain'
      }
    }).then(response => { 
        this.timeline = response.data;
        console.log(response)
        this.cekTimeline();
        // this.hitungTanggal();
      })
    },

    cekTimeline(){
      // var dataTimeline = [];
      var today = new Date();
      var data1 = {};
      for(let x=0; x<this.timeline.length; x++){
        var date = new Date(this.timeline[x].targetDate);
        if(date.getFullYear() >= today.getFullYear()
        && date.getMonth() >= today.getMonth()
        && date.getDate() >= today.getDate()){
          this.status='Pending';
        }
        else{
          this.status='Overdue';
        }

        this.selisih = Math.round((date - today)/1000/60/60/24);
        //return Math.round(this.selisih/1000/60/60/24);
        // if(date.getFullYear()==today.getFullYear() && date.getMonth()==today.getMonth()){
        //     this.selisih = date.getDate() - today.getDate();}
        
        // else{
        //   this.selisih = 0;
        // }
        data1 = {
          pCategory : this.timeline[x].projectCategory,
          pTitle : this.timeline[x].projectTitle,
          pDocument : this.timeline[x].projectDocument,
          tDate : this.timeline[x].targetDate,
          statusTimeline : this.status,
          selisihTimeline : this.selisih,
        };
        this.dataTimeline.push(data1);
      }
      return this.dataTimeline;
    },

    //hitungTanggal(){
      // var today = new Date();
      // var dataTanggal = {};
      // //var miliday = 24 * 60 * 60 * 1000;
      // for(let x=0; x<this.timeline.length; x++){
      //   var date = new Date(this.timeline[x].targetDate);
      //   this.selisih = date.getDate() - today.getDate();
      //   dataTanggal = {
      //     pCategory : this.timeline[x].projectCategory,
      //     pTitle : this.timeline[x].projectTitle,
      //     pDocument : this.timeline[x].projectDocument,
      //     tDate : this.timeline[x].targetDate,
      //     selisihTimeline : this.selisih,
      //   };
      //   this.dataTgl.push(dataTanggal);
       
      // }
      //  console.log(this.dataTgl);
      //  return this.dataTgl;
    //},

    cancelFilterDate(){
      this.filterDate=[];
      this.menu=false;
    },

    filterTimeline(){
      var listTimeline = [];
        for(let x=0; x< this.dataTimeline.length;x++){
          if(this.dataTimeline[x].tDate >= this.filterDate[0] && this.dataTimeline[x].tDate <= this.filterDate[1])
            listTimeline.push(this.dataTimeline[x])
            this.cek='isi';
          }
        return listTimeline;
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

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

.size{
  font-size:small;
}

.orangeFont{
  font-family: 'Secular One', sans-serif;
}

.orangeText{
  color:#F15A23;
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
  color:#F15A23;
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