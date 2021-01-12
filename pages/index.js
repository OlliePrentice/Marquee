import Head from 'next/head'
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Categories from "../components/categories";
import Carousel from "../components/carousel";
import Cta from "../components/cta";

export default function Home() {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/icons/favicon.ico"/>
            </Head>
            <Header/>
            <Layout>
                <Hero/>
                <Categories/>
                <Carousel heading="Spaces" cards="spaces"/>
                <Carousel heading="Stories" cards="stories"/>
                <Cta heading="Add your space"
                     description="Sign up below to list your space and let others have epic experiences!" link="/"
                     linkTitle="Sign up!"/>
            </Layout>
            <Footer/>
        </>
    )
}

