import { FC, useRef, useLayoutEffect, useState, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
//https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen
type MeasuringLayoutBeforeBrowserRepaintsScreenProps = {};

export const MeasuringLayoutBeforeBrowserRepaintsScreen: FC<MeasuringLayoutBeforeBrowserRepaintsScreenProps> = ({}) => {
  return (
    <div>

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


export const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({ tooltipContent, children}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = useState<Rectangle | null>(null);

  return (
    <>
      <button
        ref={buttonRef}
        onPointerEnter={() => { // кросплатформенный onMouseInter
          const rect = buttonRef.current!.getBoundingClientRect(); //getBoundingClientRect() возвращает кординаты квадрата элемента в кординатах
          setButtonRect({
            left: rect.left, // координата X левой границы элемента от левой границы viewport
            right: rect.right, // координата X правой границыот левой элемента
            top: rect.top, // координата Y верхней границы элемента от верхней границы viewport
            bottom: rect.bottom, // координата Y нижней границы элемента верхней границы viewport
            width: rect.width, // ширина
            height: rect.height// высота
          });
        }}
        onPointerLeave={() => {
          setButtonRect(null);
        }}
      >
        {children}
      </button>
      {buttonRect !== null && (
        <TooltipPortal buttonRect={buttonRect}>
          {tooltipContent}
        </TooltipPortal>
      )}
    </>
  );
};


// TooltipContainer

// Tooltip TooltipPortal

export const TooltipPortal: FC<TooltipPortalProps> = ({ children, buttonRect }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipContentRect, setTooltipContentRect] = useState<Rectangle | null>(null);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipContentRect(rect);
    }
  }, []);

  if (tooltipContentRect === null) {
    return null;
  }

  let tooltipX = buttonRect.left;
  let tooltipY = buttonRect.top - tooltipContentRect.height;

  if (tooltipY < 0) {
    tooltipY = buttonRect.bottom;
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={tooltipRef}>
      {children}
    </TooltipContainer>,
    document.body
  );
};


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






const checkIsElementUnder = (buttonRect: Rectangle, tooltipRect: Rectangle) => {
// Просто проверяем центр предполагаемого тултипа
  const centerX = buttonRect.left + tooltipRect.width / 2;
  const centerY = buttonRect.top - tooltipRect.width / 2;

  const elementAtCenter = document.elementFromPoint(centerX, centerY);

// Если в центре ничего нет или только body - ставим
  if (!elementAtCenter || elementAtCenter === document.body) {
    // ставим тултип
  }
}


interface ButtonWithTooltipProps {
  tooltipContent: ReactNode;
  children: ReactNode;

}

interface TooltipPortalProps {
  children: ReactNode;
  buttonRect: Rectangle;
}

interface TooltipContainerProps {
  children: ReactNode;
  x: number;
  y: number;
  contentRef:RefObject<HTMLDivElement | null>;
}


interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}