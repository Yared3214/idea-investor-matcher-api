import { IsOptional, IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Industry } from '../../common/enums/industry.enum';
import { Stage } from '../../common/enums/stage.enum';

export class GetIdeasQueryDto {
  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry;

  @IsOptional()
  @IsEnum(Stage)
  stage?: Stage;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  minFunding?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxFunding?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: 'createdAt' | 'fundingAmount';

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}