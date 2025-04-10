import fs from 'fs'
import path from 'path'
import * as jsonc from 'jsonc-parser';
import { Client, AppType, Domain } from '@larksuiteoapi/node-sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  Category,
  PromptItem,
  CategoryJson,
  ToolItem,
  FeishuResponse
} from '@/lib/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_PATH = path.resolve(__dirname, '../../');

// 飞书客户端配置
const client = new Client({
  appId: process.env.FEISHU_APP_ID || '',
  appSecret: process.env.FEISHU_APP_SECRET || '',
  appType: AppType.SelfBuild,
  domain: Domain.Feishu,
});



// 从飞书读取 categories 数据
export async function getCategories2(): Promise<Category[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_PROMPT_TABLE_ID || '');
    if (!result?.data?.items) {
      console.error('无法获取飞书数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为categories
    const categories = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        name: String(fields.name || ''),
        link: String(fields.link || ''),
        src: String(fields.src || ''),
        description: String(fields.description || ''),
      };
    });

    return categories;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

// 从飞书读取prompt
export async function getPrompts(): Promise<PromptItem[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_PROMPT_TABLE_ID || '');
    if (!result?.data?.items) {
      console.error('无法获取飞书工具数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为工具列表
    const tools = result.data.items.map(item => {
      const fields = item.fields;
      return {
        prompt_id: item.record_id,
        category: fields.category || [],
        tag: fields.tag || [],
        client: fields.client || [],
        title: fields.title || '',
        prompt: fields.prompt || '',
        author: fields.author || '',
        test_result: fields.test_result || '',
        test_result_img: fields.test_result_img || '',
        create_time: fields.create_time || '',
        update_time: fields.update_time || '',
        slug: fields.slug || '',
      } as PromptItem;
    });

    return tools;
  } catch (error) {
    console.error('处理飞书工具数据失败:', error);
    return null;
  }
}

// 从飞书读取表格数据
async function exportTable(app_token: string, table_id: string): Promise<FeishuResponse | null> {
  try {
    const res = await client.bitable.appTableRecord.list({
      path: {
        app_token: app_token,
        table_id: table_id,
      },
      params: {
        page_size: 500,
      },
    });
    return res as FeishuResponse;
  } catch (error) {
    console.error('导出飞书表格失败:', error);
    return null;
  }
}



// 读取 categories 数据
export function getCategories(locale: string): CategoryJson[] {
  const categoriesPath = path.join(BASE_PATH, 'data', 'json', locale, 'tools', 'category.jsonc');
  const categoriesText = fs.readFileSync(categoriesPath, 'utf8');
  const categories = jsonc.parse(categoriesText) as CategoryJson[];

  if (typeof categories === 'string') {
    // 如果解析后仍是字符串，可能需要二次解析
    try {
      return jsonc.parse(categories) as CategoryJson[];
    } catch (error) {
      console.error('二次解析失败:', error);
      return [] as CategoryJson[]; // 如果二次解析失败，返回空数组
    }
  }
  return categories;
}

// 读取category数据
export function getCategoryByLink(link: string, locale: string): CategoryJson | undefined {
  const categoriesPath = path.join(BASE_PATH, 'data', 'json', locale, 'tools', 'category.jsonc');
  const categoriesText = fs.readFileSync(categoriesPath, 'utf8');
  const categories = jsonc.parse(categoriesText) as CategoryJson[];
  console.log('categories: ', categories);
  return categories.find(category => category.link === link);
}

// 读取 datalist 数据
export function getDataList(src: string, locale: string): ToolItem[] {
  const dataPath = path.join(BASE_PATH, 'data', 'json', locale, 'tools', src);
  const dataListText = fs.readFileSync(dataPath, 'utf8');
  const dataList = jsonc.parse(dataListText) as ToolItem[];

  if (typeof dataList === 'string') {
    // 如果解析后仍是字符串，可能需要二次解析
    try {
      return jsonc.parse(dataList) as ToolItem[];
    } catch (error) {
      console.error('二次解析失败:', error);
      return [] as ToolItem[]; // 如果二次解析失败，返回空数组
    }
  }

  return dataList;
}

// 根据关键词搜索数据
export function searchDataByKeyword(keyword: string, locale: string): ToolItem[] | null {
  let result: ToolItem[] = []

  const categories = getCategories(locale);

  if (!categories || categories.length === 0) return null;

  for (const category of categories) {
    if (category.name.toLowerCase() == keyword.toLowerCase()) {
      const dataList = getDataList(category.src, locale)
      result = result.concat(dataList);
    } else {
      const dataList = getDataList(category.src, locale)

      for (const item of dataList) {
        if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
          // search by name
          result.push(item)
        } else if (item.tags && item.tags.some((tag: string) => tag.toLowerCase() == keyword.toLowerCase())) {
          // search by tags
          result.push(item)
        }
      }
    }
  }

  return result;
}

// 读取更新日志
export function getChangelog(): Record<string, unknown> {
  const dataPath = path.join(BASE_PATH, 'data', 'json', 'changelog.jsonc');
  const dataListText = fs.readFileSync(dataPath, 'utf8');
  const dataList = jsonc.parse(dataListText) as Record<string, unknown>;
  return dataList;
}

