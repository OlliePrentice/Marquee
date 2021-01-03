import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
        }),
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin'
    }
};

export default (req, res) => NextAuth(req, res, options)
