import {FC, useEffect, useInsertionEffect, useLayoutEffect, useRef} from "react";

type TUseLayoutEffectExampleProps = {

}
export const UseLayoutEffectExample: FC<TUseLayoutEffectExampleProps>  = ({}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('4. useEffect - ПОСЛЕ отрисовки браузера');
  });

  // 3. useInsertionEffect используйте ТОЛЬКО если пишете библиотеку CSS-in-JS
  useInsertionEffect(() => {
    console.log('1. useInsertionEffect - ДО изменений DOM');
    console.log('   ref.current:', ref.current); // null - DOM ещё не создан
  });

  // 2. Переходите на useLayoutEffect ТОЛЬКО если:
  //    - Нужно измерить DOM перед отрисовкой
  //    - Видите "мигание" при обновлении состояния
  useLayoutEffect(() => {
    console.log('3. useLayoutEffect - ПОСЛЕ изменений DOM');
    console.log('   ref.current:', ref.current); // HTMLDivElement - DOM уже создан
    console.log('   offsetWidth:', ref.current?.offsetWidth);
  });



  console.log('2. Render - создаётся JSX');

  return <>
    <div ref={ref}>Тестовый элемент</div>;
  </>
};

