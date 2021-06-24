/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log (JSON.stringify(event, null, 2))

  await Promise.all(
    event.Records.map(async (record) => {
      try {
        console.log('Record: ', record)

        // Decode URL-encoded key
        const Key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "))

        // Epoch timestamp set to next midnight
        const TimeToLive = new Date().setHours(24,0,0,0)

        // Create DynamoDB item
        const params = {
          TableName : process.env.DDBtable,
          Item: {
             ID: Key,
             TimeToLive
          }
        }

        // Put to DynamoDB table
        const result = await docClient.put(params).promise()
        console.log('Result: ', result)        

      } catch (err) {
        console.error(err)
      }
    })
  )
}
