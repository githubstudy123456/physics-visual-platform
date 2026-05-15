create table if not exists public.books (
  id text primary key,
  title text not null,
  stage text not null check (stage in ('初中', '高中')),
  grade text not null,
  volume text not null,
  source text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chapters (
  id text primary key,
  book_id text not null references public.books(id) on delete cascade,
  chapter_no text not null,
  title text not null,
  domain text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_sections (
  id uuid primary key default gen_random_uuid(),
  chapter_id text not null references public.chapters(id) on delete cascade,
  title text not null,
  knowledge jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.model_templates (
  id text primary key,
  title text not null,
  domain text not null,
  level text not null check (level in ('基础', '高频', '综合')),
  canvas_kind text not null,
  description text not null,
  objects jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  explainer jsonb not null default '{}'::jsonb,
  quality text not null default 'draft' check (quality in ('knowledge', 'draft', 'standard', 'verified')),
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_models (
  lesson_id uuid not null references public.lesson_sections(id) on delete cascade,
  model_id text not null references public.model_templates(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (lesson_id, model_id)
);

create table if not exists public.video_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  prompt text not null,
  status text not null default 'draft' check (status in ('draft', 'queued', 'rendering', 'done', 'failed')),
  source_lesson_id uuid references public.lesson_sections(id) on delete set null,
  model_id text references public.model_templates(id) on delete set null,
  storyboard jsonb not null default '[]'::jsonb,
  output_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.books enable row level security;
alter table public.chapters enable row level security;
alter table public.lesson_sections enable row level security;
alter table public.model_templates enable row level security;
alter table public.lesson_models enable row level security;
alter table public.video_jobs enable row level security;

create policy "Public curriculum read" on public.books for select using (true);
create policy "Public chapter read" on public.chapters for select using (true);
create policy "Public lesson read" on public.lesson_sections for select using (true);
create policy "Public model read" on public.model_templates for select using (true);
create policy "Public lesson model read" on public.lesson_models for select using (true);
