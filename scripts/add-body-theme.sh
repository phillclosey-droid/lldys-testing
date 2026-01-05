#!/bin/bash

# Add data-theme="dark" back to body tags

cd /Users/phillipclose/Desktop/lldys-testing/GitHub/lldys-testing/journeys/01-mvp-journey

for page in "02-mobility-hub/mobility-hub.html" "03-insurance-capture/insurance-capture.html" "03-insurance-capture-success/insurance-capture-success.html" "04-service-capture/service-capture.html" "04-service-capture-success/service-capture.html" "05-tax-added/tax-added.html" "06-mot-added/mot-added.html" "07-insurance-added/insurance-added.html" "08-service-added/service-added.html"; do
    echo "Fixing $page..."
    
    # Add data-theme="dark" to body tag
    perl -i -pe 's/^<body>/<body data-theme="dark">/' "$page"
    
    echo "Fixed $page"
done

echo "All pages fixed!"
