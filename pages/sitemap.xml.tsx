
import fs from "fs";
import path from 'path';
import { getAllBlogs } from '../lib/blogs-util';

/**
 * Sitemap generator file for displaying the pages and blog pages on this website! 
 * WARNING - getFileLastMod() is not working for production, must fix this as the dates are not accurate. 
 * regularPages() - add these manually when a page is made
 * listBlogsSitemaps() - this is dynamic and uses the ./lib/blogs.util.ts file to get the blogs and generate the sitemap 
 * ERROR - Not currently working with AWS Amplify.
 */

const Sitemap = () => {};
const fsPromises = fs.promises;
const SITE_ROUTE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.mainwebsite.com';
    

const getFileLastMod = async (PAGE : string) => {
    try{
        const filePath = path.join('../',PAGE)
        const stats = await fsPromises.stat(filePath);
        return await new Date(stats.mtime).toISOString();
    }catch(err){
        console.log('🤬',err);
        return new Date().toISOString();
    }
    
}

const regularPages = async (route : string) => {
    const pages : any = {
        'pages/index.tsx' : '/',
        // ... add other static pages here... e.g.
        // 'pages/about.tsx' : '/about',
        // 'pages/contact.tsx' : '/contact',
        // 'pages/demo.tsx' : '/demo',
    }
    const output = await Object.keys(pages).map(async (file : string) => {
        const path = pages[file]
        return `
            <url>
            <loc>${route + path}</loc>
            <lastmod>${await getFileLastMod(file)}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
            </url>
        `
    })
    return await Promise.all(output);
}

const listBlogsSitemaps = async (route : string) => {
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

export const getServerSideProps = async ({ res } : any) => {
    const regPages = await (await regularPages(SITE_ROUTE)).join('')
    const blogs = await (await listBlogsSitemaps(SITE_ROUTE)).join('');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${regPages}
            ${blogs}
        </urlset>
    `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;