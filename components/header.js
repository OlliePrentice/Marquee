import {signIn, signOut, useSession} from 'next-auth/client'
import Lottie from "react-lottie";
import * as userLottie from '../public/icons/user.json'


export default function Header() {
    const [session, loading] = useSession()

    const userLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: userLottie.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        resizeMode: 'cover'
    };

    return (
        <header className="main-header bg-white fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto px-3">
                <div className="flex -mx-2 items-center">
                    <div className="flex-1 px-2">
                        <div className="main-header__logo">
                            <a href="/"
                               className="main-header__logo-link text-lg font-medium text-gray-600 font-display">marquee.io</a>
                        </div>
                    </div>


                    <div className="flex-1 px-2 text-right">
                        <nav className="main-header__nav text-zero">
                            <ul>
                                <li>
                                    <a href="/" className="active-page">Home</a>
                                </li>
                                <li>
                                    <a href="/">Stories</a>
                                </li>

                                <li>
                                    <a href="/">Add your space</a>
                                </li>
                                <li>
                                    {!session && <>

                                        <button onClick={signIn} className="profile-menu flex items-center p-2 bg-gray-700 rounded-3xl shadow-sm hover:shadow-md">
                                            <span className="burger mx-2"></span>
                                            <span className="block p-1 bg-white rounded-full mx-1">
                                            <Lottie options={userLottieOptions}
                                                    height={25}
                                                    width={25}
                                                    isClickToPauseDisabled={true}
                                            />
                                            </span>
                                        </button>
                                    </>}
                                    {session && <>
                                        <button className="btn" onClick={signOut}>Sign out</button>
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
