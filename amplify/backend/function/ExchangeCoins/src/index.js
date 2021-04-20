/* Amplify Params - DO NOT EDIT
    API_VCE_GRAPHQLAPIENDPOINTOUTPUT
    API_VCE_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider, DynamoDB } = require('aws-sdk');


// const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const ddb = new DynamoDB();

// /**
//  * Get user pool information from environment variables.
//  */
// const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
// if (!COGNITO_USERPOOL_ID) {
//     throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
// }
// const COGNITO_USERNAME_CLAIM_KEY = 'cognito:username';

const getCoinAmount = async (coinPortfolioCoinId, userId) => {
    const params = {
        Key: {
            id: { S: coinPortfolioCoinId }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    const coinData = await ddb.getItem(params).promise();
    if (coinData && coinData.Item && coinData.Item.amount && coinData.Item.amount.N) {
        return coinData.Item.amount.N;
    }
    return 0;
}

const getUsdAmount = async (usdPortfolioCoinId, userId) => {
    const params = {
        Key: {
            id: { S: usdPortfolioCoinId },
            // coinId: { S: process.env.USD_COIN_ID },
            // userId: { S: userId }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    const coinData = await ddb.getItem(params).promise();
    if (coinData && coinData.Item && coinData.Item.amount && coinData.Item.amount.N) {
        return coinData.Item.amount.N;
    }
    return 0;
}

const getCoin = async (coinId) => {
    const params = {
        Key: {
            id: { S: coinId }
        },
        TableName: process.env.COIN_TABLE
    }
    const coinData = await ddb.getItem(params).promise();
    return coinData;
}

const canBuyCoin = (coin, amountToBuy, usdAmount) => {
    return usdAmount >= coin.Item.currentPrice.N * amountToBuy
}

const canSellCoin = (coin, amountToSell, portfolioAmount) => {
    return portfolioAmount >= amountToSell
}

const buyCoin = async (coin, amountToBuy, usdPortfolioCoinId, userId, coinAmount) => {
    // decrease USD
    const date = new Date();
    const newUsdAmount = usdAmount - coin.Item.currentPrice.N * amountToBuy;
    const params = {
        Item: {
            id: { S: usdPortfolioCoinId },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: process.env.USD_COIN_ID },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params).promise();

    // Add new portfolio coin or update the same
    const date = new Date();
    const newCoinAmount = coinAmount + amountToBuy;
    const params1 = {
        Item: {
            id: { S: `${userId}-${coin.Item.symbol.S}` },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: coin.Item.id.S },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params1).promise();
}

const sellCoin = async (coin, amountToSell, usdPortfolioCoinId, userId, coinAmount) => {
    // increase USD
    const date = new Date();
    const newUsdAmount = usdAmount + coin.Item.currentPrice.N * amountToSell;
    const params = {
        Item: {
            id: { S: usdPortfolioCoinId },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: process.env.USD_COIN_ID },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params).promise();

    // Add new portfolio coin or update the same
    const date = new Date();
    const newCoinAmount = coinAmount - amountToSell;
    const params1 = {
        Item: {
            id: { S: `${userId}-${coin.Item.symbol.S}` },
            '__typename': { S: 'PortfolioCoin' },
            'createdAt': { S: date.toISOString() },
            'updatedAt': { S: date.toISOString() },
            'userId': { S: userId },
            'coinId': { S: coin.Item.id.S },
            'amount': { N: newUsdAmount.toString() }
        },
        TableName: process.env.PORTFOLIO_COIN_TABLE
    }
    await ddb.putItem(params1).promise();
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
    Mutation: {
        exchangeCoins: async ctx => {
            // var params = {
            //     UserPoolId: COGNITO_USERPOOL_ID, /* required */
            //     Username: ctx.identity.claims[COGNITO_USERNAME_CLAIM_KEY], /* required */
            // };
            // try {
            //     // Read more: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
            //     const userResponse = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
            // } catch (e) {
            //     throw new Error(`NOT FOUND`);
            // }

            const { coinId, isBuy, amount, usdPortfolioCoinId, coinPortfolioCoinId } = ctx.arguments;
            const userId = ctx.identity.sub;

            const usdAmount = !usdPortfolioCoinId ? 0 : await getUsdAmount(usdPortfolioCoinId, userId);

            const coinAmount = !coinPortfolioCoinId ? 0 : await getCoinAmount(coinPortfolioCoinId, userId);

            const coin = await getCoin(coinId);

            try {

                if (isBuy && canBuyCoin(coin, amount, usdAmount)) {
                    await buyCoin(coin, amount, usdPortfolioCoinId, usdAmount, coinAmount, userId);
                }
                else if (!isBuy && canSellCoin(amount, coinAmount)) {
                    await sellCoin(coin, amount, usdPortfolioCoinId, usdAmount, coinAmount, userId);
                } else {
                    throw new Error(isBuy ? 'Not enougn USD' : 'Not enoughcoins to sell');
                }
            } catch (e) {
                console.log(e);
                throw new Error('Unexpected Error exchanging coins')
            }
            return true;
        }
    },
}

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error("Resolver not found.");
};