# Pandey-Adarsh---Portfolio
# 🌐 My Portfolio  

Welcome to my personal portfolio! 🚀  
This portfolio showcases my projects, skills, and experience in web development/design.  

---

## ⚠️ Important Notice Before Viewing  

- Please **open the portfolio on a desktop/laptop** (not optimized for mobile).  
- Make sure your **browser zoom is set to 100%** for the best viewing experience.  
- If your internet connection is slow, kindly **wait a few seconds** for the site to load properly.  

---

## 🛠️ Tech Stack  

- **HTML5, CSS3, JavaScript**  
- Additional libraries & frameworks Used. 

---

## 📂 Features  
 
- Smooth animations & transitions  
- Showcasing my projects and skills  

---

## 🚀 Live Demo  

🔗 [Click Here to View Portfolio](https://pandeyadarshyt.netlify.app/)  

---

## 📬 Contact  

- **Email:** techfabyt@gmail.com  
- **LinkedIn:** [Pandey Adarsh](https://www.linkedin.com/in/pandeyadarsh521/)  
- **GitHub:** [AdarshP521](https://github.com/AdarshP521/Pandey-Adarsh-Portfoilo)  

---

⭐ Don’t forget to star the repo if you like my portfolio!


[![Netlify Status](https://api.netlify.com/api/v1/badges/78636757-dfb0-46fa-8535-a5c3573eecc7/deploy-status)](https://app.netlify.com/projects/pandeyadarshyt/deploys)

// Change my Yashvir

# Portfolio Responsive Refactoring & Optimization

This document outlines the architectural changes made to transform Pandey Adarsh's portfolio from a fixed-dimension desktop layout into a responsive, fluid web application.

---

## 1. Core Problems Identified in Original Code

* **Hardcoded Large Margins & Rem Units:** Elements had properties like `margin-left: 50rem`, `margin-top: -24rem`, and `width: 85rem`, which caused severe horizontal scrolling and broke layouts on screens smaller than 1400px.
* **Duplicate Body Declarations:** Two competing `body` rule sets existed in the CSS, causing conflicting font choices, padding, and background setups.
* **Non-Responsive Navigation:** The navbar used strict flex spacing and large horizontal paddings (`padding-left: 10%`), clipping items on mobile viewports.
* **Rigid Grids & Flex Items:** Certificate grids and project sections used hardcoded column numbers (`repeat(2, 1fr)`) and calculation-heavy flex properties (`calc(20% - 1rem)`) without flexible wrapping.

---

## 2. Key Refactoring Strategies

### A. Fluid Typography & Units (`clamp()`)
Replaced fixed font and dimensional values with `clamp(min, preferred, max)`. This allows headings, avatars, and hero text to shrink proportionally on mobile devices and scale cleanly on wide monitors without breaking the layout.

### B. Auto-Fit / MinMax CSS Grids
Converted the Skills, Certificates, Projects, and Video sections to auto-fitting responsive grids:
```css
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));