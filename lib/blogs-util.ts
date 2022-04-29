import fs from 'fs'
import path from 'path';
import matter from 'gray-matter'

console.log('#######', process.cwd())
const postsDirectory = path.join(process.cwd(),'markdown-blogs')

export function getBlogsFiles(){
    return fs.readdirSync(postsDirectory)
}

export function getBlogData( postIdentifier: any ) {
    const postSlug = postIdentifier.replace(/\.md$/,'') // removes file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath,'utf-8')
    const { data, content } = matter(fileContent)
    const postData = { slug: postSlug , ...data, content, }
    return postData
}

export function getAllBlogs() {
    const postFiles = getBlogsFiles();
    const allBlogs = postFiles.map(postFile => {
        return getBlogData(postFile)
    })

    const sortedBlogs = allBlogs.sort( (blogA : any, blogB : any) => blogA.date > blogB.date ? -1 : 1 )
    return sortedBlogs
}

export function getFeaturedBlogs() {
    const allBlogs = getAllBlogs();
    const featuredBlogs = allBlogs.filter( (blog : any) => blog.isFeatured )
    return featuredBlogs
}