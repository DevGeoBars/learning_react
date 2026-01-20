import {FC, useEffect, useInsertionEffect, useLayoutEffect} from "react";

type TUseLayoutEffectExampleProps = {

}
export const UseLayoutEffectExample: FC<TUseLayoutEffectExampleProps>  = ({}) => {

  // 1. Начинайте всегда с useEffect (для всего)
  useEffect(() => { /* загрузка данных, подписки */
  });

  // 2. Переходите на useLayoutEffect ТОЛЬКО если:
  //    - Нужно измерить DOM перед отрисовкой
  //    - Видите "мигание" при обновлении состояния
  useLayoutEffect(() => { /* измерение элементов */
  });

  // 3. useInsertionEffect используйте ТОЛЬКО если пишете библиотеку CSS-in-JS
  useInsertionEffect(() => { /* вставка стилей */
  });


  return <>

  </>
};

