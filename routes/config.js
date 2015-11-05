module.exports = {
    // Connect Database on server   
    //databaseURL: process.env.DATABASE_URL || "pg://greenmsgdev:greenmsgdev@192.168.178.83:5432/greenmsgdevdb",

    //Connect Database Test in Local
    databaseURL: process.env.DATABASE_URL || "pg://postgres:postgres@localhost:5432/LMS",

   /* contactsAccountId: process.env.CONTACTS_ACCOUNT_ID,

    productFamily: process.env.PRODUCT_FAMILY || "Nibs",
*/
    // Used by nforce to create Cases in real time
    api: {
        // Connected app
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URL,
        apiVersion: 'v29.0',

        // SFDC user used to make API calls from Node server
        userName: process.env.INTEGRATION_USER_NAME,
        password: process.env.INTEGRATION_USER_PASSWORD
    },

    // Used for picture upload (user profile and gallery)
    s3: {
        bucket: process.env.S3_BUCKET_NAME,
        awsKey: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET
    }

};