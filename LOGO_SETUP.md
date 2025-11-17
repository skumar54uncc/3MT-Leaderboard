# Logo Setup Instructions

## Adding 3MT® Logo

### Option 1: Text Logo (Current - No Image Needed)
The current implementation uses a text-based "3MT®" logo. If you want to replace it with an image:

1. **Place your 3MT logo image** in the `public/` folder:
   - Recommended: `public/3mt-logo.png` or `public/3mt-logo.svg`
   - SVG format is preferred for crisp display at any size

2. **Update `src/components/Header.tsx`** (around line 7):
   ```tsx
   {/* Replace this: */}
   <div className="text-4xl font-bold text-white text-shadow">
     3MT®
   </div>
   
   {/* With this: */}
   <img 
     src="/3mt-logo.png" 
     alt="3MT Logo" 
     className="h-12 w-auto"
   />
   ```

### Option 2: Keep Text Logo (Recommended)
The current text logo works well and matches the design. No changes needed.

---

## Adding CGLL Logo

1. **Get your CGLL logo image**
   - Format: PNG or SVG (SVG preferred)
   - Recommended size: 200x200px or similar square aspect ratio

2. **Place the logo** in the `public/` folder:
   ```
   public/cgll-logo.png
   ```
   or
   ```
   public/cgll-logo.svg
   ```

3. **Update `src/components/Header.tsx`** (around line 32):
   
   **Find this section:**
   ```tsx
   {/* Placeholder for CGLL logo - replace with actual image */}
   <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
     <span className="text-white font-bold text-xs">CGLL</span>
   </div>
   ```
   
   **Replace with:**
   ```tsx
   <img 
     src="/cgll-logo.png" 
     alt="Center for Graduate Life & Learning" 
     className="h-16 w-auto object-contain"
   />
   ```
   
   Or if using SVG:
   ```tsx
   <img 
     src="/cgll-logo.svg" 
     alt="Center for Graduate Life & Learning" 
     className="h-16 w-auto object-contain"
   />
   ```

4. **Adjust size if needed:**
   - Change `h-16` to `h-12` (smaller) or `h-20` (larger)
   - Add `max-w-32` to limit maximum width
   - Example: `className="h-16 w-auto max-w-32 object-contain"`

## Logo Best Practices

- **File formats:** Use PNG for photos, SVG for logos/illustrations
- **Naming:** Use lowercase with hyphens: `cgll-logo.png`, `3mt-logo.svg`
- **Size:** Keep file sizes under 200KB for fast loading
- **Transparency:** PNG with transparent background works best
- **Aspect ratio:** Maintain original logo proportions

## Testing

After adding logos:
1. Restart your dev server: `npm run dev`
2. Check the header displays correctly
3. Verify logos are visible on different screen sizes
4. Check browser console for any 404 errors (missing images)

## Troubleshooting

**Logo not showing?**
- Check file is in `public/` folder (not `src/`)
- Verify filename matches exactly (case-sensitive)
- Check browser console for 404 errors
- Clear browser cache (Ctrl+Shift+R)

**Logo too big/small?**
- Adjust `h-16` class value
- Add `max-w-*` to limit width
- Use `object-contain` to maintain aspect ratio

**Logo looks blurry?**
- Use SVG format instead of PNG
- Or use PNG at 2x resolution (e.g., 400x400px for 200x200px display)

