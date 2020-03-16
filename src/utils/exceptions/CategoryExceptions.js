import HTTPSTATUS from '../HTTPSTATUS';

class CategoryExceptions {
  CategoryValidationException(errors) {
    return JSON.stringify({
      status: HTTPSTATUS.UNPROCESSABLE_ENTITY,
      errors,
    });
  }

  CategoryNotFoundException() {
    return JSON.stringify({
      status: HTTPSTATUS.BAD_REQUEST,
      errors: ['Category not found'],
    });
  }
}

export default new CategoryExceptions();
