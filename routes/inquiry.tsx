import Layout from "../components/Layout.tsx";

export default function MessagePage() {
  return (
    <Layout title="お問い合わせ" menusActive="/inquiry" imageUrl="">
      <script src="https://sdk.form.run/js/v2/embed.js"></script>
      <div
        class="formrun-embed"
        data-formrun-form="@okash-n-1667035044"
        data-formrun-redirect="true"
      ></div>
    </Layout>
  );
}
