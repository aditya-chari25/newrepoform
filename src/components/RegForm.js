import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import axios from 'axios';

function RegForm(){
    const [dobtype, setDobtype] = useState('text')
    const gendropoptions=[
        {
            key:'Select an option',value:''
        },
        { key:'Male',value:'M'},
        { key:'Female',value:'F'},
        { key:'Other',value:'O'}
    ]
    const initialValuesReg={
        name: "",
        email: "",
        password: "",
        repass: "",
        phone: "",
        college: "",
        city: "",
        state: "",
        dob: "",
        gender: "",
        yop: ""
    }

    const validationSchemaReg=Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required").email("Invalid Email"),
        password: Yup.string()
            .required("Required")
            .min(8, "Password must have minimum 8 characters")
            .max(15, "Password can have maximum 15 characters"),
        repass: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Password didn't match"),
        mobile: Yup.string()
            .required("Required")
            .matches(
                /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                "Invalid Phone Number"
            ),
        college: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        dob: Yup.date().required("Required"),
        gender: Yup.string().required("Required"),
        yop: Yup.string().required("Required")
    })

    const onSubmit=(values)=>{
        console.log("Form values",values)
    }
    return(
        <Formik initialValues={initialValuesReg} validationSchema={validationSchemaReg} onSubmit={onSubmit}>{
            formik=>{
                return(
                    <Form>
                        <FormikControl
                        control='input'
                        type='text'
                        label='Name'
                        name='name'/>
                        <FormikControl
                        control='input'
                        type='text'
                        label='Email'
                        name='email'/>
                        <FormikControl
                        control='input'
                        type='password'
                        label='Password'
                        name='password'/>
                        <FormikControl
                        control='input'
                        type='password'
                        label='Retype-Password'
                        name='repass'/>
                        <FormikControl
                        control='input'
                        type='phone'
                        label='Mobile'
                        name='mobile'/>
                        <FormikControl
                        control='input'
                        type='text'
                        label='City'
                        name='city'/>
                        <FormikControl
                        control='input'
                        type='text'
                        label='State'
                        name='state'/>
                        <FormikControl
                        control='input'
                        type='text'
                        label='College'
                        name='college'/>
                        <FormikControl
                        control='input'
                        type={dobtype}
                        label='Date Of Birth'
                        onFocus={() => {setDobtype('date')}} 
                        onBlur={() => {setDobtype('text')}} 
                        name='dob'/>
                        <FormikControl
                        control='select'
                        label='Gender'
                        name='gender'
                        options={gendropoptions}/>
                        <FormikControl
                        control='input'
                        type='text'
                        label='Year Of Passing'
                        name='yop'/>
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                );
            }
        }    
        </Formik>
    );

}

export default RegForm;