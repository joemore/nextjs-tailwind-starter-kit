// post-build.js
const fs = require("fs-extra");
// Path to locales directory
const src = "./markdown-blogs";
// Path to default-lambda destination
const dest = "./.next/server/markdown-blogs";
// Copy Files over recursively
fs.copySync(src, dest, { recursive: true });
console.log("Locale directory was copied successfully");
