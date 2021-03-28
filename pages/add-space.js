import AddSpaceForm from '../components/add-space/add-space-form';
import Head from "next/head";
import { useSession } from 'next-auth/client';
import { withRouter } from 'next/router';
import {getTopLevelCategories} from '../lib/mongodb';

function AddSpace(props) {

    const [ session, loading ] = useSession()

    if (loading) return null

    if (!loading && !session) { 
        
        props.router.push('/', undefined); 
        return false;
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>
            <AddSpaceForm categories={props.categories} />
        </>
    )

}

export async function getServerSideProps() {
    const categories = (await getTopLevelCategories()) ?? [];

    return {
        props: {
            categories: categories,
        },
    }
}

export default withRouter(AddSpace);