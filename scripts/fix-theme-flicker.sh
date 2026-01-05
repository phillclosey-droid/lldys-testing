#!/bin/bash

# Fix theme flicker on all remaining journey pages by moving localStorage script to HEAD

cd /Users/phillipclose/Desktop/lldys-testing/GitHub/lldys-testing/journeys/01-mvp-journey

for page in "03-insurance-capture/insurance-capture.html" "03-insurance-capture-success/insurance-capture-success.html" "04-service-capture/service-capture.html" "04-service-capture-success/service-capture-success.html" "05-tax-added/tax-added.html" "06-mot-added/mot-added.html" "07-insurance-added/insurance-added.html" "08-service-added/service-added.html"; do
    echo "Fixing $page..."
    
    # Add theme script at top of HEAD (after charset and viewport)
    # Find the line with <title> and insert the script before it
    perl -i -pe 's/(<title>)/    <!-- CRITICAL: Set theme BEFORE any CSS loads to prevent flicker -->\n    <script>\n        (function() {\n            const savedTheme = localStorage.getItem(\x27cancara-theme-preference\x27) || \x27dark\x27;\n            document.documentElement.setAttribute(\x27data-theme\x27, savedTheme);\n        })();\n    <\/script>\n    \n\1/' "$page"
    
    # Remove any theme script from body tag area
    perl -i -p0e 's/<body data-theme="dark">\n    <script>\n        \(function\(\) \{[^}]+\}\)();\n    <\/script>/<body>/gs' "$page"
    
    echo "Fixed $page"
done

echo "All pages fixed!"
