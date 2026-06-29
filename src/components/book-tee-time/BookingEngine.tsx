import RevealAnimation from '../animation/RevealAnimation';

const BookingEngine = () => {
  return (
    <section>
      <div className="main-container py-[10rem]">
        <RevealAnimation delay={0.3}>
          <iframe
            src="https://bookateetime.teequest.com/course/131"
            style={{ width: '100%', minHeight: '1000px', border: 'none' }}></iframe>
        </RevealAnimation>
      </div>
    </section>
  );
};
export default BookingEngine;
