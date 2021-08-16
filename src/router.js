import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

function importComponent(path) {
    return () => import (`./components/${path}.vue`)
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: importComponent('Login'),
        },
        {
            path: "/forgotPass",
            name: "ForgotPass",
            component: importComponent('ForgotPass'),
        },
        {
            path: "/confirmation",
            name: "Confirmation",
            component: importComponent('Email'),
        },

        //AKSES MASTER ADMIN
        {
            path : "/slideBarAdmin",
            component: () => import( './layout/SlideBarMaster.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'ADMIN'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/homeAdmin",
                    name : "HomeAdmin",
                    meta : {title: 'HomeAdmin'},
                    component : importComponent('Home'),
                },
                {
                    path : "/monitoringAdmin",
                    name : "MonitoringAdmin",
                    meta : {title: 'MonitoringAdmin'},
                    component : importComponent('Monitoring'),
                },
                {
                    path : "/reportingAdmin",
                    name : "ReportingAdmin",
                    meta : {title: 'ReportingAdmin'},
                    component : importComponent('Reporting'),
                },
                {
                    path : "/RHAAdmin",
                    name : "RHAAdmin",
                    meta : {title: 'Upload RHA Admin'},
                    component : importComponent('UploadRHA'),
                },
                {
                    path : "/checklistAdmin",
                    name : "ChecklistAdmin",
                    meta : {title: 'Checklist Project Admin'},
                    component : importComponent('ChecklistProject'),
                },
                {
                    path : "/GovernanceProjectAdmin",
                    name : "GovAdmin",
                    meta : {title: 'GovernanceProjectAdmin'},
                    component : importComponent('GovernanceProject'),
                },
                {
                    path : "/InputTLAdmin",
                    name : "TLAdmin",
                    meta : {title: 'Input Tindak Lanjut Admin'},
                    component : importComponent('InputTL'),
                },
                {
                    path : "/EvidenceAdmin",
                    name : "EvidenceAdmin",
                    meta : {title: 'EvidenceAdmin'},
                    component : importComponent('Evidence'),
                },
                {
                    path : "/auditAdmin",
                    name : "AuditAdmin",
                    meta : {title: 'AuditAdmin'},
                    component : importComponent('Audit'),
                },
            ]
        },

        //AKSES GOV
        {
            path : "/slideBar",
            component: () => import( './layout/SlideBar.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'GOV'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/home",
                    name : "Home",
                    meta : {title: 'Home'},
                    component : importComponent('Home'),
                },
                {
                    path : "/monitoring",
                    name : "Monitoring",
                    meta : {title: 'Monitoring'},
                    component : importComponent('Monitoring'),
                },
                {
                    path : "/reporting",
                    name : "Reporting",
                    meta : {title: 'Reporting'},
                    component : importComponent('Reporting'),
                },
                {
                    path : "/RHA",
                    name : "RHA",
                    meta : {title: 'Upload RHA'},
                    component : importComponent('UploadRHA'),
                },
                {
                    path : "/checklist",
                    name : "Checklist",
                    meta : {title: 'Checklist Project'},
                    component : importComponent('ChecklistProject'),
                },
                {
                    path : "/GovernanceProject",
                    name : "Gov",
                    meta : {title: 'GovernanceProject'},
                    component : importComponent('GovernanceProject'),
                },
            ]
        },
        
        //AKSES MANAGEMENT
        {
            path : "/slidebarMgr",
            component: () => import( './layout/SlideBarMgr.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'MANAGEMENT'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/monitoringMGR",
                    name : "MonitoringMGR",
                    meta : {title: 'MonitoringMGR'},
                    component : importComponent('MonitoringMgr'),
                },
                {
                    path : "/reportingMgr",
                    name : "ReportingMgr",
                    meta : {title: 'ReportingMgr'},
                    component : importComponent('Reporting'),
                },
            ]
        },

        //AKSES PM
        {
            path : "/slidebarPM",
            component: () => import( './layout/SlideBarPM.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'PM'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/homePM",
                    name : "homePM",
                    meta : {title: 'HomePM'},
                    component : importComponent('Home'),
                },
                {
                    path : "/checklistPM",
                    name : "ChecklistPM",
                    meta : {title: 'Checklist Project'},
                    component : importComponent('ChecklistProject'),
                },
                {
                    path : "/GovernanceProjectPM",
                    name : "GovPM",
                    meta : {title: 'GovernanceProject'},
                    component : importComponent('GovernanceProject'),
                },
                {
                    path : "/RHAPM",
                    name : "RHAPM",
                    meta : {title: 'RHA'},
                    component : importComponent('UploadRHA'),
                },
            ]
        },

        //AKSES PIC
        {
            path : "/slidebarPIC",
            component: () => import( './layout/SlideBarPIC.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'PIC'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/homePIC",
                    name : "homePIC",
                    meta : {title: 'HomePIC'},
                    component : importComponent('Home'),
                },
                {
                    path : "/audit",
                    name : "Audit",
                    meta : {title: 'Audit'},
                    component : importComponent('Audit'),
                },
                {
                    path : "/InputTL",
                    name : "TL",
                    meta : {title: 'Input Tindak Lanjut'},
                    component : importComponent('InputTL'),
                },
                {
                    path : "/Evidence",
                    name : "Evidence",
                    meta : {title: 'Evidence'},
                    component : importComponent('Evidence'),
                },
            ]
        },
        {
            path :'/*',
            redirect : '/'
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (localStorage.getItem('token') === null) {
        next({ name: 'login' })
      } else {
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })
export default router;