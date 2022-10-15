import React from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import Axios from 'axios';
import { toast } from "react-toastify";
import { setAuthToken } from "../services/setAuthToken";

//http://restapi.adequateshop.com
// /api/authaccount/registration
// /api/authaccount/login

function LoginForm(props){
    const initialValues={
        email:'',
        password:''
    }
    const validationSchema=Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    })

    const onSubmit=(values)=>{
        console.log('Form data',values)
        const loginPayload={
            email:values.email,
            password:values.password
        }
        console.log(loginPayload)
        Axios.post('login',loginPayload)
        .then(
            (response)=>{
                console.log(response.data.token)
                const token = response.data.token;

                sessionStorage.setItem("token",token)
                setAuthToken(token)
                props.closing()
            }
            //(resp) => {
            //     const data = resp.data
            //     console.log(data)
            //     if (data.code !== 0) {
            //         //closeModalLogin()
            //         toast.error(data.message, { position: toast.POSITION.TOP_CENTER })
            //     }
            //     else {
            //         localStorage.setItem('data', JSON.stringify(data.message))
            //         localStorage.removeItem('college_list')

            //         Axios.get('https://mainapi.springfest.in/api/event/get_events')
            //             .then((resp) => {
            //                 var eventsid = {}
            //                 var msg = resp.data.message
            //                 console.log(msg)
            //                 for (var i = 0; i < msg.length; i++) {
            //                     var evs = msg[i].events
            //                     for (var j = 0; j < evs.length; j++)
            //                         eventsid[evs[j].name] = evs[j].id
            //                 }
            //                 localStorage.setItem("events", JSON.stringify(eventsid))
            //                 Axios.get("https://mainapi.springfest.in/api/event/get_all_event_details")
            //                     .then(res => {
            //                         if (res.data.code === 0) {
            //                             const evsdetailsresp = res.data.message
            //                             var evsdetails = {}
            //                             var evstype = {}
            //                             for (var i = 0; i < evsdetailsresp.length; i++) {

            //                                 const cat = evsdetailsresp[i].category
            //                                 evsdetails[cat] = {}
            //                                 for (var j = 0; j < evsdetailsresp[i].events.length; j++) {
            //                                     evstype[evsdetailsresp[i].events[j].event] = cat
            //                                     evsdetails[cat][evsdetailsresp[i].events[j].event] = evsdetailsresp[i].events[j]
            //                                 }
            //                             }
            //                             console.log(evsdetails)
            //                             console.log(evstype)
            //                             localStorage.setItem('evsdetails', JSON.stringify(evsdetails))
            //                             localStorage.setItem('evstype', JSON.stringify(evstype))
            //                         }
            //                         else {
            //                             console.log("error");
            //                         }
            //                         Axios.post("https://mainapi.springfest.in/api/user/get_registered_events", {
            //                             token: data.message.token
            //                         }).then((resp) => {
            //                             const msg = resp.data.message
            //                             const keys = Object.keys(msg)
            //                             console.log(msg)
            //                             var regevs = {}
            //                             for (var i = 0; i < keys.length; i++) {
            //                                 var evs = msg[keys[i]]
            //                                 for (var j = 0; j < evs.length; j++) {
            //                                     if (i === 1)
            //                                         regevs[evs[j].event_id] = {
            //                                             reg_id: evs[j].reg_id,
            //                                             type: keys[i],
            //                                             name: evs[j].event_name,
            //                                             iscert: evs[j].is_cert
            //                                         }
            //                                     else if (i === 0)
            //                                         regevs[evs[j].event_id] = {
            //                                             group_id: evs[j].group_id,
            //                                             type: keys[i],
            //                                             name: evs[j].event_name,
            //                                             members: evs[j].members,
            //                                             iscert: evs[j].is_cert,
            //                                             leadersfid: evs[j].leader_id
            //                                         }
            //                                 }
            //                             }
            //                             localStorage.setItem('reg_events', JSON.stringify(regevs))
            //                             //closeModalLogin()
            //                             console.log('hello logger')
            //                             toast.success("Successfully logged in", { position: toast.POSITION.TOP_CENTER })
            //                             props.setAuth(true)
            //                             //window.location.href = "/dashboard"
            //                         }).catch((err) => {
            //                             console.log(err)
            //                         })
            //                     })
            //                     .catch(error => {
            //                         return "error";
            //                     });
            //             }).catch((err) => {
            //                 console.log(err)
            //             })
            //     }
            //     // setSubmit(["Log In", "Register"])
            // }
        ).catch(
            (err) => {
                console.log(err)
                // setSubmit(["Log In", "Register"])
            }
        )
    }
    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>{
            formik=>{
                return(
                    <Form>
                        <FormikControl
                        control='input'
                        type='email'
                        label='Email'
                        name='email'/>
                        <FormikControl
                        control='input'
                        type='password'
                        label='Password'
                        name='password'/>
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                );
            }
        }    
        </Formik>
    );
}

export default LoginForm;