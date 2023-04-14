import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content={Deno.env.get("SITE_DESCRIPTION")} />
        <meta name="keywords" content={Deno.env.get("SITE_KEYWORDS")} />
        <meta name="author" content={Deno.env.get("SITE_AUTHOR")} />
        <meta property="og:image" content={Deno.env.get("SITE_IMAGE")} />

        <link
          href={"https://cdn.jsdelivr.net/npm/daisyui@2.46.0/dist/full.css"}
          rel="stylesheet"
          type="text/css"
        />
        <script
          src={"https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"}
        />
        <link
          href={
            "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css"
          }
          rel="stylesheet"
        />
        <script
          src={
            "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"
          }
        />
        <script>hljs.highlightAll();</script>
      </Head>

      <div
        class="min-h-screen grid grid-cols-1"
        style="grid-template-rows: 0fr auto auto;"
      >
        <Component />
        <Footer />
      </div>
    </>
  );
}
