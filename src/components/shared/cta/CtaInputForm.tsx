import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';

interface CtaInputFormProps {
  btnClass?: string;
  ctaBtnText?: string;
  inputFieldClass?: string;
}

const CtaInputForm = ({ btnClass, ctaBtnText = 'Get Started', inputFieldClass }: CtaInputFormProps) => {
  return (
    <RevealAnimation delay={0.4}>
      <form
        action="#"
        method="post"
        className="flex flex-col items-center justify-start gap-3 md:flex-row"
        aria-label="Email signup">
        <input
          type="email"
          name="email"
          id="userEmail"
          placeholder="Enter your email"
          required
          autoComplete="email"
          className={cn(
            'placeholder:text-black/50 dark:border-stroke-7 dark:placeholder:text-bushwood/50 text-black dark:text-accent h-12 w-[85%] rounded-full border-accent px-[18px] py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-bushwood-600/60 focus-visible:ring-offset-1 md:w-[430px] lg:w-[340px]',
            inputFieldClass,
          )}
          aria-label="Email address"
        />
        <button
          type="submit"
          className={cn(
            'btn btn-md btn-primary bg-black border-none hover:btn-secondary dark:hover:btn-accent h-12 w-[85%] md:w-auto',
            btnClass,
          )}>
          <span>{ctaBtnText}</span>
        </button>
      </form>
    </RevealAnimation>
  );
};
CtaInputForm.displayName = 'CtaInputForm';

export default CtaInputForm;
