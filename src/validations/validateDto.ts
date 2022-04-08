import { validateOrReject, ValidationError } from 'class-validator';
import AppError from '../errors/appError';

async function validateDto(dto: Object) {
  try {
    await validateOrReject(dto);
  } catch (error) {
    if (!Array.isArray(error)) {
      throw error;
    }

    console.log(error);

    error as Array<ValidationError>;

    const errors = error.map((validationError) => {
      return `${validationError.value} is not valid for ${validationError.property}`;
    });

    throw new AppError(errors);
  }
}

export default validateDto;
