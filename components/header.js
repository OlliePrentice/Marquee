import {signIn, signOut, useSession} from 'next-auth/client'
import Lottie from "lottie-react";
import * as userAnimation from '../public/icons/user.json'

export default function Header() {
    const [session] = useSession();

    return (
        <header className="main-header bg-white md:fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto">
                <div className="flex -mx-2 items-center">
                    <div className="flex-1 px-2 text-center md:text-left">
                        <div className="main-header__logo py-10 md:py-0">
                            <a href="/"
                               className="main-header__logo-link text-lg font-medium text-gray-600 font-display">marquee.io</a>
                        </div>
                    </div>


                    <div className="flex-1 px-2 text-right hidden md:block">
                        <nav className="main-header__nav text-zero">
                            <ul>
                                <li className="relative">
                                    <a href="/" className="active-page">Home</a>
                                </li>
                                <li>
                                    <a href="/">Stories</a>
                                </li>

                                <li>
                                    {!session && <a href={`/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_SITE_URL}/add-space`}>Add your space</a>}
                                    {session && <a href="/add-space">Add your space</a>}
                                </li>
                                <li>
                                    {!session && <>
                                        <button onClick={signIn}
                                                className="profile-menu flex items-center p-2 bg-gray-700 rounded-3xl shadow-sm hover:shadow-md">
                                            <span className="burger mx-2"/>
                                            <span className="block p-1 bg-white rounded-full mx-1">
                                            <Lottie animationData={userAnimation.default}
                                                    style={{width: 24, height: 24}}/>
                                                    <span className="sr-only">Sign In</span>
                                            </span>
                                        </button>
                                    </>}
                                    {session && <>
                                        <button onClick={signOut}
                                                className="profile-menu flex items-center p-2 bg-gray-700 rounded-3xl shadow-sm hover:shadow-md">
                                            <span className="burger mx-2"/>
                                            <span className="block bg-white p-0.5 rounded-full mx-1">
                                                <img src={session.user.image} alt="User Image"
                                                     className="w-7 h-7 rounded-full"/>
                                                     <span className="sr-only">Sign Out</span>
                                            </span>
                                        </button>
                                    </>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
