const AWS = require('aws-sdk');
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // Utilising the scan method to get all items in the table
        const data = await documentClient.scan({
            TableName: "wwe-superstars" // The name of your DynamoDB table
        }).promise();
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(data.Items)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
