import publicClient from "../client/public.client";

const genreEndpoints = {
    list: ({ mediaType }) => `${mediaType}/genres`
};
const genreApi = {
    getList: async ({ mediaType }) => {
        try {
            const response = publicClient.get(genreEndpoints.list({ mediaType }));
            return { response };
        } catch (error) {
            return { error };
        }
    }
};
export default genreApi;