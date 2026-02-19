import {
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
  Min,
  IsString,
  MinLength,
} from 'class-validator';
import { Stage } from '../../common/enums/stage.enum';
import { Industry } from '../../common/enums/industry.enum';
import { Type } from 'class-transformer';

export class InvestorOnboardingDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Stage, { each: true })
  preferredStages: Stage[];

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Industry, { each: true })
  industries: Industry[];

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  minFunding: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxFunding: number;

  @IsString()
  @MinLength(20)
  investmentThesis: string;
}
