<template>
<v-app id="inspire">
      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app color="#005E6A">

        <!-- <v-list-item class="d-lg-none" @click.stop="drawer = !drawer">
          <v-list-item-title>Close</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>
        </v-list-item> -->

        <v-list-item class="d-lg-none" @click.stop="drawer = !drawer"> 
                <v-list-item-avatar>
                    <img src="../assets/gesit.png">
                </v-list-item-avatar>
                
                <v-list-item-title style="font-weight:bolder; font-size:x-large;">GESIT</v-list-item-title>
                <v-list-item-icon>
                    <v-icon color="white">mdi-chevron-left</v-icon>
                </v-list-item-icon>
            </v-list-item>

        <v-divider class="d-lg-none"></v-divider>

        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" x-large text outlined block class="px-2">
                    {Company logo}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item link>
                    Change
                  </v-list-item>
                  <v-list-item link>
                    Manage
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list dense>
          <v-list-item-group 
                    v-model="selectedItem"
                    color="#FF4400">
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        tag="router-link"
                        :to="item.to">
                        <v-list-item-icon>
                            <v-icon style="color:white;">{{item.icon}}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="font-size:medium;color:white;padding:5px;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
        </v-list>
        <template v-slot:append>
                <v-list>
                    <v-list-item link @click="modalLogout = true">
                        <v-list-item-icon>
                            <v-icon style="color:white;">mdi-logout</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title style="color:white;">Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
      </v-navigation-drawer>
      <v-dialog v-model="modalLogout" persistent max-width="400px">
            <v-card>
                <v-card class="kotak" tile color="#5F8286" align="center">
                    <br>
                    <h3> Log Out </h3>
                </v-card>
                <h4 class="text-center mt-10">Are you sure to log out?</h4>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color = "black"
                        text
                        @click="modalLogout = false">
                        Cancel
                    </v-btn>
                    <v-btn
                        color="#5F8286"
                        depressed 
                        dark 
                        @click="logOut()">
                        Logout
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

      <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-app-bar-nav-icon>
        <span style="width: 300px" class="d-none d-sm-inline">
          
            <v-list-item-avatar >
                    <img src="../assets/gesit.png" style="width:100%; height:100%;">
                </v-list-item-avatar>
         
        </span>
        <v-spacer></v-spacer>
        
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-menu offset-y >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" elevation="0" icon class="d-inline d-md-none">
              <v-avatar color="primary" size="30">
                <img src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"/>
              </v-avatar>
            </v-btn>
          </template>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" large text outlined class="px-2 ml-3 d-none d-md-inline">
              <v-avatar color="primary" size="30">
                <img src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"/>
              </v-avatar>
              <span class="pl-3 d-none d-md-inline">{Username}</span>
            </v-btn>
          </template>
          <!-- <v-list>
            <v-list-item link @click="modalLogout = true">
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list> -->
        </v-menu>
      </v-app-bar>
      <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </v-app>



    <!-- <div class="dashboard"> -->
        <!-- <v-navigation-drawer dark v-model="drawer" color="#005E6A" permanent class="fullheight" :mini-variant.sync="mini" app>
            <v-list-item class="px-2 py-5"> 
                <v-list-item-avatar>
                    <img src="../assets/gesit.png">
                </v-list-item-avatar>
                
                <v-list-item-title style="font-weight:bolder; font-size:x-large;">GESIT</v-list-item-title>
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>
            
            <v-list dense nav>
                <v-list-item-group 
                    v-model="selectedItem"
                    color="#fffcdc">
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        tag="router-link"
                        :to="item.to">
                        <v-list-item-icon>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="font-size:medium;"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <v-list>
                    <v-list-item link @click="modalLogout = true">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        

        <v-app-bar app dense fixed height="75px" color="white" elevate-on-scroll>
            <v-toolbar class="ml-8" flat color="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-badge color="pink" dot>
                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
                <v-btn icon dark>
                    <v-avatar color="indigo" size="32">
                        <v-icon>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                </v-btn>
            </v-toolbar>
        </v-app-bar> -->

        <!-- <div class="fullheight pa-5">
            <router-view></router-view>
        </div> -->
    <!-- </div> -->
</template>

<script>
export default {
    name: "Dashboard",
        data() {
            return {
            modalLogout : false,
            title: null,
            selectedStok: false,
            selectedItem: 0,
            drawer: true,
            selected: false,
            items: [
                { title: "Home", icon:"mdi-view-dashboard", to: "/home"},
                { title: "Monitoring", icon:"mdi-monitor", to: "/monitoring"},
                { title: "Reporting", icon:"mdi-clipboard-list", to: "/reporting"}
            ],
            mini: true
        };
    },
    methods:{
        logOut(){
            this.color="red"
            this.snackbar=true;
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
    },
    computed: {
        formTitle() {
            return this.items.title
        },
    },
};
</script>

<style scoped>
    .kotak{
        height:70px;
    }

    .fullheight {
        min-height: 100vh !important;
    }
    .router {
        text-decoration: none;
        color: rgb(128, 112, 112);
    }
    .gambar{
        position: absolute;
        width: 40px;
        height: 43px;
        left: 65px;
        top: 17px;
    }
    h2{
        position: absolute;
        left:45%;
        top: 30%;
    }
</style>