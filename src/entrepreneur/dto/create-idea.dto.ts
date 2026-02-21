import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { Industry } from '../../common/enums/industry.enum';
import { Stage } from '../../common/enums/stage.enum';
import { Type , Transform} from 'class-transformer';

export class CreateIdeaDto {
  @IsString()
  @MinLength(3)
  startupName: string;

  @IsString()
  @MinLength(5)
  pitchTitle: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsEnum(Industry)
  industry: Industry;

  @IsEnum(Stage)
  stage: Stage;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  fundingAmount: number;

  @IsOptional()
  @IsString()
  roundType?: string;

  @Transform(({ value }) => value === 'true' || value === true)
@IsBoolean()
equityOffered: boolean;

  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  pitchDeckUrl?: string;
}