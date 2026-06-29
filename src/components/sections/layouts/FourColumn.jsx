export default function FourColumn({ col1, col2, col3, col4 }) {
  return (
    <section className="py-12 md:py-16">
      <div className="main-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {col1 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col1 }} />}
          {col2 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col2 }} />}
          {col3 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col3 }} />}
          {col4 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col4 }} />}
        </div>
      </div>
    </section>
  )
}
