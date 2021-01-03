import Head from "next/head";
import {providers, signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import Layout from "../../components/layout";
import ContainerFullWidth from "../../components/container-full-width";
import ErrorMessage from "../../components/error-message";
import Footer from "../../components/footer";

export default function SignIn({providers, siteUrl}) {
    const router = useRouter();

    let callbackUrl = router.query.callbackUrl ? router.query.callbackUrl : siteUrl;

    let errorMessage;
    if (router.query.error) {
        switch (router.query.error) {
            case 'Signin':
            case 'OAuthSignin':
            case 'OAuthCallback':
            case 'OAuthCreateAccount':
            case 'EmailCreateAccount':
            case 'Callback':
                errorMessage = <span>Try signing with a different account.</span>
                break
            case 'OAuthAccountNotLinked':
                errorMessage = <span>To confirm your identity, sign in with the same account you used originally.</span>
                break
            case 'EmailSignin':
                errorMessage = <span>Check your email address.</span>
                break
            case 'CredentialsSignin':
                errorMessage = <span>Sign in failed. Check the details you provided are correct.</span>
                break
            default:
                errorMessage = <span>Unable to sign in.</span>
                break
        }
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/icons/favicon.ico"/>
            </Head>
            <Layout>
                <div className="bg-gray-50">
                    <ContainerFullWidth>
                        <div className="text-center pb-10">
                            <a href="/"
                               className="text-xl font-medium text-gray-600 font-display">marquee.io</a>
                        </div>
                        <div className="mx-auto lg:max-w-4xl">
                            {errorMessage &&
                            <ErrorMessage message={errorMessage}/>}
                            <div
                                className="flex flex-wrap bg-white rounded-lg relative overflow-hidden shadow-xl">
                                <div
                                    className="flex-1 text-center p-20 flex items-center justify-center">
                                    <div>
                                        <h1 className="font-bold text-3xl mb-5">Hello there!</h1>
                                        <p className="font-light">Sign in with your preferred provider and find your
                                            next
                                            epic space to create!</p>
                                    </div>
                                </div>
                                <div
                                    className="text-center flex-1 bg-gradient-to-br from-green-400 to-green-500 p-20 flex items-center justify-center">
                                    <div className="mt-3">
                                        {Object.values(providers).map(provider => (
                                            <div key={provider.name} className="mb-3">
                                                <button
                                                    onClick={() => signIn(provider.id, {callbackUrl: callbackUrl})}
                                                    className="block w-full btn btn--large bg-white hover:shadow-lg"><span
                                                    className="inline-block align-middle mr-2">
                                                <img
                                                    src={`/icons/icon-${provider.name}.svg`}
                                                    alt={`${provider.name} logo`}
                                                    className="w-4"/></span>&nbsp;
                                                    <span className="align-middle">Sign in with {provider.name}</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContainerFullWidth>

                </div>
            </Layout>
            <Footer/>
        </>
    )
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
        siteUrl: process.env.NEXTAUTH_URL
    }
}
