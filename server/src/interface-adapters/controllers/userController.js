const { UserEntity } = require("../../entities/User");
const { CreateUser } = require("../../usecases/user/userInteractor");
const { UserRepository } = require("../repositories/userRepository");
const { UserPresenter } = require("../presenters/userPresenter");
const { PasswordHashingService } = require("../utils/PasswordHashingService");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../../utils/ErrorResponse");

const userRepository = new UserRepository();
const userPresenter = new UserPresenter();
const passwordHashingService = new PasswordHashingService();
const createUser = new CreateUser(userRepository, passwordHashingService);

exports.registerUser = asyncHandler(async (req, res, next) => {
  const userEntity = new UserEntity(req.body);

  const validationError = userEntity.validateRegisterUserBody();
  if (validationError) {
    throw new ErrorResponse({
      errorCode: validationError,
      body: req.body,
      params: req.params,
    });
  }

  const result = await createUser.execute(userEntity);
  const response = userPresenter.present(result);

  res.status(201).json(response);
});
