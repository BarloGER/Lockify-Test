exports.userOutput = (result) => {
  return {
    success: result.success,
    message: result.message,
    userId: result.userId,
  };
};
