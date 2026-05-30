# Modex Landing (GitHub Pages)

Премиальный одностраничный лендинг Modex на чистом `HTML/CSS/JS` с анимациями и отправкой формы через Web3Forms.

## Содержимое папки

- `index.html` — основная страница лендинга.
- `thanks.html` — страница успешной отправки заявки.
- `assets/styles.css` — дизайн-система, адаптив и визуальные эффекты.
- `assets/main.js` — анимации (GSAP + ScrollTrigger), reveal-эффекты, UX формы.
- `assets/photo_*.jpg` — изображения модулей.
- `assets/прозрач.svg` — логотип.

## Форма заявок (Web3Forms)

В форме используются поля:

```html
action="https://api.web3forms.com/submit"
name="access_key"
name="redirect"
```

Проверьте в `index.html`:

- `access_key` — ваш актуальный ключ Web3Forms.
- `redirect` — URL `thanks.html` на вашем домене GitHub Pages.

## Локальный запуск

Можно открыть `index.html` напрямую в браузере.  
Для корректной проверки анимаций и якорей лучше запускать через локальный сервер (например, Live Server).

## Актуальные заметки по hero

- Для первого экрана используется рендер `assets/photo_4_2026-05-26_20-13-43.jpg` (модуль L).
- Текущий заголовок hero: `Пространства, которые собираются быстро и служат долго`

## Деплой на GitHub Pages

Так как `docs` уже отдельный репозиторий:

```powershell
cd "C:\Files\cursor\Проекты\modex\docs"
git add .
git commit -m "Update landing"
git push origin main
```

В GitHub:

- `Settings -> Pages`
- `Source: Deploy from a branch`
- `Branch: main`
- `Folder: / (root)`

После пуша сайт обновится за 1–2 минуты.
