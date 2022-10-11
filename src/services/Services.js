import { HTTP } from './config.js';
import axios from 'axios';
import { toast } from "react-toastify";
import $ from "jquery";

const headers = { "Content-Type": "application/json" };

export const registerUser = (data, refer) =>
    HTTP.post("api/user/register_user", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            toast.error(error);
            return error;
});

export const passwordLogin = data =>
    HTTP.post("api/user/login/password", JSON.stringify(data), {
        headers: headers
    })
        .then(res => {
            return res.data
        })
        .catch(error => {
            return "error";
});