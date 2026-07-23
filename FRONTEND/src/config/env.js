const env = {
    APP_NAME: import.meta.env.VITE_APP_NAME ?? "AudioHub",

    APP_VERSION: import.meta.env.VITE_APP_VERSION ?? "1.0.0",

    API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL ??
        "http://localhost:8080",

    API_TIMEOUT:
        Number(import.meta.env.VITE_API_TIMEOUT) ??
        30000,

    NODE_ENV:
        import.meta.env.MODE ?? "development",

    IS_DEVELOPMENT:
        import.meta.env.DEV,

    IS_PRODUCTION:
        import.meta.env.PROD,
};

export default Object.freeze(env);