export default function StatCallout({ value, suffix, label, description }) {
  return (
    <section className="py-14 md:py-16 bg-secondary text-white text-center">
      <div className="main-container">
        <div className="font-serif text-[5rem] md:text-[7rem] leading-none tracking-tight">
          {value}<span className="text-[#93c5fd]">{suffix}</span>
        </div>
        <div className="mt-3 text-[1.1rem] font-medium text-white/90">{label}</div>
        {description && <p className="mt-3 text-white/60 max-w-md mx-auto text-[14px]">{description}</p>}
      </div>
    </section>
  )
}
