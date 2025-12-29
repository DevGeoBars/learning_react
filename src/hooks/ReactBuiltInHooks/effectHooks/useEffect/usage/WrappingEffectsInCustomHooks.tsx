
import { FC, useEffect } from 'react';

//Examples of wrapping Effects in custom Hooks
export const useWindowListener = (eventType: keyof WindowEventMap, listener: EventListener): void => {
  useEffect(() => {
    window.addEventListener(eventType, listener);

    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
};

export const useHideCursor = () => {
  useEffect(() => {
    document.body.style.cursor = 'none';
    document.querySelectorAll('*').forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
      document.querySelectorAll('*').forEach(el => {
        (el as HTMLElement).style.cursor = 'auto';
      });
    };
  }, []);
}