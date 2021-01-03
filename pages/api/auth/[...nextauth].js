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
    database: 'mongodb+srv://prenticedev94:LgKrvutTBKTmZ7B2@cluster0.jiqul.mongodb.net/marquee?retryWrites=true',
};

export default (req, res) => NextAuth(req, res, options)
