<template>
  <v-app>
    <v-main>
      <v-toolbar-title v-if="role=='GOV'" class="title text-left font-weight-bold mb-2">
        <p class="text-left ml-5 mb-3 judul" style="font-size:x-large;">UPLOAD RHA</p>
      </v-toolbar-title>
      
      <v-toolbar-title v-else class="title text-left font-weight-bold ml-6 mb-8">
        <v-row no-gutters>
          <v-col cols="2" sm="1" md="1">
            <v-btn class="mr-3" outlined fab color="#005E6A" @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10" sm="11" md="11">
            <v-toolbar-title class="mb-0 judul font-weight-bold">UPLOAD RHA</v-toolbar-title>
            <v-breadcrumbs :items="routing" class="pa-0 textTable">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>
      
      <v-card color="#fffcf5" class="pb-1" flat>
        <v-card class="pt-2 px-5 mx-5 mb-16" elevation="2" outlined>
          <v-card-title class="py-0 pl-0 pr-0 pb-2">
            <v-toolbar flat class="textTable">
              <v-text-field
                v-model="searchRHA"
                append-icon="mdi-magnify"
                label="Search RHA"
                color="#F15A23"
                class="mb-5 mt-6 textTable"
                dense
                solo
                flat
                background-color="#EEEEEE"
                filled
                hide-details>
              </v-text-field>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn class="textTable text-none" @click="addFileNew=true" height="40px" outlined color="#FC9039">+ Add RHA File</v-btn>
          </v-card-title>
          <v-data-table
            :headers = "headers" 
            :search = "searchRHA"
            :items = "rhaIndexNew" 
            :loading="loading"
            loading-text="Loading... Please wait"
            item-key = "id" 
            class="textTable">
            <template v-slot:[`item.statusInfo`]= "{ item }">
              <v-progress-linear color="#DD2C00" :value="item.statusInfo[0].statusCompletedPercentage" height="25">
                <strong v-if="item.statusInfo[0].statusCompletedPercentage<100" class="white--text" color="red">{{ item.statusInfo[0].statusCompletedPercentage }}%</strong>
                <strong v-else color="green">{{ item.statusInfo[0].statusCompletedPercentage }}%</strong>
              </v-progress-linear>
            </template>
            
            <template v-slot:[`item.actions`]= "{ item }">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list class="textTable">
                  <v-list-item @click="subRHAHandler(item)">
                    <v-list-item-title>Show Sub RHA</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item @click="updateRHAHandler(item)">
                    <v-list-item-title>Edit RHA</v-list-item-title>
                  </v-list-item>
                  
                  <!--
                  <v-list-item @click="downloadHandler(item.id)">
                    <v-list-item-title>Download RHA</v-list-item-title>
                  </v-list-item>-->
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-card>

      <!--Dialog Sub RHA-->
      <v-dialog v-model="showSubRHA" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card color="#fffcf5" flat>

          <v-toolbar-title v-if="role=='GOV'" class="title text-left font-weight-bold pt-15 ml-6 mb-5">
            <v-row no-gutters>
              <v-col cols="2" sm="1" md="1">
                <v-btn class="mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="11" md="11">
                <v-toolbar-title class="mb-0 judul font-weight-bold">SUB RHA - {{getRHA}}</v-toolbar-title>
              </v-col>
            </v-row>
          </v-toolbar-title>

          <v-toolbar-title v-else class="title text-left font-weight-bold pt-15 ml-6 mb-8">
            <v-row no-gutters>
              <v-col cols="2" sm="1" md="1">
                <v-btn class="mr-3" outlined fab color="#005E6A" @click="closeSubRHA()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="11" md="11">
                <v-toolbar-title class="mb-0 judul font-weight-bold">SUB RHA - {{getRHA}}</v-toolbar-title>
                <v-breadcrumbs :items="routingSubRHA" class="pa-0 textTable">
                  <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                  </template>
                </v-breadcrumbs>
              </v-col>
            </v-row>
          </v-toolbar-title>

          <v-card class="pt-2 px-5 mx-5" elevation="2" outlined>
            <v-card-title class="pa-0">
              <v-toolbar flat class="textTable mb-1">
                <v-row>
                  <v-col cols="2">
                    <v-select
                      v-model="temuanSts"
                      :items="daftarStatus"
                      required
                      label = "Filter by Status Temuan"
                      color="#FC9039"
                      class="mb-5 mt-6 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                    ></v-select>
                  </v-col>

                  <v-col cols="2">
                    <v-select
                      v-model="jTempo"
                      :items="daftarJT"
                      required
                      label = "Filter by Status Jatuh Tempo"
                      color="#FC9039"
                      class="mb-5 mt-6 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                    ></v-select>
                  </v-col>

                  <v-col cols="2">
                    <v-select
                      v-model="divisi"
                      :items="daftarDivisi"
                      required
                      label = "Filter by Divisi"
                      color="#FC9039"
                      class="mb-5 mt-6 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details
                    ></v-select>
                  </v-col>

                  <v-col cols="2">
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="menu"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="year"
                          label="Filter by Tahun Temuan"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs" 
                          v-on="on" 
                          color="#FC9039"
                          class="mb-5 mt-6 textTable"
                          dense
                          solo
                          flat
                          background-color="#EEEEEE"
                          filled
                          hide-details
                        ></v-text-field>
                      </template> 
                      <v-date-picker
                        ref="picker"
                        :active-picker.sync="activePicker"
                        v-model="date"
                        @input="save"
                        reactive
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model="searchSubRHA"
                      append-icon="mdi-magnify"
                      label="Search Sub RHA"
                      color="#FC9039"
                      class="mb-5 mt-6 textTable"
                      dense
                      solo
                      flat
                      background-color="#EEEEEE"
                      filled
                      hide-details>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-toolbar>
            </v-card-title>
            <v-data-table
              :headers = "headersRHABaru"
              :search = "searchSubRHA"
              :items = "filterData"
              fixed-header
              item-key = "no" 
              class="textTable"
              :loading="loadingSub"
              :single-expand="true"
              loading-text="Loading... Please wait"
              :expanded.sync="expanded"
              show-expand>

              <template v-slot:[`item.data-table-expand`]="{ item, isExpanded, expand }">
                <v-icon @click="expand(true);readImage(item.id)" v-if="!isExpanded">mdi-chevron-down</v-icon>
                <v-icon @click="expand(false)" v-if="isExpanded">mdi-chevron-up</v-icon>
              </template>

              <template v-slot:[`item.masalah`]="{ item }">
                <p class="text-justify" outlined dark>
                  {{ item.masalah }}
                </p>
              </template>

              <template v-slot:[`item.pendapat`]="{ item }">
                <p class="text-justify" outlined dark>
                  {{ item.pendapat }}
                </p>
              </template>

              <template v-slot:expanded-item="{ headers }">
                <td :colspan="headers.length">
                  <p class="font-weight-bold mt-2 mb-0">Image Masalah</p>
                  <v-row no-gutters>
                    <v-col sm="2" cols="6" class="ma-0" v-for="i in imageSubRHA" :key="i.id">
                      <v-card class="mb-2" flat>
                        <img
                          :src="i.viewImage"
                          height="200px"
                          contain
                        />
                        <v-card-subtitle class="py-0 pl-0 text-secondary">{{i.fileName}}</v-card-subtitle>
                      </v-card>
                    </v-col>
                  </v-row>
                </td>
              </template>

              <template v-slot:[`item.usulClose`]="{ item }">
                <v-chip color="#095866" v-if="item.usulClose==null" label @click="addUsulClose(item)" dark>
                  Add Usul Close
                </v-chip>
                <v-chip color="#095866" v-else label @click="addUsulClose(item)" outlined dark>
                  {{ item.usulClose }}
                </v-chip>
              </template>

              <template v-slot:[`item.openClose`]="{ item }">
                <v-chip color="green" v-if="item.openClose=='Open'" outlined label dark>
                  {{ item.openClose}}
                </v-chip>
                <v-chip color="red" v-else outlined label dark>
                  {{ item.openClose }}
                </v-chip>
              </template>
              
              <template v-slot:[`item.tindakLanjuts`]="{ item }">
                <p class="text-justify" color="orange" v-for="i in item.tindakLanjuts" :key="i.id" outlined dark>
                  - {{ i.notes }}
                </p>
              </template>

              <template v-slot:[`item.subRhaevidences`]="{ item }">
                <p class="text-justify" color="orange" v-for="i in item.subRhaevidences" :key="i.id" outlined dark>
                  {{ i.notes }} - {{ i.fileName}}
                </p>
              </template>

              <template v-slot:[`item.actions`]= "{ item }">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list class="textTable">
                    <v-list-item @click="addImageHandler(item)">
                      <v-list-item-title>Add Image</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="dialogHandler(item)">
                      <v-list-item-title>Add Evidence File</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="updatesubRHAHandler(item)">
                      <v-list-item-title>Edit Sub RHA</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
          <br>
        </v-card>
      </v-dialog>

      <!--Upload File RHA Excel-->
      <v-dialog v-model="addFileNew" scrollable max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center path textTable py-5">{{ formTitle }} RHA FILE</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 mt-3 pt-1 pb-0">
            <v-alert v-if="inputType=='Add'" text dense color="teal" class="textTable" icon="mdi-file" border="left">
              <v-row align="center">
                <v-col class="grow">
                  Template RHA File
                </v-col>
                <v-col class="shrink">
                  <v-btn small text color="teal" @click="downloadTemplete">Download Here</v-btn>
                </v-col>
              </v-row>
              <v-spacer></v-spacer>
            </v-alert>

            <v-form ref="form" class="textTable">
              <p class="mb-1 font-weight-bold path">Auditee (UIC)</p>
              <v-select
                v-model = "form.auditee"
                :items="['DIVISI STRATEGI & ARSITEKTUR TI ( STI )', 'DIVISI PENGEMBANGAN TI ( MTI )', 'DIVISI PENGEMBANGAN DIGITAL	( DGL )']"
                color="#F15A23"
                required
                outlined
                :rules="fieldRules"
                dense
                hide-details
              ></v-select>

              <p class="mb-1 mt-3 font-weight-bold path">Condition</p>
              <v-text-field
                v-model = "form.kondisi"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>
              
              <p class="mb-1 mt-3 font-weight-bold path">Dir Sector</p>
              <v-text-field
                v-model="form.sector"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>

              <p class="mb-1 mt-3 font-weight-bold path">Jatuh Tempo</p>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu1"
                transition="scale-transition"
                offset-y
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.jtBulan"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs" 
                    class="mb-2"
                    v-on="on" 
                    color="#FC9039"
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                    @click:clear="form.jtBulan = null"
                  ></v-text-field>
                </template> 
                <v-date-picker
                  v-model="form.jtBulan"
                  type="month"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>

              <p class="mb-1 mt-3 font-weight-bold path" v-if="inputType == 'Add'">Attach Document</p>
              <div v-if="inputType=='Add'">
                <div v-if="!file">
                  <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                    <div class="dropZone-info" @drag="onChange">
                      <span class="fa fa-cloud-upload dropZone-title"></span>
                      <span class="dropZone-title">Drop file or click to upload</span>
                      <div class="dropZone-upload-limit-info">
                        <div>Extension support: xlsx, xls</div>
                        <div>Max file size: 10 MB</div>
                      </div>
                    </div>
                    <input type="file" @change="onChange">
                  </div>
                </div>
                <div v-else class="dropZone-uploaded">
                  <div class="dropZone-uploaded-info">
                    <span class="dropZone-title">fileName: {{ file.name }}</span>
                    <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
                  </div>
                </div>
              </div>

              <v-checkbox
                v-if="inputType == 'Add'"
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="I have filled in the RHA according to the template"
                required
                hide-details
              ></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions class="my-2 pt-2">
            <v-row>
              <v-col>
                <v-btn block color="#FC9039" outlined @click = "closeDialog()">
                  Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn 
                  depressed 
                  block
                  dark 
                  color="#FC9039" 
                  @click="cekOperasi"
                  v-if="form.auditee!=null&&form.kondisi!=null&&
                  form.sector!=null&&form.jtBulan!=null&&file!=null
                  &&checkbox!=false&&inputType=='Add'">
                  Save
                </v-btn>
                <v-btn 
                  depressed 
                  block
                  dark 
                  color="#FC9039" 
                  @click="cekOperasi"
                  v-else-if="form.auditee!=null&&form.kondisi!=null&&
                  form.sector!=null&&form.jtBulan!=null&&inputType=='Edit'">
                  Save
                </v-btn>
                <v-btn depressed block dark color="#ffb880" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Dialog untuk edit sub RHA-->
       <v-dialog v-model="subRHADialog" scrollable max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center path textTable py-5">{{ formTitle }} Sub RHA File</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pr-9 mt-3 pt-1 pb-0">
            
            <v-form ref="form" class="textTable">
              <p class="mb-1 mt-1 font-weight-bold path">UIC Lama</p>
              <v-text-field
                v-model = "sub.uicLama"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>

              <v-row>
                <v-col class="mt-3">
                  <p class="mb-1 font-weight-bold path">Divisi Baru</p>
                  <v-text-field
                    v-model = "sub.divisiNew"
                    color="#F15A23"
                    required
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col class="mt-3">
                  <p class="mb-1 font-weight-bold path">UIC Baru</p>
                  <v-text-field
                    v-model = "sub.uicNew"
                    color="#F15A23"
                    required
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <p class="mb-1 mt-3 font-weight-bold path">Nama Audit</p>
              <v-text-field
                v-model = "sub.auditName"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>

              <v-row>
                <v-col class="pb-0">
                  <p class="mb-1 mt-3 font-weight-bold path">Lokasi</p>
                  <v-text-field
                    v-model = "sub.lokasi"
                    color="#F15A23"
                    required
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <p class="mb-1 mt-3 font-weight-bold path">Nomor</p>
                  <v-text-field
                    v-model = "sub.nomorSubRHA"
                    color="#F15A23"
                    required
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <p class="mb-1 mt-3 font-weight-bold path">Masalah</p>
              <v-textarea
                v-model = "sub.masalah"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-textarea>

              <p class="mb-1 mt-3 font-weight-bold path">Pendapat</p>
              <v-textarea
                v-model = "sub.pendapat"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-textarea>
              
              <p class="mb-1 mt-3 font-weight-bold path">Status</p>
              <v-text-field
                v-model = "sub.statusSubRHA"
                color="#F15A23"
                required
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>

              <p class="mb-1 mt-3 font-weight-bold path">Open/Closed</p>
              <v-select
                v-model = "sub.statusOpenClose"
                :items="['Open','Closed']"
                color="#F15A23"
                required
                outlined
                dense
                :rules="fieldRules"
                hide-details
              ></v-select>
              
              <v-row>
                <v-col class="mt-3">
                  <p class="mb-1 font-weight-bold path">Jatuh Tempo</p>
                  <v-text-field
                    v-model="sub.jthTempo"
                    type="number"
                    color="#FC9039"
                    :rules="fieldRules"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col class="mt-3">
                  <p class="mb-1 font-weight-bold path">Tahun Temuan</p>
                  <v-menu
                    ref="menuThn"
                    :close-on-content-click="false"
                    v-model="menuThn"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="sub.thnTemuan"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs" 
                        v-on="on" 
                        color="#FC9039"
                        :rules="fieldRules"
                        outlined
                        dense
                        hide-details
                      ></v-text-field>
                    </template> 
                    <v-date-picker
                      ref="picker"
                      :active-picker.sync="activePicker"
                      v-model="date"
                      @input="saveRHA"
                      reactive
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <p class="mb-1 mt-3 font-weight-bold path">Assign</p>
              <v-text-field
                v-model = "sub.assignBy"
                color="#F15A23"
                required
                class="mb-2"
                :rules="fieldRules"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="my-2 pt-2">
            <v-row>
              <v-col>
                <v-btn block color="#FC9039" outlined @click = "closeDialog()">
                  Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn 
                  depressed 
                  block
                  dark 
                  color="#FC9039" 
                  @click="updateSubRHA">
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog upload Evidence file -->
      <v-dialog v-model="addEvidence" scrollable max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center textTable path py-5">Add Evidence File</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">
            <p class="mb-1 font-weight-bold path">Attach Document</p>
            <div v-if="!file">
              <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Drop file or click to upload</span>
                  <div class="dropZone-upload-limit-info">
                    <div>Extension support: png,jpeg,jpg,csv,txt,xlsx,xls</div>
                    <div>Max file size: 10 MB</div>
                  </div>
                </div>
                <input type="file" @change="onChange">
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">fileName: {{ file.name }}</span>
                <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
              </div>
            </div>

            <p class="mb-1 mt-4 font-weight-bold path">Evidence</p>
            <v-textarea
              v-model="bioEvidence"
              outlined 
              hide-details
              color="#F15A23"
            ></v-textarea>
          </v-card-text>

          <v-card-actions class="pt-5 my-2">
            <v-row>
              <v-col>
                <v-btn color="#FC9039" outlined block @click = "closeDialogEvidence()">
                    Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn depressed dark block color="#FC9039" @click="uploadFileEvidence" v-if="file!=null && bioEvidence!=null">
                  Save
                </v-btn>
                <v-btn depressed block dark color="#ffb880" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
      <br>

      <!--Dialog untuk menambahkan gambar di masalah -->
      <v-dialog v-model="addImage" scrollable max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center textTable path py-5">Add Image</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">

            <v-img v-if="imgView != null" class="pic mb-5" tile :src="imgView.toString()"></v-img>
            
            <p class="mb-1 font-weight-bold path">Attach Image</p>
            <div v-if="!img">
              <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Drop file or click to upload</span>
                  <div class="dropZone-upload-limit-info">
                    <div>Extension support: png,jpeg,jpg</div>
                    <div>Max file size: 10 MB</div>
                  </div>
                </div>
                <input type="file" @change="onChange">
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">fileName: {{ img.name }}</span>
                <v-btn dark text color="#F15A23" class="btn btn-primary removeFile mt-3" @click="removeFile">Remove File</v-btn>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="pt-5 my-2">
            <v-row>
              <v-col>
                <v-btn color="#FC9039" outlined block @click = "closeDialogImage()">
                  Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn depressed dark block color="#FC9039" @click="uploadFileImage" v-if="img!=null">
                  Save
                </v-btn>
                <v-btn depressed block dark color="#ffb880" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
      <br>

      <!-- Dialog untuk edit usul close -->
      <v-dialog v-model="editUsulClose" scrollable max-width = "500px">
        <v-card style="background-color: #ffffff !important; border-top: 5px solid #FC9039 !important">
          <v-card class="kotak" tile flat>
            <h3 class="text-center textTable path py-5">Add Usul Close</h3>
            <v-divider></v-divider>
          </v-card>

          <v-card-text flat class="pl-9 pb-0 pr-9 mt-5 pt-1">
           <p class="mb-1 font-weight-bold path">Usul Close</p>
             <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menuUsul"
                transition="scale-transition"
                offset-y
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="sub.usulClose"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs" 
                    class="mb-2"
                    v-on="on" 
                    color="#FC9039"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </template> 
                <v-date-picker
                  v-model="sub.usulClose"
                  type="month"
                  @input="menuUsul = false"
                ></v-date-picker>
              </v-menu>
          </v-card-text>

          <v-card-actions class="pt-5 my-2 mx-5">
            <v-row>
              <v-col>
                <v-btn color="#FC9039" outlined block @click = "closeDialogUsulClose()">
                  Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn depressed dark block color="#FC9039" @click="uploadUsulClose" v-if="sub.usulClose!=null">
                  Save
                </v-btn>
                <v-btn depressed block dark color="#ffb880" v-else>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="alert" :color="color" timeout="3000" bottom>
        {{message}}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
name : "Monitoring",
created () {
  document.title = "RHA";
},
data() {
  return {
    error_message:'',
    menu: false,
    menu2: false,
    menu1: false,
    menuThn: false,
    menuJth : false,
    menuUsul: false,
    search : null,
    inputType: 'Add',
    dragging: false,
    role: localStorage.getItem('role'),
    loading : true,
    loadingSub : true,
    date : null,
    year : null,
    temuanYear : null,
    tahunRHA : null,
    activePicker: null, 
    idUpdate : null,
    divisi : null,
    temuanSts : null,
    jTempo : null,
    daftarStatus : ['Open','Closed'],
    daftarDivisi : ['STI','MTI','DGL'],
    daftarJT : ['Sudah Jatuh Tempo','Belum Jatuh Tempo'],

    //List Array
    tgl: [],
    rhaFilter : [],
    rha:[],
    evidence:[],
    expanded:[],
    readRHAFile:[],
    subRhaById:[],
    tindakLanjut:[],
    tempTL:[],
    imageSubRHA :[],
    subFilter:[],
    radioGroup: null,
    checkbox: false,
    searchRHA : null,
    searchSubRHA : null,
    showSubRHA : false,
    addFile:false,
    addFileNew:false,
    subRHADialog:false,
    editUsulClose:false,
    addEvidence:false,
    addImage: false,
    color: '',
    dateUsulClose: null,
    cek:null,
    file:null,
    rhaId : null,
    alert: false,
    message:'',
    formData : new FormData,
    idEvidence : null,
    usulCloseID : null,
    img : null,
    imgView : null,

    //Header RHA Utama
    headers : [
      {
        text : "No",
        align : "center",
        sortable : false,
        value : "index",
        class : "orange accent-3 white--text"
      },
      { text : "Auditee",align : "center", sortable : false, value : "uic", class : "orange accent-3 white--text"},
      { text : "Conditions",align : "center", sortable : false, value : "kondisi", class : "orange accent-3 white--text"},
      { text : "Dir Sector", align : "center",sortable : false, value : "dirSekor", class : "orange accent-3 white--text"},
      { text : "File Name", align : "center", sortable : false, value : "fileName", class : "orange accent-3 white--text"},
      { text : "Jatuh Tempo", align : "center", sortable : false, value : "statusJt", class : "orange accent-3 white--text"},
      { text : "Progress", align : "center", sortable : false, value : "statusInfo", class : "orange accent-3 white--text"},
      { text : "Actions", align : "center", sortable : false, value : "actions", class : "orange accent-3 white--text"},
    ],

    //Header Sub RHA
    headersRHABaru : [ 
      {
        text : "No",
        align : "center",
        value : "no",
        sortable: false,
        class : "orange accent-3 white--text",
      },
      { text : "UIC Lama", align : "center",value : "uicLama",sortable: false, class : "orange accent-3 white--text"},
      { text : "Divisi Baru",align : "center",value : "divisiBaru",sortable: false, class : "orange accent-3 white--text"},
      { text : "UIC Baru", align : "center",value : "uicBaru",sortable: false, class : "orange accent-3 white--text"},
      { text : "Nama Audit", align : "center",value : "namaAudit",sortable: false, class : "orange accent-3 white--text",width: "200px"},
      { text : "Lokasi", align : "center",value : "lokasi",sortable: false, class : "orange accent-3 white--text"},
      { text : "Nomor", align : "center",value : "nomor",sortable: false, class : "orange accent-3 white--text"},
      { text : "Masalah", align : "center",value : "masalah",sortable: false, class : "orange accent-3 white--text",width: "500px"},
      { text : "Pendapat", align : "center",value : "pendapat",sortable: false, class : "orange accent-3 white--text",width: "400px"},
      { text : "Tindak Lanjut", align : "center",value : "tindakLanjuts",sortable: false, class : "orange accent-3 white--text",width: "400px"},
      { text : "Tahun Temuan", align : "center",value : "tahunTemuan",sortable: false, class : "orange accent-3 white--text"},
      { text : "Assign", align : "center",value : "assign",sortable: false, class : "orange accent-3 white--text"},
      { text : "Evidence", align : "center",value : "subRhaevidences", sortable: false, class : "orange accent-3 white--text",width: "250px"},
      { text : "Status", align : "center",value : "status",sortable: false, class : "orange accent-3 white--text"},
      { text : "Tanggal Jatuh Tempo", align : "center",value : "jatuhTempo",sortable: false, class : "orange accent-3 white--text",width: "120px"},
      { text : "Status Jatuh Tempo", align : "center",value : "statusJatuhTempo",sortable: false, class : "orange accent-3 white--text",width: "120px"},
      { text : "Open/Closed", align : "center",value : "openClose",sortable: false, class : "orange accent-3 white--text"},
      { text : "Usul Close", align : "center",value : "usulClose",sortable: false, class : "orange accent-3 white--text"},
      { text : "Actions", align : "center",value : "actions",sortable: false, class : "orange accent-3 white--text"},
      { text: '', value: 'data-table-expand',class : "orange accent-3 white--text"},
    ],

    //Path RHA Admin
    routing: [
      {
        text: 'Home',
        disabled: false,
        href: '#/homeAdmin',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homeAdmin',
      },
      {
        text: 'Audit',
        disabled: false,
        href: '#/auditAdmin',
      },
      {
        text: 'Upload RHA',
        disabled: true,
        href: '#/RHAAdmin',
      },
    ],

    //Path Sub RHA Admin
    routingSubRHA: [
      {
        text: 'Home',
        disabled: false,
        href: '#/homeAdmin',
      },
      {
        text: 'Temuan Audit',
        disabled: false,
        href: '#/homeAdmin',
      },  
      {
        text: 'Audit',
        disabled: false,
        href: '#/auditAdmin',
      },
      {
        text: 'Upload RHA',
        disabled: false,
        href: '#/RHAAdmin',
      },
      {
        text: 'Sub RHA',
        disabled: true,
        href: '#/RHAAdmin',
      },
    ],

    form : {
      auditee : null,
      kondisi : null,
      sector : null,
      jtBulan : null,
      temuan : null,
      statusCompleted :20,
    },

    sub : {
      uicLama : null,
      divisiNew : null,
      uicNew : null,
      auditName : null,
      statusSubRHA : null,
      jthTempo : null,
      thnTemuan : null,
      assignby : null,
      usulClose : null,
      masalah : null,
      pendapat : null,
      lokasi : null,
      nomorSubRHA : null,
      jthTemuan : null,
      statusOpenClose : null,
    },

    tabs: ['RHA Files', 'Evidence Files'],
    tab: null,
    fieldRules: [
      (v) => !!v || 'Field cannot be empty',
    ],
    fileRules: [
      (v) => !v || (v.size < 2_097_152) || 'File size should be less than 5 MB!',
    ],
    dialogId:'',
    getRHA:'',
    temp:'',
    idRHA:'',
    bioEvidence: null,
    IDSubRha: null, 
  };
},

methods: {
  //Operasi CRU
  cekOperasi(){ //ngecek dia add file atau update
    if(this.inputType == 'Add'){
      this.saveFile();
    }else{
      this.updateFileRHA();
    }
  },

  readRHA(){ //Read RHA Files
    var url =  this.$api+'/Rha'
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.rha = response.data;
      for(let i=0; i<this.rha.length; i++){
        this.rha[i].statusInfo[0].statusCompletedPercentage = Math.round(this.rha[i].statusInfo[0].statusCompletedPercentage*100);
      }
      this.loading = false;
    }).catch(error => {
      this.error_message=error;
      this.alert = true;
      this.message = 'RHA is empty!';
      this.color = 'red';
      this.loading = false;
    })
  },

  readSubRHAbyId(id){ //Read Sub RHA Files by ID
    var url = this.$api+'/SubRha/GetByRhaId/'+id
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.subRhaById = response.data.data;
      var status = response.data.status;
      if(status == 'null')
      {
        this.loadingSub = false;
        this.alert = true;
        this.message = 'Sub RHA is empty!';
        this.color = 'red';
      }
      this.loadingSub = false;
    })
  },

  readImage(id){ //Read Sub RHA Files by ID
    var url = this.$api+'/SubRhaImage/ViewImage?subRhaId=' +id
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.imageSubRHA = response.data;
      console.log(this.imageSubRHA)
      // var img = this.subRhaById[0].subRhaimages[2].filePath;
    }).catch(error => {
      this.error_message=error;
      this.alert = true;
      this.message = 'No Image Inserted!';
      this.color = 'red';
    })
  },

  saveFile(){//upload RHA sistem lama
    if (this.$refs.form.validate()) {
      var jt = moment(this.form.jtBulan).locale('id').format('MMMM YYYY');
      // console.log(jt);
      this.formData.append('Uic', this.form.auditee);
      this.formData.append('Kondisi', this.form.kondisi);
      this.formData.append('DirSekor', this.form.sector);
      this.formData.append('StatusJt', jt);
      this.formData.append('formFile', this.file);

      var url = this.$api+'/Rha/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          var temp = response.data.id;
          this.formData = new FormData;
          this.uploadSubRha(temp);
      }).catch(error => {
          this.error_message=error;
          this.alert = true;
          this.message = "Upload RHA failed!";
          this.color="red"
          this.$refs.form.resetValidation();
      })
    }
  },

  uploadSubRha(id){ //Ini upload Sub RHA
    this.formData.append('rhaId',id);
    this.formData.append('file', this.file);
    // console.log(id, this.file)
    var url = this.$api+'/SubRha/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.error_message=response;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.inputType = 'Add';
          this.formData = new FormData;
          this.readRHA();
          this.closeDialog();
      }).catch(error => {
          this.deleteRHA(id);
          this.error_message=error;
          this.alert = true;
          this.message = "RHA file does not match!"
          this.color="red"
      })
  },

  deleteRHA(id){ //delete RHA yang templatenya tidak sesuai
    var url = this.$api + '/Rha/' + id
    this.$http.delete(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.error_message=response;
    })
  },

  uploadFileEvidence(){ //Upload File Evidence
    if(this.file==null && this.bioEvidence==null){
      this.alert = true;
      this.color = 'red';
      this.message = 'Please fill all fields!';
      return 0;
    }else{
      this.formData.append('formFile', this.file);
      this.formData.append('notes',this.bioEvidence);
      this.formData.append('SubRhaId', this.dialogId);
      
      var url = this.$api+'/SubRhaEvidence/Upload'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
      }).then(response => {
          this.error_message=response;
          this.alert = true;
          this.message = "Upload Successfully!"
          this.color="green"
          this.addEvidence = false;
          this.readSubRHAbyId(this.idRHA);
          this.file = '';
          this.inputType = 'Add'
          this.formData = new FormData;
          this.temp = null;
          this.resetForm();
      }).catch(error => {
          this.error_message=error;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.file = '';
          this.inputType = 'Add'
          this.temp = null;
          this.resetForm();
      })
    }
  },

  uploadFileImage(){ //Upload File Image
    if(this.img==null){
      this.alert = true;
      this.color = 'red';
      this.message = 'Please insert your image!';
      return 0;
    }else{
      this.formData.append('image', this.img);
      this.formData.append('id', this.dialogId);
      
      var url = this.$api+'/SubRhaImage/UploadImage'
      this.$http.post(url, this.formData, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
      }).then(response => {
          this.error_message=response;
          this.alert = true;
          this.message = "Upload Image Successfully!"
          this.color="green"
          this.addImage = false;
          this.readSubRHAbyId(this.idRHA);
          this.img = '';
          this.inputType = 'Add'
          this.formData = new FormData;
          this.tempImage = null;
          this.resetForm();
      }).catch(error => {
          this.error_message=error;
          this.alert = true;
          this.message = "Upload failed!"
          this.color="red"
          this.img = '';
          this.inputType = 'Add'
          this.temp = null;
          this.resetForm();
      })
    }
  },

  subRHAHandler(item){ //Handling id RHA untuk read Sub RHA berdasarkan ID tertentu
    this.showSubRHA = true;
    this.idRHA = item.id;
    this.getRHA = item.fileName;
    this.readSubRHAbyId(this.idRHA);
  },

  dialogHandler(item){ //Munculin dialog berdasarkan Id
    this.dialogId = item.id;
    this.addEvidence = true;
    this.temp = 'evidence';
  },

  addImageHandler(item){
    this.addImage = true;
    this.dialogId = item.id;
    this.tempImage = 'imageMasalah';
  },

  updateRHAHandler(rha){ //GET all data RHA
    this.inputType = 'Edit';
    this.idUpdate = rha.id;
    this.form.auditee = rha.uic;
    this.form.kondisi = rha.kondisi;
    this.form.sector = rha.dirSekor;
    this.form.temuan = rha.statusTemuan;
    this.form.jtBulan = moment(new Date(rha.statusJt)).format('YYYY-MM');
    this.addFileNew = true;
  },

  updatesubRHAHandler(subRhaById){ //get All Data subRhA
    this.inputType = 'Edit';
    this.IDSubRha = subRhaById.id;
    this.sub.uicLama = subRhaById.uicLama;
    this.sub.divisiNew = subRhaById.divisiBaru;
    this.sub.uicNew = subRhaById.uicBaru;
    this.sub.auditName = subRhaById.namaAudit;
    this.sub.lokasi = subRhaById.lokasi;
    this.sub.nomorSubRHA = subRhaById.nomor;
    this.sub.masalah = subRhaById.masalah;
    this.sub.pendapat = subRhaById.pendapat;
    this.sub.statusSubRHA = subRhaById.status;
    this.sub.statusOpenClose = subRhaById.openClose;
    this.sub.usulClose = subRhaById.usulClose;
    this.sub.jthTempo = subRhaById.jatuhTempo;
    this.sub.thnTemuan = subRhaById.tahunTemuan;
    this.sub.assignBy = subRhaById.assign;
    this.subRHADialog = true;
  },

  updateSubRHA(){ //Update Sub RHA
    let newData = {
      id : this.IDSubRha,
      divisiBaru : this.sub.divisiNew,
      uicLama : this.sub.uicLama,
      uicBaru : this.sub.uicNew,
      namaAudit : this.sub.auditName,
      lokasi : this.sub.lokasi,
      nomor : this.sub.nomorSubRHA,
      masalah : this.sub.masalah,
      pendapat : this.sub.pendapat,
      status: this.sub.statusSubRHA,
      jatuhTempo : this.sub.jthTempo,
      tahunTemuan :this.sub.thnTemuan,
      assign:this.sub.assignBy,
      usulClose:this.sub.usulClose,
      openClose:this.sub.statusOpenClose
    }
    var url = this.$api+'/SubRha'
    this.$http.put(url, newData, {
      headers: {
        'Content-Type': 'application/json-patch+json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
        this.error_message=response;
        this.alert = true;
        this.message = "Edit Sub RHA Successfully!"
        this.color="green"
        this.inputType = 'Add';
        this.readSubRHAbyId(this.idRHA);
        this.closeDialog();
        this.readRHA();
        this.$refs.form.resetValidation();
    }).catch(error => {
        this.error_message=error.response;
        this.alert = true;
        this.message = "Edit Sub RHA Failed!"
        this.color="red"
    })
  },

  closeDialogUsulClose(){ //buat close dialog usulan close
    this.editUsulClose = false;
    this.usulCloseID = null;
    this.sub.usulClose = null;
  },

  updateFileRHA(){ //Update RHA
    var jt = moment(this.form.jtBulan).locale('id').format('MMMM YYYY');
    this.formData.append('Uic', this.form.auditee);
    this.formData.append('Kondisi', this.form.kondisi);
    this.formData.append('DirSekor', this.form.sector);
    this.formData.append('StatusJt', jt);
    var url = this.$api+'/Rha/' + this.idUpdate;
    this.$http.put(url, this.formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
        this.error_message=response;
        this.alert = true;
        this.message = "Edit RHA Successfully!"
        this.color="green"
        this.inputType = 'Add';
        this.readRHA();
        this.formData = new FormData;
        this.closeDialog();
        this.$refs.form.resetValidation();
    }).catch(error => {
        this.error_message=error.response.data.message;
        this.alert = true;
        this.message = "Edit RHA Failed!"
        this.color="red"
    })
  },

  addUsulClose(item){ //munculin dialog 
    this.usulCloseID = item.id;
    if(item.usulClose != null){
      var tempThn = new Date(item.usulClose).getFullYear();
      var blnThn = [];
      blnThn = item.usulClose.split(' ');
      var bulan = blnThn[0];
      if(bulan == 'Mei')
        bulan = '05';
      else if(bulan == 'Agustus')
        bulan = '08';
      else if(bulan == 'Oktober')
        bulan = '10';
      else if(bulan == 'Desember')
        bulan = '12';
      else  {
        this.sub.usulClose = moment(new Date(item.usulClose)).format('YYYY-MM');
        this.editUsulClose = true;
        return 0;
      }
      var combine = tempThn + '-' + bulan;
      this.sub.usulClose = combine;
    }
    this.editUsulClose = true;
  },
  
  uploadUsulClose(){ //Update Usul Close 
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    var jt = new Date(this.sub.usulClose);
    var url = this.$api + '/SubRha/UpdateUsulClose/' + this.usulCloseID + '?usulClose='+monthNames[jt.getMonth()]+'%20'+jt.getFullYear();

    this.$http.put(url, this.formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
        this.error_message=response;
        this.alert = true;
        this.message = "Add Usul Close Successfully!"
        this.color="green"
        this.inputType = 'Add';
        this.readSubRHAbyId(this.idRHA);
        this.closeDialogUsulClose();
    }).catch(error => {
        this.error_message=error;
        this.alert = true;
        this.message = "Add Usul Close Failed!"
        this.color="red"
    })
  },
  

  //Fungsi Drag n Drop
  onChange(e) {//ngehandle file yang di upload
    var files = e.target.files || e.dataTransfer.files;
    
    if (!files.length) {
      this.dragging = false;
      return;
    }
    if(this.temp=='evidence')
      this.createFileEvidence(files[0]);
    else if(this.tempImage=='imageMasalah')
      this.createFileImage(files[0]);
    else
      this.createFile(files[0]);
  },

  
  handleImage(e){
    var reader = new FileReader();
    reader.onload = (e) => {
      this.img = e.target.result;
    }
    reader.readAsDataURL(e);
    // console.log(this.img)
    // this.createFileImage(this.img[0]);

    // var files = e.target.files || e.dataTransfer.files;
    
    // if (!files.length) {
    //   this.dragging = false;
    //   return;
    // }
    // if(this.temp=='evidence')
    //   this.createFileEvidence(files[0]);
    // else
    //   this.createFile(files[0]);
  },

  createFile(file) {//validasi dan menyimpan file ke variabel this.file
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t != 'xlsx' && t != 'xls') {
      this.alert = true;
      this.message = "Please select xlsx or xls file!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 10000000) {
      this.alert = true;
      this.message = "Please check file size no over 10 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    this.file = file;
    this.dragging = false;
  },

  createFileEvidence(file) {//validasi dan menyimpan file ke variabel this.file (evidence)
    this.file = '';
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t == 'mp4' && t == 'mp3' && t == 'zip') {
      this.alert = true;
      this.message = "Please select other than mp3, mp4, and zip!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 10000000) {
      this.alert = true;
      this.message = "Please check file size no over 5 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    this.file = file;
    this.dragging = false;
  },

   createFileImage(file) {//validasi dan menyimpan file ke variabel this.file (image)
    this.img = '';
    var fileName = file.name
    var t = fileName.split('.').pop();
    if (t != 'jpg' && t != 'jpeg' && t != 'png') {
      this.alert = true;
      this.message = "Please select png, jpg, or jpeg file"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    if (file.size > 10000000) {
      this.alert = true;
      this.message = "Please check file size no over 5 MB!"
      this.color="red"
      this.dragging = false;
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (file) => {
      this.imgView = file.target.result;
    }
    // console.log(this.img)

    this.img = file;
    this.dragging = false;
  },

  removeFile() {//hapus file yang di upload
    this.file = null;
    this.img = null;
    this.imgView = null;
  },


  //Filter berdasarkan tanggal --> MASIH PAKE UpdateAt HEHE :)
  cekTanggal(){
    this.rhaFilter = [];
    for(let x = 0; x<this.rhaIndex.length; x++){
      var bulanDB = new Date(this.rhaIndex[x].updatedAt);
      var rangeAwal = new Date(this.tgl[0]);
      var rangeAkhir = new Date(this.tgl[1]);
      if(bulanDB.getMonth() >= rangeAwal.getMonth() && bulanDB.getMonth() <= rangeAkhir.getMonth()){
        this.rhaFilter.push(this.rhaIndex[x]);
        this.cek='isi';
      }
    }
    return this.rhaFilter;
  },


  //download File
  async downloadHandler(id){ //download RHA 
    axios({
      url: this.$api+'/Rha/Download/'+id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'RHA Files'
      link.click();
    }).catch(console.error);
  },

  getIdEvidence(item){ //get id evidence dari radio button
    this.idEvidence = item;
  },

  async downloadEvidence(){ //download evidence satu satu
    axios({
      url: this.$api+'/SubRhaEvidence/Download/'+this.idEvidence,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence File'
      link.click();
    }).catch(console.error);
  },

  async downloadBundle(item){ //download all evidence
    axios({
      url: this.$api+'/RHAFilesEvidence/GetBundleFiles/'+item.id,
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Evidence All'
      link.click();
    }).catch(console.error);
  },

  async downloadTemplete(){ //download template RHA
    axios({
      url: this.$api+'/Rha/DownloadTemplate',
      method: 'GET',
      responseType: 'blob',
      headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
    }).then((response) => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'RHA Template'
      link.click();
    }).catch(console.error);
  },


  //Fungsi tambahan
  cancel(){  //ngeclose dialog tanggal
    this.tgl=[];
    this.menu2=false;
  },

  back(){ //router page sebelumnya
    this.$router.back();
  },

  closeSubRHA(){ //Nutup dialog sub RHA
    this.showSubRHA = false;
    this.subRhaById = [];
    this.year = null;
    this.date = null;
    this.tempTL = [];
    this.temuanSts = null;
    this.divisi = null;
    this.jTempo = null;
    this.idEvidence = null;
    this.radioGroup = null;
  },

  resetForm(){ //ngereset semua field
    this.form = {
      auditee : null,
      kondisi : null,
      sector : null,
      tahun : null,
      uploadRha : null,
      jt : null,
      action : null,
      temuan : null,
    },
    this.checkbox= false,
    this.file=null;
    this.temp = null;
    this.bioEvidence = null;
    this.formData = new FormData;
    this.dateUsulClose = null;
  },

  closeDialog(){ //ngeclose semua dialog dan meriset validasi
    this.addFile = false;
    this.addFileNew = false;
    this.addEvidence = false;
    this.subRHADialog = false;
    this.file = null;
    this.inputType = 'Add'
    this.temp = null;
    this.resetForm();
    this.$refs.form.resetValidation();
  },

  closeDialogEvidence(){ // close dialog evidence
    this.addEvidence = false;
    this.addFileNew = false;
    this.resetForm();
  },

  closeDialogImage(){
    this.addImage = false;
    this.img = null;
    this.imgView = null;
  },

  save(date) { // ini field filter by tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.year = moment(date).format('YYYY');
    this.menu = false;
  },

  saveRHA(date) { // ini field tahun temuan
    this.$refs.menu.save(date);
    this.$refs.picker.activePicker = 'YEAR';
    this.sub.thnTemuan = moment(date).format('YYYY');
    this.menuThn = false;
  },
  
  //FILTER SUB RHA
  filteredStatus(item) {
    return item.openClose.toLowerCase().includes(this.temuanSts.toLowerCase());
  },
  
  filteredDivisi(item) {
    return item.divisiBaru.toLowerCase().includes(this.divisi.toLowerCase());
  },

  filteredTahun(item){
    return item.tahunTemuan.toString().includes(this.year);
  },

  filteredJT(item){
    return item.statusJatuhTempo.toString().includes(this.jTempo);
  },
},

mounted(){
  this.readRHA();
},

  computed: {
    computedDateFormattedMomentjs() { //mengganti format month picker jatuh tempo
      return this.form.jtBulan ? moment(this.form.jtBulan).locale('id').format('MMMM YYYY') : ''
    },
    
    monthFormattedUsulClose() { //mengganti format month picker usul close
      return this.sub.usulClose ? moment(this.sub.usulClose).locale('id').format('YYYY-MM') : ''
    },

    filterData(){ //ini multiple filter
      var items = [];
      if(this.temuanSts)
        items.push(this.filteredStatus);
      if(this.divisi)
        items.push(this.filteredDivisi);
      if(this.year)
        items.push(this.filteredTahun);
      if(this.jTempo)
        items.push(this.filteredJT);
      
      if(items.length > 0 ){
        return this.subRhaIndex.filter((i) => {
          return items.every((data) => {
            return data(i);
          })
        })
      }
      return this.subRhaIndex;
    },
    
    formTitle() {
      return this.inputType
    },

    subRhaIndex() { //Ini munculin nomor tabel untuk subRHA by ID
      if(this.subRhaById != null){
        return this.subRhaById.map(
          (subRhaById, no) => ({
            ...subRhaById,
            no: no + 1
          }))
      }else
        return 0;
    },

    subRhaFilter() { //Ini munculin nomor tabel untuk subRHA by ID yang difilter
      if(this.subFilter != null){
        return this.subFilter.map(
          (subFilter, no) => ({
            ...subFilter,
            no: no + 1
          }))
      }else
        return 0;
    },
    
    rhaIndexNew() { //Ini munculin nomor table untuk RHA dan evidence
      return this.rha.map(
        (rha, index) => ({
          ...rha,
          index: index + 1
        }))
    },
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    },
    menuThn (val) {
      val && this.$nextTick(() => (this.activePicker = 'YEAR'))
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding: 0px !important;
}

.v-label {
  font-size: 14px;
}

.judul{
  color:#005E6A;
  font-family: 'Secular One', sans-serif;
  font-size:x-large;
}

.title{
  color:#005E6A;
  font-size:xx-large;
}
.path{
  color:#005E6A;
  font-family: 'Questrial', sans-serif;
}

.dropZone {
  width: 100%;
  height: 100px;
  position: relative;
  border: 3px dashed #ffc9b5;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 100px;
  position: relative;
  border: 2px dashed #ffc9b5;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
