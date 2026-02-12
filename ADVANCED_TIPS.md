# Advanced Tips & Troubleshooting

## 🔍 Debugging Guide

### Check Browser Console (F12)

Open Developer Tools to see what's happening:

```javascript
// In browser console, you can check:
blogState.allPosts      // All fetched posts
blogState.filteredPosts // Currently filtered posts
blogState.categories    // Available categories
blogState.tags          // Available tags
```

### Common Console Errors

#### "Could not fetch from Sanity"
```
Error: HTTP error! status: 401
Reason: Unauthorized - Check project ID
Solution: Verify SANITY_CONFIG.projectId in blog.html
```

#### "Response is not valid JSON"
```
Error: Unexpected token < in JSON at position 0
Reason: Wrong API endpoint or invalid query
Solution: Check Sanity project ID and API version
```

#### "Cannot read property 'length' of undefined"
```
Error: Post data missing required fields
Reason: Post missing author, mainImage, or publishedAt
Solution: Edit post in Sanity and fill all required fields
```

---

## 🎯 How to Debug Issues

### Issue: Posts Not Displaying

**Step 1: Check Data Fetch**
```javascript
// Open console and type:
console.log(blogState.allPosts.length);
// Should show a number > 0
```

**Step 2: Check Sanity**
- Go to Sanity Studio
- Verify posts exist
- Verify each post has:
  - ✓ Title
  - ✓ Author assigned
  - ✓ Main image uploaded
  - ✓ Published At date set
  - ✓ Published (not draft)

**Step 3: Check API**
```javascript
// Open console and check:
console.log(SANITY_BASE_URL);
// Open URL in new tab to see if API works
// Should return JSON data
```

### Issue: Images Not Loading

**Step 1: Check Image Data**
```javascript
// In console:
console.log(blogState.allPosts[0].mainImage);
// Should show image object with asset.url
```

**Step 2: Check Image URL**
```javascript
// In console:
console.log(buildSanityImageUrl(blogState.allPosts[0].mainImage));
// Should return valid HTTPS URL
```

**Step 3: Check Sanity**
- Verify image is actually uploaded
- Verify image asset is published
- Try uploading a different image

### Issue: Filters Not Working

**Step 1: Verify Category Data**
```javascript
// In console:
console.log(blogState.categories);
// Should show array with categories and counts
```

**Step 2: Verify Post Links**
```javascript
// In console:
console.log(blogState.allPosts[0].categories);
// Should show array with category references
```

**Step 3: Check Sanity**
- Verify posts have categories assigned
- Verify categories exist
- Verify slug fields are filled

---

## 📊 Performance Tips

### 1. Optimize Images
- Upload images in modern formats (WebP, JPG)
- Keep file sizes under 500KB
- Use recommended dimensions: 600x400px
- Sanity auto-optimizes with CDN

### 2. Limit Data Fetched
Change posts per page:
```javascript
blogState.postsPerPage = 12; // Load more at once
blogState.postsPerPage = 3;  // Load fewer (faster)
```

### 3. Reduce Tag Display
```javascript
// In renderTags():
cloud.innerHTML = blogState.tags.slice(0, 10).map(...)
// Changed from 20 to 10 tags
```

### 4. Cache Recent Queries
Sanity uses CDN caching by default:
```javascript
// This is already enabled:
useCdn: true
```

---

## 🎨 Styling Customization

### Color Scheme
Current colors are law Office themed:
- **Primary Dark**: `#0b1b2e` (dark navy)
- **Accent Gold**: `#c3a167` (gold)
- **Text Dark**: `#000` (black)
- **Background**: `#f8f9fa` (light gray)

**To change theme**, edit the color variables:

```css
/* Find and replace these colors: */
.blog-hero-section {
    background: linear-gradient(135deg, #0b1b2e 0%, #1a2f45 100%);
}

.blog-post-category {
    background: #0b1b2e;
    color: #c3a167;
}

.blog-post-featured-badge {
    background: #c3a167;
}
```

### Font Sizes
```css
.blog-post-title {
    font-size: 1.8em;  /* Change this for all post titles */
}

.blog-hero-title {
    font-size: 3em;    /* Change header size */
}
```

### Spacing
```css
.blog-container {
    padding: 40px 20px;  /* Container padding */
}

.blog-post-card {
    gap: 30px;  /* Gap between image and content */
}

.blog-posts-grid {
    gap: 30px;  /* Gap between post cards */
}
```

---

## 🚀 Advanced Features

### 1. Create a Post Detail Page

Create `blog-post.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Article - Your Site</title>
</head>
<body>
    <div id="post-detail"></div>
    
    <script>
        // Get slug from URL
        const params = new URLSearchParams(window.location.search);
        const postSlug = params.get('slug');
        
        // Fetch post from Sanity
        const QUERY = `*[_type == "post" && slug.current == "${postSlug}"][0] {
            ...,
            author->{...},
            categories[]->{...},
            tags[]->{...}
        }`;
        
        // Fetch and display
        fetch(SANITY_BASE_URL + '?query=' + encodeURIComponent(QUERY))
            .then(r => r.json())
            .then(data => {
                const post = data.result;
                document.getElementById('post-detail').innerHTML = `
                    <h1>${post.title}</h1>
                    <p>${post.excerpt}</p>
                    <img src="${buildSanityImageUrl(post.mainImage)}">
                    <div>${renderPortableText(post.body)}</div>
                `;
            });
    </script>
</body>
</html>
```

### 2. Add "Read More" Limit

```javascript
function truncateExcerpt(text, maxLength = 150) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Use in render:
<p class="blog-post-excerpt">${truncateExcerpt(post.excerpt, 150)}</p>
```

### 3. Add Author Pages

```javascript
// Click author name to show all their posts
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('blog-post-author-name')) {
        const authorName = e.target.textContent;
        filterPostsByAuthor(authorName);
    }
});

function filterPostsByAuthor(authorName) {
    const filtered = blogState.allPosts.filter(
        post => post.author?.name === authorName
    );
    blogState.filteredPosts = filtered;
    renderBlogPosts();
}
```

### 4. Add Reading Progress

```javascript
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Create progress bar element and update it
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
});
```

---

## 📈 Analytics Integration

### Add Google Analytics Tracking

```html
<!-- Add to blog.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>

<!-- Track post clicks in JavaScript: -->
document.getElementById('blogPostsGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.blog-post-card');
    if (card) {
        gtag('event', 'view_post', {
            post_title: card.querySelector('.blog-post-title').textContent,
            post_slug: card.dataset.blogSlug
        });
    }
});
```

---

## 🔒 Security Notes

### API Access
- Your Sanity API is public for reading
- Only published posts are visible
- No authentication needed for blog display

### Never Share
- ❌ Sanity API tokens
- ❌ Sanity project write tokens
- ❌ Admin credentials

### CORS
- Sanity handles CORS properly
- Cross-origin requests work fine
- No special configuration needed

---

## 📱 Mobile Optimization

### Test Responsive Design

Use browser DevTools (F12):
- Click "Toggle device toolbar" (Ctrl+Shift+M)
- Test iPhone 12, iPad, Android sizes
- Check that images scale properly
- Verify text is readable

### Mobile Issues Checklist

- ✓ Images load on mobile data
- ✓ Text doesn't overflow
- ✓ Buttons/links are clickable
- ✓ Sidebar converts to bottom section
- ✓ Search box is full width
- ✓ Pagination works on mobile

### Speed Optimization

```javascript
// Lazy load images in sidebar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
});
```

---

## 🆘 Getting Help

### Check These Resources

1. **Sanity Status**: https://status.sanity.io
2. **Community**: https://slack.sanity.io
3. **Documentation**: https://www.sanity.io/docs
4. **GitHub Issues**: Search existing issues

### Common Questions

**Q: How do I schedule a post to publish later?**
A: Set `publishedAt` to a future date. Posts with future dates won't appear until that time.

**Q: Can I have multiple authors?**
A: Yes! Create multiple Author documents and assign them to posts.

**Q: How do I delete a post?**
A: Go to Sanity Studio, find the post, click the menu (⋮), and select "Delete".

**Q: Can I export my posts?**
A: Use Sanity CLI or create a GROQ query to fetch all data and export as JSON.

**Q: How do I backup my content?**
A: Sanity maintains automatic backups. All published content is stored in their servers.

---

**For more help, visit the Sanity documentation or contact Sanity support!**
