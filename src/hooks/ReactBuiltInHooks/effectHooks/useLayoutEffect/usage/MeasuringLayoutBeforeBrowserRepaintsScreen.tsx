import { FC, useRef, useLayoutEffect, useState, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
//https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen
type MeasuringLayoutBeforeBrowserRepaintsScreenProps = {};

export const MeasuringLayoutBeforeBrowserRepaintsScreen: FC<MeasuringLayoutBeforeBrowserRepaintsScreenProps> = ({}) => {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>

    </div>
  );
};

// TooltipContainer
interface TooltipContainerProps {
  children: ReactNode;
  x: number;
  y: number;
  contentRef:RefObject<HTMLDivElement | null>;
}

export const TooltipContainer: FC<TooltipContainerProps> = ({
                                                              children,
                                                              x,
                                                              y,
                                                              contentRef
                                                            }) => {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
};


// Tooltip
interface TooltipProps {
  children: ReactNode;
  targetRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
}

export const Tooltip: FC<TooltipProps> = ({ children, targetRect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltipHeight(rect.height);
      console.log('Measured tooltip height: ' + rect.height);
    }
  }, []);

  let tooltipX = targetRect.left;
  let tooltipY = targetRect.top - tooltipHeight;

  if (tooltipY < 0) {
    tooltipY = targetRect.bottom;
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
};


// ButtonWithTooltip
interface ButtonWithTooltipProps {
  tooltipContent: ReactNode;
  children: ReactNode;

}

export const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({
                                                                tooltipContent,
                                                                children,
                                                              }) => {
  const [targetRect, setTargetRect] = useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onPointerEnter={() => { // кросплатформенный onMouseInter
          const rect = buttonRef.current!.getBoundingClientRect(); //getBoundingClientRect() возвращает не расстояния до краев, всегда возвращает координаты от левого верхнего угла.

          setTargetRect({
            left: rect.left, // координата X левой границы элемента от левой границы viewport
            right: rect.right, // координата X правой границыот левой элемента
            top: rect.top, // координата Y верхней границы элемента от верхней границы viewport
            bottom: rect.bottom, // координата Y нижней границы элемента верхней границы viewport
          });

          const fromViewPortRightToElement = window.innerWidth - rect.right;
          const fromViewPortBottomToElement = window.innerHeight - rect.bottom;

          console.log(rect);
          console.log(fromViewPortRightToElement)
          console.log(fromViewPortBottomToElement)
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      >
        {children}
      </button>
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )}
    </>
  );
};