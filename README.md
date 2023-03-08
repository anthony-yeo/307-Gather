### Build Status
![](https://github.com/anthony-yeo/307-Gather/actions/workflows/node.js.yml/badge.svg)
____

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
