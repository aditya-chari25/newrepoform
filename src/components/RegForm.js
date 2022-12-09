import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import Axios from 'axios';
import { toast } from "react-toastify";
import Recaptcha from "react-recaptcha";
import { ToastContainer } from 'react-toastify';

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
        yop: "",
        captcha:"",
        security_ans:"hello",
        security_qn:"hello"
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

    const onSubmit=(values,{resetForm})=>{
        console.log("Form values",values)
        if (1) {
            const req = {
                name: values.name,
                email: values.email,
                password: values.password,
                mobile: values.mobile,
                college: values.college,
                city: values.city,
                state: values.state,
                dob:
                    values.dob.slice(8, 10) +
                    values.dob.slice(5, 7) +
                    values.dob.slice(0, 4),
                // String(values.dob.getDate()) +
                // "/" +
                // String(values.dob.getMonth() + 1) +
                // "/" +
                // String(values.dob.getFullYear()),
                gender: values.gender,
                yop: String(values.yop),
                security_qn:"What is your name",
                security_ans:values.name,
                captcha: values.captcha,

            };
            console.log(req)
            Axios.post("https://mainapi.springfest.in/api/user/register_user", req)
                .then((resp) => {
                    console.log(resp)
                    const data = resp.data;
                    if (data.code === 0) {
                        toast.success("Successfully registered. Now go to login page.", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        //alert('Successfully registered. Now go to login page.')
                        resetForm({ values: "" });
                        console.log("success")
                    } else {
                        var al = "";
                        const keys = Object.keys(data.message);
                        console.log(keys)
                        for (var k = 0; k < keys.length; k++)
                            al = al.concat(data.message[keys[k]] + "\n");
                        toast.error(al, { position: toast.POSITION.TOP_CENTER });
                        alert(al)
                    }
                    // setSubmit(["Log In", "Register"])
                })
                .catch((err) => {
                    console.log(err);
                    // setSubmit(["Log In", "Register"])
                });
            }
            else {
                toast.warning("Please verify the CAPTCHA first.", {
                    position: toast.POSITION.TOP_CENTER
                });
                // setSubmit(["Log In", "Register"])
            }
        };
    return(
        <div>
            <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
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
                            <div style={{marginLeft: '8%'}}>
                            <Field name="captcha">
                                {(props) => {
                                    console.log("props")
                                    const { field, form } = props;
                                    console.log(props)
                                        return (
                                            <>
                                                <>{console.log(5)}</>
                                            <Recaptcha
                                              sitekey="6Ldpbz0UAAAAAHWONmYJCv8nbMwG4w-htCr8iC1p"
                                              render="explicit"
                                              verifyCallback={(resp) => {
                                                form.setFieldValue(
                                                  field.name,
                                                  resp
                                                );
                                              }}
                                              onloadCallback={() =>
                                                console.log("Captcha loaded")
                                              }
                                            />
                                          </>
                                        );
                                }}
                            </Field>
                            </div>


                            <button type='submit' disabled={!formik.isValid}>Submit</button>
                        </Form>
                    );
                }
            }    
            </Formik>
        </div>
    );

}

export default RegForm;