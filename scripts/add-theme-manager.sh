#!/bin/bash

# Add theme manager script to all journey HTML files

cd /Users/phillipclose/Desktop/lldys-testing/GitHub/lldys-testing

FILES=$(find journeys/01-mvp-journey -name "*.html" -type f)

for file in $FILES; do
    # Check if theme-manager.js is already in the file
    if grep -q "theme-manager.js" "$file"; then
        echo "Skipping $file (already has theme manager)"
    else
        # Add the theme manager script after the <title> tag
        sed -i '' '/<title>/a\
    \
    <!-- Theme Manager (must load before body renders) -->\
    <script src="../../../src/js/theme-manager.js"><\/script>
' "$file"
        echo "✅ Added theme manager to $file"
    fi
done

echo ""
echo "Done! Theme manager added to all journey pages."
