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
        {
            path : "/slideBar",
            component : importComponent('SlideBar'),
            meta: { requiresAuth: true },
            // beforeEnter(to, from, next){
            //     if(localStorage.getItem('email').localeCompare('john.doe@gmail.com') == 0){
            //         next();
            //     }else{
            //         alert('!! Restricted Access !!'),
            //         next(false);
            //     }
            // },
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
            ]
        },
        
        // //Akses student
        // {
        //     path : "/slidebar",
        //     component : importComponent('slideBar'),
        //     meta: { requiresAuth: true },
        //     // beforeEnter(to, from, next){
        //     //     if(localStorage.getItem('email').localeCompare('john.doe@gmail.com') != 0){
        //     //         next();
        //     //     }else{
        //     //         alert('!! Restricted Access !!'),
        //     //         next(false);
        //     //     }
        //     // },
        //     children : [
        //         {
        //             path : "/profile",
        //             name : "profile",
        //             meta : {title :'Profile'},
        //             component : importComponent('Profile'),
        //         },
        //         {
        //             path : "/studentscourses",
        //             name : "studentcourses",
        //             meta : {title :'Students Courses'},
        //             component : importComponent('CoursesStudents'),
        //         },
        //         {
        //             path : "/enrollmentsStudent",
        //             name : "Enrollments",
        //             meta : {title: 'Enrollment'},
        //             component : importComponent('EnrollmentsStudents'),
        //         }
        //     ]
        // },
        {
            path :'/*',
            redirect : '/'
        },
    ],
});
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       // this route requires auth, check if logged in
//       // if not, redirect to login page.
//       if (localStorage.getItem('token') === null) {
//         next({ name: 'login' })
//       } else {
//         next() // go to wherever I'm going
//       }
//     } else {
//       next() // does not require auth, make sure to always call next()!
//     }
//   })
export default router;