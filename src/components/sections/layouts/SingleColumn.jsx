export default function SingleColumn({ col1 }) {
  if (!col1) return null
  return (
    <section className="py-12 md:py-16">
      <div className="main-container">
        <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: col1 }} />
      </div>
    </section>
  )
}
