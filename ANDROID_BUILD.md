# Android ilova qilib qadoqlash (Capacitor)

Bu loyiha backend (Express + MongoDB, Vercel'da) talab qiladi, shuning
uchun ilova Vercel'dagi jonli saytni WebView orqali ochadi (bir xil
origin - CORS/cookie muammosi bo'lmaydi).

## A) GitHub Actions orqali (Android Studio KERAK EMAS — tavsiya etiladi)

`.github/workflows/android-build.yml` allaqachon tayyor. Faqat:

1. Loyihani GitHub'ga push qiling (`android/` papka `.gitignore`da -
   uni qo'lda yaratish shart emas, workflow har safar o'zi yaratadi).
2. GitHub'da repo → **Actions** tabiga o'ting.
3. "Android APK yig'ish" workflow'ini tanlab, **Run workflow** tugmasini
   bosing (yoki `main` branch'ga push qilsangiz avtomatik ishga tushadi).
4. ~3-5 daqiqadan keyin tugagach, o'sha run sahifasining pastida
   **Artifacts** bo'limida `chemchat-debug-apk` paydo bo'ladi - shuni
   yuklab oling, ichida `app-debug.apk` bor. Shu faylni telefoningizga
   o'tkazib, o'rnatasiz (Play Protect ogohlantirsa "baribir o'rnatish"
   deysiz - bu debug build, imzolanmagan).

Bu APK - sinov (debug) versiya. Play Store'ga chiqarish uchun imzolangan
"release" build kerak (pastga qarang).

## B) O'zingizning kompyuteringizda (Android Studio bilan)

### 1. Kerakli vositalar
- Node.js va npm
- Android Studio (Android SDK bilan birga o'rnatiladi)

### 2. Capacitor o'rnatish
Loyiha papkasida:
```
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
```

`capacitor.config.json` allaqachon tayyor (loyiha ildizida). Kerak
bo'lsa `server.url`ni o'zingizning haqiqiy Vercel manzilingizga
moslang.

### 3. Android loyihasini yaratish
```
npx cap add android
```

### 4. FLAG_SECURE (skrinshot/ekran yozuvini bloklash) qo'shish
`android-native-reference/MainActivity.java` faylini oching va uning
tarkibini quyidagiga ko'chiring:
```
android/app/src/main/java/com/chemchat/app/MainActivity.java
```
(agar `appId`ni o'zgartirgan bo'lsangiz, papka yo'li ham shunga mos
o'zgaradi - Android Studio buni avtomatik to'g'irlab beradi).

### 5. Ikonka va nom
`android/app/src/main/res/` papkasidagi `mipmap-*` papkalarga o'z
ikonkangizni qo'ying (Android Studio'dagi Image Asset Studio orqali
qulay: right-click `res` → New → Image Asset).

### 6. Sinxronlash va ochish
```
npx cap sync android
npx cap open android
```
Android Studio ochiladi - shu yerdan `Run` (▶) bosib telefon/emulyatorda
sinab ko'rasiz, yoki `Build → Generate Signed Bundle/APK` orqali
Play Store uchun tayyor faylni chiqarasiz.

## Play Store uchun imzolangan (release) build kerak bo'lsa

GitHub Actions'dagi debug build imzolanmagan - faqat sinov uchun.
Play Store'ga chiqarish uchun keystore yaratib, uni GitHub Secrets'ga
qo'shib, workflow'ga `assembleRelease` bosqichini qo'shish kerak
bo'ladi - buni xohlasangiz alohida sozlab beraman.

## Eslatma
- `server.url` internetga ulanishni talab qiladi (ilova doim jonli
  saytga ulanadi) - offline ishlamaydi.
- Kalkulyator sahifasi (`/calculator.html`) autentifikatsiyasiz ham
  ishlaydi, chat esa login talab qiladi - buning barchasi mavjud
  backend orqali avtomatik ishlaydi, qo'shimcha sozlash kerak emas.

