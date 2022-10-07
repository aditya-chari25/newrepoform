import React from "react";
import FormInput from "./FormInput";

function FormikControl(props){
    const {control, ...rest} = props
    switch(control){
        case 'input':
            return <FormInput {...rest}/>
        default:
            return null
    }
}

export default FormikControl;