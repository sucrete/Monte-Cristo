import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import BlogCard from '../blog/BlogCard';
import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_POSTS_PREVIEW_QUERY } from '@/sanity/lib/queries';

const BlogPreview = async () => {
  const { data: posts } = await sanityFetch({ query: BLOG_POSTS_PREVIEW_QUERY });

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 lg:py-[100px] bg-background-2 dark:bg-background-5">
      <div className="main-container">
        <RevealAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
            <div>
              {/* <span className="badge badge-cyan mb-3 block w-fit">From the Blog</span> */}
              <h2 className="leading-[1.1]">News &amp; Stories</h2>
            </div>
            <Link
              href="/blog"
              className=" monospaced text-[#797979] hover:underline underline-offset-4 whitespace-nowrap">
              View all posts →
            </Link>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any, index: number) => (
            <RevealAnimation key={post._id} delay={0.1 + index * 0.1}>
              <BlogCard
                title={post.title}
                slug={post.slug.current}
                excerpt={typeof post.excerpt === 'string' ? post.excerpt.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 150) + '…' : undefined}
                publishedAt={post.publishedAt}
                author={post.author}
                coverImageUrl={post.coverImage?.asset?.url}
                lqip={post.coverImage?.asset?.metadata?.lqip}
              />
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
