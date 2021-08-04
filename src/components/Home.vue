<template>
  <v-app>
    <v-main class="homepage">
      <v-layout row>
        <v-flex md9>
            <v-container class="pb-0">
            <!--KIRI!-->
              <div class="mb-10">
                <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 mx-5 judul">Welcome, {{ user_login }}!</p>
                <p class="ml-5 greetings">Have a nice day at work!</p>
              </div>
              <v-row class="mx-1"  color="#fdf9ed">
                <v-col cols="6" sm="3" md="3">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-sheet class="rounded-lg mx-auto" max-width="344" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div>
                            <p class="orangeText orangeFont mb-2">
                              Position
                            </p>
                            <v-list-item-title class="text-h7 greenText mb-1">
                              {{role}}
                            </v-list-item-title>
                          </div>
                        </v-list-item-content>

                        <v-list-item-avatar
                          rounded
                          size="50"
                          color="#FFD0AB"
                          class="hidden-sm-and-down" >
                        <img src="../assets/scrum.png" class="pa-3">
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-sheet>
                  </v-hover>
                </v-col>

                <v-col cols="6" sm="3" md="3">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-sheet class="rounded-lg mx-auto" max-width="344" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div>
                            <p class="orangeText orangeFont mb-2">
                              Timeline!
                            </p>
                            <v-list-item-title class="text-h7 greenText mb-1">
                              5 deadlines!
                            </v-list-item-title>
                          </div>
                        </v-list-item-content>

                        <v-list-item-avatar
                          rounded
                          size="50"
                          color="#FFD0AB"
                          class="hidden-sm-and-down"
                        >
                        <img src="../assets/notification.png" class="pa-3">
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-sheet>
                  </v-hover>
                </v-col>

                <v-col cols="6" sm="3" md="3">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-sheet class="rounded-lg mx-auto" max-width="344" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div>
                            <p class="orangeText orangeFont mb-2">
                              Current Date
                            </p>
                            <v-list-item-title class="text-h7 greenText mb-1">
                              {{time|formatDate}}
                            </v-list-item-title>
                          </div>
                        </v-list-item-content>

                        <v-list-item-avatar
                          rounded
                          size="50"
                          color="#FFD0AB"
                          class="hidden-sm-and-down">
                        <img src="../assets/calendar.png" class="pa-3">
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-sheet>
                  </v-hover>
                </v-col>

                <v-col cols="6" sm="3" md="3">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-sheet class="rounded-lg mx-auto" max-width="344" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div>
                            <p class="orangeText orangeFont mb-2">
                              Current Time
                            </p>
                            <v-list-item-title class="text-h7 greenText mb-1">
                              {{time|formatTime}}
                            </v-list-item-title>
                          </div>
                        </v-list-item-content>

                        <v-list-item-avatar
                          rounded
                          size="50"
                          color="#FFD0AB"
                          class="hidden-sm-and-down">
                        <img src="../assets/clock.png" class="pa-3">
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-sheet>
                  </v-hover>
                </v-col>
              </v-row>
              <p class="judul mt-12 mb-6 ml-5 pr-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</p>
              <v-row class="mx-1" style="justify-content: center;">
                
                <v-col class="cardgov" lg="4" sm="6" cols="12" v-if="role=='PIC'">
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
                <v-col lg="4" sm="6" cols="12" v-else>
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

        <!--KANAN!-->
        <v-flex md3>
            <v-card color="#fdf9ed" flat height="580px" class="isiCard">
              <v-row no-gutters>
                <v-col cols="12" sm="12" class="pb-0">
                  <v-list two-line color="#fdf9ed" class="pb-0">
                    <v-list-item>
                      <v-list-item-content class="pb-0">
                        <v-list-item-title style="font-weight:bolder; font-size:xx-large;" class="mb-0 pl-5 judul">Timeline!</v-list-item-title>
                        <p class="greetings orangeText mt-2 pl-5">Please complete the documents!</p>    
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>

              <v-card-text class="cardText pt-0 pl-2">
                <v-timeline align-top dense>
                  <v-timeline-item v-for="i in timeline" :key="i.dokumen" color="#095866" small>
                    <v-row>
                      <v-col cols="4" md="3" class="px-0">
                        <strong class="timelineFont">Aug 9th 21</strong>
                      </v-col>
                      <v-col class="pl-2">
                        <strong class="timelineFont">{{i.dokumen}}</strong>
                        <div class="timelineFont">
                          {{i.category}}-{{i.title}}
                        </div>
                      </v-col>
                    </v-row>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
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
     time: new Date(),
     timeline:[
       {dokumen:'Cost and Benefit', category:'RPTI', title:'BPJS'},
       {dokumen:'Severity', category:'RPTI', title:'BPJS'},
       {dokumen:'Risk', category:'RPTI', title:'BPJS'},
       {dokumen:'Kategori Project', category:'RPTI', title:'BPJS'},
       {dokumen:'New/Enhance', category:'RPTI', title:'BPJS'},
     ],
  }),
  computed: {
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
 .cardgov{
    display: none;
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