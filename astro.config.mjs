import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import qwikdev from "@qwikdev/astro";
import { resolve } from "node:path";

let root = process.cwd();

/** Path resolver. */
let pathResolve = (pathname) => resolve(root, ".", pathname);

let adapter = vercel();

if (process.argv[3] === "--node" || process.argv[4] === "--node") {
    adapter = node({ mode: "standalone" });
}

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
    adapter,
    output: "server",
});
