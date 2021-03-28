import Head from "next/head";
import {providers, signIn} from 'next-auth/client';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from "../../components/layout";
import ContainerFullWidth from "../../components/container-full-width";
import ErrorMessage from "../../components/error-message";
import Footer from "../../components/footer";

export default function SignIn({providers, siteUrl}) {
    const router = useRouter();

    let callbackUrl = router.query.callbackUrl ? router.query.callbackUrl : process.env.NEXT_PUBLIC_SITE_URL;

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
                                    className="md:flex-1 w-full text-center px-4 py-14 md:py-20 lg:p-20 flex items-center justify-center">
                                    <div>
                                        <h1 className="font-bold text-3xl mb-5">Hello there!</h1>
                                        <p className="font-light">Sign in with your preferred provider and find your
                                            next
                                            epic space to create!</p>
                                    </div>
                                </div>
                                <div
                                    className="text-center w-full md:flex-1 bg-gradient-to-br from-green-400 to-green-500 px-4 py-10 lg:p-20 flex items-center justify-center">
                                    <div className="mt-3">
                                        {Object.values(providers).map(provider => (
                                            <div key={provider.name} className="mb-3">
                                                <a href={`#` + provider.id}
                                                    onClick={() => signIn(provider.id, {callbackUrl: callbackUrl})}
                                                    className="block w-full btn btn--large bg-white hover:shadow-lg">
                                                <div className="align-middle inline-block -ml-2 mr-3 font-zero leading-none">
                                                <Image
                                                    src={`/icons/icon-${provider.id}.svg`}
                                                    width={16}
                                                    height={16}
                                                    className="inline-block align-middle mr-2"
                                                    />
                                                </div>&nbsp;
                                                    <span className="align-middle">Sign in with {provider.name}</span>
                                                </a>
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
    }
}

