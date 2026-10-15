// Supabase 연결 — 사이트 전체가 이 한 곳의 연결(client)을 같이 쓴다
import { createClient } from '@supabase/supabase-js';

// 프로젝트 주소와 공개용(publishable) 키.
// 이 키는 브라우저에 노출돼도 되는 키이고, 실제 보호는 DB의 RLS 정책이 맡는다.
// ⚠ service_role(비밀) 키는 절대 여기에 넣지 않는다.
const SUPABASE_URL = 'https://kuqltkdkgkmsdwkmqgii.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SsJNDYfGplywGjQK_jXzbw_DhuAGbhg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
