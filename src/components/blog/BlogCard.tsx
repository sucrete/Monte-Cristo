import Image from 'next/image';
import Link from 'next/link';
import { SmallArrow } from '@/components/ui/Icons';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  author?: string;
  coverImageUrl?: string;
  lqip?: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ title, slug, excerpt, publishedAt, author, coverImageUrl, lqip }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="h-full bg-white dark:bg-background-6 rounded-[20px] overflow-hidden border border-[#80808021] transition-shadow duration-300 group-hover:shadow-[0px_20px_25px_-10px_rgba(0,0,0,0.1),0px_10px_10px_-10px_rgba(0,0,0,0.04)] flex flex-col">
        {coverImageUrl && (
          <figure className="h-[220px] overflow-hidden flex-shrink-0">
            <Image
              src={coverImageUrl}
              placeholder={lqip ? 'blur' : 'empty'}
              blurDataURL={lqip}
              width={600}
              height={220}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
          </figure>
        )}
        <div className="flex flex-col flex-1 p-6 space-y-3">
          {publishedAt && (
            <p className="monospaced text-[11px] text-black/40 dark:text-accent/40">
              {formatDate(publishedAt)}{author ? ` · ${author}` : ''}
            </p>
          )}
          <h3 className="text-[18px] leading-[1.3] semibold group-hover:text-ns-green transition-colors duration-200">
            {title}
          </h3>
          {excerpt && (
            <p className="text-[14px] text-black/60 dark:text-accent/60 leading-[1.5] line-clamp-3 flex-1">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-1 pt-2">
            <span className="text-[13px] transition-colors text-black/60 group-hover:text-black/90 medium">Read more</span>
            <SmallArrow className="size-4 fill-black/40 group-hover:fill-black/90 -rotate-45 transition-translate duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
