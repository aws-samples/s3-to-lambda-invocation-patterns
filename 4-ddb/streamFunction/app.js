/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 

exports.handler = async (event) => {
  console.log (JSON.stringify(event, null, 2))

  // Write same object back to original bucket.
}
