-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "serviceAddress" TEXT,
    "bio" TEXT NOT NULL,
    "showcasePics" TEXT[],
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Business" (
    "bid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "productPics" TEXT[],
    "establishedAt" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("bid")
);

-- CreateTable
CREATE TABLE "Category" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "BusinessCategoryMapping" (
    "id" TEXT NOT NULL,
    "bid" TEXT NOT NULL,
    "cid" TEXT NOT NULL,

    CONSTRAINT "BusinessCategoryMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "wid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("wid")
);

-- CreateTable
CREATE TABLE "productImage" (
    "iid" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wid" TEXT NOT NULL,

    CONSTRAINT "productImage_pkey" PRIMARY KEY ("iid")
);

-- CreateTable
CREATE TABLE "WorkspaceCategoryMapping" (
    "id" TEXT NOT NULL,
    "wid" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "userUid" TEXT,

    CONSTRAINT "WorkspaceCategoryMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceUserMapping" (
    "id" TEXT NOT NULL,
    "wid" TEXT NOT NULL,
    "userUid" TEXT,

    CONSTRAINT "WorkspaceUserMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Business_bid_key" ON "Business"("bid");

-- CreateIndex
CREATE UNIQUE INDEX "Business_userName_key" ON "Business"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_phoneNumber_key" ON "Business"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Category_cid_key" ON "Category"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategoryMapping_id_key" ON "BusinessCategoryMapping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_wid_key" ON "Workspace"("wid");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_name_key" ON "Workspace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productImage_iid_key" ON "productImage"("iid");

-- CreateIndex
CREATE UNIQUE INDEX "productImage_imgUrl_key" ON "productImage"("imgUrl");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceCategoryMapping_id_key" ON "WorkspaceCategoryMapping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceUserMapping_id_key" ON "WorkspaceUserMapping"("id");

-- AddForeignKey
ALTER TABLE "BusinessCategoryMapping" ADD CONSTRAINT "BusinessCategoryMapping_bid_fkey" FOREIGN KEY ("bid") REFERENCES "Business"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCategoryMapping" ADD CONSTRAINT "BusinessCategoryMapping_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Category"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("wid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceCategoryMapping" ADD CONSTRAINT "WorkspaceCategoryMapping_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("wid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceCategoryMapping" ADD CONSTRAINT "WorkspaceCategoryMapping_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Category"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceCategoryMapping" ADD CONSTRAINT "WorkspaceCategoryMapping_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceUserMapping" ADD CONSTRAINT "WorkspaceUserMapping_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("wid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceUserMapping" ADD CONSTRAINT "WorkspaceUserMapping_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
