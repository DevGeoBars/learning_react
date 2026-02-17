import { FC, useRef, useLayoutEffect, useState, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';

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
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
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
  } | null;
}

export const Tooltip: FC<TooltipProps> = ({ children, targetRect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
      console.log('Measured tooltip height: ' + height);
    }
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;

  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;

    if (tooltipY < 0) {
      tooltipY = targetRect.bottom;
    }
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
  [key: string]: any; // для остальных пропсов кнопки
}

export const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({
                                                                tooltipContent,
                                                                children,
                                                                ...rest
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
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current!.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
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