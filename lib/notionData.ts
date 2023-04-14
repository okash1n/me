import { Client } from "https://deno.land/x/notion_sdk@v1.0.4/src/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { NotionBlock, NotionDataBase, NotionPage } from "./notionTypes.ts";

const auth = Deno.env.get("NOTION_TOKEN");
const homePageId = Deno.env.get("HOME_PAGE_ID");

export default class NotionData {
  client: Client;

  constructor() {
    if (!auth)
      throw new Error("NOTION_TOKEN is not set, NOTION_TOKEN 是必须的");
    if (!homePageId)
      throw new Error("HOME_PAGE_ID is not set, HOME_PAGE_ID 是必须的");
    this.client = new Client({ auth });
  }

  async getPageData(pageId?: string): Promise<NotionPage> {
    return (await this.client.pages.retrieve({
      page_id: !pageId ? homePageId! : pageId,
    })) as NotionPage;
  }

  async getPageBlock(pageId?: string): Promise<NotionBlock[]> {
    const response = await this.client.blocks.children.list({
      block_id: !pageId ? homePageId! : pageId,
      page_size: 50,
    });
    return response.results as NotionBlock[];
  }

  async retrieveBlock(blockId: string) {
    const response = await this.client.blocks.retrieve({
      block_id: blockId,
    });
    return response as NotionBlock;
  }

  async getDatabase(databaseId: string) {
    const response = await this.client.databases.retrieve({
      database_id: databaseId,
    });
    return response as NotionDataBase;
  }

  async getDatabasePageList(databaseId: string) {
    const response = await this.client.databases.query({
      database_id: databaseId,
    });
    return response.results as NotionPage[];
  }
}
