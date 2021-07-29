<template>
  <v-app>
    <v-main class="homepage">
      <v-container fluid>
        <div class="mb-10">
          <p style="font-weight:bolder; font-size:xx-large;" class="mb-0 ml-5 judul">Welcome, ACM!</p>
          <p class="ml-5 greetings">Have a nice day at work!</p>
        </div>
        <v-row class="mx-1">
          <v-col cols="6" sm="3" md="3">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-sheet class="rounded-lg mx-auto" max-width="344" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div>
                      <p class="orangeText orangeFont mb-2">
                        Position
                      </p>
                      <v-list-item-title class="text-h7 font-weight-bold greenText mb-1">
                        Governance
                      </v-list-item-title>
                    </div>
                  </v-list-item-content>

                  <v-list-item-avatar
                    rounded
                    size="50"
                    color="#FFD0AB"
                    class="hidden-sm-and-down"
                  >
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
                        Notification!
                      </p>
                      <v-list-item-title class="text-h7 font-weight-bold greenText mb-1">
                        You have 3 notifications!
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
                        Today's Date
                      </p>
                      <v-list-item-title class="text-h7 font-weight-bold greenText mb-1">
                        {{time|formatDate}}
                      </v-list-item-title>
                    </div>
                  </v-list-item-content>

                  <v-list-item-avatar
                    rounded
                    size="50"
                    color="#FFD0AB"
                    class="hidden-sm-and-down"
                  >
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
                      <v-list-item-title class="text-h7 font-weight-bold greenText mb-1">
                        {{time|formatTime}}
                      </v-list-item-title>
                    </div>
                  </v-list-item-content>

                  <v-list-item-avatar
                    rounded
                    size="50"
                    color="#FFD0AB"
                    class="hidden-sm-and-down"
                  >
                  <img src="../assets/clock.png" class="pa-3">
                  </v-list-item-avatar>
                </v-list-item>
              </v-sheet>
            </v-hover>
          </v-col>
        </v-row>
        <p class="judul mt-12 mb-6 ml-5 pr-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</p>
        <v-row class="mx-1 mb-16" style="justify-content: center;">
          <v-col lg="3" sm="6" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card max-width="350" outlined to="/GovernanceProject">
                <v-card-title class="pa-6 pb-3">
                  <img src="../assets/testing.png" height="100px">
                  <br>
                </v-card-title>
                <p class="text judul">Governance Project</p>
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
          <v-col lg="3" sm="6" cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card max-width="350" outlined to="/audit">
                <v-card-title class="pa-6 pb-3">
                  <img src="../assets/research.png" align="right" height="100px">
                </v-card-title>
                <p class="text judul">Temuan Audit</p>
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
    </v-main>
  </v-app>
</template>

<script>
// import axios from 'axios'
// import moment from 'moment'

export default {
name : "Home",
created () {
  document.title = "Home";
},
data() {
  return {
    time: new Date(),
  };
},

  methods: {
  }
};
</script>

<style scope>

.greetings{
  color:#F15A23;
  font-family: 'Righteous', cursive;
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



