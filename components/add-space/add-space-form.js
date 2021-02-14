import {Component} from 'react';
import Head from "next/head";
import { withRouter } from 'next/router'
import Layout from "../layout";
import Footer from "../footer";
import ContainerFullWidth from "../container-full-width";
import SearchLocationInput from "./search-location-input";
import AddCategories from "./add-categories";
import AddDetails from "./add-details";
import CalendarBuilder from "./calendar-builder";

class AddSpaceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: (parseInt(props.router.query.step)) || 1,
            loc: props.router
        };
        this.pageHandler = this.pageHandler.bind(this);

    }

    componentDidUpdate(prevProps) {

        const { query } = this.props.router;
        if (query.step !== prevProps.router.query.step) {
            this.setState({
                page: (parseInt(query.step)) || 1
            });
        }
    }

    pageHandler(val) {
        this.setState({
            page: val
        });

        window.scrollTo(0,0);
        this.props.router.push('/add-space?step=' + val, undefined);
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
                        <div className="max-w-4xl mx-auto pt-20 pb-20">
                            <form>
                                {this.state.page === 1 && <SearchLocationInput pageHandler={this.pageHandler}/>}
                                {this.state.page === 2 &&
                                <AddCategories categories={this.props.categories}
                                               pageHandler={this.pageHandler}/>}
                                {this.state.page === 3 &&
                                <AddDetails pageHandler={this.pageHandler}/>}
                                {this.state.page === 4 &&
                                <CalendarBuilder pageHandler={this.pageHandler}/>}
                            </form>
                        </div>
                    </ContainerFullWidth>
                </Layout>
                <Footer/>
            </>
        );
    }
};


export default withRouter(AddSpaceForm);
