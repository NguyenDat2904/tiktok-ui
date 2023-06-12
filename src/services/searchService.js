import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const results = await httpRequest.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
