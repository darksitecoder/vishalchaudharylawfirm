# How to Add Real Blog Posts to Sanity

## Current Status
Your blog is currently displaying **sample/demo posts** to show you what it looks like when populated with content. These are placeholder posts that help you see the features in action.

---

## Step 1: Start Sanity Studio

Open your terminal and run:

```bash
cd blog
npm run dev
```

Or:
```bash
cd blog
npx sanity start
```

Then open: **http://localhost:3333** in your browser

---

## Step 2: Create an Author (If Not Exists)

1. Click **Authors** in the left sidebar
2. Click **Create** button
3. Fill in:
   - **Name**: Your name (e.g., "Vishal Chaudhary")
   - **Slug**: Auto-fills from name
   - **Image**: (Optional) Upload your photo
   - **Bio**: (Optional) Write a short bio
4. Click **Publish** (top right)

---

## Step 3: Create Categories

1. Click **Categories** in the left sidebar
2. Click **Create** button
3. For each category, fill in:
   - **Title**: e.g., "Employment Law"
   - **Slug**: Auto-fills from title
   - **Description**: (Optional) Short description
4. Click **Publish**

**Suggested Categories:**
- Employment Law
- Family Law
- Business Law
- Real Estate Law
- Criminal Law
- Civil Law
- Tax Planning
- Cyber Law

---

## Step 4: Create Tags

1. Click **Tags** in the left sidebar
2. Click **Create** button
3. For each tag, fill in:
   - **Title**: e.g., "Legal Rights"
   - **Slug**: Auto-fills from title
4. Click **Publish**

**Suggested Tags:**
- Legal Rights
- Contracts
- Compliance
- Employment
- Litigation
- Divorce
- Property
- Defense
- Transactions
- Justice

---

## Step 5: Create Your First Blog Post

1. Click **Posts** in the left sidebar
2. Click **Create** button
3. Fill in ALL fields:

### Basic Information
- **Title**: Your article title
  - Example: "Understanding Employment Law Rights"
- **Slug**: Auto-fills from title (can be edited)
  - Example: "understanding-employment-law-rights"

### Content
- **Author**: Select from the dropdown
- **Main Image**: Click to upload an image
  - Recommended size: 600x400 pixels
  - File format: JPG or PNG
- **Categories**: Click to select one or more categories
- **Tags**: Click to select relevant tags
- **Published At**: Set to today's date
- **Excerpt**: Write a 1-2 sentence summary
  - Example: "Learn about your fundamental rights in the workplace..."
- **Body**: Write your full article
  - You can format with bold, italic, links, lists, etc.
- **Featured**: Toggle ON if this is an important article

4. Click **Publish** (top right)

---

## Step 6: See Your Posts on the Blog

1. Save/publish the post in Sanity Studio
2. Go back to your **blog.html** page in the browser
3. **Refresh the page** (F5 or Ctrl+R)
4. Your post will now appear instead of the sample posts!

---

## Important Notes

✅ **Must Do:**
- Publish the post (don't leave it as draft)
- Set the "Published At" date to today or earlier
- Upload a main image
- Select at least one category
- Assign an author

❌ **Don't:**
- Leave posts as drafts - they won't appear
- Set future publish dates - they won't show
- Leave required fields empty

---

## Troubleshooting

### "Posts still showing samples"
- Refresh your blog.html page (F5)
- Wait a few seconds for the API to respond
- Check browser console (F12) for errors

### "My posts don't appear"
- Make sure post is **Published** (not Draft)
- Check that **Published At** date is not in the future
- Verify you selected a **Category** and **Author**
- Verify the post has a **Main Image**

### "Images not showing"
- Make sure image is uploaded in the **Main Image** field
- Try uploading the image again
- Check that image file is not corrupted

### "Author not showing"
- Create an author in Authors section first
- Assign the author to the post
- Make sure author is published

---

## Example Post Template

Here's an example you can copy and fill in:

### Post Title
Understanding Your Rights: A Guide to Employment Law

### Excerpt
Learn about your fundamental employment rights including discrimination protection, wage laws, and workplace safety regulations that protect employees.

### Body
Employment law is a critical area of legal practice that protects workers in the workplace. Whether you're an employee or employer, understanding these laws is essential.

**Key Areas of Employment Law:**

1. **Anti-Discrimination Laws**
   - Title VII of the Civil Rights Act
   - Age Discrimination in Employment Act
   - Americans with Disabilities Act

2. **Wage and Hour Laws**
   - Fair Labor Standards Act
   - State minimum wage requirements
   - Overtime regulations

3. **Workplace Safety**
   - OSHA regulations
   - Workers' compensation
   - Safety standards

4. **Employment Contracts**
   - Non-compete agreements
   - Confidentiality agreements
   - Severance agreements

### Category
Employment Law

### Tags
- Legal Rights
- Employment
- Compliance
- Workplace

### Featured
Toggle ON (to make it a featured post)

---

## Quick Tips

💡 **Pro Tips:**
1. Use clear, descriptive titles
2. Write engaging excerpts (shows in blog list)
3. Add relevant tags for better filtering
4. Use featured flag for important posts
5. Upload high-quality images
6. Keep articles well-organized with headers
7. Add links within your content
8. Use lists and formatting for readability

---

## Getting Help

If you get stuck:

1. Check the QUICK_START.md file for setup
2. Review SCHEMA_REFERENCE.md for field details
3. Check browser console (F12) for error messages
4. Make sure Sanity Studio is running
5. Refresh the blog.html page after publishing

---

## Next Steps

1. ✅ Start Sanity Studio (http://localhost:3333)
2. ✅ Create an Author
3. ✅ Create at least 2-3 Categories
4. ✅ Create 5-10 Tags
5. ✅ Create your first Blog Post
6. ✅ Refresh blog.html to see your post!
7. ✅ Create more posts as needed

---

**Good luck! Your blog will come to life once you add your own content to Sanity.** 🚀
