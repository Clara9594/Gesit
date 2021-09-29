<template>
  <v-app>
    <v-main>
        <v-toolbar-title class="title text-left font-weight-bold ml-6">
            <v-btn class="mr-1 ml-1" outlined fab color="#005E6A" @click="back">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-toolbar-title>
      <v-layout row>
        <v-flex>
          <v-container>
            <v-row class="px-16">
              <v-col cols="12" sm="6" md="6" class="pt-16">
                <v-card class="pt-10" flat color="#fffcf5">
                  <p class="judul mb-1 text-center" style="font-size:xx-large;">Input Tindak Lanjut</p>
                  <p class="captions text-center textTable">Panduan ini berisi langkah-langkah untuk mengupload file evidence serta input tindak lanjut pada suatu sub RHA</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="hidden-sm-and-down">
                <v-flex class="text-center">
                  <img src="../../assets/investigation.png" contain height="250">
                </v-flex>
              </v-col>
            </v-row>

            <v-row class="px-16">
                <v-card class="mx-auto" width="1000" flat outlined color="#F5F5F5">
                    <v-card-actions>
                        <v-card-title class="judulFAQ">
                            <v-row>
                                <v-col cols="2" sm="1" md="1">
                                    <v-icon class="mr-3" color="#F15A23">mdi-alert-rhombus-outline</v-icon>
                                </v-col>
                                <v-col cols="10" sm="11" md="11"> 
                                    <p class="mb-0">Cara Mengupload Evidence dan Tindak Lanjut pada Sub RHA</p>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>
                            <v-card-text>
                              <div class="textTable greenText px-5 mt-2">
                                    1. Masuk ke menu Temuan Audit, pada halaman akan ditampilkan List RHA 
                                    yang telah di assign kepada user.
                                    <v-flex>
                                        <img src="../../assets/inputTL.png" contain height="300" class="mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5">
                                    2. Untuk menampilkan Sub RHA, maka klik button
                                    <v-icon>mdi-dots-vertical</v-icon> pada bagian paling kanan dari table (Action). 
                                    Kemudian, pilih <span class="font-weight-bold">Show Sub RHA</span>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    3. Pada halaman ini akan ditampilkan setiap sub RHA dari suatu RHA yang telah di assign 
                                    kepada user. Klik button 
                                    <v-icon>mdi-chevron-down</v-icon> pada bagian paling kanan dari table untuk melihat 
                                    detail serta kelengkapan dokumen dari suatu sub RHA
                                    <v-flex>
                                        <img src="../../assets/detailTL.png" contain height="300" class="mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    4. Untuk mengupload evidence serta tindak lanjut untuk suatu Sub RHA, maka klik button
                                    <v-icon>mdi-dots-vertical</v-icon> pada bagian paling kanan dari table (Action). 
                                    Kemudian, pilih <span class="font-weight-bold">Input Tindak Lanjut</span>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    5. Pada halaman ini akan sebuah modal sebagai berikut. Isi informasi Tindak lanjut 
                                    yang akan ditambahkan serta file Evidence (Jika ada), kemudian klik 
                                    <span class="font-weight-bold">Save</span>
                                    <v-flex>
                                        <img src="../../assets/modalTL.png" contain height="300" class="mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    6. Tindak lanjut serta Evidence yang telah terupload akan muncul pada bagian detail sub RHA. Pada contoh kali ini dapat
                                    pada detail sub RHA bagian <span class="font-weight-bold">Tindak Lanjut</span> serta <span class="font-weight-bold">Evidence Sub RHA</span>
                                     telah tersimpan Tindak Lanjut serta file Evidence yang baru diupload
                                    <v-flex>
                                        <img src="../../assets/hasTL.png" contain height="300" class="mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    7. Untuk mendownload evidence dari suatu Sub RHA, klik button
                                    <v-icon color="orange">mdi-download</v-icon> pada bagian kanan dari file Evidence tersebut. 
                                </div>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-row>
            <br>
            <br>
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
        show: true,
    }),
    methods: {
        back(){
      this.$router.back();
    }

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

.judulFAQ{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
  font-size: 21px;
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