# UnCodemy Navbar — Reusable Component

Aapka static navbar ab ek **single JavaScript file** (`uncodemy-navbar.js`) ban chuka hai jise
aap kisi bhi page me sirf 2 lines add karke reuse kar sakte hain — HTML, CSS, aur JS logic
(Courses mega-menu, Training popup, About popup, mobile menu, contact bar) sab is ek file ke andar
already included hai.

## Folder structure

```
navbar-component/
├── uncodemy-navbar.js   ← the single dynamic navbar (import this everywhere)
├── All.css              ← required styles (auto-linked by the script)
├── images/               ← all navbar icons/course images
├── index.html            ← demo page 1
└── about.html            ← demo page 2
```

## Kaise use kare (naye page par)

1. `uncodemy-navbar.js`, `All.css`, aur `images/` folder ko naye page ke sath same directory me rakhein
   (ya inhe apne server par host karke absolute URL use karein).
2. Page ke `<head>` me ek line add karein:

   ```html
   <script src="uncodemy-navbar.js" defer></script>
   ```

3. Page ke `<body>` me, jahan navbar dikhana hai wahan ek line add karein:

   ```html
   <uncodemy-navbar></uncodemy-navbar>
   ```

Bas! Script automatically:
- `All.css` aur Font Awesome ko `<head>` me link kar deta hai (agar already nahi hai to),
- navbar ka pura markup us tag ke andar inject kar deta hai,
- aur saara interactive behaviour (Courses mega-menu, Training/About popups, mobile toggle) attach kar deta hai.

## Ek jagah edit, sab jagah update

Ab agar aapko koi course add/remove karna ho, ya navbar ka design change karna ho, aapko sirf
**`uncodemy-navbar.js`** ko edit karna hoga — jitne bhi pages me `<uncodemy-navbar></uncodemy-navbar>`
use ho raha hai, sab automatically update ho jayenge. Course/category data is file ke andar
`abhasuCategories` array me hai, aur Training/About cards ke liye markup `NAVBAR_HTML` string ke
"claude-changes" comments ke beech me hai.

## Try it locally

Kyunki yeh script apne aap `All.css` ko fetch karta hai, browser ko ek local server se serve karna
zaroori hai (plain `file://` se images/CSS load nahi honge in some browsers). Sabse aasaan tareeka:

```bash
cd navbar-component
python3 -m http.server 8000
```

Fir browser me `http://localhost:8000/index.html` aur `http://localhost:8000/about.html` dono
kholiye — same navbar dono jagah dikhega, ek hi file se.
