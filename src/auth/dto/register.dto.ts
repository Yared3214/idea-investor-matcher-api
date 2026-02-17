import { IsEmail, IsEnum, IsString, MinLength, Matches } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @Matches(/^\S+\s+\S+$/, {
    message: 'Full name must contain both first and last name',
  })
  fullName: string;
  
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
    {
      message:
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
    },
  )
  password: string;

  @IsEnum(Role)
  role: Role;
}
