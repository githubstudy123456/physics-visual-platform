# 技术栈落地说明

## 已接入

- 前端：Next.js App Router
- 样式：Tailwind CSS 入口已接入，现有仿真样式继续保留
- 数据/认证预留：Supabase client 工具已建好
- 支付预留：Stripe server client 工具已建好
- API：`/api/health` 用于部署健康检查，`/api/checkout` 作为 Stripe 接入口占位
- 部署目标：Vercel

## 需要账号配置后才能启用

- Supabase：需要 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Stripe：需要 `STRIPE_SECRET_KEY`、`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Umami：需要 `NEXT_PUBLIC_UMAMI_WEBSITE_ID` 和脚本地址
- 面包多：需要确定实际商品、回调方式和可用 API 后再接

## 建议的数据表

SQL 初稿见 `supabase/schema.sql`。

- `books`：教材
- `chapters`：章节
- `lesson_sections`：节与知识点
- `model_templates`：通用仿真模型
- `video_jobs`：题目视频生成任务
- `assets`：图片、音频、视频素材
- `subscriptions`：用户订阅或购买记录

## 下一步

1. 把现在写死在 `src/data/curriculum.ts` 的教材结构迁到 Supabase。
2. 增加登录后工作台：保存题目、保存生成记录。
3. 增加模型质量分级：知识点、静态图示、交互仿真、视频生成。
4. 接入 Umami 统计模型点击、章节浏览、视频生成转化。

## Vercel 环境变量

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
