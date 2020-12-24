import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from '../HTTPSTATUS';

class CategoryExceptions {
  CategoryValidationException(errors) {
    return JSON.stringify({
      status: UNPROCESSABLE_ENTITY,
      errors,
    });
  }

  CategoryNotFoundException() {
    return JSON.stringify({
      status: BAD_REQUEST,
      errors: ['Category not found'],
    });
  }
}

export const categoryExceptions = new CategoryExceptions();
