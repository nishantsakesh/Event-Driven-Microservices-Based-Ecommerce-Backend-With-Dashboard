import env from "./env";

const appConfig = {
    name: env.APP_NAME,

    version: env.APP_VERSION,

    api: {
        baseURL: env.API_BASE_URL,
        timeout: env.API_TIMEOUT,
    },

    pagination: {
        defaultPage: 1,
        defaultLimit: 10,
    },

    theme: {
        defaultTheme: "dark",
    },
};

export default Object.freeze(appConfig);