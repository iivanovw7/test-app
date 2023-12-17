import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import qwikdev from "@qwikdev/astro";
import { resolve } from "node:path";

const root = process.cwd();

/** Path resolver. */
const pathResolve = (pathname) => resolve(root, ".", pathname);

export default defineConfig({
    vite: {
        resolve: {
            alias: [
                {
                    replacement: `${pathResolve("src")}/`,
                    find: /\/@\//,
                },
                {
                    replacement: `${pathResolve("types")}/`,
                    find: /\/#\//,
                },
                {
                    replacement: `${pathResolve("src")}/`,
                    find: /@\//,
                },
                {
                    replacement: `${pathResolve("types")}/`,
                    find: /#\//,
                },
            ],
        },
    },
    server: () => ({
        port: 3000,
    }),
    integrations: [tailwind(), qwikdev()],
    adapter: vercel(),
    output: "server",
});
