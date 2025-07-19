export function bookmark(id: string, title: string, url: string, onClick: () => void) {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.textContent = title;

  const b = document.createElement('button');
  b.setAttribute('key', id);
  b.textContent = '削除';
  b.addEventListener('click', onClick);

  const div = document.createElement('div');
  div.append(a);
  div.append(b);

  return div;
}
