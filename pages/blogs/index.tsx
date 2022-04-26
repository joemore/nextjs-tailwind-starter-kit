import type { NextPage } from 'next'
import Head from 'next/head'
import { AllBlogs } from '../../components/Blogs/AllBlogs';

import { getAllBlogs } from "../../lib/blogs-util";



const AllBlogsPage: NextPage = (props: any) => {
    return <>
    <Head>
        <title>All Blogs</title>
    </Head>

    <AllBlogs blogs={props.blogs}/>
    </>
}
export default AllBlogsPage

export function getStaticProps(){
    const allBlogs = getAllBlogs()
    return {
        props: {
            blogs : allBlogs
        }
    }
}
