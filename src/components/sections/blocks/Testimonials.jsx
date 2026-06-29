import Image from 'next/image'

export default function Testimonials({ heading, items = [] }) {
  return (
    <section className="py-16 md:py-20 bg-[#fafafa]">
      <div className="main-container">
        {heading && <h2 className="text-center mb-12">{heading}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={item._key ?? i} className="bg-white rounded-xl p-7 border border-[#e8eaed]">
              <p className="text-[15px] leading-relaxed text-[#3f3f3f] mb-5 italic">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                {item.photo?.asset?.url && (
                  <Image
                    src={item.photo.asset.url}
                    alt={item.name}
                    width={36} height={36}
                    className="rounded-full object-cover size-9"
                  />
                )}
                <div>
                  <div className="font-medium text-secondary text-[14px]">{item.name}</div>
                  {item.role && <div className="text-[12px] text-[#9ca3af]">{item.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
