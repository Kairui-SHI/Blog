/* This is a script to create a new post markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`)
  process.exit(1) // Terminate the script and return error code 1
}

let fileName = args[0]

const targetDir = "./src/content/posts/"
// make new folder
const targetFolder = path.join(targetDir, fileName)

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i
if (!fileExtensionRegex.test(fileName)) {
  fileName += ".md"
}

// const fullPath = path.join(targetDir, fileName)

// if (fs.existsSync(fullPath)) {
//   console.error(`Error：File ${fullPath} already exists `)
//   process.exit(1)
// }

if (fs.existsSync(targetFolder)) {
  console.error(`Folder ${targetFolder} already exists `)
  process.exit(1)
}

const content = `---
title: ${args[0]}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
---
`

// fs.writeFileSync(path.join(targetDir, fileName), content)
fs.mkdirSync(targetFolder, { recursive: true })
fs.writeFileSync(path.join(targetFolder, fileName), content)

console.log(`Post ${path.join(targetFolder, fileName)} created`)
