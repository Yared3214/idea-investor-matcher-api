-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ENTREPRENEUR', 'INVESTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('IDEA_STAGE', 'PROTOTYPE', 'MVP', 'EARLY_REVENUE', 'SCALING', 'SERIES_A');

-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('TECHNOLOGY', 'HEALTHCARE', 'FINTECH', 'ENERGY', 'AI', 'ECOMMERCE', 'EDTECH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "provider" "AuthProvider" NOT NULL,
    "role" "Role" NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpHash" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "refreshToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredStages" "Stage"[],
    "industries" "Industry"[],
    "minFunding" DOUBLE PRECISION NOT NULL,
    "maxFunding" DOUBLE PRECISION NOT NULL,
    "investmentThesis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "founderId" TEXT NOT NULL,
    "startupName" TEXT NOT NULL,
    "pitchTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" "Industry" NOT NULL,
    "stage" "Stage" NOT NULL,
    "fundingAmount" DOUBLE PRECISION NOT NULL,
    "roundType" TEXT,
    "equityOffered" BOOLEAN NOT NULL,
    "region" TEXT NOT NULL,
    "pitchDeckUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_userId_key" ON "InvestorProfile"("userId");

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
