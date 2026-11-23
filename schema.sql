-- =============================================================================
-- My Workspace — Supabase Free Database Schema & Realtime Setup
-- Run this in your Supabase SQL Editor (takes 5 seconds)
-- =============================================================================

-- 1. Create Channels Table
create table if not exists public.channels (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    topic text default 'General discussion',
    is_private boolean default false,
    created_by uuid references auth.users(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Messages Table
create table if not exists public.messages (
    id uuid default gen_random_uuid() primary key,
    channel_id text not null,
    user_id uuid references auth.users(id) on delete set null,
    user_name text not null,
    user_avatar text default '#4A154B',
    text text not null,
    attachment jsonb default null,
    reactions jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Thread Replies Table
create table if not exists public.thread_replies (
    id uuid default gen_random_uuid() primary key,
    message_id uuid references public.messages(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete set null,
    user_name text not null,
    user_avatar text default '#4A154B',
    text text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.channels enable row level security;
alter table public.messages enable row level security;
alter table public.thread_replies enable row level security;

-- Policies: Authenticated users can read and write all channels and messages
create policy "Allow authenticated read on channels" on public.channels
    for select to authenticated using (true);

create policy "Allow authenticated insert on channels" on public.channels
    for insert to authenticated with check (true);

create policy "Allow authenticated read on messages" on public.messages
    for select to authenticated using (true);

create policy "Allow authenticated insert on messages" on public.messages
    for insert to authenticated with check (true);

create policy "Allow authenticated read on thread_replies" on public.thread_replies
    for select to authenticated using (true);

create policy "Allow authenticated insert on thread_replies" on public.thread_replies
    for insert to authenticated with check (true);

-- 5. Enable Supabase Realtime (Instant push notifications for new messages)
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.channels;

-- 6. Insert Default Workspace Channels
insert into public.channels (name, topic, is_private)
values 
    ('general', 'Company-wide announcements and general discussion', false),
    ('engineering', 'Architecture, sprint syncs, code reviews, and deployments', false),
    ('product-design', 'Figma specifications, design system tokens, and UI reviews', false),
    ('random', 'Casual watercooler conversation, pet photos, and music', false)
on conflict (name) do nothing;
