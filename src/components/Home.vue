<template>
  <v-app>
    <v-main class="homepage">
      <v-container fluid>
        <v-card class="card mb-10 mx-4 mt-5" style="justify-content:center" color="#FFCBB8" flat height="150px" outlined>
          <img id="pic" src="../assets/Mention-bro 1.png" align="right" class="mt-4 mr-5">
          <p style="font-weight:bolder; font-size:xx-large;" class="text-h4 mb-0 ml-5 mt-10 title">Welcome, ACM!</p>
          <p class="text--secondary ml-5 greetings">Have a nice day at work!</p>
        </v-card>
        <v-row class="mx-1">
          <v-col cols="6" sm="3" md="3">
            <v-card class="mx-auto" elevation="2" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div>
                    <p class="font-weight-bold mb-2">
                      Position
                    </p>
                    <v-list-item-title class="text-h7 mb-1">
                      Governance
                    </v-list-item-title>
                  </div>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="#FFD0AB"
                  class="hidden-sm-and-down"
                >
                <img src="../assets/scrum.png" class="pa-3">
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <v-card class="mx-auto" elevation="2" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div>
                    <p class="font-weight-bold mb-2">
                      Notification!
                    </p>
                    <v-list-item-title class="text-h7 mb-1">
                      You have 3 notifications!
                    </v-list-item-title>
                  </div>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="#FFD0AB"
                  class="hidden-sm-and-down"
                >
                <img src="../assets/notification.png" class="pa-3">
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <v-card class="mx-auto" elevation="2" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div>
                    <p class="font-weight-bold mb-2">
                      Today's Date
                    </p>
                    <v-list-item-title class="text-h7 mb-1">
                      {{time|formatDate}}
                    </v-list-item-title>
                  </div>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="#FFD0AB"
                  class="hidden-sm-and-down"
                >
                <img src="../assets/calendar.png" class="pa-3">
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <v-card class="mx-auto" elevation="2" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div>
                    <p class="font-weight-bold mb-2">
                      Current Time
                    </p>
                    <v-list-item-title class="text-h7 mb-1">
                      {{time|formatTime}}
                    </v-list-item-title>
                  </div>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="#FFD0AB"
                  class="hidden-sm-and-down"
                >
                <img src="../assets/clock.png" class="pa-3">
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <h2 class="page-title mt-12 mb-6 ml-5 pr-5 text" style="font-size:xx-large;">GOVERNANCE, COMPLIANCE, AND RISK IT</h2>
        <v-row class="mx-1 mb-16" style="justify-content: center;">
          <v-col lg="3" sm="6" cols="12">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card max-width="350" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" outlined to="/GovernanceProject">
                <v-card-title class="pa-6 pb-3">
                <img src="../assets/testing.png" height="100px">
                <br>
                </v-card-title>
                <p class="text">Governance Project</p>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" sm="6" cols="12">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card max-width="350" :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" outlined to="/audit">
                <v-card-title class="pa-6 pb-3">
                  <img src="../assets/research.png" align="right" height="100px">
                </v-card-title>
                <p class="text">Temuan Audit</p>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <br>
        <br>
        <br>
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.homepage{
  padding:10px;
}
.title{
    color:#005E6A;
}
.text{
  color:#005E6A;
  font-size:x-large; font-weight:bolder; text-align:center;
}
#pic{
height:110px;
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
