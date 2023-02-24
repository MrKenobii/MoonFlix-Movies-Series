import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favorite.controller.js';
import userController from '../controllers/user.controller.js';
import requestHandler from '../handlers/request.handler.js';
import tokenMiddleWare from '../middlewares/token.middleware.js';
import userModel from '../models/user.model.js';

const router = express.Router();

router.post("/signup", body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username must be minimum 8 characters")
    .custom(async value => {
        const user = await userModel.findOne({ username: value });
        if(user) return Promise.reject("username is already taken");
    }),
    body("password").exists().withMessage("password is required").isLength({ min: 8 }).withMessage("password should be minimum 8 characters"),
    body("confirmPassword").exists().withMessage("confirmPassword is required").isLength({ min: 8 }).withMessage("Confirm Password should be minimum 8 characters")
    .custom((value, { req }) => {
        if(value !== req.body.password) throw new Error("confirmPassword is not matching with password");
        return true;
    }),
    body("displayName").exists().withMessage("displayName is required").isLength({ min: 8 }).withMessage("displayName should be minimum 8 characters"),
    requestHandler.validate,
    userController.signup
);
router.post("/signin", body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username must be minimum 8 characters"),
    body("password").exists().withMessage("password is required").isLength({ min: 8 }).withMessage("password should be minimum 8 characters"),
    requestHandler.validate,
    userController.signin
);
router.put(
    "/update-password",
    tokenMiddleWare.auth,
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("newPassword")
      .exists().withMessage("newPassword is required")
      .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
    body("confirmNewPassword")
      .exists().withMessage("confirmNewPassword is required")
      .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
        return true;
      }),
    requestHandler.validate,
    userController.updatePassword
  );
router.get("/info", tokenMiddleWare.auth, userController.getInfo);
router.get("/favorites", tokenMiddleWare.auth, favoriteController.getFavoritesOfUser)
router.post("/favorites", tokenMiddleWare.auth, body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType is invalid"),
    body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
    .exists()
    .withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists()
    .withMessage("mediaPoster is required"),
    body("mediaRate")
    .exists()
    .withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite
);
router.delete("/favorites/:favoriteId", tokenMiddleWare.auth, favoriteController.removeFavorite);

export default router;