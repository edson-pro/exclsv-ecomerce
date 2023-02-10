import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function generateUploadUrl({
  type,
  key,
}: {
  type: string;
  key: string;
}) {
  const expiresInMinutes = 60;
  return await createPresignedPost(s3Client, {
    Bucket: "exclsv-assets",
    Key: key,
    Expires: expiresInMinutes * 60, // the url will only be valid for 1 minute
    Conditions: [["eq", "$Content-Type", type]],
  });
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-south-1",
});
