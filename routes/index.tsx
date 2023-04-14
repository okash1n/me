import Layout from "../components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import NotionData from "../lib/notionData.ts";
import { PageData, processPages, processBlocks } from "../lib/process.ts";
import { NotionBlock } from "../lib/notionTypes.ts";
import CosmosBag from "../components/CosmosBag.tsx";

type pageAndBlocks = {
  pageInfo: PageData;
  blocks: NotionBlock[];
};

export const handler: Handlers<pageAndBlocks> = {
  async GET(_, ctx) {
    const notion = new NotionData();
    const page = await notion.getPageData().then((r) => r);
    const pageInfo = processPages(page);
    const blocks = await notion.getPageBlock().then((r) => r);
    for (let block of blocks) {
      if (block.has_children) {
        const children = await processBlocks(block).then((r) => r);
        block = children;
      }
      if (block.type === "child_database") {
        const pageList = await notion
          .getDatabasePageList(block.id)
          .then((r) => r);
        block.database_pages = pageList;
      }
    }
    return ctx.render({ pageInfo, blocks });
  },
};

export default function HomePage({ data }: PageProps<pageAndBlocks>) {
  const HomeImageUrl = data.pageInfo.cover;
  const HomeTitle = Deno.env.get("SITE_NAME") || "Home";

  return (
    <Layout title={HomeTitle} menusActive="/" imageUrl={HomeImageUrl}>
      {data.blocks.map((block, _index) => (
        <CosmosBag block={block} />
      ))}
    </Layout>
  );
}

{
  /* 
<div className="bg-yellow-200 leading-6">
  <p>页面ID： {data.pageInfo.id}</p>
  <p>页面标题： {data.pageInfo.title}</p>
  <p>页面图标： {data.pageInfo.icon}</p>
  <p>页面封面： {data.pageInfo.cover}</p>
</div> 
*/
}
