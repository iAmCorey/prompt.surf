// prompt

// prompt item
export type PromptType = {
  id: string;
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
  feature?: string;
}

// 飞书API返回的数据结构
export type FeishuPromptResponseType = {
  code?: number;
  msg?: string;
  data?: {
    has_more?: boolean;
    page_token?: string;
    total?: number;
    items?: Array<{
      record_id: string;
      fields: {
        prompt_id: {
          type?: number;
          value?: Array<{
            text: string;
            type: string;
          }>;
        };
        author?: string;
        category?: string[];
        tag?: string[];
        model?: string[];
        title?: Array<{
          text: string;
          type: string;
        }>;
        prompt?: Array<{
          text: string;
          type: string;
        }>;
        test_result?: Array<{
          text: string;
          type: string;
        }>;
        test_result_img?: Array<{
          file_token: string;
          name: string;
          size: number;
          tmp_url: string;
          type: string;
          url: string;
        }>;
        create_time?: number;
        update_time?: number;
        slug?: Array<{
          text: string;
          type: string;
        }>;
        id?: string;
        locale?: string;
        feature?: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }>;
  };
} 

// category
// 分类数据
export type CategoryType = {
  id: string;
  category_id: string;
  category: string;
  slug: string;
  priority: number;
}

// 飞书API返回的数据结构
export type FeishuCategoryResponseType = {
  code?: number;
  msg?: string;
  data?: {
    has_more?: boolean;
    page_token?: string;
    total?: number;
    items?: Array<{
      record_id: string;
      fields: {
        id?: string;
        category_id: {
          type?: number;
          value?: Array<{
            text: string;
            type: string;
          }>;
        };
        category?: string;
        slug?: Array<{
          text: string;
          type: string;
        }>;
        priority?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }>;
  };
} 


// tag

// 标签数据
export type TagType = {
  id: string;
  tag_id: string;
  tag: string;
  slug: string;
  priority: number;
}

// 飞书API返回的数据结构
export type FeishuTagResponseType = {
  code?: number;
  msg?: string;
  data?: {
    has_more?: boolean;
    page_token?: string;
    total?: number;
    items?: Array<{
      record_id: string;
      fields: {
        id?: string;
        tag_id: {
          type?: number;
          value?: Array<{
            text: string;
            type: string;
          }>;
        };
        tag?: string;
        slug?: Array<{
          text: string;
          type: string;
        }>;
        priority?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }>;
  };
} 

// model


// 模型数据
export type ModelType = {
  id: string;
  model_id: string;
  model: string;
  slug: string;
  priority: number;
}



// 飞书API返回的数据结构
export type FeishuModelResponseType = {
  code?: number;
  msg?: string;
  data?: {
    has_more?: boolean;
    page_token?: string;
    total?: number;
    items?: Array<{
      record_id: string;
      fields: {
        id?: string;
        model_id: {
          type?: number;
          value?: Array<{
            text: string;
            type: string;
          }>;
        };
        model?: string;
        slug?: Array<{
          text: string;
          type: string;
        }>;
        priority?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }>;
  };
} 

