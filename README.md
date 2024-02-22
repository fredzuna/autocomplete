# React + TypeScript + Vite

To run the project locally:
1. Make sure you have Node.js and npm installed on your machine.
2. Navigate to the root directory of the project in your terminal.
3. Run the following command to install dependencies:
    npm install
4. After the dependencies are installed, run the development server with:
    npm run dev
5. Open your browser and navigate to http://localhost:5173 to see the app running.

To build and run the project in production:
1. Make sure you have Node.js and npm installed on your machine.
2. Navigate to the root directory of the project in your terminal.
3. Run the following command to build the project:
    npm run build
4. Once the build process is complete, deploy the contents of the 'dist' directory to your production server.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
