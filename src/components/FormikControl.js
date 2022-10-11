import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

function FormikControl(props){
    const {control, ...rest} = props
    switch(control){
        case 'input':
            return <FormInput {...rest}/>
        case 'select':
            return <FormSelect {...rest}/>
        default:
            return null
    }
}

export default FormikControl;