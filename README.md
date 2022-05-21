<div align="center">
    <img src="https://cdn.3dnames.co/uploads/joemore.com/blogs/nextjs-tailwind-starterkit-md.webp" alt="logo" width="200" height="auto" />
    <h1>NextJS Tailwind Start kit</h1>
    <p>
    This is a starter kit using NextJS V12.0.8, Tailwind CSS (with aspect-ratio, forms & typography) as well as @headlessui/react and react-icons
    </p>
</div>

<br />

<!-- Table of Contents -->
# 📔 Table of Contents

- [About the Project](#about-the-project)
  * [Features](#features)
  * [Installation](#installation)
  * [Hosting](#hosting)

<!-- About the Project -->
## 🌟 About the Project

This is a start kit built using NextJS and Tailwind CSS. I use this starter kit for any new projects I want to build with a React core and to ultimately host within AWS Amplify.

Currently AWS Amplify has issues supporting the API of NextJS on Versions > 12.0.8 (at time of writing on 26th Apr 2022), hence why this is using NextJS V12.0.8

I've added in [React Icons](https://react-icons.github.io/react-icons/) as well as Tailwinds [Headless UI](https://headlessui.dev/react/tabs)

Use this as either a barebones starter kit, or if you use the *feature/blogs-markdown* or *feature/sitemap-generator* branches a ready to go Blogging tool


<!-- Features -->
### 🎯 Features

- *feature/blogs-markdown* - Added the ability to have Markdown blog articles, NextJS will read these files at build time and create the pages before deploying
- *feature/sitemap-generator* - Uses Webpack to generate a dynamic sitemap.xml file that changes the date when your main files are edited, as well as reading the blog Markdown files


<!-- Getting Started -->
## 	🧰 Getting Started

### ⚙️ Installation

```bash
yarn install
yarn dev
```

### 🖥 Hosting:

You can deploy this using either Vercel (Recommended) or with AWS Amplify to have a website up and running in minutes!