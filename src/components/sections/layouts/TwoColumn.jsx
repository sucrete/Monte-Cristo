export default function TwoColumn({ col1, col2 }) {
  return (
    <section className="py-12 md:py-16">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {col1 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col1 }} />}
          {col2 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col2 }} />}
        </div>
      </div>
    </section>
  )
}
