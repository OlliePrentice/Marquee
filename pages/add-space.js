import react, { Component } from 'react';
import Head from "next/head";
import Layout from "../components/layout";
import Footer from "../components/footer";
import ContainerFullWidth from "../components/container-full-width";
import SearchLocationInput from "../components/addSpace/search-location-input";
import addCategories from "../components/addSpace/add-categories";

export default class AddSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 1};
        this.handler = this.handler.bind(this);
    }

    handler(val) {
        this.setState({
          page: val
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/icons/favicon.ico"/>
                </Head>
                <Layout>
                    <ContainerFullWidth background="bg-gray-50">
                        <div className="text-center pb-10">
                            <a href="/"
                               className="text-xl font-medium text-gray-600 font-display">marquee.io</a>
                        </div>
                        <div className="max-w-3xl mx-auto pt-20 pb-80">
                            <form>
                                {this.state.page === 1 && <SearchLocationInput handler={this.handler}/>}
                                {this.state.page === 1 && <addCategories handler={this.handler}/>}
                            </form>
                        </div>
                    </ContainerFullWidth>
                </Layout>
                <Footer/>
            </>
        );
    }
};
