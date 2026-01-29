import {FC, useEffect, useInsertionEffect, useLayoutEffect, useRef} from "react";

type TUseLayoutEffectExampleProps = {

}
export const UseLayoutEffectExample: FC<TUseLayoutEffectExampleProps>  = ({}) => {
  const ref = useRef<HTMLDivElement>(null);

  // 2. Переходите на useLayoutEffect ТОЛЬКО если:
  //    - Нужно измерить DOM перед отрисовкой
  //    - Видите "мигание" при обновлении состояния
  useLayoutEffect(() => {
    console.log('3. useLayoutEffect - ПОСЛЕ изменений DOM');
    console.log('   ref.current:', ref.current); // HTMLDivElement - DOM уже создан
    console.log('   offsetWidth:', ref.current?.offsetWidth);
  });

  return <>
    <div ref={ref}>Тестовый элемент</div>;
  </>
};

