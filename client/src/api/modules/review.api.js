import privateClient from "../client/private.client";

const reviewEnpoints = {
    list: "reviews",
    add: "reviews",
    remove: ({ reviewId }) => `reviews/${reviewId}`
};
const reviewApi = {
    add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
        try {
            const response = await privateClient.post(reviewEnpoints.add, { mediaId, mediaType, mediaTitle, mediaPoster, content });
            return { response };
        } catch (error) {
            return { error };
        }
    },
    getList: async () => {
        try {
            const response = await privateClient.get(reviewEnpoints.list);
            return { response };
        } catch (error) {
            return { error };
        }
    },
    remove: async ({ reviewId }) => {
        try {
            const response = await privateClient.delete(reviewEnpoints.remove({ reviewId }));
            return { response };
        } catch (error) {
            return { error };
        }
    },
};
export default reviewApi;