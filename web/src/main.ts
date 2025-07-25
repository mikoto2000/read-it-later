import { createClient, SupabaseClient, type User } from '@supabase/supabase-js'
import { bookmark } from './component/bookmark';

async function updateProfile(user: User) {
  // ログインユーザーの情報を #profile へ出力
  const profileElm = document.getElementById('profile');
  if (profileElm && user) {
    profileElm.innerHTML = `ユーザー: ${user.user_metadata.user_name}`;
  }
}

async function fetchBookmarks(supabase: SupabaseClient) {
  const bookmarksElm = document.getElementById('bookmarks');
  if (bookmarksElm) {
    bookmarksElm.replaceChildren();

    const { data: bookmarks } = await supabase.from("bookmark").select();
    if (bookmarks) {
      bookmarks.forEach((b) => {
        const bookmarkElm = bookmark(b.id, b.title, b.url, async () => {
          console.log(`Delete ${b.id}.`);
          await supabase.from("bookmark").delete(b.id).eq('id', b.id);
          fetchBookmarks(supabase);
        });
        bookmarksElm.append(bookmarkElm);
      });
    }
  }
}

async function login(supabase: SupabaseClient) {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // supabase セットアップ
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  console.log(supabase);

  // セッションを確認し、セッションがなければGitHubでサインイン
  const { data: { session }} = await supabase.auth.getSession();

  console.log(session);

  if (!session) {
    console.log("未ログイン");
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', () => { login(supabase) });
      loginButton.style.display = '';
    }
  } else {
    console.log("ログイン済み");
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
    }

    console.log(user);

    if (user) {
      updateProfile(user);
      fetchBookmarks(supabase);
    }
  }
});

