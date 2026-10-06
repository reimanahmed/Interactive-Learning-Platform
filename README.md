# IraqiEdu

منصة تعليمية عراقية للمرحلة الابتدائية.

## التشغيل
يمكن فتح `index.html` مباشرة للواجهة التجريبية، أو رفع المشروع إلى GitHub Pages.

## الصفحات الموجودة
- الرئيسية
- الطلاب
- المعلمين
- الإدارة
- ولي الأمر
- المواد
- قارئ الكتاب
- الكوز
- السبورة التفاعلية
- المتصدرون
- تسجيل الدخول

## قاعدة البيانات
`schema.sql` هو مخطط PostgreSQL مبدئي للنسخة الإنتاجية.

## مهم قبل الإطلاق
هذه النسخة Frontend Prototype وليست نظام درجات إنتاجياً بعد. لا تضع بيانات حقيقية أو كلمات مرور حقيقية فيها. النسخة الإنتاجية تحتاج Backend + Authentication + Database + server-side grading + authorization + audit logs + backups + rate limiting.

## البنية المقترحة للإنتاج
Frontend: Next.js / React
Backend: API server أو Supabase/PostgreSQL
Authentication: مزود هوية آمن + جلسات HttpOnly
Database: PostgreSQL
Storage: Object Storage للكتب والصور
Monitoring: Error logging + audit logs
