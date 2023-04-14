export type NotionPage = {
  id: string;
  created_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_time: string;
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: cover;
  icon: icon;
  parent: {
    type: string;
    database_id?: string;
    page_id?: string;
    workspace?: boolean;
  };
  archived: boolean;
  properties: {
    title?: title;
    [key: string]: any;
  };
  url: string;
};

export type NotionBlock = {
  object: string;
  id: string;
  parent: {
    type: string;
    page_id?: string;
    database_id?: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: string;
  heading_1?: {
    rich_text: rich_text;
    is_toggleable: boolean;
    color: string;
  };
  heading_2?: {
    rich_text: rich_text;
    is_toggleable: boolean;
    color: string;
  };
  heading_3?: {
    rich_text: rich_text;
    is_toggleable: boolean;
    color: string;
  };

  paragraph?: {
    rich_text: rich_text;
    color: string;
  };

  bulleted_list_item?: {
    rich_text: rich_text;
    color: string;
  };
  numbered_list_item?: {
    rich_text: rich_text;
    color: string;
  };

  callout?: {
    rich_text: rich_text;
    icon: icon;
    color: string;
  };

  toggle?: {
    rich_text: rich_text;
    color: string;
  };

  quote?: {
    rich_text: rich_text;
    color: string;
  };

  code?: {
    caption: rich_text;
    rich_text: rich_text;
    language: string;
  };

  table_of_contents?: {
    color: string;
  };

  child_page?: {
    title: string;
  };

  child_database?: {
    title: string;
  };

  column_list?: any;
  column?: any;
  divider?: {
    color: string;
  };

  image?: {
    caption: rich_text;
    type: string;
    external?: {
      url: string;
    };
    file?: {
      url: string;
      expiry_time: string;
    };
  };
  [key: string]: any;
};

export type NotionDataBase = {
  object: string;
  id: string;
  cover?: {
    type: string;
    external: {
      url: string;
    };
  };
  icon?: icon;
  created_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  last_edited_time: string;
  title: rich_text;
  description: any;
  properties: {
    [key: string]: any;
  };
  parent: {
    type: string;
    page_id: string;
  };
  url: string;
  archived: boolean;
  [key: string]: any;
};

export type title = {
  id: string;
  type: string;
  title: [
    {
      type: string;
      text: rich_text;
      annotations: {
        bold?: boolean;
        italic?: boolean;
        strikethrough?: boolean;
        underline?: boolean;
        code?: boolean;
        color?: string;
      };
      plain_text: string;
      href?: string;
    }
  ];
};

export type icon = {
  type: string;
  emoji?: string;
  external?: {
    url: string;
  };
} | null;

export type cover = {
  type: string;
  external?: {
    url: string;
  };
  file?: {
    url: string;
    expiry_time: string;
  };
} | null;

export type rich_text = [
  {
    type: string;
    text: {
      content: string;
      link?: {
        url: string;
      };
    };
    annotations: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      code?: boolean;
      color?: string;
    };
    plain_text: string;
    href?: string;
  }
];
