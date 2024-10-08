# Cloud Management Frontend

This project is a cloud management frontend application built with React and Vite.

## Development

To start the development server, run:

```
npm run start
```

This will start both the frontend and backend servers concurrently.

### Understanding Vite Development Server Output

When you run the development server, you might see output like this:

```
VITE v4.5.5  ready in 1381 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help

[vite] hmr update /src/pages/Login.tsx, /src/index.css, ...
```

This is normal behavior:

- The first line indicates that Vite has started successfully.
- The `Local:` line shows the URL where you can access your app locally.
- The `Network:` line suggests how to make your app available on your local network.
- `press h to show help` reminds you that you can press 'h' for more options.
- Lines starting with `[vite] hmr update` indicate that Vite's Hot Module Replacement is working, automatically updating your app as you make changes.

These messages are informational and do not indicate errors.

## Building for Production

To build the app for production, run:

```
npm run build
```

This will create a `dist` folder with your compiled app, ready for deployment.

## Troubleshooting

If you encounter any issues during installation or building, try the following steps:

1. Clear the npm cache:
   ```
   npm cache clean --force
   ```

2. Delete the `node_modules` directory and `package-lock.json` file:
   ```
   rm -rf node_modules package-lock.json
   ```

3. Reinstall the dependencies:
   ```
   npm install
   ```

If you still encounter issues, ensure you have enough disk space and the correct file permissions in your project directory.

## Further Help

For more information on using Vite, check out the [Vite documentation](https://vitejs.dev/).