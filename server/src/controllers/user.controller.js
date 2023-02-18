import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;
        const checkUser = await userModel.findOne({ username });
        if(checkUser) return responseHandler.badRequest(res, "Username is already taken");
        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);
        await user.save();
        const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        responseHandler.created(res, { token, ...user._doc, id: user.id });
    } catch (error) {
        responseHandler.error(res);
    }
}
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select("username password salt id displayName");
        if(!user) return responseHandler.badRequest(res, "User not exist");
        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Incorrect password");
        const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });
        user.password = undefined;
        user.salt = undefined;
        responseHandler.created(res, { token, ...user._doc, id: user.id });        

    } catch (error) {
        responseHandler.error(res);
    }
}
const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const user = await (await userModel.findById(req.user.id)).isSelected("password id salt"); 
        if(!user) return responseHandler.unathorized(res);
        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Incorrect password");
        user.setPassword(newPassword);
        await user.save();
        responseHandler.ok(res);
    } catch (error) {
        responseHandler.error(res);
    }
}
const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if(!user) return responseHandler.notFound(res);
        responseHandler.ok(res, user);
    } catch (error) {
        responseHandler.error(res);
    }
}

export default { signup, signin, updatePassword, getInfo };