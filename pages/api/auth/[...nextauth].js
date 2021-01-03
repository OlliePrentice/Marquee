import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],

    // A database is optional, but required to persist accounts in a database
    database: 'postgres://postgres:IVE1b5kO0U7dYsTWS1um@marqueeio-instance-1.cfnfnwpgpr1o.us-east-2.rds.amazonaws.com/postgres',
};

export default (req, res) => NextAuth(req, res, options)
