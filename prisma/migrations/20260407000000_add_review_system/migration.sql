-- CreateTable
CREATE TABLE "ReviewToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeddingReview" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "npsScore" INTEGER NOT NULL,
    "venueRating" INTEGER,
    "cateringRating" INTEGER,
    "photographyRating" INTEGER,
    "musicRating" INTEGER,
    "ceremonyRating" INTEGER,
    "highlights" TEXT,
    "improvements" TEXT,
    "comments" TEXT,
    "wouldRecommend" BOOLEAN NOT NULL DEFAULT true,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeddingReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewToken_token_key" ON "ReviewToken"("token");

-- CreateIndex
CREATE INDEX "ReviewToken_token_idx" ON "ReviewToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "WeddingReview_tokenId_key" ON "WeddingReview"("tokenId");

-- AddForeignKey
ALTER TABLE "WeddingReview" ADD CONSTRAINT "WeddingReview_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "ReviewToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
