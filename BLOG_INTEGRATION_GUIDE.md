# Sanity Blog Integration - Setup Guide

## Overview
Your blog.html page is now fully integrated with your Sanity CMS backend. The blog displays posts, categories, tags, authors, and all related metadata.

## Configuration Details

### Sanity Project Settings
- **Project ID**: `vmnkeya7`
- **Dataset**: `production`
- **API Version**: `2024-01-26`
- **API Base URL**: `https://vmnkeya7.api.sanity.io/v2024-01-26/data/query/production`

## Features Implemented

### 1. Blog Posts Display
- Posts displayed in a grid with image, title, excerpt, and metadata
- Featured badge for featured posts
- Read time calculation based on content length
- Author information with avatar/initials
- Publication date display
- Category and tags display

### 2. Categories
- Sidebar widget showing all categories
- Post count for each category
- Click to filter posts by category
- Toggle category selection

### 3. Tags
- Tag cloud in sidebar (displays up to 20 tags)
- Click to filter posts by tag
- Toggle tag selection
- Smooth filtering experience

### 4. Authors
- Author avatar display (or initials fallback)
- Author name display
- Profile image from Sanity

### 5. Search & Filter
- Search box to search posts by title, excerpt, category, or tags
- Sort dropdown: Most Recent, Most Popular, Oldest First
- Real-time filtering and sorting
- Pagination support

### 6. Recent Posts Widget
- Shows 5 most recent posts in sidebar
- Quick navigation to posts

### 7. Newsletter Signup
- Email subscription form in sidebar
- Ready for integration with Mailchimp, SendGrid, etc.

## Schema Structure

### Post Document
```
- title (string) - Post title
- slug (slug) - URL-friendly identifier
- author (reference) - Link to author document
- mainImage (image) - Featured post image
- categories (array) - Links to category documents
- tags (array) - Links to tag documents
- publishedAt (datetime) - Publication date
- excerpt (text) - Short summary
- body (blockContent) - Full post content
- featured (boolean) - Whether post is featured
```

### Category Document
```
- title (string) - Category name
- slug (slug) - URL-friendly identifier
- description (text) - Category description
```

### Tag Document
```
- title (string) - Tag name
- slug (slug) - URL-friendly identifier
```

### Author Document
```
- name (string) - Author name
- slug (slug) - URL-friendly identifier
- image (image) - Author profile picture
- bio (array) - Author biography
```

## GROQ Queries

### Posts Query
Fetches all posts with complete metadata including author, categories, and tags.

### Categories Query
Fetches all categories with post count.

### Tags Query
Fetches all tags ordered alphabetically.

## Customization Guide

### Changing Sanity Project ID
If you want to connect to a different Sanity project:
1. Open `blog.html`
2. Find the `SANITY_CONFIG` section (around line 595)
3. Update `projectId` with your project ID:
```javascript
const SANITY_CONFIG = {
    projectId: 'YOUR_NEW_PROJECT_ID',
    dataset: 'production',
    apiVersion: '2024-01-26',
    useCdn: true
};
```

### Image Optimization
The `buildSanityImageUrl()` function handles image optimization:
- Automatic width/height parameters
- Crop and fit settings
- Fallback placeholder images
- Supports both direct URLs and Sanity asset references

### Post Detail Page
Currently, clicking a post redirects to:
```
/blog-post.html?slug={post-slug}
```

You can modify this in the event listener around line 1040:
```javascript
window.location.href = `/blog-post.html?slug=${postSlug}`;
```

### Pagination
Default posts per page: **6**

To change, modify in the state:
```javascript
let blogState = {
    ...
    postsPerPage: 6, // Change this value
    ...
};
```

## API Features

### GROQ Query Examples

To add more fields to posts query, modify `POSTS_QUERY`:

```javascript
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    featured,
    // Add more fields as needed
}`;
```

## Troubleshooting

### Posts Not Displaying
1. Check browser console for errors (F12)
2. Verify Sanity project ID is correct
3. Ensure posts exist in your Sanity dataset
4. Check that published dates are not in the future

### Images Not Loading
1. Verify images are uploaded in Sanity
2. Check browser console for image loading errors
3. Ensure image assets have proper URLs

### Filters Not Working
1. Verify categories and tags exist in Sanity
2. Ensure posts are linked to categories/tags
3. Check that slug fields are properly filled

### No Recent Posts
1. Verify posts exist in dataset
2. Check that publishedAt field is set
3. Ensure posts are ordered by date

## Integration Checklist

- [x] Sanity project connected
- [x] Blog posts fetched and displayed
- [x] Categories displayed with counts
- [x] Tags fetched and displayed
- [x] Author information shown
- [x] Search functionality implemented
- [x] Sorting implemented
- [x] Pagination implemented
- [x] Responsive design applied
- [x] Error handling implemented

## Next Steps

1. **Populate Sanity with Content**
   - Create posts, categories, authors, and tags in your Sanity Studio
   - Upload featured images
   - Set publication dates

2. **Test Filtering**
   - Verify search works
   - Test category filtering
   - Test tag filtering
   - Check sorting options

3. **Customize Styling**
   - Adjust colors to match your brand
   - Modify font sizes
   - Update spacing as needed

4. **Create Post Detail Page**
   - Create `blog-post.html` to display full post content
   - Parse the slug parameter from URL
   - Fetch and display full post data

5. **Newsletter Integration**
   - Connect to Mailchimp/SendGrid API
   - Implement backend endpoint for subscriptions

## Support

For Sanity documentation:
- Visit: https://www.sanity.io/docs
- API Reference: https://www.sanity.io/docs/api-endpoints
- GROQ Query Language: https://www.sanity.io/docs/groq

## Files Modified

- `/blog.html` - Main blog page with Sanity integration
- `/blog/schemaTypes/index.js` - Added tag schema
- `/blog/schemaTypes/post.js` - Added tags, excerpt, and featured fields
- `/blog/schemaTypes/tag.js` - New tag schema (created)
