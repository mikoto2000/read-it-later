const loginButton = document.getElementById("login");
if (loginButton) {
  loginButton.addEventListener("click", () => {
    browser.runtime.sendMessage({ type: "login" });
  });
}

browser.runtime.sendMessage({ type: "getUser" } as any, (response: any) => {
  console.log('getUser', response?.user?.user_metadata?.name)
  const status = document.getElementById("status");
  if (status) {
    if (response?.user) {
      status.textContent = `こんにちは ${JSON.stringify(response?.user?.user_metadata?.name, null, 2)}`;
    } else {
      status.textContent = "未ログインです";
    }
  }
});

