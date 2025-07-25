import { createClient, type Session } from '@supabase/supabase-js';

let currentSession: Session | null = null;

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

supabase.auth.onAuthStateChange((event, session) => {
  console.log('event', event);
  console.log('session', session);
  currentSession = session;
});

browser.runtime.onMessage.addListener((message: { type: string }, _, sendResponse) => {
  if (message.type === "login") {
    doLogin();
    return true;
  } else if (message.type === "getUser") {
    console.log('currentSession', currentSession?.user);
    sendResponse({ user: currentSession?.user });
    return true;
  }
});

async function doLogin() {
  const redirectUrl = browser.identity.getRedirectURL();
  console.log("redirectUrl", redirectUrl);

  const authUrl = `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/authorize?provider=github&redirect_to=${redirectUrl}`;

  const redirectedUrl = await browser.identity.launchWebAuthFlow({
    url: authUrl,
    interactive: true
  });

  console.log("redirectedUrl", redirectedUrl);

  const params = new URLSearchParams(new URL(redirectedUrl).hash.slice(1));
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (access_token && refresh_token) {
    console.log("setSession");
    await supabase.auth.setSession({ access_token, refresh_token });
  }
}

