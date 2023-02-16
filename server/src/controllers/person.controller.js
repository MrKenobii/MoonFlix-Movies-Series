import responsehandler from '../handlers/response.handler.js';
import tmdbApi from '../tmdb/tmdb.api.js';

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;
        const person = await tmdbApi.personDetails({ personId });
        responsehandler.ok(res, person);
    } catch (error) {
        responsehandler.error(res);
    }
}
const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;
        const medias = await tmdbApi.personMedias({ personId });
        responsehandler.ok(res, medias);
    } catch (error) {
        responsehandler.error(res);
    }
}
export default { personDetail, personMedias };