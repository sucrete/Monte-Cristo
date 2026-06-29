export default function FeaturesGrid({ heading, subheading, items = [] }) {
  return (
    <section className="py-16 md:py-20 bg-[#fafafa]">
      <div className="main-container">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && <h2 className="mb-3">{heading}</h2>}
            {subheading && <p className="text-[#6b7280] max-w-xl mx-auto">{subheading}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={item._key ?? i} className="bg-white rounded-xl p-6 border border-[#e8eaed]">
              <h3 className="text-[1.1rem] mb-2">{item.title}</h3>
              {item.description && <p className="text-[#6b7280] text-[14px] leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
