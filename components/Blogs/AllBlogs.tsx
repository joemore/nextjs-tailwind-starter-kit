import Link from "next/link";

export const AllBlogs = ( { blogs } : any ) => {

    return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
            </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {blogs.map((blog : any) => {
                const { title, date, excerpt, category, categorySlug, imageUrl, slug, authorName, authorURL, authorImageURL, readingTime } = blog 
            return (
            <div key={slug} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={imageUrl} alt="" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    { categorySlug && <p className="text-sm font-medium text-indigo-600">
                    <Link href={`/blogs/categories/${categorySlug}`}>
                        <a className="hover:underline">
                            {category}
                        </a>
                    </Link>
                    </p>}
                    <Link href={`/blogs/${slug}`}>
                        <a className="block mt-2">
                            <p className="text-xl font-semibold text-gray-900">{title}</p>
                            <p className="mt-3 text-base text-gray-500">{excerpt}</p>
                        </a>
                    </Link>
                </div>
                {authorName && authorURL &&  authorImageURL && 
                    <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                        <a href={authorURL}>
                            <span className="sr-only">{authorName}</span>
                            <img className="h-10 w-10 rounded-full" src={authorImageURL} alt="" />
                        </a>
                        </div>
                        <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            <a href={authorURL} className="hover:underline">
                            {authorName}
                            </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={date}>{date}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{readingTime} read</span>
                        </div>
                        </div>
                    </div>
                }
                </div>
            </div>
            )}
        )}
        </div>
        </div>
    </div>
    )
};