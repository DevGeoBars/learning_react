🎯 TRIGGER (начало)
↓
🔄 RENDER PHASE (React)
├── Компонент выполняется
├── Virtual DOM создается
└── Diff вычисляется
↓
📦 COMMIT PHASE (ReactDOM)
├── 🎨 useInsertionEffect
├── 🔧 DOM Mutations (React обновляет DOM)
├── 📐 useLayoutEffect
└── ✅ Commit завершен
↓
🌐 BROWSER RENDERING
├── Render Tree строится
├── Layout/Reflow вычисляется
├── Paint происходит
└── Composite выполняется
↓
🚀 useEffect (после Paint)

в MD документацию