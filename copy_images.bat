@echo off
chcp 65001 > nul
echo ========================================================
echo   جاري نسخ صور التصميمات الخاصة بـ Boda إلى مجلد images/
echo ========================================================

if not exist images mkdir images

set "SRC=C:\Users\ZEKO\.gemini\antigravity\brain\ff79cde6-e808-4333-942e-93cb06275dcf\.user_uploaded"

copy /Y "%SRC%\media_1790942584688.jpg" "images\logo.jpg" > nul
copy /Y "%SRC%\media_1790942584373.jpg" "images\social-media.jpg" > nul
copy /Y "%SRC%\media_1790942584754.jpg" "images\m-horse.jpg" > nul
copy /Y "%SRC%\media_1790942584496.jpg" "images\chemistry.jpg" > nul
copy /Y "%SRC%\media_1790942584513.jpg" "images\grammar.jpg" > nul

echo.
echo [تم بنجاح!] تم نسخ جميع الصور الـ 5 إلى مجلد images
echo يمكنك الآن فتح ملف index.html أو رفع المجلد بالكامل إلى الاستضافة.
echo.
pause
