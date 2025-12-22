---
description: Frontend Improvement Plan - Your Book
---

# 📋 KẾ HOẠCH CẢI THIỆN FRONTEND

## 🎯 Mục tiêu
Nâng cấp giao diện frontend để hiện đại, responsive và UX tốt hơn.

---

## 🔴 PHASE 1: SỬA LỖI NGHIÊM TRỌNG (Ưu tiên cao)

### 1.1 Mobile Responsive
**Vấn đề**: Navigation không có hamburger menu, layout vỡ trên mobile

**Giải pháp**:
- Thêm hamburger menu cho mobile trong `Navigation.tsx`
- Tăng padding mobile từ 20px lên 24px
- Ẩn các cột không quan trọng trong bảng trên mobile
- Tăng font size tối thiểu lên 14px cho mobile

**Files cần sửa**:
- `components/Header/Navigation.tsx`
- `styles/globals.css`

### 1.2 Typography
**Vấn đề**: Font chữ cũ, kích thước nhỏ

**Giải pháp**:
- Import Google Font: Inter hoặc Be Vietnam Pro
- Tăng base font size lên 16px
- Sử dụng font-size responsive (clamp)

**Files cần sửa**:
- `pages/_app.tsx` (thêm Google Font)
- `tailwind.config.js` (custom font family)
- `styles/globals.css`

---

## 🟡 PHASE 2: CẢI THIỆN VISUAL DESIGN

### 2.1 Color System
**Vấn đề**: Màu sắc không nhất quán

**Giải pháp**:
- Định nghĩa color palette trong `tailwind.config.js`:
  ```js
  colors: {
    primary: '#F59E0B', // Amber-500
    secondary: '#3B82F6', // Blue-500
    accent: '#8B5CF6', // Violet-500
  }
  ```
- Thay thế tất cả màu hard-coded bằng theme colors

**Files cần sửa**:
- `tailwind.config.js`
- `components/Header/Navigation.tsx`
- `pages/index.tsx`

### 2.2 Footer Component
**Vấn đề**: Thiếu footer

**Giải pháp**:
- Tạo component `Footer.tsx` mới
- Thêm: Copyright, Links, Social media
- Import vào `_app.tsx`

**Files cần tạo**:
- `components/Footer/Footer.tsx`

### 2.3 Image Placeholder
**Vấn đề**: Ảnh placeholder không phù hợp

**Giải pháp**:
- Tạo ảnh default với logo "Your Book"
- Sử dụng fallback image trong Next/Image
- Hoặc dùng gradient placeholder

**Files cần sửa**:
- Tất cả components hiển thị ảnh

---

## 🟢 PHASE 3: NÂNG CAO UX

### 3.1 Search Enhancement
**Vấn đề**: Search bar quá nhỏ

**Giải pháp**:
- Tăng chiều rộng search bar
- Thêm animation khi focus
- Cải thiện dropdown results styling

**Files cần sửa**:
- `components/Header/Navigation.tsx`

### 3.2 Dark Mode Implementation
**Vấn đề**: Icon có nhưng không hoạt động

**Giải pháp**:
- Implement dark mode với next-themes
- Lưu preference vào localStorage
- Toggle giữa light/dark theme

**Files cần sửa**:
- `pages/_app.tsx`
- `components/Header/Navigation.tsx`
- `tailwind.config.js` (darkMode: 'class')

### 3.3 Table Enhancement
**Vấn đề**: Bảng chỉ có text, thiếu visual

**Giải pháp**:
- Thêm thumbnail nhỏ (40x60px) cho mỗi truyện
- Cải thiện spacing giữa các cột
- Thêm hover effects

**Files cần sửa**:
- `components/Newupdate/HasNewChaps.tsx`
- Các components hiển thị danh sách

---

## 📝 CHECKLIST THỰC HIỆN

### Phase 1 (Ngay lập tức)
- [ ] Sửa mobile navigation (hamburger menu)
- [ ] Tăng padding mobile
- [ ] Import Google Font
- [ ] Tăng font sizes

### Phase 2 (Trong tuần)
- [ ] Định nghĩa color system
- [ ] Tạo Footer component
- [ ] Sửa image placeholders
- [ ] Áp dụng consistent colors

### Phase 3 (Tuần sau)
- [ ] Enhance search bar
- [ ] Implement dark mode
- [ ] Thêm thumbnails vào tables
- [ ] Polish animations & transitions

---

## 🎨 DESIGN TOKENS ĐỀ XUẤT

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          500: '#F59E0B',
          700: '#B45309',
        },
        secondary: {
          500: '#3B82F6',
          700: '#1D4ED8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Be Vietnam Pro', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
      }
    }
  }
}
```

---

## 📊 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành:
- ✅ Mobile responsive hoàn hảo
- ✅ Typography hiện đại, dễ đọc
- ✅ Color system nhất quán
- ✅ Dark mode hoạt động
- ✅ UX mượt mà, professional
- ✅ Performance tốt (lighthouse score > 90)
