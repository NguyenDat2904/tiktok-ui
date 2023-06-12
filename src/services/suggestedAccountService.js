import * as httpRequest from '~/utils/httpRequest';

export const suggest = async (page = '1', per_page) => {
    try {
        const results = await httpRequest.get(`users/suggested`, {
            params: {
                page,
                per_page,
            },
        });
        return results.data;
    } catch (error) {
        console.log(error);
    }
};
