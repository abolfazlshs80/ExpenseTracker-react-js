# Expense Tracker

یک برنامه مدیریت هزینه‌های شخصی ساخته شده با React، Vite و TailwindCSS.

## ویژگی‌ها

### احراز هویت
- **صفحه ورود (Login)**: با اعتبارسنجی نام کاربری و رمز عبور
- **خروج (Logout)**: از نوار ناوبری بالا
- **حفظ جلسه**: توکن در localStorage ذخیره می‌شود
- **اعتبار پیش‌فرض**: `admin` / `123`

### مدیریت تراکنش‌ها (CRUD کامل)
- **افزودن (Create)**: فرم ورود تراکنش جدید (عنوان، مبلغ، تاریخ)
- **نمایش (Read)**: جدول تراکنش‌های اخیر با اسکرول
- **ویرایش (Update)**: ویرایش مستقیم در جدول (Inline Editing)
- **حذف (Delete)**: حذف با تاییدیه

### صفحه پروفایل (۳ تب)
- **Overview**: آمار درآمد/هزینه/بیلان + ۵ تراکنش اخیر
- **Settings**: ویرایش اطلاعات پروفایل + تغییر رمز عبور + خروج
- **Statistics**: خلاصه تراکنش‌ها، میانگین، بزرگترین هزینه، دسته‌بندی‌ها

### نمودارهای آماری
- نمودار دایره‌ای (Pie Chart)
- نمودار میله‌ای (Bar Chart)
- نمودار خطی (Line Chart)

### سایر ویژگی‌ها
- دسته‌بندی‌های پیش‌فرض (غذا، حمل‌ونقل، اجاره)
- ذخیره‌سازی در localStorage
- ریسپانسیو (موبایل و دسکتاپ)
- مسیریابی SPA با React Router

## تکنولوژی‌ها

- **React 19** - کتابخانه UI
- **Vite** - ابزار بیلد سریع
- **TailwindCSS 4** - فریم‌ورک CSS
- **React Router DOM 6** - مسیریابی SPA
- **Recharts** - کتابخانه نمودارها
- **React Context API** - مدیریت حالت (Auth + Bills)
- **ESLint** - لنتر کد

## پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- npm یا yarn

## نصب و اجرا

```bash
# کلون کردن مخزن
git clone <repository-url>

# ورود به پوشه پروژه
cd expense-tracker

# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev
```

سپس در مرورگر به آدرس `http://localhost:5173` بروید (پورت ممکن است متفاوت باشد).

## اسکریپت‌های موجود

| دستور | توضیح |
|--------|-------|
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` | بیلد برای تولید |
| `npm run lint` | بررسی کد با ESLint |
| `npm run preview` | پیش‌نمایش بیلد تولیدی |

## ساختار پروژه

```
src/
├── components/
│   ├── Auth/             # احراز هویت
│   │   ├── AuthContext.jsx   # Context و Provider برای احراز هویت
│   │   └── Login.jsx         # فرم ورود
│   ├── Bills/            # مدیریت تراکنش‌ها
│   │   ├── BillsContext.jsx  # Context و Provider برای تراکنش‌ها
│   │   ├── BillsLayout.jsx   # چیدمان بخش صورت‌حساب
│   │   ├── EnterBills.jsx    # فرم ورود/ویرایش تراکنش
│   │   ├── ShowBills.jsx     # نمایش لیست تراکنش‌ها (با Edit/Delete)
│   │   └── BillsList.jsx     # لیست تراکنش‌ها (ساده)
│   ├── Layout/           # چیدمان اصلی
│   ├── MenuBar/          # منوی ناوبری کناری
│   ├── NavBar/           # نوار ناوبری بالا (با Logout)
│   ├── Profile/          # صفحه پروفایل
│   │   └── Profile.jsx       # ۳ تب: Overview, Settings, Statistics
│   ├── Tables/           # جداول و نمودارها
│   │   ├── Tables.jsx        # جداول داده
│   │   ├── PieCharts.jsx     # نمودار دایره‌ای
│   │   ├── BarCharts.jsx     # نمودار میله‌ای
│   │   └── LineCharts.jsx    # نمودار خطی
│   ├── Inputs/           # کامپوننت ورودی یکپارچه
│   └── Button/           # کامپوننت دکمه
├── images/               # تصاویر و آیکون‌ها
├── App.jsx               # کامپوننت اصلی + Routing
├── main.jsx              # نقطه ورودی + BrowserRouter
└── index.css             # استایل‌های سراسری
```

## مسیرها (Routes)

| مسیر | توضیح |
|------|-------|
| `/` | داشبورد اصلی (تراکنش‌ها، نمودارها) |
| `/profile` | صفحه پروفایل کاربر |

## نحوه کارکرد

### مدیریت حالت (State Management)
دو Context جداگانه استفاده شده:
- **AuthContext**: مدیریت کاربر، لاگین، لاگ اوت، جلسه
- **BillsContext**: مدیریت تراکنش‌ها، دسته‌بندی‌ها، CRUD operations

هر دو در `localStorage`持久化 می‌شوند.

### احراز هویت
```javascript
// AuthContext
const { user, login, logout, isAuthenticated } = useAuth();
// login(username, password) -> boolean
// logout() -> void
```

### تراکنش‌ها
```javascript
// BillsContext
const { transactions, addTransaction, updateTransaction, deleteTransaction } = useContext(billContext);
// addTransaction({ id, title, value, date })
// updateTransaction(id, { title, value, date })
// deleteTransaction(id)
```

### مسیریابی
برنامه از `react-router-dom` v6 استفاده می‌کند:
- `BrowserRouter` در `main.jsx`
- `Routes` + `Route` در `App.jsx`
- `Link` در `MenuItems` برای ناوبری SPA

### استایل‌دهی
TailwindCSS 4 با utility-first approach. کامپوننت‌ها از کلاس‌های Tailwind استفاده می‌کنند.

## اعتبار پیش‌فرض

| فیلد | مقدار |
|------|-------|
| Username | `admin` |
| Password | `123` |

## توسعه‌دهنده

**فرنوش کریمی - تمرین React Context (HW-L03-03)

## لایسنس

این پروژه برای اهداف آموزشی ساخته شده است.
