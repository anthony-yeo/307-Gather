### Style Guide

For the Gather project, style guidelines are as follows:
  - Lower camel-case for function names
  - Single quotes for strings
  - Tabs for indentation
  - K&R curly braces
  
### VS Code / npm to install extensions

Run npm install pylint --save-dev

To install prettier, run npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev

To add config file, run npx pylint --init

Store as json and select custom style options corresponding with style guide.

Add to json to match the following:

    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ]

Modify package.json to read:

  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off"
  }
  
This is to support jest.

### Neovim

To configure the style checker and linter use the configs files from this [repository](https://github.com/anarchaworld/dotfiles/tree/main/.config/nvim)
and run `:MasonInstall prettier` and `:MasonInstall json` and then choose appropriate options.

If you wish to set up LSP as well, run `:LspInstall javascript`
