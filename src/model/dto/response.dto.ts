export class RegisterResponseDto {
  message: string;
}

export class LoginResponseDto {
  token: string;
}

export class GetUserResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}
