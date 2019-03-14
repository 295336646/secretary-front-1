import {File} from 'src/app/main/file/file';

export class User {
  uid: string;
  userName: string;
  role: number;
  fileList: Array<File>;
}
