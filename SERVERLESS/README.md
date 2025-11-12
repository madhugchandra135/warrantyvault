# Serverless API (Vercel/Netlify)

Minimal example for uploading receipts and parsing on serverless platforms.

- Add your S3/MinIO credentials as environment variables.
- Use `getSignedUploadUrl` to generate signed PUT URLs.
- Return the key + URL to the frontend for upload.
