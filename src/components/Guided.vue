<template>
  <v-app>
    <v-main>
      <v-layout row>
        <v-flex>
          <v-container>
            <v-row class="px-16">
              <v-col cols="12" sm="6" md="6" class="pt-16">
                <v-card class="pt-10" flat color="#fffcf5">
                  <p class="judul mb-1 text-center" style="font-size:xx-large;">Apa yang bisa kami bantu?</p>
                  <p class="captions text-center textTable">Frequently Asked Questions (FAQ) ini berisi panduan yang akan membantu Anda dalam  mengoperasikan Website Gesit</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="hidden-sm-and-down">
                <v-flex class="text-center">
                  <img src="../assets/pic.png" contain height="300">
                </v-flex>
              </v-col>
            </v-row>

            <v-row class="mx-1">
              <v-col lg="3" sm="3" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined flat to="/FAQRHAAdmin">
                    <v-flex class="text-center pa-6">
                      <img src="../assets/cloud.png" height="100px">
                      <br>
                    </v-flex>
                    <p class="text-center greenText px-3 font-weight-bold">Upload RHA</p>
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

              <v-col lg="3" sm="3" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined flat to="/FAQEvidenceRHA">
                    <v-flex class="text-center pa-6">
                      <img src="../assets/evidence.png" height="100px">
                      <br>
                    </v-flex>
                    <p class="text-center greenText px-3 font-weight-bold">Upload Evidence Sub RHA</p>
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
              <!-- <v-col lg="3" sm="3" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined>
                    <v-flex class="text-center pa-6">
                      <img src="../assets/correspondence.png" height="100px">
                      <br>
                    </v-flex>
                    <p class="text-center greenText px-3 font-weight-bold">Input Tindak Lanjut Sub RHA</p>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                        style="height: 100%;">
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-hover>
              </v-col> -->

              <v-col lg="3" sm="3" cols="12">
                <v-hover v-slot:default="{ hover }">
                  <v-card outlined flat to="/FAQInputTL">
                    <v-flex class="text-center pa-6">
                      <img src="../assets/investigation.png" height="100px">
                      <br>
                    </v-flex>
                    <p class="text-center greenText px-3 font-weight-bold">Input Tindak Lanjut</p>
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
    created () {
      document.title = "User Guidence";
    },
    data: () => ({

    }),
    methods: {
      
    },
    mounted(){
    },
}
</script>

<style scope>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

.judul{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
}

.greenText{
  color:#005E6A;
  font-family: 'Questrial', sans-serif;
}

.test{
  font-family: Secular One;
  font-size: 30px;
  color: #095866;
}

.captions{
  font-family: 'Questrial', sans-serif;
  font-size: 15px;
  line-height: 20px;
  color: #F15A23;
}
</style>