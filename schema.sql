-- IraqiEdu production database blueprint
-- PostgreSQL / Supabase compatible.
create extension if not exists "pgcrypto";

create type user_role as enum ('student','teacher','parent','admin');
create type quiz_status as enum ('draft','published','archived');
create type attempt_status as enum ('in_progress','submitted','reviewed','flagged');

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  password_hash text,
  role user_role not null,
  school_id uuid,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  governorate text,
  district text,
  created_at timestamptz not null default now()
);

alter table users add constraint users_school_fk foreign key (school_id) references schools(id);

create table grades (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  stage text not null,
  sort_order int not null
);

create table subjects (
  id uuid primary key default gen_random_uuid(),
  grade_id uuid not null references grades(id) on delete cascade,
  name text not null,
  description text,
  sort_order int not null default 0,
  unique(grade_id,name)
);

create table books (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  title text not null,
  edition_year int,
  source_type text,
  file_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table book_pages (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references books(id) on delete cascade,
  page_number int not null,
  text_content text,
  image_url text,
  unique(book_id,page_number)
);

create table units (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  title text not null,
  sort_order int not null default 0
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  title text not null,
  explanation text,
  has_board boolean not null default false,
  sort_order int not null default 0
);

create table question_bank (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete set null,
  type text not null,
  question_text text not null,
  options jsonb,
  correct_answer jsonb,
  explanation text,
  difficulty smallint not null default 1 check(difficulty between 1 and 5),
  points int not null default 10 check(points >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete set null,
  title text not null,
  status quiz_status not null default 'draft',
  time_limit_seconds int check(time_limit_seconds is null or time_limit_seconds > 0),
  max_attempts int not null default 1 check(max_attempts > 0),
  competitive_points boolean not null default true,
  created_at timestamptz not null default now()
);

create table quiz_questions (
  quiz_id uuid not null references quizzes(id) on delete cascade,
  question_id uuid not null references question_bank(id) on delete restrict,
  question_order int not null,
  primary key(quiz_id,question_id)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete restrict,
  student_id uuid not null references users(id) on delete restrict,
  attempt_no int not null,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  status attempt_status not null default 'in_progress',
  score numeric(6,2),
  earned_points int not null default 0,
  suspicious boolean not null default false,
  unique(quiz_id,student_id,attempt_no)
);

create table attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references quiz_attempts(id) on delete cascade,
  question_id uuid not null references question_bank(id) on delete restrict,
  answer jsonb,
  is_correct boolean,
  points_earned int not null default 0
);

create table points_ledger (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references users(id) on delete restrict,
  source_type text not null,
  source_id uuid,
  points int not null check(points <> 0),
  created_at timestamptz not null default now()
);

create table achievements (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text
);

create table student_achievements (
  student_id uuid not null references users(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  primary key(student_id,achievement_id)
);

create table assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references users(id),
  lesson_id uuid references lessons(id),
  title text not null,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references assignments(id) on delete cascade,
  student_id uuid not null references users(id) on delete cascade,
  answer jsonb,
  score numeric(6,2),
  submitted_at timestamptz,
  unique(assignment_id,student_id)
);

create table discussions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  author_id uuid not null references users(id),
  body text not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- Never trust client-side points. Competitive score should be derived from
-- validated server-side events written to points_ledger.
create index idx_points_student on points_ledger(student_id,created_at desc);
create index idx_attempt_student on quiz_attempts(student_id,created_at desc);
create index idx_questions_lesson on question_bank(lesson_id);
create index idx_book_pages on book_pages(book_id,page_number);
