import * as httpRequestLogin from '~/utils/httpRequest';

export const register = async (email, password, valueCode) => {
    try {
        const response = await httpRequestLogin.post(`/user`, {
            email,
            password,
            valueCode,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const checkRegister = async (email) => {
    try {
        const response = await httpRequestLogin.getLogin(`/user`, {
            email,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
