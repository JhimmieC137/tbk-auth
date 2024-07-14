import { HttpException, HttpStatus } from '@nestjs/common';

export class FORBIDDEN_403 extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class DUPLICATE_USER_409 extends HttpException {
  constructor(message: string = 'Conflict') {
    super(message, HttpStatus.CONFLICT);
  }
  // message: string = 'This user already exists';
}

export class BAD_REQUEST_400 extends HttpException {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NOT_FOUND_404 extends HttpException {
  constructor(message: string = 'Not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class INTERNAL_SERVER_ERROR_500 extends HttpException {
  constructor(message: string = 'Internal server error') {
    super( message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// export class UNAUTHORIZED_401 extends HttpException {
//   constructor() {
//     super('Unauthorized', HttpStatus.UNAUTHORIZED);
//   }
// }
