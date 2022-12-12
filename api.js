import axios from "axios";

const urlApi = 'http://127.0.0.1:8000/api';

export const apiLogin = async (mail, password) => {
    const urlLogin = urlApi + '/users/mail/' + mail;
    const resp = await axios.post(urlLogin, { password });

    if (resp.status === 200) {
        const User = resp.data;
        if (!User.error && User.rows.length > 0) {
            return User.rows;
        }else {
            return false;
        }
    }else {
        console.log("Error");
    }

}

export const apiCreateUser = async (data) => {
    const urlCreateUser = urlApi + '/users';
    try {
        const resp = await axios.post(urlCreateUser, data);
        if (resp.status === 200) {
            return resp.data;
        }else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}