# 📚 00-Interview-Prep

![HTML](https://img.shields.io/badge/HTML5-Semantic-orange?logo=html5)
![CSS](https://img.shields.io/badge/CSS3-Positioning-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![Level](https://img.shields.io/badge/Level-Interview%20Ready-success)
![Focus](https://img.shields.io/badge/Focus-Core%20Fundamentals-important)

A structured hands-on revision folder covering **core frontend fundamentals** required for technical interviews.

This repository focuses on:

- ✅ Semantic HTML
- ✅ CSS Positioning (Static, Relative, Absolute, Sticky, Fixed)
- ✅ CSS Specificity
- ✅ JavaScript Variable Declarations (`var`, `let`, `const`)
- ✅ Scope & Shadowing
- ✅ Hoisting & Temporal Dead Zone (TDZ)
- ✅ Real-world layout thinking

---

# 📂 Folder Structure

```
00-interview-prep/
│
├── 00-styling.html
├── 01-allPositions.html
├── 02-variableDeclarations.js
└── README.md
```

Each file builds practical clarity, not just theoretical knowledge.

---

# 📄 00-styling.html

### 🎯 Purpose:

Demonstrates **all CSS positioning types visually**.

### Covered Concepts:

## 1️⃣ Static (Default)

- Normal document flow
- No positioning rules applied
- Default layout behavior

---

## 2️⃣ Relative

- Stays in normal flow
- Creates positioning context for absolute children
- Commonly used for badges & overlays

---

## 3️⃣ Absolute

- Removed from normal flow
- Positioned relative to nearest positioned ancestor
- Used for:
  - Tooltips
  - Badges
  - Popovers
  - Dropdowns

---

## 4️⃣ Sticky

- Acts like `relative` until scroll threshold
- Then behaves like `fixed`
- Constrained within parent container

Used for:

- Section headers
- Table headers
- Scroll-aware UI

---

## 5️⃣ Fixed

- Positioned relative to viewport
- Always visible
- Ignores parent boundaries

Used for:

- Floating buttons
- Chat widgets
- Persistent navigation

---

### 🔥 Key Difference

| Sticky                   | Fixed              |
| ------------------------ | ------------------ |
| Sticks inside parent     | Sticks to viewport |
| Stops at parent boundary | Never stops        |
| Scroll-aware             | Always fixed       |

---

# 📄 01-allPositions.html

### 🎯 Purpose:

Demonstrates real-world layout combining multiple positioning strategies.

Simulated dashboard layout:

- 🧱 Fixed Sidebar
- 📌 Sticky Header
- 🧩 Relative Card
- 🔴 Absolute Notification Badge
- 📑 Section-level Sticky Title

This file teaches:

- Position stacking logic
- Parent-child positioning relationship
- How multiple positioning strategies coexist in production UI
- Layout architecture thinking

---

# 📄 02-variableDeclarations.js

### 🎯 Purpose:

Deep understanding of `var`, `let`, and `const`.

---

# 🧠 JavaScript Core Concepts

---

## 🔹 Scope

Scope defines where variables are accessible.

| Keyword | Scope Type      |
| ------- | --------------- |
| var     | Function Scoped |
| let     | Block Scoped    |
| const   | Block Scoped    |

> Important: `var` is NOT block scoped.

---

## 🔹 Shadowing

Shadowing = Inner variable hides outer variable.

### ✅ Valid Shadowing

```js
var x = 10;

{
  let x = 20;
}
```

### ❌ Illegal Shadowing

```js
let y = 10;

{
  var y = 20; // Error
}
```

Reason: `var` tries to override same function scope.

---

## 🔹 Declaration vs Initialization

- Declaration → Creating variable name
- Initialization → Assigning value

```js
let a; // Declaration
a = 10; // Initialization
```

| Keyword | Can Declare Without Value? |
| ------- | -------------------------- |
| var     | ✅ Yes                     |
| let     | ✅ Yes                     |
| const   | ❌ No                      |

---

## 🔹 Redeclaration

| Keyword | Can Redeclare? |
| ------- | -------------- |
| var     | ✅ Yes         |
| let     | ❌ No          |
| const   | ❌ No          |

---

## 🔹 Reassignment

| Keyword | Can Reassign? |
| ------- | ------------- |
| var     | ✅ Yes        |
| let     | ✅ Yes        |
| const   | ❌ No         |

> `const` prevents reassignment of binding, not object mutation.

---

## 🔹 Hoisting

### var

```js
console.log(a);
var a = 10;
```

Output:

```
undefined
```

---

### let & const (TDZ)

```js
console.log(b);
let b = 20;
```

Output:

```
ReferenceError
```

Because of **Temporal Dead Zone (TDZ)**.

---

# ⚠️ Interview Trap Question

### Using `var`

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
3
3
3
```

---

### Using `let`

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

Output:

```
0
1
2
```

Reason: `let` creates block scope per iteration.

---

# 🧱 Semantic HTML

Meaningful elements used:

- `header`
- `section`
- `main`
- `nav`
- `article`
- `aside`
- `footer`

Benefits:

- Accessibility
- SEO
- Maintainability
- Better structure

---

# 🎯 CSS Specificity

Order of priority:

```
Inline styles
↓
ID
↓
Class
↓
Element
↓
Pseudo-elements
```

Understanding specificity prevents styling conflicts in large applications.

---

# 🏆 Architect-Level Takeaways

- Prefer `const` by default.
- Use `let` when reassignment is required.
- Avoid `var` in modern production code.
- Use `absolute` for overlays, not layout structure.
- Use `sticky` for scroll-aware UI.
- Understand hoisting deeply.
- Know how scope & shadowing work internally.

---

# 🚀 How To Use This Folder

1. Open `00-styling.html` → Observe visual behavior.
2. Scroll and compare sticky vs fixed.
3. Open `01-allPositions.html` → Understand real-world layout design.
4. Run `02-variableDeclarations.js` → Observe console behavior.
5. Modify code and test edge cases.

---

# 📌 Final Note

These are foundational concepts.

Mastering them builds:

- Interview confidence
- Strong debugging skills
- Production-level thinking
- Clean architectural habits

---

### ⭐ If you're revising for interviews:

Go through this folder until you can explain every concept without looking at notes.

That’s when you're ready.
