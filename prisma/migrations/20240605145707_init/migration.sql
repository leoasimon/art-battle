-- CreateTable
CREATE TABLE "score" (
    "id" STRING NOT NULL,
    "artwork_id" INT4 NOT NULL,
    "score" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "score_artwork_id_key" ON "score"("artwork_id");
