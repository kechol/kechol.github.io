#! /bin/sh

s3bucket=<s3-bucket>
s3region=<s3-region>
s3acl=<s3-acl>
export AWS_ACCESS_KEY_ID=<aws-access-key-id>
export AWS_SECRET_ACCESS_KEY=<aws-access-secret>

for f in "$@"
do
    echo "uploading $f..."
    aws s3 cp --region=$s3region --acl=$s3acl $f s3://$s3bucket/$f
done
