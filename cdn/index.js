import esbuild from "esbuild";

esbuild.build({
    entryPoints: [
        "../dist/valthera.js",
        "../dist/graph.js"
    ],
    outdir: "dist",
    format: "esm",
    target: "esnext",
    bundle: true,
    sourcemap: true,
    external: [],
    splitting: false,
    minify: true,
    keepNames: true,
}).catch(() => process.exit(1));
