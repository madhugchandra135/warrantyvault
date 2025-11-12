import AWS from 'aws-sdk';
const endpoint = process.env.S3_ENDPOINT || undefined;
const s3conf = {region: process.env.S3_REGION || 'ap-south-1'};
if (endpoint) {
  s3conf.endpoint = new AWS.Endpoint(endpoint);
  s3conf.s3ForcePathStyle = true;
}
const s3 = new AWS.S3(s3conf);
export function getSignedUploadUrl(key, contentType='image/jpeg') {
  const params = { Bucket: process.env.S3_BUCKET, Key: key, Expires: 120, ContentType: contentType };
  return s3.getSignedUrlPromise('putObject', params);
}
export function getPublicUrl(key){
  if (process.env.S3_ENDPOINT) {
    return `${process.env.S3_ENDPOINT.replace(/\/+$/,'')}/${process.env.S3_BUCKET}/${key}`;
  }
  return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}
