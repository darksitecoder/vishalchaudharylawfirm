# Quick Start Guide - Sanity Blog Integration

## ✅ What Has Been Done

Your blog has been fully integrated with Sanity CMS. Here's what's configured:

### Configuration
- **Sanity Project ID**: `vmnkeya7`
- **Dataset**: `production`
- **API Version**: `2024-01-26`
- **Status**: ✅ Ready to use

### Features Implemented
- ✅ Blog posts display with images, titles, excerpts
- ✅ Categories widget with post counts
- ✅ Tags cloud with filtering
- ✅ Author information with avatars
- ✅ Search functionality
- ✅ Sorting (Recent, Popular, Oldest)
- ✅ Pagination (6 posts per page)
- ✅ Recent posts sidebar
- ✅ Newsletter signup form
- ✅ Fully responsive design
- ✅ Image optimization
- ✅ Error handling

---

## 🚀 Getting Started - Create Your First Blog Post

### Step 1: Set Up Your Content (5 minutes)

Go to your Sanity Studio: http://localhost:3333

```bash
cd blog
npx sanity start
```

If that doesn't work, make sure dependencies are installed:
```bash
npm install
sanity start
```

### Step 2: Create Required Documents

#### Create an Author
1. In Sanity Studio, click **Authors**
2. Click **Create** → **Author**
3. Fill in:
   - **Name**: "John Smith" (or your name)
   - **Image**: Upload a profile photo
   - **Bio**: (optional) Write a short bio
4. Click **Publish**

#### Create Categories
1. Click **Categories**
2. Click **Create** → **Category**
3. Create at least 2-3 categories:
   - Title: "Employment Law"
   - Title: "Family Law"
   - Title: "Business Law"
4. **Publish** each one

#### Create Tags
1. Click **Tags**
2. Create several tags:
   - "Contract"
   - "Legal Rights"
   - "Compliance"
   - "Litigation"
3. **Publish** each one

#### Create Your First Post
1. Click **Posts**
2. Click **Create** → **Post**
3. Fill in ALL fields:

   **Basic Info:**
   - Title: "Understanding Employment Law Rights"
   - Slug: (auto-fills from title)
   - Author: Select the author you created
   
   **Content:**
   - Main Image: Upload a relevant image (600x400 recommended)
   - Categories: Select "Employment Law"
   - Tags: Select "Legal Rights", "Compliance"
   - Published At: Today's date
   - Excerpt: "A comprehensive guide to your employment rights..."
   - Body: Write your article content
   - Featured: (optional) Toggle ON for featured posts

4. Click **Publish**

### Step 3: View Your Blog

1. Open `blog.html` in your browser
2. You should see your post displayed!
3. Try searching, filtering by category, clicking tags
4. Verify all information displays correctly

---

## 📱 What You'll See

Your blog page shows:

```
┌─────────────────────────────────────────────────┐
│         Legal Insights & Articles               │
│    Expert Analysis on Law, Justice              │
└─────────────────────────────────────────────────┘

Search Box | Sort Dropdown

┌──────────────────────────────────────────────────────┐
│ [Featured Image]  Article Title                      │
│                   Employment Law | Today              │
│                   Full article excerpt...             │
│                   Tags: Contract Legal Rights        │
│                   John Smith | 8 min read            │
└──────────────────────────────────────────────────────┘

[Previous] 1 2 3 [Next]

SIDEBAR:
├─ Categories
│  ├─ Employment Law (5)
│  ├─ Family Law (3)
│  └─ Business Law (2)
├─ Popular Tags
├─ Recent Posts
└─ Newsletter Signup
```

---

## 🔧 Customization

### Change Project ID (if needed)
Edit `blog.html`, find line ~595:
```javascript
const SANITY_CONFIG = {
    projectId: 'vmnkeya7',  // Change this
    dataset: 'production',
    apiVersion: '2024-01-26',
    useCdn: true
};
```

### Change Posts Per Page
Edit `blog.html`, find line ~750:
```javascript
let blogState = {
    ...
    postsPerPage: 6,  // Change to 12 for more posts per page
    ...
};
```

### Change Post Click Destination
Edit `blog.html`, find line ~1040:
```javascript
// Change this:
window.location.href = `/blog-post.html?slug=${postSlug}`;
// To your actual post detail page URL
```

---

## 🎯 Common Tasks

### Adding More Posts
1. Go to Sanity Studio
2. Posts → Create → Post
3. Fill all fields
4. Publish
5. Blog page auto-updates!

### Changing a Post
1. Go to Sanity Studio
2. Posts → Find your post
3. Edit and click Publish
4. Blog page refreshes with new data

### Creating a New Category
1. Go to Sanity Studio
2. Categories → Create → Category
3. Fill title and slug auto-fills
4. Publish
5. Appears in sidebar immediately

### Adding Images
- Main images should be at least 600x400 pixels
- JPG or PNG format recommended
- Sanity auto-optimizes images for web

---

## 🐛 Troubleshooting

### "No articles found"
- ✓ Open Sanity Studio
- ✓ Go to Posts and create a post
- ✓ Make sure "Published At" date is set
- ✓ Click Publish button
- ✓ Refresh blog.html

### Images not showing
- ✓ Make sure image is uploaded in Sanity
- ✓ Check browser console (F12) for errors
- ✓ Try a different image format

### Filters not working
- ✓ Make sure posts have categories/tags
- ✓ Verify slug fields are filled
- ✓ Clear browser cache and refresh

### Nothing loads
- ✓ Check browser console for errors (F12)
- ✓ Check Project ID in blog.html is correct
- ✓ Make sure you're online
- ✓ Try refreshing the page

---

## 📚 Learn More

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Guide**: https://www.sanity.io/docs/groq
- **API Reference**: https://www.sanity.io/docs/api-endpoints

---

## ✨ Pro Tips

1. **Featured Posts**: Toggle the "Featured" checkbox in Sanity to highlight important posts
2. **Multiple Categories**: You can assign a post to multiple categories
3. **Multiple Tags**: Add multiple tags to each post for better discoverability
4. **Author Avatars**: Upload author images for a professional look
5. **Read Time**: Automatically calculated based on content length
6. **Search**: Users can search across titles, excerpts, categories, and tags

---

## 📝 Files Modified

- `blog.html` - Sanity integration + styling
- `blog/schemaTypes/post.js` - Added tags, excerpt, featured fields
- `blog/schemaTypes/tag.js` - New tag schema
- `blog/schemaTypes/index.js` - Added tag schema export

---

**Everything is set up and ready to go! 🎉**

Create your first post in Sanity and watch it appear on your blog!
