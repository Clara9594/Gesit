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
                  <p class="judul mb-1 text-center" style="font-size:xx-large;">Upload RHA</p>
                  <p class="captions text-center textTable">Panduan ini berisi langkah-langkah untuk mengunduh template RHA, mengupload file RHA, dan Edit RHA yang telah di upload</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="hidden-sm-and-down">
                <v-flex class="text-center">
                  <img src="../../assets/cloud.png" contain height="250">
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
                                    <p class="mb-0">Cara Mengunduh Template RHA</p>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show = !show">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>
                            <v-card-text>
                                <div class="textTable greenText px-5">
                                    1. Masuk ke menu Upload RHA, kemudian klik button
                                    <span class="font-weight-bold">Add RHA File</span>.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    2. Setelah itu, akan tampil dialog
                                    <span class="font-weight-bold">Add RHA File</span> seperti gambar di bawah ini
                                    <v-flex>
                                        <img src="../../assets/addRhaDialog.png" contain height="280" class="pr-5 mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    3. Telah tersedia Template RHA File. Klik button
                                    <span class="font-weight-bold">DOWNLOAD HERE</span> untuk mengunduh template RHA!
                                    <v-flex>
                                        <img src="../../assets/templateRha.png" contain height="90" class="mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    4. Template RHA berhasil di unduh. Silakan menggunakan template tersebut untuk mengupload file RHA!
                                </div>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>

                <v-card class="mx-auto mt-3" width="1000" flat outlined color="#F5F5F5">
                    <v-card-actions>
                        <v-card-title class="judulFAQ">
                            <v-row>
                                <v-col cols="2" sm="1" md="1">
                                    <v-icon class="mr-3" color="#F15A23">mdi-alert-rhombus-outline</v-icon>
                                </v-col>
                                <v-col cols="10" sm="11" md="11"> 
                                    <p class="mb-0">Cara Mengupload RHA File</p>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show2 = !show2">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show2">
                            <v-divider></v-divider>
                            <v-card-text>
                                <div class="textTable greenText px-5">
                                    1. Masuk ke menu Upload RHA, kemudian klik button
                                    <span class="font-weight-bold">Add RHA File</span>.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    2. Setelah itu, akan tampil dialog
                                    <span class="font-weight-bold">Add RHA File</span> seperti gambar di bawah ini
                                    <v-flex>
                                        <img src="../../assets/addRhaDialog.png" contain height="280" class="pr-5 mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    3. Silakan mengisi seluruh field yang tersedia!
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    4. Pada field 
                                    <span class="font-weight-bold">Attach Document</span>,
                                    Anda dapat <span class="font-weight-bold">Drag</span>
                                    atau klik pada field tersebut untuk memilih file RHA.
                                    <v-flex>
                                        <img src="../../assets/attachRHA.png" contain height="280" class="pr-5 mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    5. Centang pernyataan 
                                    <span class="font-weight-bold">I have filled in the RHA according to the template</span>.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    6. Klik button
                                    <span class="font-weight-bold">Save</span>,
                                    untuk mengupload RHA.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    7. RHA yang berhasil di unggah, akan tampil pada table.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    8. Jika Anda ingin menampilkan Sub RHA, maka klik button
                                    <v-icon>mdi-dots-vertical</v-icon> pada bagian paling kanan dari table (Action). 
                                    Kemudian, pilih <span class="font-weight-bold">Show Sub RHA</span>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    9. Setelah itu, akan muncul tampilan Sub RHA.
                                </div>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>

                <v-card class="mx-auto mt-3" width="1000" flat outlined color="#F5F5F5">
                    <v-card-actions>
                        <v-card-title class="judulFAQ pr-0">
                            <v-row>
                                <v-col cols="2" sm="1" md="1">
                                    <v-icon class="mr-3" color="#F15A23">mdi-alert-rhombus-outline</v-icon>
                                </v-col>
                                <v-col cols="10" sm="11" md="11"> 
                                    <p class="mb-0">Cara Mengedit RHA File</p>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="show3 = !show3">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show3">
                            <v-divider></v-divider>
                            <v-card-text>
                                <div class="textTable greenText px-5">
                                    1. Masuk ke menu Upload RHA, kemudian pilih RHA yang akan di Edit.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    2. Kemudian, pada bagian paling kanan dari table (Action), klik button
                                    <v-icon>mdi-dots-vertical</v-icon> lalu
                                    pilih <span class="font-weight-bold">Edit RHA</span>.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    3. Setelah itu, tampil dialog Edit RHA seperti gambar dibawah ini.
                                    <v-flex>
                                        <img src="../../assets/EditRha.png" contain height="280" class="pr-5 mx-0 mt-2">
                                    </v-flex>
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    4. Silakan isi kembali field yang ingin di edit.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    5. Setelah itu, klik button
                                    <span class="font-weight-bold">Save</span>,
                                    untuk menyimpan perubahan data RHA.
                                </div>
                                <div class="textTable greenText px-5 mt-2">
                                    6. RHA yang berhasil di Edit, akan tampil pada table.
                                </div>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-row>
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
        show: false,
        show2: false,
        show3: false,
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