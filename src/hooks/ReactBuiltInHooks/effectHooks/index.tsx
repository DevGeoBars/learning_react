export * from './useEffect'
export * from './useLayoutEffect'

import React from 'react';

const TimelineDemo: React.FC = () => {
  console.log('1️⃣ 🔄 RENDER PHASE: Компонент выполняется');
  console.log('   - Virtual DOM создается в памяти');
  console.log('   - React вычисляет diff (разницу)');
  console.log('   - Эта фаза МОЖЕТ БЫТЬ ПРЕРВАНА');

  // ========== COMMIT PHASE начинается ==========
  console.log('2️⃣ 📦 COMMIT PHASE начался');
  console.log('   - Эта фаза НЕ МОЖЕТ БЫТЬ ПРЕРВАНА');
  console.log('   - React начинает обновлять DOM');

  // useInsertionEffect - В НАЧАЛЕ Commit Phase
  React.useInsertionEffect(() => {
    console.log('3️⃣ 🎨 INSERTION: В начале Commit Phase, ПЕРЕД мутациями DOM');
    // DOM: Еще старый ❌
    // Render Tree: Старый ❌
    // Layout: Не вычислен ❌
    // Paint: Не было ❌
    console.log('   - React: "Сейчас буду менять DOM, готовьте стили!"');
  });

  console.log('4️⃣ 🔧 React ПРИМЕНЯЕТ мутации DOM');
  console.log('   - DOM обновляется синхронно');
  console.log('   - Batch обновлений применяется');

  React.useLayoutEffect(() => {
    console.log('5️⃣ 📐 LAYOUT: В конце Commit Phase, ПОСЛЕ мутаций DOM, ПЕРЕД Paint');
    // DOM: Уже обновлен ✅
    // Render Tree: Обновлен ✅
    // Layout: Вычислен ✅ (можно getBoundingClientRect)
    // Paint: Еще НЕТ ⏳

    console.log('   - React: "DOM обновил, можно мерять элементы!"');
    const element = document.getElementById('demo');
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log('   - Размеры доступны:', rect.width, rect.height);
    }
  });

  console.log('6️⃣ ✅ COMMIT PHASE завершен');
  console.log('   - React закончил свою работу');
  console.log('   - Контроль передается браузеру');

  React.useEffect(() => {
    console.log('8️⃣ 🚀 EFFECT: После Commit Phase, ПОСЛЕ Paint браузера');
    // DOM: Обновлен ✅
    // Render Tree: Обновлен ✅
    // Layout: Вычислен ✅
    // Paint: Уже был ✅

    console.log('   - Браузер уже отрисовал изменения');
    console.log('   - Пользователь видит результат');

    setTimeout(() => {
      console.log('   - Асинхронный код после paint');
    }, 0);
  });

  return (
    <div id="demo">
      <p>Демо элемент</p>
    </div>
  );
};

export default TimelineDemo;