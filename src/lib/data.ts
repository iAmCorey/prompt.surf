import fs from 'fs'
import path from 'path'
import * as jsonc from 'jsonc-parser';
import { Client, AppType, Domain } from '@larksuiteoapi/node-sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  PromptType,
  ToolItem,
  FeishuResponse,
  CategoryType
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
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tbl4EyVxYOhuJt8x&view=vewEBIpUHH
export async function getCategories(): Promise<CategoryType[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_CATEGORY_TABLE_ID || '');
    if (!result?.data?.items) {
      console.error('无法获取飞书数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为categories
    const categories = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        category_id: fields.category_id || '',
        category: fields.category || '',
        slug: fields.slug || '',
      } as CategoryType;
    });

    return categories;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

// 从飞书读取prompt
export async function getPrompts(): Promise<PromptType[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_PROMPT_TABLE_ID || '');
    if (!result?.data?.items) {
      console.error('无法获取飞书工具数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为prompts
    const prompts = result.data.items.map(item => {
      const fields = item.fields;
      return {
        prompt_id: item.record_id,
        category: fields.category || [],
        tag: fields.tag || [],
        model: fields.model || [],
        title: fields.title || '',
        prompt: fields.prompt || '',
        author: fields.author || '',
        test_result: fields.test_result || '',
        test_result_img: fields.test_result_img || '',
        create_time: fields.create_time || '',
        update_time: fields.update_time || '',
        slug: fields.slug || '',
      } as PromptType;
    });

    return prompts;
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


// 读取更新日志
export function getChangelog(): Record<string, unknown> {
  const dataPath = path.join(BASE_PATH, 'data', 'json', 'changelog.jsonc');
  const dataListText = fs.readFileSync(dataPath, 'utf8');
  const dataList = jsonc.parse(dataListText) as Record<string, unknown>;
  return dataList;
}

