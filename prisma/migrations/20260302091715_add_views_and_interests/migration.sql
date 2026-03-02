-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_founderId_fkey";

-- DropForeignKey
ALTER TABLE "InvestorProfile" DROP CONSTRAINT "InvestorProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "interestedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "IdeaView" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdeaView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdeaInterest" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdeaInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IdeaView_ideaId_idx" ON "IdeaView"("ideaId");

-- CreateIndex
CREATE INDEX "IdeaView_investorId_idx" ON "IdeaView"("investorId");

-- CreateIndex
CREATE INDEX "IdeaView_createdAt_idx" ON "IdeaView"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IdeaView_ideaId_investorId_key" ON "IdeaView"("ideaId", "investorId");

-- CreateIndex
CREATE INDEX "IdeaInterest_ideaId_idx" ON "IdeaInterest"("ideaId");

-- CreateIndex
CREATE INDEX "IdeaInterest_investorId_idx" ON "IdeaInterest"("investorId");

-- CreateIndex
CREATE INDEX "IdeaInterest_createdAt_idx" ON "IdeaInterest"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IdeaInterest_ideaId_investorId_key" ON "IdeaInterest"("ideaId", "investorId");

-- CreateIndex
CREATE INDEX "Idea_founderId_idx" ON "Idea"("founderId");

-- CreateIndex
CREATE INDEX "Idea_viewsCount_idx" ON "Idea"("viewsCount");

-- CreateIndex
CREATE INDEX "Idea_interestedCount_idx" ON "Idea"("interestedCount");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaView" ADD CONSTRAINT "IdeaView_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaView" ADD CONSTRAINT "IdeaView_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaInterest" ADD CONSTRAINT "IdeaInterest_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdeaInterest" ADD CONSTRAINT "IdeaInterest_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
