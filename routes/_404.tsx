import Layout from "../components/Layout.tsx";

export default function NotFondPage() {
  return (
    <Layout title="そんなページはありません">
      <section class="w-full flex items-center justify-center mt-24">
        <div class="text-center">
          <h1 class="text-6xl md:text-9xl font-extrabold">404</h1>

          <p class="p-4 text-2xl md:text-3xl">Page not found 😢</p>

          <p class="p-4">
            <a href="/" class="hover:underline">
              戻る 🔙
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
