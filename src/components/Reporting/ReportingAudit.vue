<template>
  <v-app>
    <v-main>
      <v-toolbar-title class="title text-left font-weight-bold ml-6 mb-5">
        <v-row no-gutters>
          <v-col cols="10" sm="11" md="11">
            <p class="mb-0 judul font-weight-bold">LAPORAN AUDIT</p>
            <v-breadcrumbs :items="routing" class="pa-0 textTable warna">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-toolbar-title>

      <v-row class="mx-2">
        <v-col cols="12" sm="8" md="8">
          <v-card class="px-5" elevation="2" outlined style="overflow : auto">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <v-row class="mb-3">
                <v-col cols="12" sm="5" md="5">
                  <p class="greetings mt-2 mb-0">Details RHA</p>
                </v-col>
                <v-col cols="6" sm="5" md="5">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search RHA"
                    class="textTable"
                    color="#26A69A"
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details
                    dense>
                  </v-text-field>
                </v-col>
                <v-col cols="6" sm="2" md="2" class="pr-0">
                  <v-select
                    v-model="filterStatus"
                    :items = "daftarStatus"
                    label ="Status"
                    class="textTable"
                    color="#26A69A"
                    solo
                    flat
                    background-color="#EEEEEE"
                    filled
                    hide-details
                    dense>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="headerGrafik"
              :items="filterData"
              :search = "search"
              class="textTable"
              item-key = "nomor"  
              :items-per-page="5">
              <template v-slot:[`item.status`]="{ item }">
                <v-chip color="green" v-if="item.status=='Completed'" outlined label dark>
                  {{ item.status}}
                </v-chip>
                <v-chip color="red" v-else outlined label dark>
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-card class="px-5" outlined style="height:437px" elevation="2">
            <v-card-title class="flex-nowrap pt-6 pb-0">
              <p class="greetings mt-2">Pie Chart</p>
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="350"
                    type="pie"
                    :options="apexPie.options"
                    :series="apexPie.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br>
      <br>
      <br>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
import ApexChart from "vue-apexcharts";

Vue.component('downloadExcel', JsonExcel)

export default {
name : "Audit",
components: {
  ApexChart
},
created () {
  document.title = "Reporting Audit";
},
data() {
  return {
    reportCount: null,
    error_message:'',
    loading:true,
    search : null,
    filterStatus : null,

    //List Array
    tgl: [],
    expanded:[],
    arrayReport:[],
    dataGrafik:[],
    rhaPending:[],
    rhaDone:[],
    audit:[],
    rha:[],
    dataG :[],
    pieChart:[],
    daftarStatus:['Completed','Uncomplete'],

    headerGrafik : [
      {
        text : "No",
        align : "center",
        sortable : true,
        value : "id",
        class : "orange accent-3 white--text"
      },
      { text : "File Name", align : "center", value : "fileName", class : "orange accent-3 white--text"},
      { text : "Status", align : "center", value : "status", class : "orange accent-3 white--text"},
    ],

    routing: [
      {
        text: 'Home',
        disabled: false,
      },
      {
        text: 'Laporan Audit',
        disabled: true,
      },  
    ],

    apexPie: {
      options: {
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }
        },
        colors: ['#DD2C00', '#00C853'],
        labels: ["Uncomplete", "Completed"],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
        tooltip: {
          enabled: false,
        }
      },
      series : [],
    },
  };
},
methods: {
    readReportingAudit(){ //Read Status Audit
    var url = this.$api+'/Rha/GetStatusRha' 
    this.$http.get(url,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.statusaudit = response.data;
    })
  },

  readPieChart(){ //Read project status for pie chart
    this.apexPie.series = [];
    var url =  this.$api+'/Rha/GetStatusRha' 
    this.$http.get(url,{
      headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => { 
      this.pieChart = response.data;
      this.apexPie.series.push(this.pieChart.percentageUncompleteRha,this.pieChart.percentageCompletedRha,)
    })
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
      var list={};
      var index = 1;
      var status = null;
      this.rha.forEach(i =>{
        i.statusInfo[0].statusCompletedPercentage = Math.round(i.statusInfo[0].statusCompletedPercentage*100);
        
        if(i.statusInfo[0].statusCompletedPercentage == 100)
          status = 'Completed';
        else
          status = 'Uncomplete';

        list = {
          id : index,
          fileName : i.fileName,
          status : status
        }

        index += 1;

        this.dataG.push(list);
      })
      this.loading = false;
    }).catch(error => {
      this.error_message=error;
      this.alert = true;
      this.message = 'RHA is empty!';
      this.color = 'red';
      this.loading = false;
    })
  },
  
  filteredStatus(item) {
    return item.status.toLowerCase().includes(this.filterStatus.toLowerCase());
  },
},
  computed:{
    filterData(){ //ini multiple filter
      var items = [];
      if(this.filterStatus)
        items.push(this.filteredStatus);
      
      if(items.length > 0 ){
        return this.dataG.filter((i) => {
          return items.every((data) => {
            return data(i);
          })
        })
      }
      return this.dataG;
    },
  },
  mounted(){
    this.readReportingAudit();
    this.readPieChart();
    this.readRHA();
  },
};
</script>

<style scope>
.v-toolbar__content {
  padding: 0px !important;
}

.judul{
    color:#005E6A;
    font-family: 'Secular One', sans-serif;
}
.title{
    color:#005E6A;
}

.greetings{
  color:#F15A23;
  font-family: 'Questrial', sans-serif;
}

@media screen and (max-width: 600px) {
  .title{
  font-size: medium;
  }
}

.warna{
  color:#2196F3;
}
</style>
