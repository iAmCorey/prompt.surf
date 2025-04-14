import { Client, AppType, Domain } from '@larksuiteoapi/node-sdk';
import {
  PromptType,
  FeishuPromptResponseType,
  CategoryType,
  TagType,
  ModelType,
  FeishuCategoryResponseType,
  FeishuTagResponseType,
  FeishuModelResponseType
} from '@/lib/types';


// 飞书客户端配置
const client = new Client({
  appId: process.env.FEISHU_APP_ID || '',
  appSecret: process.env.FEISHU_APP_SECRET || '',
  appType: AppType.SelfBuild,
  domain: Domain.Feishu,
});


export async function getLatestPrompts(count?: number): Promise<PromptType[] | null> {
  return getPromptByParams({
    page_size: count || 500,
    sort_field: 'create_time',
    sort_desc: true
  });
}

export async function getFeaturedPrompts(count?: number): Promise<PromptType[] | null> {
  return getPromptByParams({
    feature: "是",
    page_size: count || 500,
    sort_field: 'create_time',
    sort_desc: true
  });
}

// 从飞书读取prompt
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblEv0PjREXSDuSu&view=vewEBIpUHH
export async function getPromptByParams(params: {
  slug?: string;
  prompt_id?: string;
  category?: string[];
  tag?: string[];
  model?: string[];
  keyword?: string;
  feature?: string;
  page_size?: number;
  page_token?: string;
  sort_field?: string;
  sort_desc?: boolean;
}): Promise<PromptType[] | null> {
  const app_token = process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '';
  const table_id = process.env.NEXT_PUBLIC_FEISHU_PROMPT_TABLE_ID || '';

  if (!app_token || !table_id) {
    console.error('app_token or table_id is not set');
    return null;
  }

  const searchParams = {
    page_size: params.page_size || 500,
    page_token: params.page_token,
  }

  interface FilterCondition {
    field_name: string;
    operator: "contains" | "is" | "isNot" | "doesNotContain" | "isEmpty" | "isNotEmpty" | "isGreater" | "isGreaterEqual" | "isLess" | "isLessEqual" | "like" | "in";
    value?: string[];
  }

  // 构建筛选条件
  const conditions: FilterCondition[] = [];
  let keywordFilter;

  // 添加各种筛选条件
  if (params.slug) {
    conditions.push({
      field_name: 'slug',
      operator: 'contains',
      value: [params.slug]
    });
  }

  if (params.prompt_id) {
    conditions.push({
      field_name: 'prompt_id',
      operator: 'contains',
      value: [params.prompt_id]
    });
  }

  if (params.category && params.category.length > 0) {
    conditions.push({
      field_name: 'category',
      operator: 'contains',
      value: params.category
    });
  }

  if (params.tag && params.tag.length > 0) {
    conditions.push({
      field_name: 'tag',
      operator: 'contains',
      value: params.tag
    });
  }

  if (params.model && params.model.length > 0) {
    conditions.push({
      field_name: 'model',
      operator: 'contains',
      value: params.model
    });
  }

  // 添加feature筛选条件
  if (params.feature) {
    conditions.push({
      field_name: 'feature',
      operator: 'is',
      value: [params.feature]
    });
  }

  // 处理关键词搜索
  if (params.keyword) {
    keywordFilter = {
      conjunction: "or" as const,
      conditions: [
        {
          field_name: 'title',
          operator: 'contains' as const,
          value: [params.keyword]
        },
        {
          field_name: 'prompt',
          operator: 'contains' as const,
          value: [params.keyword]
        },
      ]
    };
  }

  // 构建完整的filter结构
  const filter = conditions.length > 0 || keywordFilter ? {
    conjunction: "and" as const,
    conditions: conditions,
    children: keywordFilter ? [keywordFilter] : undefined
  } : undefined;

  // 构建排序条件
  const sort = [
    {
      field_name: params.sort_field || 'create_time',
      desc: params.sort_desc !== undefined ? params.sort_desc : true
    }
  ];

  const searchData = {
    filter,
    sort
  };

  try {
    const result = await client.bitable.v1.appTableRecord.search({
      params: searchParams,
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: searchData
    }) as FeishuPromptResponseType;

    if (!result?.data?.items) {
      console.error('get prompts data failed');
      console.error(result);
      return null;
    }

    // 转换数据格式为prompts
    const prompts = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        prompt_id: fields.prompt_id.value?.[0]?.text || '',
        category: fields.category || [],
        tag: fields.tag || [],
        model: fields.model || [],
        title: fields.title?.[0]?.text || '',
        prompt: fields.prompt?.[0]?.text || '',
        author: fields.author || '',
        slug: fields.slug?.[0]?.text || '',
        test_result: fields.test_result?.[0]?.text || '',
        test_result_img: fields.test_result_img?.[0]?.url || '',
        create_time: fields.create_time ? String(fields.create_time) : '',
        update_time: fields.update_time ? String(fields.update_time) : '',
        feature: fields.feature || '否'
      } as PromptType;
    });

    return prompts;
  } catch (error) {
    console.error('处理飞书提示词数据失败:', error);
    return null;
  }
}

// 根据slug获取prompt
export async function getPromptBySlug(slug: string): Promise<PromptType | null> {
  const prompts = await getPromptByParams({ slug });
  return prompts && prompts.length > 0 ? prompts[0] : null;
}

// 根据prompt_id获取prompt
export async function getPromptById(promptId: string): Promise<PromptType | null> {
  const prompts = await getPromptByParams({ prompt_id: promptId });
  return prompts && prompts.length > 0 ? prompts[0] : null;
}

// 根据分类获取prompts
export async function getPromptsByCategory(category: string, count?: number): Promise<PromptType[] | null> {
  return getPromptByParams({ category: [category], page_size: count || 500 });
}

// 根据标签获取prompts
export async function getPromptsByTag(tag: string): Promise<PromptType[] | null> {
  return getPromptByParams({ tag: [tag] });
}

// 根据模型获取prompts
export async function getPromptsByModel(model: string, count?: number): Promise<PromptType[] | null> {
  return getPromptByParams({ model: [model], page_size: count || 500 });
}

// 根据关键词搜索prompts
export async function searchPrompts(keyword: string): Promise<PromptType[] | null> {
  return getPromptByParams({ keyword });
}

// 从飞书读取 category 数据
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tbl4EyVxYOhuJt8x&view=vewEBIpUHH
export async function getCategories(params: {
  slug?: string;
  category_id?: string;
  page_size?: number;
  page_token?: string;
  sort_field?: string;
  sort_desc?: boolean;
}): Promise<CategoryType[] | null> {
  const app_token = process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '';
  const table_id = process.env.NEXT_PUBLIC_FEISHU_CATEGORY_TABLE_ID || '';

  if (!app_token || !table_id) {
    console.error('app_token or table_id is not set');
    return null;
  }

  const searchParams = {
    page_size: params?.page_size || 500,
    page_token: params?.page_token,
  }

  interface FilterCondition {
    field_name: string;
    operator: "contains" | "is" | "isNot" | "doesNotContain" | "isEmpty" | "isNotEmpty" | "isGreater" | "isGreaterEqual" | "isLess" | "isLessEqual" | "like" | "in";
    value?: string[];
  }

  // 构建筛选条件
  const conditions: FilterCondition[] = [];

  // 添加各种筛选条件
  if (params?.slug) {
    conditions.push({
      field_name: 'slug',
      operator: 'contains',
      value: [params.slug]
    });
  }

  if (params?.category_id) {
    conditions.push({
      field_name: 'category_id',
      operator: 'contains',
      value: [params?.category_id]
    });
  }


  // 构建完整的filter结构
  const filter = conditions.length > 0 ? {
    conjunction: "and" as const,
    conditions: conditions,
  } : undefined;

  // 构建排序条件
  const sort = [
    {
      field_name: params?.sort_field || 'priority',
      desc: params?.sort_desc !== undefined ? params?.sort_desc : true
    }
  ];

  const searchData = {
    filter,
    sort
  };


  try {
    const result = await client.bitable.v1.appTableRecord.search({
      params: searchParams,
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: searchData
    }) as FeishuCategoryResponseType;
    
    if (!result?.data?.items) {
      console.error('get categories data failed');
      console.error(result);
      return null;
    }

    // 转换数据格式为categories
    const categories = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        category_id: fields.category_id.value?.[0]?.text || '',
        category: fields.category || '',
        slug: fields.slug?.[0]?.text || '',
        priority: fields.priority || 1,
      } as CategoryType;
    });

    return categories;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

export async function getAllCategories(): Promise<CategoryType[] | null> {
  return getCategories({});
}


export async function getCategoryBySlug(slug: string): Promise<CategoryType | null> {
  const categories = await getCategories({ slug });
  return categories && categories.length > 0 ? categories[0] : null;
}

// 从飞书读取 tag 数据
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblBiTB4ITtjZBxQ&view=vewEBIpUHH
export async function getTags(): Promise<TagType[] | null> {
  const app_token = process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '';
  const table_id = process.env.NEXT_PUBLIC_FEISHU_TAG_TABLE_ID || '';

  if (!app_token || !table_id) {
    console.error('app_token or table_id is not set');
    return null;
  }

  const searchParams = {
    page_size: 500,
  }
  const searchData = {
    "sort": [
      {
        "field_name": "priority",
        "desc": true
      }
    ],
  }

  try {
    const result = await client.bitable.v1.appTableRecord.search({
      params: searchParams,
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: searchData
    }) as FeishuTagResponseType;
    
    if (!result?.data?.items) {
      console.error('get tag data failed');
      console.error(result);
      return null;
    }

    // 转换数据格式为categories
    const tags = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        tag_id: fields.tag_id.value?.[0]?.text || '',
        tag: fields.tag || '',
        slug: fields.slug?.[0]?.text || '',
        priority: fields.priority || 1,
      } as TagType;
    });

    return tags;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

// 从飞书读取 models 数据
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblJvCthQSdUACEf&view=vewEBIpUHH
export async function getModels(params: {
  slug?: string;
  model_id?: string;
  page_size?: number;
  page_token?: string;
  sort_field?: string;
  sort_desc?: boolean;
}): Promise<ModelType[] | null> {
  const app_token = process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '';
  const table_id = process.env.NEXT_PUBLIC_FEISHU_MODEL_TABLE_ID || '';

  if (!app_token || !table_id) {
    console.error('app_token or table_id is not set');
    return null;
  }

  const searchParams = {
    page_size: params?.page_size || 500,
    page_token: params?.page_token,
  }

  interface FilterCondition {
    field_name: string;
    operator: "contains" | "is" | "isNot" | "doesNotContain" | "isEmpty" | "isNotEmpty" | "isGreater" | "isGreaterEqual" | "isLess" | "isLessEqual" | "like" | "in";
    value?: string[];
  }

  // 构建筛选条件
  const conditions: FilterCondition[] = [];

  // 添加各种筛选条件
  if (params?.slug) {
    conditions.push({
      field_name: 'slug',
      operator: 'contains',
      value: [params.slug]
    });
  }

  if (params?.model_id) {
    conditions.push({
      field_name: 'model_id',
      operator: 'contains',
      value: [params?.model_id]
    });
  }


  // 构建完整的filter结构
  const filter = conditions.length > 0 ? {
    conjunction: "and" as const,
    conditions: conditions,
  } : undefined;

  // 构建排序条件
  const sort = [
    {
      field_name: params?.sort_field || 'priority',
      desc: params?.sort_desc !== undefined ? params?.sort_desc : true
    }
  ];

  const searchData = {
    filter,
    sort
  };


  try {
    const result = await client.bitable.v1.appTableRecord.search({
      params: searchParams,
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      data: searchData
    }) as FeishuModelResponseType;
    
    if (!result?.data?.items) {
      console.error('get models data failed');
      console.error(result);
      return null;
    }

    // 转换数据格式为models
    const models = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        model_id: fields.model_id.value?.[0]?.text || '',
        model: fields.model || '',
        slug: fields.slug?.[0]?.text || '',
        priority: fields.priority || 1,
      } as ModelType;
    });

    return models;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

export async function getAllModels(): Promise<ModelType[] | null> {
  return getModels({});
}


export async function getModelBySlug(slug: string): Promise<ModelType | null> {
  const models = await getModels({ slug });
  return models && models.length > 0 ? models[0] : null;
}


