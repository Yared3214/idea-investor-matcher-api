import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class EntrepreneurService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // CREATE IDEA
  // =========================
  async createIdea(
    founderId: string,
    dto: CreateIdeaDto,
    pitchDeckUrl?: string | null,
    pitchDeckId?: string | null,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: founderId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== Role.ENTREPRENEUR) {
      throw new ForbiddenException(
        'Only entrepreneurs can create ideas',
      );
    }

    const idea = await this.prisma.idea.create({
      data: {
        startupName: dto.startupName,
        pitchTitle: dto.pitchTitle,
        description: dto.description,
        industry: dto.industry,
        stage: dto.stage,
        fundingAmount: dto.fundingAmount,
        roundType: dto.roundType ?? null,
        equityOffered: dto.equityOffered,
        region: dto.region,
        pitchDeckUrl: pitchDeckUrl ?? null,
        pitchDeckId: pitchDeckId ?? null,
        founderId,
      },
    });

    return {
      message: 'Idea created successfully',
      idea,
    };
  }

  // =========================
  // GET MY IDEAS
  // =========================
  async getIdeasByUser(founderId: string) {
    return this.prisma.idea.findMany({
      where: { founderId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // =========================
  // UPDATE IDEA
  // =========================
  async updateIdea(
    ideaId: string,
    founderId: string,
    dto: UpdateIdeaDto,
    pitchDeckUrl?: string | null,
    pitchDeckId?: string | null,
  ) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    // 🔐 Ensure ownership
    if (idea.founderId !== founderId) {
      throw new ForbiddenException(
        'You are not allowed to update this idea',
      );
    }

    const updatedIdea = await this.prisma.idea.update({
      where: { id: ideaId },
      data: {
        ...dto,
        pitchDeckUrl: pitchDeckUrl ?? idea.pitchDeckUrl,
        pitchDeckId: pitchDeckId ?? idea.pitchDeckId,
      },
    });

    return {
      message: 'Idea updated successfully',
      idea: updatedIdea,
    };
  }

  // =========================
  // DELETE IDEA
  // =========================
  async deleteIdea(ideaId: string, founderId: string) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    // 🔐 Ensure ownership
    if (idea.founderId !== founderId) {
      throw new ForbiddenException(
        'You are not allowed to delete this idea',
      );
    }

    await this.prisma.idea.delete({
      where: { id: ideaId },
    });

    return {
      message: 'Idea deleted successfully',
    };
  }
}