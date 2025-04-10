import fs from 'fs'
import path from 'path'
import * as jsonc from 'jsonc-parser';
import { Client, AppType, Domain } from '@larksuiteoapi/node-sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  PromptType,
  FeishuResponse,
  CategoryType,
  TagType,
  ModelType
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



// 从飞书读取 category 数据
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

// 从飞书读取 tag 数据
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblBiTB4ITtjZBxQ&view=vewEBIpUHH
export async function getTags(): Promise<TagType[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_TAG_TABLE_ID || '');
    console.log(result);
    if (!result?.data?.items) {
      console.error('无法获取飞书数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为categories
    const tags = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        tag_id: fields.tag_id || '',
        tag: fields.tag || '',
        slug: fields.slug || '',
      } as TagType;
    });

    return tags;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

// 从飞书读取 model 数据
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblJvCthQSdUACEf&view=vewEBIpUHH
export async function getModels(): Promise<ModelType[] | null> {
  try {
    const result = await exportTable(process.env.NEXT_PUBLIC_FEISHU_APP_TOKEN || '', process.env.NEXT_PUBLIC_FEISHU_MODEL_TABLE_ID || '');
    if (!result?.data?.items) {
      console.error('无法获取飞书数据或数据格式不正确');
      return null;
    }

    // 转换数据格式为models
    const models = result.data.items.map(item => {
      const fields = item.fields;
      return {
        id: item.record_id,
        model_id: fields.model_id || '',
        model: fields.model || '',
        slug: fields.slug || '',
      } as ModelType;
    });

    return models;
  } catch (error) {
    console.error('处理飞书数据失败:', error);
    return null;
  }
}

// 从飞书读取prompt
// https://dev-qiuyu.feishu.cn/base/RKJsbYoT8aXLsOs2aaBciTmOnQh?table=tblEv0PjREXSDuSu&view=vewEBIpUHH
export async function getLatestPrompts(): Promise<PromptType[] | null> {
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




// 读取更新日志
export function getChangelog(): Record<string, unknown> {
  const dataPath = path.join(BASE_PATH, 'data', 'json', 'changelog.jsonc');
  const dataListText = fs.readFileSync(dataPath, 'utf8');
  const dataList = jsonc.parse(dataListText) as Record<string, unknown>;
  return dataList;
}

