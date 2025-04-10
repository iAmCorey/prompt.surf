// 分类数据
export type CategoryType = {
  id: string;
  category_id: string;
  category: string;
  slug: string;
}

// 提示词项目
export type PromptType = {
  prompt_id: string;
  category: string[];
  tag: string[];
  model: string[];
  title: string;
  prompt: string;
  author: string;
  test_result: string;
  test_result_img: string;
  create_time: string;
  update_time: string;
  slug: string;
}


// 工具项目结构
export type ToolItem = {
  name: string;
  description: string;
  url: string;
  icon: string;
  tags: string[];
}

// 飞书API返回的数据结构
export type FeishuResponse = {
  code?: number;
  msg?: string;
  data?: {
    has_more?: boolean;
    page_token?: string;
    total?: number;
    items?: Array<{
      record_id: string;
      fields: Record<string, unknown>;
      [key: string]: unknown;
    }>;
  };
} 