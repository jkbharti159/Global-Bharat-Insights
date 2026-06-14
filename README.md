# News Analysis & Modeling Platform

A high-fidelity historical news modeling and geopolitical-macroeconomic analysis platform powered by React (Vite) and Express (Node.js).

## 🚀 Live Deployment on Render

This platform has been fully optimized for a smooth deployment on **Render** (as a Web Service) with dual support for rich simulated news analysis and live real-time Gemini API groundings.

### Fast Track (Render Blueprints)
If you deploy via Render's **Blueprints** dashboard using your connected GitHub repository, Render will automatically detect the custom `render.yaml` file in this directory and populate the correct settings:
*   **Environment**: Node
*   **Build Command**: `npm install && npm run build`
*   **Start Command**: `npm start` (which runs the compiled standalone bundle `node dist/server.cjs`)
*   **Port**: Automatically bound via `process.env.PORT`

---

### Manual Setup on Render (Step-by-Step)
If you are deploying manually as a **Web Service** on Render, configure the following settings in your Render dashboard:

1.  **Repository**: Connect your GitHub repository containing these project files.
2.  **Environment**: Choose **Node** as the runtime.
3.  **Build Command**:
    ```bash
    npm run build
    ```
    *(This runs Vite's static compilation AND bundles the server into `dist/server.cjs` via `esbuild` to prevent any runtime import problems.)*
4.  **Start Command**:
    ```bash
    npm start
    ```
5.  **Environment Variables (Advanced Section)**:
    Add the following environment variable to unleash the full capabilities of the platform:
    *   `GEMINI_API_KEY`: Your Google AI Studio API key. 
    *   `NODE_ENV`: `production`

> **Note on API Keys**: If `GEMINI_API_KEY` is not provided (or matches the default `"MY_GEMINI_API_KEY"`), the application will run in a super stable, highly cohesive **Simulated Modeling Mode** featuring high-fidelity local content seeds, ensuring your live demo is 100% functional and never crashes!

---

## 🛠️ Local Development & Scripts

To run this project locally:
1.  Install dependencies: `npm install`
2.  Run dev server: `npm run dev` (starts the full-stack server on port `3000`)
3.  Build: `npm run build`
4.  Launch production server locally: `npm start`
