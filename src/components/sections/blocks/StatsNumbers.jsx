export default function StatsNumbers({ heading, items = [] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        {heading && <h2 className="text-center mb-12">{heading}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={item._key ?? i} className="text-center">
              <div className="font-serif text-[3rem] md:text-[3.5rem] leading-none text-secondary tracking-tight">
                {item.value}<span className="text-[#02634e]">{item.suffix}</span>
              </div>
              <div className="mt-2 text-[14px] text-[#6b7280] font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
