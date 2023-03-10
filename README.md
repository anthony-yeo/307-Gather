### Gather (Back End)
Gather is a web app where Cal Poly students/faculty get to explore what events there are on campus and host their own events for everyone to attend.

This repo hosts the source code for the backend of `Gather`
The frontend is stored [here.](https://github.com/anarchaworld/307-Gather-Frontend/tree/main)

____


### Build Status
![](https://github.com/anthony-yeo/307-Gather/actions/workflows/node.js.yml/badge.svg)

____
### Build Instruction
**[TODO]**

___

### UI Prototype
There are <ins>_**2 links**_</ins> because we have them on different pages.

Page Navigation is added for both links.

- [Login & Password](https://www.figma.com/file/A0BfmaQVH5doZ4Mg8GJMs4/Login-Screen?node-id=0%3A1&t=KfKAlqUsiZcyPFp8-1)
- [Everything Else](https://www.figma.com/file/A0BfmaQVH5doZ4Mg8GJMs4/Login-Screen?node-id=21%3A2&t=KfKAlqUsiZcyPFp8-1)
___

### Class Diagrams
The class diagrams for the backend struture can be found at the link below

https://github.com/anthony-yeo/307-Gather/wiki/Class-Diagrams

___

### Style Guide

For the Gather project, style guidelines are as follows:
  - Lower camel-case for function names
  - Single quotes for strings
  - Tabs for indentation
  - K&R curly braces
 
 _________
### VS Code / npm to install extensions

Run 
`npm install pylint --save-dev`

To install prettier, run 
`npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev`

To add config file, run 
`npx pylint --init`

Store as json and select custom style options corresponding with style guide.

Add to json to match the following:
```json
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ]
```
Modify `package.json` to read:
```json
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off"
  }
```
This is to support `jest`.

Finally, add the "format" command to `package.json` to run prettier:
```json
    "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
```
_______
### Neovim

#### Prerequisite
- Neovim `>= 0.8.3`
- [Mason](https://github.com/williamboman/mason.nvim)
- [Mason Lspconfig](https://github.com/williamboman/mason-lspconfig.nvim)
- [Null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim)
- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)

#### Details

To configure the style checker and linter use the configs files from this [repository](https://github.com/anarchaworld/dotfiles/tree/main/.config/nvim)
and run `:MasonInstall prettier` and `:MasonInstall json` and then choose appropriate options.

If you wish to set up LSP as well, run `:LspInstall javascript`
