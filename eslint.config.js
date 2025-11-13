{
  "env": {
    "node": true,
    "es2021": true
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false,
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-console": "off",
    "prefer-const": "error"
  }
}