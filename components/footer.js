import {signIn, signOut, useSession} from 'next-auth/client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Header() {
    const [session, loading] = useSession()


    return (
        <footer className="main-footer bg-gray-100 z-50">
            <div className="container mx-auto px-3">
                <div className="py-10">
                    <div className="mb-10">
                        <a href="/"
                           className="main-header__logo-link text-lg font-medium text-gray-600 font-display">marquee.io</a>
                    </div>
                    <nav>
                        <ul className="flex flex-wrap">
                            <li className="w-1/4">
                                <a href="/" className="font-bold uppercase text-sm mb-4 inline-block tracking-wide">About</a>
                                <ul>
                                    <li className="mb-2">
                                        <a href="/">How we work</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">Stories</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">Privacy Policy</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">Terms & Conditions</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="w-1/4">
                                <a href="/" className="font-bold uppercase text-sm mb-4 inline-block tracking-wide">Support</a>
                                <ul>
                                    <li className="mb-2">
                                        <a href="/">FAQ</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">COVID-19</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">Contact</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/">Tips for advertising your space</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="w-1/4">
                                <a href="/" className="font-bold uppercase text-sm mb-4 inline-block tracking-wide">Get Involved</a>
                                <ul>
                                    <li className="mb-2">
                                        <a href="/">Add your space</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="w-1/4">
                                <a href="/" className="font-bold uppercase text-sm mb-4 inline-block tracking-wide">Account</a>
                                <ul>
                                    <li className="mb-2">
                                        {!session && <>
                                            <button onClick={signIn}>Sign in</button>
                                        </>}
                                        {session && <>
                                            <button onClick={signOut}>Sign out</button>
                                        </>}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="border-t py-5">
                <div className="container mx-auto px-3">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <span className="text-sm">Marquee, Inc. &copy; {new Date().getFullYear()}. All rights reserved.</span>
                        </div>
                        <div>
                            <ul className="font-zero -mx-3">
                                <li className="inline-block px-3">
                                    <a href="/" className="hover:text-green-500">
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                                    </a>
                                </li>
                                <li className="inline-block px-3">
                                    <a href="/" className="hover:text-green-500">
                                        <FontAwesomeIcon icon={['fab', 'twitter']}/>
                                    </a>
                                </li>
                                <li className="inline-block px-3">
                                    <a href="/" className="hover:text-green-500">
                                        <FontAwesomeIcon icon={['fab', 'instagram']}/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}
