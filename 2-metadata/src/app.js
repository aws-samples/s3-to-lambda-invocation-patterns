/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const s3 = new AWS.S3()

exports.handler = async (event) => {
  console.log (JSON.stringify(event, null, 2))

  await Promise.all(
    event.Records.map(async (record) => {
      try {
        console.log('Record: ', record)

        // Decode URL-encoded key
        const Key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "))

        const data = await s3.headObject({
          Bucket: record.s3.bucket.name,
          Key
        }).promise()

        if (data.Metadata.original != 'true') {
          console.log('Exiting - this is not the original object.', data)
          return
        }

        // Get original text from object in incoming event
        const s3object = await s3.getObject({
          Bucket: record.s3.bucket.name,
          Key
        }).promise()

        // Do work ... 

        // Access the object content at object.body
        console.log('Buffer: ', s3object.Body)
        
        // Save the resulting object
        const result = await s3.putObject({
          Bucket: process.env.DestinationBucketName,
          Key,
          Body: s3object.Body
        }).promise()
  
        console.log('Result: ', result)        

      } catch (err) {
        console.error(err)
      }
    })
  )
}
