import Lottie from 'react-lottie'
import Link from 'next/link';
import {motion} from "framer-motion"
import * as guitarData from '../public/icons/electric-guitar-music.json'
import * as trumpetData from '../public/icons/trumpet-music.json'
import * as scrollDownData from '../public/icons/scroll-down.json'

export default function Hero() {

    const guitarOptions = {
        loop: true,
        autoplay: true,
        animationData: guitarData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    const trumpetOptions = {
        loop: true,
        autoplay: true,
        animationData: trumpetData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    const scrollDownOptions = {
        loop: true,
        autoplay: true,
        animationData: scrollDownData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    return (
        <section className="h-screen relative z-1">
            <div className="container mx-auto h-full px-3">
                <div
                    className="absolute bottom-0 left-0 z-0 transform -translate-x-1/3 translate-y-1/3 pointer-events-none">
                    <motion.div animate={{x: [0, -30, 0], y: [0, 30, 0]}}
                                transition={{repeat: Infinity, duration: 5}}>
                        <Lottie options={guitarOptions}
                                height={1000}
                                width={1000}
                                isClickToPauseDisabled={true}
                        />
                    </motion.div>
                </div>

                <div
                    className="absolute bottom-0 right-0 z-0 transform translate-x-1/3 translate-y-1/3 pointer-events-none -scale-x-100">
                    <motion.div animate={{x: [-30, 0, -30], y: [30, 0, 30]}}
                                transition={{repeat: Infinity, duration: 5}}>
                        <Lottie options={trumpetOptions}
                                height={1000}
                                width={1000}
                                isClickToPauseDisabled={true}
                        />
                    </motion.div>
                </div>


                <div className="flex text-center justify-center h-full relative z-1 pt-48">
                    <div className="w-full xl:w-2/3">

                        <div className="pt-10">
                            <h1 className="text-6xl mb-10 font-bold">Book spaces by the hour</h1>
                            <h3 className="mb-16 text-xl font-body font-light">Instantly book studios, venues, classes & more.</h3>
                            <form className="w-3/5 mx-auto relative">
                                <input
                                    className="transition duration-300 font-light text-lg duration-100 ease-in-out text-gray-600 py-4 pr-24 pl-12 block w-full appearance-none leading-normal border border-transparent rounded-lg focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-100 bg-gray-100 shadow-lg focus:shadow-xl"
                                    placeholder="Find a space"/>
                                <button type="submit"
                                        className="btn btn--large btn--form absolute right-0 top-0 h-full">Go
                                </button>
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 pl-5 flex items-center">
                                    <svg className="fill-current pointer-events-none text-gray-600 w-4 h-4"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                    </svg>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div
                    class="absolute bottom-20 left-1/2 transform -translate-x-1/2 font-light scroll-next cursor-pointer">
                    <span className="block mb-1 text-sm">Discover</span>
                    <Lottie options={scrollDownOptions}
                            height={22}
                            width={22}
                            isClickToPauseDisabled={true}
                    />
                </div>
            </div>
        </section>
    );
}
