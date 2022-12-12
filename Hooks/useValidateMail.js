export const useValidateMail = mail => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail) === false) {
        return true;
    }else {
        return false;
    }
}