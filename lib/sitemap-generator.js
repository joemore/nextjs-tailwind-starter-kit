const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Sitemap generator file for displaying the pages and blog pages on this website! 
 * regularPages() - add these manually when a page is made
 * listBlogsSitemaps() - this is dynamic and uses the ./lib/blogs.util.ts file to get the blogs and generate the sitemap 
 */

const fsPromises = fs.promises;
const SITE_ROUTE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.mywebsite.com';

const postsDirectory = path.join(process.cwd(),'markdown-blogs')

const getBlogsFiles = () => {
    return fs.readdirSync(postsDirectory)
}
const getBlogData = ( postIdentifier ) => {
    const postSlug = postIdentifier.replace(/\.md$/,'') // removes file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath,'utf-8')
    const { data, content } = matter(fileContent)
    const postData = { slug: postSlug , ...data, content, }
    return postData
}
const getAllBlogs = () => {
    const postFiles = getBlogsFiles();
    const allBlogs = postFiles.map(postFile => {
        return getBlogData(postFile)
    })

    const sortedBlogs = allBlogs.sort( (blogA , blogB ) => blogA.date > blogB.date ? -1 : 1 )
    return sortedBlogs
}
    
const getFileLastMod = async (PAGE ) => {
    try{
        const filePath = path.join(process.cwd(),PAGE)
        const stats = await fsPromises.stat(filePath);
        return await new Date(stats.mtime).toISOString();
    }catch(err){
        console.log('🤬',err);
        return false;
    }
    
}

const regularPages = async (route) => {
    const pages  = {
        'pages/index.tsx' : '/',
        // ... add other static pages here... e.g.
        // 'pages/about.tsx' : '/about',
        // 'pages/contact.tsx' : '/contact',
        // 'pages/blogs/index.tsx' : '/blogs',
    }
    const output = await Object.keys(pages).map(async (file) => {
        const path = pages[file]
        const lastmod = await getFileLastMod(file);
        if(lastmod){
            return `
                <url>
                <loc>${route + path}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
                </url>
            `
        }else{
            return `<!-- No file exists for : ${file} (${path}) -->`
        }
        
    })
    return await Promise.all(output);
}

const listBlogsSitemaps = async (route) => {
    const blogs = getAllBlogs();
    const formatted = await blogs.map( async ( blog ) => {
        return `<url>
                <loc>${route}/blogs/${blog.slug}</loc>
                <lastmod>${await getFileLastMod(`markdown-blogs/${blog.slug}.md`)}</lastmod>  
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>`;
        });
    return await Promise.all(formatted);
}  

const generateSitemap = async () => {
    fs.readdirSync(path.join(process.cwd(), 'markdown-blogs'), 'utf8');
    const regPages = await (await regularPages(SITE_ROUTE)).join('')
    const blogs = await (await listBlogsSitemaps(SITE_ROUTE)).join('');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${regPages}
            ${blogs}
        </urlset>
    `;
    fs.writeFileSync('public/sitemap.xml', sitemap)
    return {
        props: {
        },
    };
};
generateSitemap();
