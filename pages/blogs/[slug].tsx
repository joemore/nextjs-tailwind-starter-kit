import { NextPage } from 'next';
import Head from 'next/head'
import BlogContent from "../../components/Blogs/BlogContent";
import { getBlogData, getBlogsFiles } from "../../lib/blogs-util";


const BlogDetailPage: NextPage = (props: any) => {
    return <>
        <Head>
            <title>{props.Blog.title}</title>
        </Head>
        <BlogContent BlogData={props.Blog}/>
    </>
}
export default BlogDetailPage

export function getStaticProps(context : any){
    const { params } = context
    const slug = params.slug;
    const BlogData= getBlogData(slug)

    return {
        props: {
            Blog : BlogData
        },
        revalidate: 600
    }
}

export function getStaticPaths(){
    const files = getBlogsFiles();
    const slugs = files.map( (fileName ) => fileName.replace(/\.md$/,'') )
    return {
        paths: slugs.map( slug => ({ params: { slug: slug }})),
        fallback: false,
    }
}