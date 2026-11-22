import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  Children,
  isValidElement,
  type ReactNode,
} from 'react';

import { ChevronDownIcon } from './icons';

interface StepProps {
  title: string;
  complete: boolean;
  children: ReactNode;
}

export function Step(_props: StepProps) {
  return null;
}

interface SteppedFormProps {
  children: ReactNode;
  className?: string;
}

interface StepMeta {
  index: number;
  title: string;
  complete: boolean;
  content: ReactNode;
}

function extractSteps(children: ReactNode): StepMeta[] {
  const steps: StepMeta[] = [];
  let index = 0;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Step) {
      const props = child.props as StepProps;
      steps.push({
        index,
        title: props.title,
        complete: props.complete,
        content: props.children,
      });
      index++;
    }
  });
  return steps;
}

export function SteppedForm({ children, className = '' }: SteppedFormProps) {
  const steps = extractSteps(children);

  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(steps.length > 0 ? [0] : []),
  );

  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const prevCompleteRef = useRef<Record<number, boolean>>({});

  const completeSnapshot = useMemo(
    () => steps.map((s) => s.complete).join(','),
    [steps],
  );

  useEffect(() => {
    const currentSteps = stepsRef.current;
    const prev = prevCompleteRef.current;
    for (let i = 0; i < currentSteps.length - 1; i++) {
      if (currentSteps[i].complete && !prev[i]) {
        setOpenIndices((s) => new Set(s).add(i + 1));
      }
    }
    prevCompleteRef.current = Object.fromEntries(
      currentSteps.map((s) => [s.index, s.complete]),
    );
  }, [completeSnapshot]);

  const toggle = useCallback((idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {steps.map((step) => {
        const isOpen = openIndices.has(step.index);
        return (
          <div
            key={step.index}
            className='rounded-lg bg-background-white shadow-card'
          >
            <button
              type='button'
              aria-expanded={isOpen}
              className='flex h-20 w-full cursor-pointer items-center gap-3 px-5 text-left select-none'
              onClick={() => toggle(step.index)}
            >
              <span
                aria-hidden
                className='size-2.5 shrink-0 rounded-full bg-brand-gradient opacity-70'
              />
              <span className='flex-1 text-base leading-none text-text-primary'>
                {step.title}
              </span>
              <ChevronDownIcon
                className={`size-5 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && <div className='px-5 pt-4 pb-8'>{step.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
