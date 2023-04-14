import { NotionBlock, NotionPage } from "../lib/notionTypes.ts";
import IconFileText from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/file-text.tsx";

type props = {
  block: NotionBlock;
};

export default function CosmosBag({ block }: props) {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="text-2xl my-6 font-black">
          {block!.heading_1!.rich_text[0].plain_text}
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-xl my-4 font-bold">
          {block.heading_2!.rich_text[0].plain_text}
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-lg my-2">
          {block.heading_3!.rich_text[0].plain_text}
        </h3>
      );

    case "paragraph":
      return (
        <div className="my-2">
          {block.paragraph!.rich_text.length >= 1 ? (
            block.paragraph!.rich_text.map((text, _index) => (
              <span>
                {text.href ? (
                  <a
                    href={text.href}
                    className="underline"
                    style={"text-underline-offset:4px"}
                  >
                    {text.plain_text}
                  </a>
                ) : (
                  text.plain_text
                )}
              </span>
            ))
          ) : (
            <br />
          )}
        </div>
      );

    case "bulleted_list_item":
      return (
        <div className="">
          <span className="text-2xl">• </span>
          {block.bulleted_list_item!.rich_text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </div>
      );

    case "numbered_list_item":
      return (
        <div className="">
          {block.numbered_list_item!.rich_text.map((text, index) => (
            <span key={index}>
              {index + 1}. {text.plain_text}
            </span>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="px-2.5 py-4 bg-green-50 rounded-md my-2">
          <span className="p-2">
            {block.callout!.icon?.type === "emoji"
              ? block.callout!.icon?.emoji
              : block.callout!.icon?.external?.url}
          </span>
          {block.callout!.rich_text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </div>
      );

    case "toggle":
      return (
        <div className="my-2">
          <details>
            <summary className="text-lg font-bold">
              {block.toggle?.rich_text[0].plain_text}
            </summary>
            {block.has_children && (
              <div className="pl-4">
                {block.children.map((bc: NotionBlock, _index: number) => (
                  <CosmosBag block={bc} />
                ))}
              </div>
            )}
          </details>
        </div>
      );

    case "quote":
      return (
        <div className="">
          “
          {block.quote!.rich_text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
          ”
        </div>
      );

    case "code":
      return (
        <div className="my-2">
          <pre>
            <code className={block.code!.language}>
              {block.code!.rich_text[0].plain_text}
            </code>
          </pre>
        </div>
      );

    case "child_page":
      return (
        <div className="my-2">
          <a href={"/" + block.id}>
            <span
              className="flex gap-1 items-center underline"
              style={"text-underline-offset:4px"}
            >
              <IconFileText class="w-6 h-6" /> {block.child_page!.title}
            </span>
          </a>
        </div>
      );

    case "child_database":
      return (
        <div className="my-2">
          {Deno.env.get("SHOW_DATABASE_TITLE") === "true" && (
            <p className="my-2 pl-2 border-l-4 border-gray-300 text-lg">
              {block.child_database!.title}
            </p>
          )}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {block.database_pages.map((page: NotionPage, _index: number) => (
              <a
                href={"/" + page.id}
                className="shadow rounded border border-gray-200"
              >
                <div className="h-32">
                  {page.cover && (
                    <img
                      src={page.cover?.external?.url || page.cover?.file?.url}
                      alt="cover"
                      width="100%"
                      className="h-32"
                    />
                  )}
                </div>
                <div className="p-2">
                  {page.icon && (
                    <span>{page.icon?.emoji || page.icon?.external?.url}</span>
                  )}
                  <span>
                    {page.properties.title?.title[0]?.plain_text
                      ? page.properties.title?.title[0]?.plain_text
                      : page.properties.名前?.title[0]?.plain_text}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      );

    case "column_list":
      return (
        <div className="my-2 flex gap-6 justify-between">
          {block.children.map((bc: NotionBlock, _index: number) => (
            <CosmosBag block={bc} />
          ))}
        </div>
      );

    case "column":
      return (
        <div className="my-2 flex flex-col w-1/2">
          {block.children.map((bc: NotionBlock, _index: number) => (
            <CosmosBag block={bc} />
          ))}
        </div>
      );

    case "divider":
      return (
        <div className="my-2">
          <hr className="border border-gray-200" />
        </div>
      );

    case "image":
      return (
        <div className="my-2">
          {block.image!.type === "file" ? (
            <img
              src={block.image?.file?.url}
              alt={block.image!.caption[0].plain_text}
            />
          ) : (
            <img
              src={block.image?.external?.url}
              alt={block.image!.caption[0].plain_text}
            />
          )}
        </div>
      );

    default:
      console.log("ブロックはまだサポートされていません：", block);
      return (
        <p className="text-red-500">
          ブロックタイプ：{block.type} はまだサポートされていません
        </p>
      );
  }
}
