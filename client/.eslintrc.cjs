module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  ignorePatterns: ["dist"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/no-unresolved": "off",
    "no-shadow": "off",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "no-alert": "off",
  },
};
