import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import usePrevious from "../../utils/usePrevious";
import Layout from "../layout";
import Footer from "../footer";
import ContainerFullWidth from "../container-full-width";
import SearchLocationInput from "./search-location-input";
import AddCategories from "./add-categories";
import AddDetails from "./add-details";
import CalendarBuilder from "./calendar-builder";
import FormButton from "../elements/form-button";


export default function AddSpaceForm(props) {

    const router = useRouter();
    const [pageNumber, setPageNumber] = useState(1);
    const prevProps = usePrevious({router});
    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);

    function pageHandler(val) {

        setPageNumber(val);
        router.push('/add-space?step=' + val, undefined);
        window.scrollTo(0,0);

    }

    useEffect(() => {
    
        const { query } = router;
        if (prevProps === undefined || query.step !== prevProps.router.query.step) {
            setPageNumber((parseInt(query.step)) || 1);
        }
        
    }, [router]);

    return (
        <>
            <Layout>
                <ContainerFullWidth background="bg-gray-50">
                    <div className="text-center pb-10">
                        <a href="/"
                           className="text-xl font-medium text-gray-600 font-display">marquee.io</a>
                    </div>
                    <div className="max-w-4xl mx-auto pt-20 pb-20">
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            {pageNumber !== 1 && 
                            <>
                                <div className="mb-14">
                                    <FormButton type="button"
                                        onClick={() => pageHandler(pageNumber - 1)}>Back</FormButton>
                                </div>
                            </>}
                            {pageNumber === 1 && <SearchLocationInput pageHandler={pageHandler}/>}
                            {pageNumber === 2 &&
                            <AddCategories register={register} categories={props.categories}
                                           pageHandler={pageHandler}/>}
                            {pageNumber === 3 &&
                            <AddDetails pageHandler={pageHandler}/>}
                            {pageNumber === 4 &&
                            <>
                                <CalendarBuilder pageHandler={pageHandler}/>
                                <div className="text-center">
                                    <FormButton type="submit" classNames="w-full">Submit</FormButton>
                                </div>
                            </>
                            }
                        </form>
                    </div>
                </ContainerFullWidth>
            </Layout>
            <Footer/>
        </>
    );
}
