#!/bin/bash

# Fix theme script to set on both html and body

cd /Users/phillipclose/Desktop/lldys-testing/GitHub/lldys-testing/journeys/01-mvp-journey

for page in "02-mobility-hub/mobility-hub.html" "03-insurance-capture/insurance-capture.html" "03-insurance-capture-success/insurance-capture-success.html" "04-service-capture/service-capture.html" "04-service-capture-success/service-capture-success.html" "05-tax-added/tax-added.html" "06-mot-added/mot-added.html" "07-insurance-added/insurance-added.html" "08-service-added/service-added.html"; do
    echo "Fixing $page..."
    
    # Replace the theme script with one that sets both html and body
    perl -i -p0e 's/    <script>\n        \(function\(\) \{\n            const savedTheme = localStorage\.getItem\(\x27cancara-theme-preference\x27\) \|\| \x27dark\x27;\n            document\.documentElement\.setAttribute\(\x27data-theme\x27, savedTheme\);\n        \}\)\(\);\n    <\/script>/    <script>\n        (function() {\n            const savedTheme = localStorage.getItem(\x27cancara-theme-preference\x27) || \x27dark\x27;\n            \/\/ Set on html first for immediate effect\n            document.documentElement.setAttribute(\x27data-theme\x27, savedTheme);\n            \/\/ Then set on body when it\x27s available\n            if (document.body) {\n                document.body.setAttribute(\x27data-theme\x27, savedTheme);\n            } else {\n                document.addEventListener(\x27DOMContentLoaded\x27, function() {\n                    document.body.setAttribute(\x27data-theme\x27, savedTheme);\n                });\n            }\n        })();\n    <\/script>/gs' "$page"
    
    echo "Fixed $page"
done

echo "All pages fixed!"
