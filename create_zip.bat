@echo off
chcp 65001 > nul
title إنشاء ملف ZIP لموقع Boda Graphic Design
echo ==========================================================
echo   جاري إنشاء ملف الـ ZIP للموقع بجميع الصور والملفات...
echo ==========================================================

:: 1. إنشاء مجلد images ونسخ جميع الصور الـ 5 المرفوعة إليه
if not exist "images" mkdir "images"
set "SRC=C:\Users\ZEKO\.gemini\antigravity\brain\ff79cde6-e808-4333-942e-93cb06275dcf\.user_uploaded"

copy /Y "%SRC%\media_1790942584688.jpg" "images\logo.jpg" > nul
copy /Y "%SRC%\media_1790942584373.jpg" "images\social-media.jpg" > nul
copy /Y "%SRC%\media_1790942584754.jpg" "images\m-horse.jpg" > nul
copy /Y "%SRC%\media_1790942584496.jpg" "images\chemistry.jpg" > nul
copy /Y "%SRC%\media_1790942584513.jpg" "images\grammar.jpg" > nul

:: 2. تحديد مسار الحفظ على سطح المكتب ومجلد المشروع
set "DESKTOP_ZIP=%USERPROFILE%\Desktop\boda-design-portfolio.zip"
set "SCRATCH_ZIP=C:\Users\ZEKO\.gemini\antigravity\scratch\boda-design-portfolio.zip"

:: 3. ضغط الملفات إلى ZIP
powershell -NoProfile -Command "Compress-Archive -Path 'index.html', 'css', 'js', 'images', 'README.md' -DestinationPath '%DESKTOP_ZIP%' -Force"
copy /Y "%DESKTOP_ZIP%" "%SCRATCH_ZIP%" > nul

echo.
echo ==========================================================
echo   [تم بنجاح!] تم إنشاء ملف الـ ZIP على سطح المكتب:
echo   %DESKTOP_ZIP%
echo ==========================================================
echo.

:: 4. فتح سطح المكتب وتحديد ملف الـ ZIP فوراً
explorer /select,"%DESKTOP_ZIP%"

exit
