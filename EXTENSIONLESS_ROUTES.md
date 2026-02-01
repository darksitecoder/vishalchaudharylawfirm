Extensionless routes (serve files without requiring .html)

This project contains several options to make pages accessible without adding `.html` to the URL.

1) Apache (.htaccess)
- File: `.htaccess` (created at repo root)
- Behavior: If `/about` is requested and `about.html` exists, Apache will internally serve `about.html`.
- How to use: upload the `.htaccess` file to your webroot.

2) Nginx
- File: `nginx-rewrite.conf` (example)
- Behavior: Nginx `try_files $uri $uri/ $uri.html` attempts the requested path, then path + `/`, then path + `.html`.
- How to use: include the `location /` block into your server config and reload Nginx.

3) Netlify
- File: `netlify.toml` and `_redirects.example`
- Notes: Netlify supports placeholder redirects; the `netlify.toml` example rewrites `/:splat` to `/:splat.html` with status 200. Deploy and verify.

4) Local dev server (Node)
- Files: `serve.js`, `package.json`
- Usage:

```bash
cd c:/vishal-chaudhary
npm install
npm start
```

This starts a dev server at `http://localhost:3000` which will serve `about.html` when you request `/about`.

Important notes:
- These rewrites only change how URLs are resolved on the server; they do NOT rename files. Keep your `.html` files in place.
- For SEO and clean URLs, you may also want to update canonical tags and sitemap to use extensionless URLs.
- For blog posts: the site currently renders post detail via `blog-post.html?slug=...`. If you want article pages at root `/my-post`, I can update the client JS to support that once the server rewrite is in place — otherwise direct visits will 404.

Next recommended steps:
- Tell me which hosting you use (Apache, Nginx, Netlify, or other) so I can provide any host-specific tweaks.
- If you want, I can also update the site to use root slugs for blog posts and update `blog.html`/`blog-post.html` accordingly.
