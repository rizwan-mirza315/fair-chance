-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TalentProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "workHistory" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedProgram" TEXT,
    "readyToWork" BOOLEAN NOT NULL DEFAULT true,
    "availableDate" TEXT,
    "photo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TalentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmployerProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InterestRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "talentId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterestRequest_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "TalentProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InterestRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TalentProfile_userId_key" ON "TalentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON "EmployerProfile"("userId");
