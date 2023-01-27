import AWS from 'aws-sdk';

const useS3ImageUpload = () => {
  const region = process.env.REACT_APP_S3_REGION;
  const s3Bucket = process.env.REACT_APP_S3_BUCKET_NAME;

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  });

  const handleFileInput = (file: File, id: number) => {
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: s3Bucket as string,
        Body: file,
        ContentType: file.type,
        Key: 'data/profile/' + id + '.' + file.name.split('.').pop(),
      },
    });

    const promise = upload.promise();
    return promise;
  };

  return { handleFileInput };
};
export default useS3ImageUpload;
