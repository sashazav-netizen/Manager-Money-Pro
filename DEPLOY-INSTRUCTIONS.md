# 📱 הוראות העלאה — Manager Money Pro PWA
## מ-HTML לאפליקציה אמיתית על הטלפון

---

## 📁 מבנה הקבצים שצריך להעלות

```
manager-money/
├── index.html          ← האפליקציה הראשית
├── manifest.json       ← הגדרות PWA
├── sw.js               ← Service Worker (אופליין)
├── firebase.json       ← הגדרות Firebase Hosting
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-180.png
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 העלאה ל-Firebase Hosting (בחינם)

### שלב 1 — התקן Node.js
הורד מ: https://nodejs.org (גרסה LTS)

### שלב 2 — התקן Firebase CLI
פתח Terminal / Command Prompt:
```bash
npm install -g firebase-tools
```

### שלב 3 — התחבר לחשבון Firebase
```bash
firebase login
```
יפתח דפדפן — התחבר עם חשבון Google שלך.

### שלב 4 — אתחל את הפרויקט
נווט לתיקיית הפרויקט:
```bash
cd manager-money
firebase init hosting
```
ענה על השאלות:
- **Which project?** → בחר את `managermoney-49d0e`
- **Public directory?** → הקלד `.` (נקודה)
- **Single-page app?** → `y`
- **Overwrite index.html?** → `n` (חשוב!)

### שלב 5 — העלה!
```bash
firebase deploy
```

✅ תקבל כתובת כזו:
`https://managermoney-49d0e.web.app`

---

## 📲 התקנה על הטלפון

### אנדרואיד (כרום):
1. פתח את הכתובת בכרום
2. תופיע הודעה "הוסף למסך הבית"
3. לחץ הוסף → יש אייקון על המסך! 🎉

### iPhone (Safari):
1. פתח את הכתובת ב**Safari** (לא כרום!)
2. לחץ כפתור השיתוף ↑
3. בחר "הוסף למסך הבית"
4. לחץ הוסף → יש אייקון! 🎉

---

## ✅ מה האפליקציה תומכת אחרי ההתקנה

- ✅ אייקון שלך על מסך הבית
- ✅ פותחת במסך מלא (ללא כתובת URL)
- ✅ עובדת גם אופליין (נתונים נשמרים)
- ✅ Firebase מסנכרן בזמן אמת
- ✅ עובדת על iOS ואנדרואיד
- ✅ https מאובטח אוטומטית

---

## 💡 עדכון האפליקציה בעתיד

כשתרצה לשנות משהו:
1. ערוך את `index.html`
2. הרץ `firebase deploy`
3. זהו — כל המשתמשים יקבלו את הגרסה החדשה!

---

© 2026 Alexander Zavodisker — Manager Money Pro
