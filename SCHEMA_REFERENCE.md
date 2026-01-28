# Sanity Schema Structure Reference

## Complete Data Model for Your Blog

### 📝 POST Document
```
Post
├─ title (string)
│  └─ "Understanding Employment Law"
├─ slug (slug) [auto-generated]
│  └─ "understanding-employment-law"
├─ author (reference) → Author document
│  └─ John Smith (with avatar)
├─ mainImage (image)
│  └─ [Featured image - 600x400px recommended]
├─ categories (array of references)
│  ├─ Employment Law
│  ├─ Legal Rights
│  └─ (can add more)
├─ tags (array of references)
│  ├─ Contract
│  ├─ Employee Rights
│  └─ (can add more)
├─ publishedAt (datetime)
│  └─ "2024-01-26T10:30:00Z"
├─ excerpt (text)
│  └─ "A comprehensive guide to your employment rights..."
├─ body (blockContent)
│  └─ [Rich text editor content with formatting]
└─ featured (boolean)
   └─ true / false
```

### 👤 AUTHOR Document
```
Author
├─ name (string)
│  └─ "John Smith"
├─ slug (slug) [auto-generated]
│  └─ "john-smith"
├─ image (image)
│  └─ [Author profile photo]
└─ bio (array)
   └─ [Short biography text]
```

### 📁 CATEGORY Document
```
Category
├─ title (string)
│  └─ "Employment Law"
├─ slug (slug) [auto-generated]
│  └─ "employment-law"
└─ description (text)
   └─ "Articles related to employment law..."
```

### 🏷️ TAG Document
```
Tag
├─ title (string)
│  └─ "Contract"
└─ slug (slug) [auto-generated]
   └─ "contract"
```

---

## Data Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    POST (Blog Article)                      │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ References to other documents:                       │  │
│  │                                                       │  │
│  │  author ──────────→ AUTHOR Document                  │  │
│  │  categories ──────→ [CATEGORY Document(s)]           │  │
│  │  tags ────────────→ [TAG Document(s)]                │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

                           ↓

        This allows POSTS to reference and link to
        AUTHOR, CATEGORY, and TAG documents
        while maintaining referential integrity
```

---

## Field Types Explained

### String
- Text input (max ~250 characters)
- Used for: title, name, slug
- Example: "Understanding Employment Law"

### Slug
- Auto-generated from another field
- Used for: URLs and filtering
- Generated from title: "understanding-employment-law"
- **Important**: Keep lowercase, no spaces

### Reference
- Link to another document
- Author reference: Links to specific Author
- Category references: Links to one or more Categories
- Tag references: Links to one or more Tags

### Image
- Upload image files
- Includes optimization options
- Supports: JPG, PNG, WebP, etc.
- Recommended sizes:
  - Main image: 600x400px minimum
  - Author image: 200x200px minimum

### DateTime
- Date and time picker
- Used for: Publication date
- Format: ISO 8601 (2024-01-26T10:30:00Z)

### Text (Textarea)
- Multi-line text input
- Used for: Excerpt, description, bio
- Up to several paragraphs

### Array
- Multiple items of same type
- Used for: Categories, Tags
- Can have 0 to unlimited items

### Boolean
- Yes/No toggle
- Used for: Featured flag
- Values: true or false

### BlockContent
- Rich text editor
- Supports formatting, links, lists
- Used for: Full article content
- Allows bold, italic, headings, etc.

---

## How The Blog Works

### 1. Data Creation Flow
```
User writes post in Sanity Studio
         ↓
Post saved with all fields filled
(author, categories, tags, images)
         ↓
User clicks "Publish"
         ↓
Post stored in Sanity database
with Publish timestamp
```

### 2. Data Fetching Flow
```
blog.html loads in browser
         ↓
JavaScript runs: loadBlogData()
         ↓
Three GROQ queries executed in parallel:
  - POSTS_QUERY (fetches all posts)
  - CATEGORIES_QUERY (fetches categories + counts)
  - TAGS_QUERY (fetches all tags)
         ↓
Sanity API returns JSON data
         ↓
Data stored in JavaScript blogState object
         ↓
renderAllContent() displays everything
         ↓
User sees blog with all posts, categories, tags
```

### 3. Filtering Flow
```
User clicks category / types search / selects tag
         ↓
JavaScript event listener triggers
         ↓
blogState.selectedCategory/Tag updated
         ↓
applyFilters() runs
         ↓
blogState.filteredPosts updated with matched posts
         ↓
renderBlogPosts() displays filtered results
         ↓
Pagination reset to page 1
```

---

## Sample Query Responses

### POSTS_QUERY Response Example
```json
[
  {
    "_id": "post-123",
    "title": "Understanding Employment Law",
    "slug": {
      "current": "understanding-employment-law"
    },
    "publishedAt": "2024-01-26T10:30:00Z",
    "excerpt": "A comprehensive guide...",
    "featured": true,
    "mainImage": {
      "asset": {
        "_id": "image-xyz",
        "url": "https://cdn.sanity.io/images/..."
      }
    },
    "author": {
      "_id": "author-456",
      "name": "John Smith",
      "image": {
        "asset": {
          "url": "https://cdn.sanity.io/images/..."
        }
      }
    },
    "categories": [
      {
        "_id": "cat-789",
        "title": "Employment Law",
        "slug": { "current": "employment-law" }
      }
    ],
    "tags": [
      {
        "_id": "tag-111",
        "title": "Contract",
        "slug": { "current": "contract" }
      }
    ]
  }
]
```

### CATEGORIES_QUERY Response Example
```json
[
  {
    "_id": "cat-789",
    "title": "Employment Law",
    "slug": { "current": "employment-law" },
    "count": 5
  },
  {
    "_id": "cat-790",
    "title": "Family Law",
    "slug": { "current": "family-law" },
    "count": 3
  }
]
```

---

## Important Notes

### Slug Fields
- Auto-generated from title
- Used in filtering and URLs
- Must be unique per document
- **Never manually edit - let Sanity auto-generate**

### Featured Flag
- Use to highlight important posts
- Featured posts appear first in "Popular" sorting
- Can set multiple posts as featured

### Publishing
- Draft posts: Exist but don't appear on blog
- Published posts: Appear immediately
- Use "Unpublish" to hide a post

### Images
- Must be uploaded before publishing
- Sanity auto-optimizes for web
- Supports hotspot for smart cropping
- Referenced via asset objects

### References
- Author: Required, select one
- Categories: Optional, can select multiple
- Tags: Optional, can select multiple

### Datetime
- Must be set for post to appear
- Blog sorts by this field
- Set to past/today to show immediately
- Set to future to schedule posts

---

## Validation Rules (Built-in)

```
✓ Title: Required, max 96 characters
✓ Slug: Required, unique, lowercase
✓ Author: Required, must exist
✓ Main Image: Required, must be image format
✓ PublishedAt: Required, must be valid date
✓ Excerpt: Optional, max 500 characters
✓ Body: Required, at least some content
✓ Featured: Optional, true/false
✓ Categories: Optional, can be empty
✓ Tags: Optional, can be empty
```

---

## Next Steps

1. **Create Documents**: Go to Sanity Studio and create posts
2. **Fill All Fields**: Don't leave required fields empty
3. **Upload Images**: Make sure all images are uploaded
4. **Set Dates**: Publish date must be today or earlier
5. **Publish**: Click Publish button
6. **View Blog**: Refresh blog.html to see posts

---

**This schema is optimized for a law firm blog with full filtering, search, and categorization!**
