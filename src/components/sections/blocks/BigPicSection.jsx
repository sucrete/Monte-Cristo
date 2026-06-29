import RevealAnimation from '@/components/animation/RevealAnimation'
import ParallaxImageBackground from '@/components/ui/ParallaxImageBackground'

export default function BigPicSection({ image, overlayLabel, overlayCaption, features = [] }) {
  const src = image?.asset?.url
  if (!src) return null
  return (
    <section className="relative">
      <div className="background-section absolute inset-0 -z-14 bg-[#fafafa] size-full" />
      <div className="w-full h-[450px] md:h-[800px] relative">
        <div className="background-section opacity-25 absolute inset-0 -z-2 size-full bg-linear-[to_bottom,hsla(0,0%,0%,0)_0%,hsla(0,0%,0%,0.25)_49.2%,hsl(0,0%,0%)_100%]" />
        <ParallaxImageBackground src={src} />
        <div className="absolute bottom-5 left-5 md:bottom-[50px] md:left-[50px]">
          {(overlayLabel || features.length > 0) && (
            <div className="text-[#ffffffa5] monospaced flex flex-row">
              <RevealAnimation delay={0.3} offset={7}>
                <span className="green-circle size-[9px] bg-ns-green rounded-full inline-block mr-3 -mb-[1px]" />
              </RevealAnimation>
              <RevealAnimation delay={0.35} offset={7}>
                <span className="inline-block">{overlayLabel || features.map(f => f.text).join(' · ')}</span>
              </RevealAnimation>
            </div>
          )}
          {overlayCaption && (
            <RevealAnimation delay={0.45} offset={7}>
              <div className="text-[#fff] text-[18px] pt-[10px]">{overlayCaption}</div>
            </RevealAnimation>
          )}
        </div>
      </div>
    </section>
  )
}
