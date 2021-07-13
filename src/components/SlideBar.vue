<template>
    <div class="dashboard">
        <v-navigation-drawer dark v-model="drawer" color="#005E6A" permanent class="fullheight" :mini-variant.sync="mini" app>
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

        <v-app-bar app dense fixed height="75px" color="white" elevate-on-scroll>
            <v-toolbar class="ml-8" flat color="white">
                <v-toolbar-title class="text-bold">
                    
                </v-toolbar-title>
                <v-spacer></v-spacer>
                {{username}}
            </v-toolbar>
        </v-app-bar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
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
            username : localStorage.getItem('email'),
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
        color: black;
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