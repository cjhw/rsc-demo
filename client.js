let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  const response = await fetch(pathname);
  const html = await response.text();
  if (pathname === currentPathname) {
    const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    const bodyEndIndex = html.lastIndexOf("</body>");
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);
    document.body.innerHTML = bodyHTML;
  }
}

// 拦截a标签click事件，转而向服务端发送请求
window.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName !== "A") {
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const href = e.target.getAttribute("href");
    if (!href.startsWith("/")) {
      return;
    }
    e.preventDefault();
    window.history.pushState(null, null, href);
    navigate(href);
  },
  true
);

window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});
