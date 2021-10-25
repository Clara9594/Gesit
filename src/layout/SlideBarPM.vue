<template>
    <v-app id="inspire">
        <!--Ini slide bar kiri-->
        <v-navigation-drawer v-model="drawer" class="fullheight" dark app :mini-variant.sync="mini" height="100%" mini-variant-width="90" color="#095866">
            <v-list>
               <v-list-item class="pb-0" v-if="mini!=true"> 
                    <v-list-item-content class="pb-0">
                        <v-list-item-avatar tile width="150" size="58">
                            <img src="../assets/gesit.png">
                        </v-list-item-avatar>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="pb-0" v-else> 
                    <v-list-item-content class="pb-0">
                        <v-list-item-avatar size="58">
                            <img src="../assets/iconGesit.png">
                        </v-list-item-avatar>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            
            <v-list dense>
                
                <v-list-item-group v-model="selectedItem" color="#FFFFFF">
                    <v-list-item
                        link
                        class="textTable"
                        dark
                        tag="router-link"
                        :to="'/homeOS'" 
                        @click.stop="mini = !mini">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title style="font-size:medium;padding:5px;">Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

                <v-list-item-group 
                    v-model="selectedItem"
                    color="#FFFFFF">

                    <v-list-item
                        v-for="item in menuUtama"
                        :key="item.title"
                        link
                        tag="router-link"
                        :to="item.to"
                        @click.stop="mini = !mini"
                        class="textTable"
                        dark>
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" class="text-sm-left" style="font-size:medium;padding:5px;"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

            </v-list>
            <!--
            <template v-slot:append>
                <v-list>
                    <v-list-item 
                        link 
                        :to="'/guidedOS'"
                        @click.stop="mini = !mini" 
                        class="textTable"
                        dense
                        dark
                        tag="router-link">
                        <v-list-item-icon>
                            <v-icon>mdi-help-box</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title style="font-size:medium;padding:5px;">Guidence</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>-->
        </v-navigation-drawer>
        
        <!--Ini navbar-->
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#fffcf5" flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-app-bar-nav-icon>
            
            <v-spacer></v-spacer>

            <div class="text-center">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on" >
                            <v-avatar color="primary" size="30" class="mr-2">
                                <img :src="'https://ui-avatars.com/api/?name=' + user_login">
                            </v-avatar>
                            {{firstName}}
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                     <img :src="'https://ui-avatars.com/api/?name=' + user_login" alt="John" >
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title class="textTable">{{user_login}}</v-list-item-title>
                                    <v-list-item-subtitle class="textTable">{{role}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav" class="textTable">
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#005E6A" text @click="logOut()">
                                Log Out
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div>
        </v-app-bar>

        <!-- Ini konten-->
        <div class="fullheight">
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "Dashboard",
        data() {
            return {
            fav: true,
            menu: false,
            message: false,
            hints: true,
            user_login: localStorage.getItem('name'),
            role: localStorage.getItem('role'),
            firstName: '',
            modalLogout : false,
            title: null,
            selectedRep: false,
            selectedItem: false,
            selectedFAQ: false,
            drawer: true,
            selected: false,
            menuUtama: [
                { title: "Governance Project", icon:"mdi-check-underline", to: "/GovernanceProjectOS"},
                { title: "Temuan Audit", icon:"mdi-book", to: "/auditOS"}
            ],
            mini: true,
            username: null,
        };
    },
    methods:{
        logOut(){
            this.color="red"
            this.snackbar=true;
            localStorage.removeItem('npp');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('kodeAIP');
            localStorage.removeItem('category');
            localStorage.removeItem('judul');
            this.$router.push('/login')
        },
         getName(){
            var myArr = [];
            myArr = localStorage.getItem('name').split(' ');
            this.firstName = myArr[0];
            // console.log(this.firstName)
           // return this.firstName;
        }
    },
    computed: {
        formTitle() {
            return this.items.title
        },
       
    },
    mounted(){
        this.getName();
    }
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