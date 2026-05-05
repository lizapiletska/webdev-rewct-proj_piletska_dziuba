# spraga · комбуча — курсовий проєкт (Веб технології)

React-додаток для бренду крафтової комбучі **Spraga**, реалізований за макетом Figma.

## Автори
**Пілецька Єлизавета** (Yelizaveta Piletska)
**Дзюба Оксана** (Dziuba Oksana)
Курсова робота з дисципліни «Веб технології».

## Стек
- **React 18** + **Vite** + **react-router-dom v6**
- **Context API** + `useReducer` (глобальний стан кошика з персистом у `localStorage`)
- **fetch** до API (`json-server`) із автоматичним fallback на статичний `db.json`
- Чистий **CSS** із дизайн-токенами (без UI-фреймворків)

## Запуск
```bash
npm install
npm run start         # одночасно: Vite (5173) + json-server (4000)
```
Окремі команди:
```bash
npm run dev           # тільки фронтенд
npm run server        # тільки json-server на :4000
npm run build         # production-збірка у dist/
npm run preview       # preview production-збірки
```

Якщо `json-server` не запущений, додаток автоматично читає `public/db.json`,
тож сторінки працюють і без бекенду.

## Відповідність вимогам курсу

| Вимога | Реалізація |
| --- | --- |
| Не менше 2 сторінок | **5 сторінок**: `/`, `/catalog`, `/catalog/:slug`, `/cart`, 404 |
| Маршрутизація (react-router) | `src/App.jsx` — `<Routes>` з динамічним параметром `:slug` |
| ≥ 3 React-компоненти | **11**: `Header`, `Footer`, `ProductCard`, `ReviewCard`, `ReviewPop`, `CartDrawer`, `AddReviewForm`, `ArrowIcon`, `Icons` (інлайн-SVG іконки) тощо |
| Передача даних через props | `ProductCard({ product, showPromo })`, `ReviewCard({ review })`, `CartDrawer`, `Icons` (`size`, `filled`, `id`) |
| Форма з `useState` | Чекаут-форма у `Cart.jsx` (валідація, способи доставки/оплати), `AddReviewForm`, `ReviewPop` |
| Отримання даних через `fetch` | `src/api.js` → `fetchProducts`, `fetchProduct`, `fetchReviews`, `fetchProductReviews` |
| Глобальне керування станом | `src/context/CartContext.jsx` — Context API + `useReducer` + persist у `localStorage` |
| Відповідність дизайну | Усі сторінки відтворені за макетом Figma, включно з мікроанімаціями (hover, swing, marquee) |

## Структура проєкту
```
spraga-kombucha/
├── public/
│   ├── db.json                       # дані для json-server та fallback
│   ├── favicon.svg
│   └── images/
│       ├── decorations/blur_hero.svg
│       ├── products/   drink_apple.png, drink_cherry.png, drink_classic.png, drink_pomegrante.png
│       ├── reviews/    review_2.png — review_5.png
│       ├── ui/         logo_spraga.png
│       └── unique/     grid1–6 + frame варіанти + smile_frame_1/2
├── src/
│   ├── api.js                        # fetch шар із fallback
│   ├── App.jsx                       # маршрутизація
│   ├── main.jsx                      # точка входу + Provider'и
│   ├── context/
│   │   └── CartContext.jsx           # глобальний стан кошика
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ReviewPop.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── AddReviewForm.jsx
│   │   ├── ArrowIcon.jsx
│   │   └── Icons.jsx                 # усі інлайн SVG
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   └── NotFound.jsx
│   └── styles/
│       └── global.css                # усі стилі та дизайн-токени
├── package.json
└── vite.config.js
```

## Ключові фічі

- **Каталог** із фільтрами за смаком (множинні теги), окрема секція акційних товарів зі смугою-марковкою (marquee), що рухається.
- **Картка товару** з анімованими декоративними фруктами, перемикач кількості, рекомендації «також купують» з SVG-стрічкою у фоні.
- **Кошик** як випадаюче вікно (popover) з блюром фону, що відкривається з шапки, зі швидким редагуванням кількості та переходом на сторінку оформлення.
- **Чекаут** із валідацією форми, вибором способу доставки (Нова Пошта/Поштомат/Кур'єр) та оплати (картка/Privat24/LiqPay/при отриманні).
- **Інлайн SVG-компоненти** ([src/components/Icons.jsx](src/components/Icons.jsx)) замість зовнішніх `.svg` файлів — швидше, без зайвих HTTP-запитів.
- **Адаптивність** для десктопу та планшета (за макетом).

## API endpoints (json-server)
- `GET /products` — список товарів
- `GET /products/:id` — окремий товар
- `GET /reviews` — відгуки на головній
- `GET /productReviews` — відгуки на сторінці товару

Дані лежать у `public/db.json`.
