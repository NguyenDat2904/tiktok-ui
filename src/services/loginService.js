import * as httpRequestLogin from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const response = await httpRequestLogin.getLogin(`/user`, {
            params: {
                email: email,
                password: password,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        console.log('error');
    }
};
