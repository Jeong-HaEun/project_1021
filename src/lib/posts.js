// 게시글 읽기·쓰기·수정·삭제 — 권한 확인은 DB의 RLS 정책이 최종 판단한다
import { supabase } from './supabase.js';

const COLUMNS = 'id, user_id, title, content, created_at';

// 최신 글부터 목록 (누구나 읽기 가능)
export async function listPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data;
}

// 작성: user_id는 DB 기본값(auth.uid())이 로그인 사용자로 채운다
export async function createPost({ title, content }) {
  const { error } = await supabase
    .from('posts')
    .insert({ title: title.trim(), content: content.trim() });
  if (error) throw error;
}

// 수정: 남의 글이면 RLS가 막아서 바뀐 행이 0개가 된다
export async function updatePost(id, { title, content }) {
  const { data, error } = await supabase
    .from('posts')
    .update({ title: title.trim(), content: content.trim() })
    .eq('id', id)
    .select('id');
  if (error) throw error;
  if (data.length === 0) throw new Error('row-level security');
}

export async function deletePost(id) {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw error;
  if (data.length === 0) throw new Error('row-level security');
}
