import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

SyntaxHighlighter.registerLanguage('js',js)
SyntaxHighlighter.registerLanguage('css',css)

export default function BlogContent( {BlogData}:any ) {


    const {
        title,
        excerpt,
        content, 
        date,
        imageUrl
    } = BlogData


    // Overwrite markdown elements here...
    const customRenderers = {
        // h2: 'h1',
        // image( image ){
        //     console.log(image)
        //     return <Image src={`/images/posts/${slug}/${image.src}`} alt={image.alt} width={600} height={300}/>
        // },
        em: ({node, ...props} :any) => {
            
            return <i style={{color: 'red'}} {...props} />
        },
        p: ({node, children} : any) => {
            if( node.children[0].tagName === 'img'){
                
                const image = node.children[0].properties
                return <div className="">
                    {
                        (image.src.startsWith('http://') || image.src.startsWith('https://')) && <img src={image.src} width={600} height={300} alt={image.alt}/>
                    }
                    {/* Internal images - to be sorted another time */}
                    {/* <Image src={`/images/posts/${slug}/${image.src}`} alt={image.alt} width={600} height={300}/> */}
                </div>
            }else{
                
                return <p>{children}</p>
            }
            
        },
        code: ( {node, inline, children, className, ...props} : any ) => {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
            <SyntaxHighlighter 
                style={atomDark} 
                language={match && match[1] || ''} 
                {...props}
                >
                {children}
            </SyntaxHighlighter>
        
            ) : (
                <code className="bg-red-100 text font-mono text-red-800 px-1 rounded-md"{...props}>
                {children}
                </code>
            )

            // return <SyntaxHighlighter style={atomDark} language={match && match[1]}  children={children} {...props}/>
        }
    }

    return (
    <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            >
            <defs>
                <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
                >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            >
            <defs>
                <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
                >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            >
            <defs>
                <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
                >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
        </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
            <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                Blog Page
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
            </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
                {excerpt}
            </p>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">

            <img
                className="w-full rounded-lg mb-20"
                src={imageUrl}
                alt=""
                width={1310}
                height={873}
            />

            <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
            
        </div>
        </div>
    </div>
    )
}
