export default function ThreeColumn({ col1, col2, col3 }) {
  return (
    <section className="py-12 md:py-16">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {col1 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col1 }} />}
          {col2 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col2 }} />}
          {col3 && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col3 }} />}
        </div>
      </div>
    </section>
  )
}
