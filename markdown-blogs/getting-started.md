---
title: 'Markdown Blogs with Next JS'
category: #Not yet ready!!
categorySlug: #Not yet ready!!
date: '2022-10-16' #Must be in YYYY-MM-DD format
imageUrl: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
excerpt: This website makes use of Markdown files to generate it's blog articles, NextJS then builds them into static HTML files at build time. This article explains how they work!
readingTime: '6 min'
authorName: Joe Gilmore
authorURL: https://joemore.com/
authorImageURL: https://www.joemore.com/images/avatars/account-avatar-profile-user-01-svgrepo-com-cropped.svg
isFeatured: true
---


NextJS is a cool **framework for ReactJS**. It allows you to build sites using the familiar React framework, but instead of having a single page application that is poor for SEO
it instead allows you to generate all pages as static endpoint .html files, once your user lands on that page it becomes your starting point to run the rest of your website as 
a React application so you get the best of both worlds! Yay!

Whats also great is that because NextJS can build your pages it can make use of things such as the `fs` filesystem so we can read .md markdown files at build-time
and convert them into HTML files for our website.

### Plugins Required

In order to get this setup, we first have to install a few plugins: `gray-matter`, `react-markdown` & `react-syntax-highlighter` - once installed we can begin by first creating a 
file that reads our .md files:

```js
import fs from 'fs'
import path from 'path';
const postsDirectory = path.join(process.cwd(),'markdown-blogs')
export function getBlogsFiles(){
    return fs.readdirSync(postsDirectory)
}
```

...This picks up all of blog files within our `./markdown-blogs` folder, this uses the gray-matter plugin in order to pre-process our markdown files. So next lets take a look at a sample 
markdown file called: `sample-file.md` :


```markdown
---
title: 'Sample Blog File'
date: '2022-01-01'
imageUrl : 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
authorName: Joe Gilmore
excerpt: 'This is a very simple and basic markdown file used as an example!'
isFeatured: false
readingTime: 1 min
authorName: Joe Gilmore
authorURL: https://example.com/
authorImageURL: /images/avatars/account-avatar-profile-user-01-svgrepo-com-cropped.svg
---

# Heading 1

A simple paragraph goes here... and you basically just keep wiring content for your blog... You can **bold** text and *italicize* text and everything else you can think of with markdown!
```

...so next we create a function that parses this markdown file using gray-matter plugin to process the content and the metadata inside of the --- and closing --- hyphens:

```js
import matter from 'gray-matter'
export function getBlogData( postIdentifier: any ) {
    const postSlug = postIdentifier.replace(/\.md$/,'') // removes file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath,'utf-8')
    const { data, content } = matter(fileContent)
    const postData = { slug: postSlug , ...data, content, }
    return postData
}
```

With our blog articles all in this format we can then use a page to display them by mapping over our array of articles, and then finally to display
the actual blog content we can use the `react-markdown` plugin to parse our Markdown and turn it into HTML for us. For an extremely basic output
we can can simply do the following:

```js
import ReactMarkdown from 'react-markdown'
export default function BlogContent( {BlogData} ) {
    return <>
        <h1>{BlogData.title}</h1>
        <ReactMarkdown>{BlogData.content}</ReactMarkdown>
    </h1>
}
```

However, if you want to take advantage of adding some nice styling to your blog article page, this is where making use of the `react-syntax-highlighter` comes into play,
you essentially create a `customRenderer` object and pass this into your `<ReactMarkdown>` component like this:


```js
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
const customRenderers = {
        code: ( {node, inline, children, className, ...props} : any ) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
            <SyntaxHighlighter 
                style={atomDark} 
                language={match && match[1] || ''} 
                children={children} {...props}>
            </SyntaxHighlighter>
            ) : (
                <code className="bg-red-100 text font-mono text-red-800 px-1 rounded-md"{...props}>
                {children}
                </code>
            )
        }
    }
export default function BlogContent( {BlogData} ) {
    return <>
        <h1>{BlogData.title}</h1>
        <ReactMarkdown components={customRenderers}>{BlogData.content}</ReactMarkdown>
    </h1>
}
```

In the example above we are using the `SyntaxHighlighter` to highlight our `<pre><code></code></pre>` and our singular `<code></code>` tags 

Enjoy blogging in Markdown!!

