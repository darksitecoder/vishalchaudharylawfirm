import re
import os

# List of HTML files to update (excluding header.html, footer.html, and already updated ones)
files_to_update = [
    'family-law.html',
    'criminal-defence.html',
    'real-estate-property.html',
    'tax-law-planning.html',
    'employment-law.html',
    'wills-and-inheritance.html',
    'civil-law.html',
    'business-law.html',
    'criminal-law.html',
    'cyber-law.html',
    'education-law.html',
    'hospital-law.html',
    'service-law.html',
    'servicesex.html',
    'vishal-chaudhary.html',
    'blog.html'
]

# Header replacement pattern
header_pattern = r'<!-- Header/Nav -->\s*<header class="">.*?</header>'
header_replacement = '    <!-- Header/Nav - Loaded Dynamically -->\n    <div id="header-placeholder"></div>'

# Footer replacement pattern (matches footer and sub-footer)
footer_pattern = r'<footer>.*?</footer>\s*<div class="sub-footer">.*?</div>'
footer_replacement = '  <!-- Footer - Loaded Dynamically -->\n  <div id="footer-placeholder"></div>'

# Script addition pattern
script_pattern = r'(<script src="assets/js/custom-services-menu\.js"></script>)'
script_replacement = r'\1\n    <script src="assets/js/load-header-footer.js"></script>'

script_pattern2 = r'(<script src="assets/js/accordions\.js"></script>)'
script_replacement2 = r'\1\n    <script src="assets/js/load-header-footer.js"></script>'

script_pattern3 = r'(<script src="assets/js/disclaimer-popup\.js"></script>)'
script_replacement3 = r'\1\n    <script src="assets/js/load-header-footer.js"></script>'

for filename in files_to_update:
    filepath = os.path.join('.', filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename} - file not found")
        continue
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace header
        content = re.sub(header_pattern, header_replacement, content, flags=re.DOTALL)
        
        # Replace footer
        content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)
        
        # Add script tag
        if 'load-header-footer.js' not in content:
            if 'custom-services-menu.js' in content:
                content = re.sub(script_pattern, script_replacement, content)
            elif 'accordions.js' in content:
                content = re.sub(script_pattern2, script_replacement2, content)
            elif 'disclaimer-popup.js' in content:
                content = re.sub(script_pattern3, script_replacement3, content)
            else:
                # Add before closing body tag
                content = re.sub(r'(</body>)', r'    <script src="assets/js/load-header-footer.js"></script>\n\1', content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename}")
        else:
            print(f"No changes needed for {filename}")
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Done!")
