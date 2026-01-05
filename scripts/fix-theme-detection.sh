#!/bin/bash

# Fix theme detection on remaining journey pages

cd /Users/phillipclose/Desktop/lldys-testing/GitHub/lldys-testing/journeys/01-mvp-journey

for page in "06-mot-added/mot-added.html" "07-insurance-added/insurance-added.html" "08-service-added/service-added.html" "03-insurance-capture/insurance-capture.html" "03-insurance-capture-success/insurance-capture-success.html" "04-service-capture/service-capture.html" "04-service-capture-success/service-capture-success.html"; do
    echo "Fixing $page..."
    
    # Remove detectSystemTheme function and media query listener (multi-line)
    perl -i -p0e 's/        function detectSystemTheme\(\) \{[^}]+\}\n\n        if \(window\.matchMedia\) \{[^}]+\}\n\n//gs' "$page"
    
    # Replace detectSystemTheme() call with theme text update
    perl -i -pe 's/detectSystemTheme\(\);/\/\/ Update toggle text based on current theme\n            const currentTheme = document.body.getAttribute(\x27data-theme\x27);\n            const themeText = document.getElementById(\x27theme-text\x27);\n            if (themeText) {\n                if (currentTheme === \x27dark\x27) {\n                    themeText.textContent = \x27Switch to Light Mode\x27;\n                } else {\n                    themeText.textContent = \x27Switch to Dark Mode\x27;\n                }\n            }/g' "$page"
    
    # Update toggleTheme to save to localStorage
    perl -i -p0e 's/(function toggleTheme\(\) \{[^}]+if \(currentTheme === \x27light\x27\) \{[^}]+body\.setAttribute\(\x27data-theme\x27, \x27dark\x27\);\s+themeText\.textContent = \x27Switch to Light Mode\x27;)/\1\n                localStorage.setItem(\x27cancara-theme-preference\x27, \x27dark\x27);/gs' "$page"
    
    perl -i -p0e 's/(function toggleTheme\(\) \{[^}]+\} else \{[^}]+body\.setAttribute\(\x27data-theme\x27, \x27light\x27\);\s+themeText\.textContent = \x27Switch to Dark Mode\x27;)/\1\n                localStorage.setItem(\x27cancara-theme-preference\x27, \x27light\x27);/gs' "$page"
    
    echo "Fixed $page"
done

echo "All pages fixed!"
