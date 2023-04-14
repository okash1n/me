import { NotionPage, NotionBlock } from "./notionTypes.ts";
import NotionData from "./notionData.ts";

export type PageData = {
  id: string;
  title: string | undefined;
  icon: string | undefined;
  cover: string | undefined;
};

export function processPages(pageData: NotionPage): PageData {
  const title =
    pageData.properties.title?.title[0]?.plain_text ||
    pageData.properties.名前?.title[0]?.plain_text;
  const icon =
    pageData.icon?.type === "emoji"
      ? pageData.icon.emoji
      : pageData.icon?.external?.url;
  const cover =
    pageData.cover?.type === "external"
      ? pageData.cover.external?.url
      : pageData.cover?.file?.url;

  return {
    id: pageData.id,
    title: title,
    icon: icon,
    cover: cover,
  };
}

export async function processBlocks(block: NotionBlock) {
  const notion = new NotionData();

  if (block.has_children) {
    const children = await notion.getPageBlock(block.id);
    // console.log(children);
    block.children = children;

    for (const child of children) {
      if (child.has_children) {
        await processBlocks(child);
      }
    }
  }
  return block;
}
