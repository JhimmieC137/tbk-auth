import { Notification } from "src/modules/notifications/entities/notification.entity";
import { User } from "src/modules/users/entities/user.entity";

export class CustomInfoResDto {
  status: number = 200;
  message: string = 'Successful';
  info: string = '';
}

export class CustomErrResDto {
  status: number = 400;
  message: string = 'Failed';
  error: string = '';
}

export class SampleInfoResDto {
  status = 200;
  message = 'Successful';
  info = 'Request processed successfully';
}

export class CustomListResDto {
  status: number = 200;
  message: string = 'Successful';
  count: number = null;
  total_count: number = null;
  page: number = null;
  next_page: number = null;
  results: User[] | Notification[] = [];
}

export class CustomResDto {
  status: number = 200;
  message: string = 'Successful';
  results: object = {};
}
