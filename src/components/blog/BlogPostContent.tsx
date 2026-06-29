export default function BlogPostContent({ body }: { body: string }) {
  if (!body) return null;
  return (
    <div className="blog-body tinymce-content" dangerouslySetInnerHTML={{ __html: body }} />
  );
}
