import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvestorService } from './investor.service';
import { InvestorOnboardingDto } from './dto/investor-onboarding.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('investor')
export class InvestorController {
  constructor(private investorService: InvestorService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('onboarding')
  async onboarding(@Req() req, @Body() dto: InvestorOnboardingDto) {
    return this.investorService.onboarding(req.user.userId, dto);
  }
}
