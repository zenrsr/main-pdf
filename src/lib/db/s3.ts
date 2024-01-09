import { S3, PutObjectCommandOutput } from "@aws-sdk/client-s3";

export async function uploadFileToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!
        }
      });

      const fileKey = "uploads" + Date.now() + file.name.replace(/\s/g, "");

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: fileKey,
        Body: file
      };

      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          return resolve({
            file_key: fileKey,
            file_name: file.name
          });
        }
      );
    } catch (e) {
      console.log("Failed to upload file to S3: ", e);
    }
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  return url;
}
