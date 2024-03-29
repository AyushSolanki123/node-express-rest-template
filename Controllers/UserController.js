const bcrypt = require("bcrypt");
const UserService = require("../Services/UserService");
const { validationResult } = require("express-validator");
const ErrorBody = require("../Utils/ErrorBody");
const { logger } = require("../Utils/Logger");
const { generateAuthPairs, validateAuthToken } = require("../Utils/Helper");

function listUsers(req, res, next) {
    UserService.listUsers()
        .then((response) => {
            res.status(200);
            res.json({ data: response });
        })
        .catch((error) => {
            next(
                new ErrorBody(
                    error.statusCode || 500,
                    error.errorMessage || "Server error occurred"
                )
            );
        });
}

function getUserDetails(req, res, next) {
    const _userId = req.params.userId;
    UserService.getUserById(_userId)
        .then((response) => {
            res.status(200);
            res.json({ data: response });
        })
        .catch((error) => {
            next(
                new ErrorBody(
                    error.statusCode || 500,
                    error.errorMessage || "Server error occurred"
                )
            );
        });
}

function updateUserDetails(req, res, next) {
    const userId = req.params.userId;
    UserService.updateUser(userId, req.body)
        .then((updateResponse) => {
            logger.log(
                `User ${updateResponse.firstName} ${updateResponse.lastName} updated successfully`
            );
            res.status(200);
            res.json({
                message: "User Updated Successfully",
                data: updateResponse,
            });
        })
        .catch((error) => {
            logger.error("Unable to update the user at the moment");
            logger.error(JSON.stringify(error.message));
            next(
                new ErrorBody(
                    error.statusCode || 500,
                    error.errorMessage || "Server error occurred"
                )
            );
        });
}

module.exports = {
    listUsers: listUsers,
    getUserDetails: getUserDetails,
    updateUserDetails: updateUserDetails,
};
