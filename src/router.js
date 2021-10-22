import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

function importComponent(path) {
    return () => import (`./components/${path}.vue`)
}

const router = new VueRouter({
    mode: "hash",
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
                if(localStorage.getItem('role') == 'ADMIN' || localStorage.getItem('role') == 'AMGR'){
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
                    name : "MonitoringGovernance",
                    meta : {title: 'MonitoringGovernance'},
                    component : importComponent('Monitoring/MonitoringGov'),
                },
                {
                    path : "/monitoringRPTIAdmin",
                    name : "MonitoringRPTI",
                    meta : {title: 'MonitoringRPTI'},
                    component : importComponent('Monitoring/MonitoringRPTI'),
                },
                {
                    path : "/repRPTIAdmin",
                    name : "ReportingRPTIAdmin",
                    meta : {title: 'ReportingRPTIAdmin'},
                    component : importComponent('Reporting/ReportingRPTI'),
                },
                {
                    path : "/repRevisiAdmin",
                    name : "ReportingRevisiAdmin",
                    meta : {title: 'ReportingRevisiAdmin'},
                    component : importComponent('Reporting/ReportingRevisi'),
                },
                {
                    path : "/repInsertionAdmin",
                    name : "ReportingInsertionAdmin",
                    meta : {title: 'ReportingInsertionAdmin'},
                    component : importComponent('Reporting/ReportingInsertion'),
                },
                {
                    path : "/repAuditAdmin",
                    name : "ReportingAuditAdmin",
                    meta : {title: 'ReportingAuditAdmin'},
                    component : importComponent('Reporting/ReportingAudit'),
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
                    component : importComponent('RHAListTL'),
                },
                // {
                //     path : "/EvidenceAdmin",
                //     name : "EvidenceAdmin",
                //     meta : {title: 'EvidenceAdmin'},
                //     component : importComponent('Evidence'),
                // },
                {
                    path : "/auditAdmin",
                    name : "AuditAdmin",
                    meta : {title: 'AuditAdmin'},
                    component : importComponent('Audit'),
                },
                {
                    path : "/guidedAdmin",
                    name : "GuidedAdmin",
                    meta : {title: 'GuidedAdmin'},
                    component : importComponent('Guided'),
                },
                {
                    path : "/FAQRHAAdmin",
                    name : "FAQRHA",
                    meta : {title: 'FAQRHA'},
                    component : importComponent('FAQ/UploadRHAFAQ'),
                },
                {
                    path : "/FAQEvidenceRHA",
                    name : "FAQEvidenceRHA",
                    meta : {title: 'FAQEvidenceRHA'},
                    component : importComponent('FAQ/UploadEvidenceRHA'),
                },
                {
                    path : "/FAQInputTL",
                    name : "FAQInputTL'",
                    meta : {title: 'FAQInputTL'},
                    component : importComponent('FAQ/UploadTL'),
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
                    path : "/monitoringGov",
                    name : "Monitoring",
                    meta : {title: 'Monitoring'},
                    component : importComponent('Monitoring/MonitoringGov'),
                },
                {
                    path : "/monitoringRPTIGov",
                    name : "Monitoring RPTI",
                    meta : {title: 'Monitoring'},
                    component : importComponent('Monitoring/MonitoringRPTI'),
                },
                {
                    path : "/repRPTIGov",
                    name : "ReportingRPTIGov",
                    meta : {title: 'ReportingRPTIGov'},
                    component : importComponent('Reporting/ReportingRPTI'),
                },
                {
                    path : "/repRevisiGov",
                    name : "ReportingRevisiGov",
                    meta : {title: 'ReportingRevisiGov'},
                    component : importComponent('Reporting/ReportingRevisi'),
                },
                {
                    path : "/repInsertionGov",
                    name : "ReportingInsertionGov",
                    meta : {title: 'ReportingInsertionGov'},
                    component : importComponent('Reporting/ReportingInsertion'),
                },
                {
                    path : "/repAuditGov",
                    name : "ReportingAuditGov",
                    meta : {title: 'ReportingAuditGov'},
                    component : importComponent('Reporting/ReportingAudit'),
                },
                {
                    path : "/RHA",
                    name : "RHA",
                    meta : {title: 'Upload RHA'},
                    component : importComponent('UploadRHA'),
                },
                // {
                //     path : "/checklist",
                //     name : "Checklist",
                //     meta : {title: 'Checklist Project'},
                //     component : importComponent('ChecklistProject'),
                // },
                // {
                //     path : "/GovernanceProject",
                //     name : "Gov",
                //     meta : {title: 'GovernanceProject'},
                //     component : importComponent('GovernanceProject'),
                // },
                {
                    path : "/guidedGOV",
                    name : "GuidedGOV",
                    meta : {title: 'GuidedGOV'},
                    component : importComponent('Guided'),
                },
                {
                    path : "/FAQRHAGOV",
                    name : "FAQRHAGOV",
                    meta : {title: 'FAQRHAGOV'},
                    component : importComponent('FAQ/UploadRHAFAQ'),
                },
                {
                    path : "/FAQEvidenceRHAGOV",
                    name : "FAQEvidenceRHAGOV",
                    meta : {title: 'FAQEvidenceRHAGOV'},
                    component : importComponent('FAQ/UploadEvidenceRHA'),
                },
                {
                    path : "/FAQInputTLGOV",
                    name : "FAQInputTLGOV'",
                    meta : {title: 'FAQInputTLGOV'},
                    component : importComponent('FAQ/UploadTL'),
                },
            ]
        },
        
        //AKSES MANAGEMENT
        {
            path : "/slidebarMgr",
            component: () => import( './layout/SlideBarMgr.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'MGR' || localStorage.getItem('role') == 'AVP'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/homeMgr",
                    name : "HomeMgr",
                    meta : {title: 'HomeMgr'},
                    component : importComponent('HomeMgr'),
                },
                {
                    path : "/inputTLMgr",
                    name : "InputTLMgr",
                    meta : {title: 'inputTLMgr'},
                    component : importComponent('RHAListTL'),
                },
                {
                    path : "/RHAMgr",
                    name : "RHAMgr",
                    meta : {title: 'RHAMgr'},
                    component : importComponent('UploadRHA'),
                },
                {
                    path : "/guidedMgr",
                    name : "GuidedMgr",
                    meta : {title: 'GuidedMgr'},
                    component : importComponent('Guided'),
                },
                {
                    path : "/FAQRHAPM",
                    name : "FAQRHAPM",
                    meta : {title: 'FAQRHAPM'},
                    component : importComponent('FAQ/UploadRHAFAQ'),
                },
                {
                    path : "/FAQEvidenceRHAPM",
                    name : "FAQEvidenceRHAPM",
                    meta : {title: 'FAQEvidenceRHAPM'},
                    component : importComponent('FAQ/UploadEvidenceRHA'),
                },
                {
                    path : "/FAQInputTLPM",
                    name : "FAQInputTLPM'",
                    meta : {title: 'FAQInputTLPM'},
                    component : importComponent('FAQ/UploadTL'),
                },
                {
                    path : "/monitoringMGR",
                    name : "MonitoringMGR",
                    meta : {title: 'MonitoringMGR'},
                    component : importComponent('Monitoring/MonitoringGov'),
                },
                {
                    path : "/monitoringRPTIMGR",
                    name : "MonitoringRPTIMGR",
                    meta : {title: 'MonitoringRPTIMGR'},
                    component : importComponent('Monitoring/MonitoringRPTI'),
                },
                {
                    path : "/repRPTIMGR",
                    name : "ReportingRPTIMGR",
                    meta : {title: 'ReportingRPTIMGR'},
                    component : importComponent('Reporting/ReportingRPTI'),
                },
                {
                    path : "/repRevisiMGR",
                    name : "ReportingRevisiMGR",
                    meta : {title: 'ReportingRevisiMGR'},
                    component : importComponent('Reporting/ReportingRevisi'),
                },
                {
                    path : "/repInsertionMGR",
                    name : "ReportingInsertionMGR",
                    meta : {title: 'ReportingInsertionMGR'},
                    component : importComponent('Reporting/ReportingInsertion'),
                },
                {
                    path : "/repAuditMGR",
                    name : "ReportingAuditMGR",
                    meta : {title: 'ReportingAuditMGR'},
                    component : importComponent('Reporting/ReportingAudit'),
                },
            ]
        },

        //AKSES PM
        {
            path : "/slidebarPM",
            component: () => import( './layout/SlideBarPM.vue'),
            meta: { requiresAuth: true },
            beforeEnter(to, from, next){
                if(localStorage.getItem('role') == 'OS'){
                    next();
                }else{
                    alert('!! Restricted Access !!'),
                    next(false);
                }
            },
            children : [
                {
                    path : "/homeOS",
                    name : "homeOS",
                    meta : {title: 'HomeOS'},
                    component : importComponent('HomeOS'),
                },
                {
                    path : "/checklistOS",
                    name : "ChecklistOS",
                    meta : {title: 'Checklist Project'},
                    component : importComponent('ChecklistProject'),
                },
                {
                    path : "/GovernanceProjectOS",
                    name : "GovOS",
                    meta : {title: 'GovernanceProject'},
                    component : importComponent('GovernanceProject'),
                },
                {
                    path : "/RHAOS",
                    name : "RHAOS",
                    meta : {title: 'RHA'},
                    component : importComponent('UploadRHA'),
                },
                {
                    path : "/auditOS",
                    name : "AuditOS",
                    meta : {title: 'Audit OS'},
                    component : importComponent('Audit'),
                },
                {
                    path : "/InputTLOS",
                    name : "TLOs",
                    meta : {title: 'Input Tindak Lanjut'},
                    component : importComponent('RHAListTL'),
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
                    component : importComponent('HomePIC'),
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
                    component : importComponent('RHAListTL'),
                },
                // {
                //     path : "/Evidence",
                //     name : "Evidence",
                //     meta : {title: 'Evidence'},
                //     component : importComponent('Evidence'),
                // },
                {
                    path : "/guidedPIC",
                    name : "GuidedPIC",
                    meta : {title: 'GuidedPIC'},
                    component : importComponent('Guided'),
                },
                {
                    path : "/FAQRHAPIC",
                    name : "FAQRHAPIC",
                    meta : {title: 'FAQRHAPIC'},
                    component : importComponent('FAQ/UploadRHAFAQ'),
                },
                {
                    path : "/FAQEvidenceRHAPIC",
                    name : "FAQEvidenceRHAPIC",
                    meta : {title: 'FAQEvidenceRHAPIC'},
                    component : importComponent('FAQ/UploadEvidenceRHA'),
                },
                {
                    path : "/FAQInputTLPIC",
                    name : "FAQInputTLPIC'",
                    meta : {title: 'FAQInputTLPIC'},
                    component : importComponent('FAQ/UploadTL'),
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