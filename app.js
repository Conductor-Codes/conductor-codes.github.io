// Company revenue for impact calculations
const COMPANY_REVENUE = 200000000; // $200M

// Sample URLs to display in the modal
const sampleUrls = {
    conversion_rate: [
        { url: "https://example.com/checkout", performance: "3.2s", issue: "Slow server response time" },
        { url: "https://example.com/product/123", performance: "2.7s", issue: "Large image files" },
        { url: "https://example.com/cart", performance: "2.9s", issue: "Render-blocking JavaScript" },
        { url: "https://example.com/payment", performance: "3.4s", issue: "Third-party scripts" },
        { url: "https://example.com/confirmation", performance: "2.5s", issue: "None" }
    ],
    bounce_rate: [
        { url: "https://example.com/", performance: "2.2s", issue: "Layout shifts during load" },
        { url: "https://example.com/category/electronics", performance: "3.8s", issue: "Large render tree" },
        { url: "https://example.com/blog", performance: "4.1s", issue: "Unoptimized JavaScript" },
        { url: "https://example.com/landing-page-1", performance: "3.5s", issue: "Heavy CSS files" },
        { url: "https://example.com/promotion", performance: "2.9s", issue: "Web font loading" }
    ],
    page_views: [
        { url: "https://example.com/trending", performance: "2.6s", issue: "API data fetching" },
        { url: "https://example.com/popular", performance: "3.1s", issue: "Insufficient caching" },
        { url: "https://example.com/new-arrivals", performance: "2.8s", issue: "DOM complexity" },
        { url: "https://example.com/deals", performance: "2.4s", issue: "None" },
        { url: "https://example.com/seasonal", performance: "3.3s", issue: "Unoptimized images" }
    ]
};

// Business metrics data
const businessMetrics = {
    conversion_rate: {
        name: "Conversion Rate",
        functions: [
            {
                id: "largest_contentful_paint",
                name: "Avg Largest Contentful Paint",
                description: "Time to render the largest content element in the viewport",
                values: {
                    sixMonthsAgo: "2.1 seconds",
                    threeMonthsAgo: "2.4 seconds",
                    current: "2.8 seconds"
                },
                unit: "seconds",
                revImpact: "$280,000"
            },
            {
                id: "speed_index",
                name: "Speed Index",
                description: "Measures how quickly content is visually displayed during page load",
                values: {
                    sixMonthsAgo: "3.2 seconds",
                    threeMonthsAgo: "3.5 seconds",
                    current: "3.9 seconds"
                },
                unit: "seconds",
                revImpact: "$140,000"
            },
            {
                id: "total_blocking_time",
                name: "Total Blocking Time",
                description: "Sum of time where the main thread was blocked for long enough to prevent input responsiveness",
                values: {
                    sixMonthsAgo: "120 ms",
                    threeMonthsAgo: "150 ms",
                    current: "210 ms"
                },
                unit: "ms",
                revImpact: "$180,000"
            },
            {
                id: "accessibility_score",
                name: "Accessibility Score",
                description: "Overall accessibility compliance score based on WCAG guidelines",
                values: {
                    sixMonthsAgo: "78",
                    threeMonthsAgo: "72",
                    current: "65"
                },
                unit: "",
                revImpact: "$10,000"
            }
        ]
    },
    bounce_rate: {
        name: "Bounce Rate",
        functions: [
            {
                id: "accessibility_score",
                name: "Accessibility Score",
                description: "Overall accessibility compliance score based on WCAG guidelines",
                values: {
                    sixMonthsAgo: "82",
                    threeMonthsAgo: "76",
                    current: "71"
                },
                unit: "",
                revImpact: "$10,000"
            },
            {
                id: "largest_contentful_paint",
                name: "Avg Largest Contentful Paint",
                description: "Time to render the largest content element in the viewport",
                values: {
                    sixMonthsAgo: "1.9 seconds",
                    threeMonthsAgo: "2.3 seconds",
                    current: "2.6 seconds"
                },
                unit: "seconds",
                revImpact: "$140,000"
            },
            {
                id: "speed_index",
                name: "Speed Index",
                description: "Measures how quickly content is visually displayed during page load",
                values: {
                    sixMonthsAgo: "2.8 seconds",
                    threeMonthsAgo: "3.2 seconds",
                    current: "3.7 seconds"
                },
                unit: "seconds",
                revImpact: "$180,000"
            },
            {
                id: "total_blocking_time",
                name: "Total Blocking Time",
                description: "Sum of time where the main thread was blocked for long enough to prevent input responsiveness",
                values: {
                    sixMonthsAgo: "90 ms",
                    threeMonthsAgo: "135 ms",
                    current: "180 ms"
                },
                unit: "ms",
                revImpact: "$160,000"
            }
        ]
    },
    page_views: {
        name: "Page Views",
        functions: [
            {
                id: "accessibility_score",
                name: "Accessibility Score",
                description: "Overall accessibility compliance score based on WCAG guidelines",
                values: {
                    sixMonthsAgo: "81",
                    threeMonthsAgo: "75",
                    current: "68"
                },
                unit: "",
                revImpact: "$10,000"
            },
            {
                id: "largest_contentful_paint",
                name: "Avg Largest Contentful Paint",
                description: "Time to render the largest content element in the viewport",
                values: {
                    sixMonthsAgo: "2.0 seconds",
                    threeMonthsAgo: "2.3 seconds",
                    current: "2.7 seconds"
                },
                unit: "seconds",
                revImpact: "$140,000"
            },
            {
                id: "speed_index",
                name: "Speed Index",
                description: "Measures how quickly content is visually displayed during page load",
                values: {
                    sixMonthsAgo: "3.0 seconds",
                    threeMonthsAgo: "3.4 seconds",
                    current: "3.8 seconds"
                },
                unit: "seconds",
                revImpact: "$160,000"
            },
            {
                id: "total_blocking_time",
                name: "Total Blocking Time",
                description: "Sum of time where the main thread was blocked for long enough to prevent input responsiveness",
                values: {
                    sixMonthsAgo: "110 ms",
                    threeMonthsAgo: "145 ms",
                    current: "195 ms"
                },
                unit: "ms",
                revImpact: "$170,000"
            }
        ]
    }
};

// Keep track of the selected business metric
let selectedBusinessMetric = null;

// Function to get trend class based on values
function getTrendClass(currentValue, previousValue, isAccessibilityScore = false) {
    const current = parseFloat(currentValue.split(' ')[0]);
    const previous = parseFloat(previousValue.split(' ')[0]);
    
    // For accessibility scores, higher is better (opposite of performance metrics)
    if (isAccessibilityScore) {
        if (current > previous) {
            return 'trend-better';
        } else if (current < previous) {
            return 'trend-worse';
        } else {
            return 'trend-neutral';
        }
    } else {
        // For performance metrics, lower is better
        if (current > previous) {
            return 'trend-worse';
        } else if (current < previous) {
            return 'trend-better';
        } else {
            return 'trend-neutral';
        }
    }
}

// DOM elements - Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    const configSection = document.getElementById('configSection');
    const urlConfigSection = document.getElementById('urlConfigSection');
    const metricsSection = document.getElementById('metricsSection');
    const metricSelector = document.querySelector('.metrics-selector');
    const businessMetricName = document.getElementById('businessMetricName');
    const functionsList = document.getElementById('functionsList');
    const functionsTable = document.getElementById('functionsTable');
    const selectPrompt = document.querySelector('.select-prompt');
    const showUrlsButton = document.getElementById('showUrlsButton');
    const howConductorUsesButton = document.getElementById('howConductorUsesButton');
    const diagramPage = document.getElementById('diagramPage');
    const closeDiagramButton = document.getElementById('closeDiagramButton');
    const configureNewButton = document.getElementById('configureNewButton');
    const diagnosticsSection = document.getElementById('diagnosticsSection');
    const diagnosticsTitle = document.querySelector('.diagnostics-section h3');
    const addUrlButton = document.getElementById('addUrlButton');
    const seeFunctionButton = document.getElementById('seeFunctionButton');
    const urlInputsContainer = document.querySelector('.url-inputs-container');
    const revImpactNote = document.querySelector('.revenue-note');
    
    // Keep track of the active row for diagnostics
    let activeRowId = null;
    let activeUrlIndex = null;
    
    // Store user-added URLs
    let userUrls = [];
    
    // Initially hide the metrics and URL sections, show the configuration section
    metricsSection.classList.add('hidden');
    urlConfigSection.classList.add('hidden');
    
    // Update diagnostics title
    if (diagnosticsTitle) {
        diagnosticsTitle.textContent = "Detailed Diagnostics";
    }
    
    // Make sure revenue note is visible
    if (revImpactNote) {
        revImpactNote.classList.remove('hidden');
    }
    
    // Function to create a new URL input group
    function createUrlInput() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'url-input-group';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'url-input';
        input.placeholder = 'https://example.com/page';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-url-btn';
        removeBtn.textContent = 'Remove';
        
        // Event listener for remove button
        removeBtn.addEventListener('click', () => {
            inputGroup.remove();
            
            // If there's only one input left, hide the remove button
            const inputGroups = document.querySelectorAll('.url-input-group');
            if (inputGroups.length === 1) {
                inputGroups[0].querySelector('.remove-url-btn').style.display = 'none';
            }
        });
        
        inputGroup.appendChild(input);
        inputGroup.appendChild(removeBtn);
        
        return inputGroup;
    }
    
    // Add URL button event listener
    addUrlButton.addEventListener('click', () => {
        const newInputGroup = createUrlInput();
        urlInputsContainer.appendChild(newInputGroup);
        
        // Show all remove buttons when there's more than one input
        const removeButtons = document.querySelectorAll('.remove-url-btn');
        removeButtons.forEach(btn => {
            btn.style.display = 'block';
        });
    });
    
    // See Fitness Functions button event listener
    seeFunctionButton.addEventListener('click', () => {
        // Collect URLs from inputs
        userUrls = [];
        const urlInputs = document.querySelectorAll('.url-input');
        urlInputs.forEach(input => {
            if (input.value.trim()) {
                userUrls.push(input.value.trim());
            }
        });
        
        // If no URLs were provided, add a default one
        if (userUrls.length === 0) {
            userUrls.push('https://example.com/page');
        }
        
        // Hide URL config section
        urlConfigSection.classList.add('hidden');
        
        // Show metrics section
        metricsSection.classList.remove('hidden');
        
        // Update the URLs in the sampleUrls object
        if (userUrls.length > 0) {
            sampleUrls[selectedBusinessMetric] = userUrls.map(url => ({
                url: url,
                performance: "Analyzing...",
                issue: "Under analysis"
            }));
            
                                // Generate URL-specific metrics data that averages to the parent metrics
                                const metrics = businessMetrics[selectedBusinessMetric].functions;
                                metrics.forEach(metric => {
                                    // Reset URL specific values whenever we regenerate
                                    metric.urlSpecificValues = [];
                                    
                                    const sixMonthsAgoBase = parseFloat(metric.values.sixMonthsAgo.split(' ')[0]);
                                    const threeMonthsAgoBase = parseFloat(metric.values.threeMonthsAgo.split(' ')[0]);
                                    const currentBase = parseFloat(metric.values.current.split(' ')[0]);
                                    const unit = metric.values.sixMonthsAgo.includes(' ') ? 
                                        metric.values.sixMonthsAgo.split(' ')[1] : '';
                
                // Generate random variations that average out to the parent value
                const numUrls = userUrls.length;
                
                let sixMonthsAgoSum = 0;
                let threeMonthsAgoSum = 0;
                let currentSum = 0;
                
                // Generate random variations for all URLs except the last one
                for (let i = 0; i < numUrls - 1; i++) {
                    // Variation between -10% and +10% of base value
                    const variation = Math.random() * 0.2 - 0.1;
                    
                    const sixMonthsAgo = Math.max(0, sixMonthsAgoBase * (1 + variation)).toFixed(1);
                    const threeMonthsAgo = Math.max(0, threeMonthsAgoBase * (1 + variation)).toFixed(1);
                    const current = Math.max(0, currentBase * (1 + variation)).toFixed(1);
                    
                    sixMonthsAgoSum += parseFloat(sixMonthsAgo);
                    threeMonthsAgoSum += parseFloat(threeMonthsAgo);
                    currentSum += parseFloat(current);
                    
                    metric.urlSpecificValues.push({
                        url: userUrls[i],
                        values: {
                            sixMonthsAgo: `${sixMonthsAgo} ${unit}`,
                            threeMonthsAgo: `${threeMonthsAgo} ${unit}`,
                            current: `${current} ${unit}`
                        }
                    });
                }
                
                // Calculate the last URL's values to ensure the average matches the parent value
                const lastSixMonths = Math.max(0, (sixMonthsAgoBase * numUrls - sixMonthsAgoSum)).toFixed(1);
                const lastThreeMonths = Math.max(0, (threeMonthsAgoBase * numUrls - threeMonthsAgoSum)).toFixed(1);
                const lastCurrent = Math.max(0, (currentBase * numUrls - currentSum)).toFixed(1);
                
                metric.urlSpecificValues.push({
                    url: userUrls[numUrls - 1],
                    values: {
                        sixMonthsAgo: `${lastSixMonths} ${unit}`,
                        threeMonthsAgo: `${lastThreeMonths} ${unit}`,
                        current: `${lastCurrent} ${unit}`
                    }
                });
            });
        }
        
        // Display the fitness functions
        displayFitnessFunctions(selectedBusinessMetric);
    });
    
    // Create modal for displaying URLs
    function createUrlModal(metricKey) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Get URLs for the current metric
        const urls = sampleUrls[selectedBusinessMetric] || [];
        
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Create modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalTitle = document.createElement('h3');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = `URLs Included in ${businessMetrics[selectedBusinessMetric].name} Score`;
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => modalOverlay.remove());
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Create URL list
        const urlList = document.createElement('ul');
        urlList.className = 'url-list';
        
        if (urls.length === 0) {
            const noData = document.createElement('p');
            noData.textContent = 'No URL data available for this metric.';
            modal.appendChild(modalHeader);
            modal.appendChild(noData);
        } else {
            urls.forEach(urlData => {
                const listItem = document.createElement('li');
                
                // Just show the URL without issue or performance data
                const urlLink = document.createElement('a');
                urlLink.href = urlData.url;
                urlLink.target = '_blank';
                urlLink.textContent = urlData.url;
                
                listItem.appendChild(urlLink);
                
                urlList.appendChild(listItem);
            });
            
            modal.appendChild(modalHeader);
            modal.appendChild(urlList);
        }
        
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }
    
    // Event listener for Show URLs button
    showUrlsButton.addEventListener('click', () => {
        if (selectedBusinessMetric) {
            createUrlModal(selectedBusinessMetric);
        } else {
            showNotification('Please select a business metric first');
        }
    });
    
    // Event listener for How Conductor Uses This button
    howConductorUsesButton.addEventListener('click', () => {
        diagramPage.classList.add('visible');
    });
    
    // Event listener for Close Diagram button
    closeDiagramButton.addEventListener('click', () => {
        diagramPage.classList.remove('visible');
    });
    
    // Close diagram when clicking Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && diagramPage.classList.contains('visible')) {
            diagramPage.classList.remove('visible');
        }
    });

    // Event listener for reconfigure button
    configureNewButton.addEventListener('click', () => {
        // Hide metrics section and show configuration section
        metricsSection.classList.add('hidden');
        configSection.classList.remove('hidden');
        urlConfigSection.classList.add('hidden');
        selectedBusinessMetric = null;
    });

    // Event listener for metric selection in configuration
    metricCards.forEach(card => {
        card.addEventListener('click', () => {
            // Skip if the card is disabled
            if (card.classList.contains('disabled')) {
                showNotification('This business metric is coming soon');
                return;
            }
            
            // Remove selected class from all cards
            metricCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Get the selected metric
            const metricKey = card.getAttribute('data-metric');
            
            // Set the selected business metric
            selectedBusinessMetric = metricKey;
            
            // Update the business metric name display
            businessMetricName.textContent = businessMetrics[metricKey].name;
            
            // Hide configuration section
            configSection.classList.add('hidden');
            
            // Clear previous URL inputs and add a fresh one
            urlInputsContainer.innerHTML = '';
            const initialInput = createUrlInput();
            initialInput.querySelector('.remove-url-btn').style.display = 'none'; // Hide remove button for first input
            urlInputsContainer.appendChild(initialInput);
            
            // Show URL configuration section
            urlConfigSection.classList.remove('hidden');
        });
    });

    // Function to display fitness functions for a selected metric
    function displayFitnessFunctions(metricKey) {
        // Hide the select prompt
        selectPrompt.classList.add('hidden');
        
        // Hide the diagnostics section
        diagnosticsSection.classList.add('hidden');
        
        // Show the functions table
        functionsTable.classList.remove('hidden');
        
        // Clear the previous functions
        functionsList.innerHTML = '';
        
        // Get the functions for the selected metric
        const functions = businessMetrics[metricKey].functions;
        
        // Populate the table with functions
        functions.forEach(func => {
            const row = document.createElement('tr');
            row.className = 'parent-row';
            row.setAttribute('data-function-id', func.id);
            
            // Get trend classes for 3-month and current values - check if it's accessibility score
            const isAccessibility = func.id === 'accessibility_score';
            const trendClassThreeMonths = getTrendClass(func.values.threeMonthsAgo, func.values.sixMonthsAgo, isAccessibility);
            const trendClassCurrent = getTrendClass(func.values.current, func.values.threeMonthsAgo, isAccessibility);
            
            // Special styling for accessibility score - ONLY use downward arrows and red text
            if (func.id === 'accessibility_score') {
                // Create a custom CSS class to properly handle accessibility scores
                const accessibilityStyle = document.createElement('style');
                accessibilityStyle.textContent = `
                    .accessibility-trend-down .trend-indicator::after {
                        content: "▼" !important;
                        color: var(--trend-worse-color, #e74c3c) !important;
                    }
                    .accessibility-trend-down {
                        color: var(--trend-worse-color, #e74c3c) !important;
                    }
                `;
                document.head.appendChild(accessibilityStyle);
                
                row.innerHTML = `
                    <td>
                        <span class="expand-icon">+</span> ${func.name}
                    </td>
                    <td>${func.description}</td>
                    <td>
                        <span class="historical-value six-months-ago">
                            ${func.values.sixMonthsAgo}
                        </span>
                    </td>
                    <td>
                        <span class="historical-value three-months-ago accessibility-trend-down">
                            ${func.values.threeMonthsAgo}
                            <span class="trend-indicator"></span>
                        </span>
                    </td>
                    <td>
                        <span class="historical-value current accessibility-trend-down">
                            ${func.values.current}
                            <span class="trend-indicator"></span>
                        </span>
                    </td>
                    <td class="rev-impact">${func.revImpact}</td>
                `;
            } else {
                row.innerHTML = `
                    <td>
                        <span class="expand-icon">+</span> ${func.name}
                    </td>
                    <td>${func.description}</td>
                    <td>
                        <span class="historical-value six-months-ago">
                            ${func.values.sixMonthsAgo}
                        </span>
                    </td>
                    <td>
                        <span class="historical-value three-months-ago ${trendClassThreeMonths}">
                            ${func.values.threeMonthsAgo}
                            <span class="trend-indicator"></span>
                        </span>
                    </td>
                    <td>
                        <span class="historical-value current ${trendClassCurrent}">
                            ${func.values.current}
                            <span class="trend-indicator"></span>
                        </span>
                    </td>
                    <td class="rev-impact">${func.revImpact}</td>
                `;
            }
            
            functionsList.appendChild(row);
            
                // Add click event for parent row to expand/collapse
                row.addEventListener('click', (e) => {
                    // Don't trigger when clicking on specific elements
                    if (e.target.tagName === 'BUTTON') {
                        return;
                    }
                    
                    // Remove the immediate diagnostics display when clicking the main accessibility row
                    // Instead, we'll only show diagnostics when clicking on URL subrows
                    
                    const expandIcon = row.querySelector('.expand-icon');
                
                // Toggle expanded state
                if (row.classList.contains('expanded')) {
                    // Collapse
                    row.classList.remove('expanded');
                    expandIcon.textContent = '+';
                    
                    // Remove all URL rows
                    const urlRows = document.querySelectorAll(`.url-row[data-parent="${func.id}"]`);
                    urlRows.forEach(urlRow => urlRow.remove());
                    
                    // Hide diagnostics section if it's for this function
                    if (activeRowId === func.id) {
                        diagnosticsSection.classList.add('hidden');
                        activeRowId = null;
                        activeUrlIndex = null;
                    }
                } else {
                    // Expand
                    row.classList.add('expanded');
                    expandIcon.textContent = '-';
                    
                    // If this is the accessibility score, always create sample URL rows
                    if (func.id === 'accessibility_score') {
                        // Create sample URL entries for accessibility score
                        func.urlSpecificValues = [
                            {
                                url: 'https://example.com/homepage',
                                values: {
                                    sixMonthsAgo: '76',
                                    threeMonthsAgo: '70',
                                    current: '63'
                                }
                            },
                            {
                                url: 'https://example.com/product',
                                values: {
                                    sixMonthsAgo: '80',
                                    threeMonthsAgo: '74',
                                    current: '67'
                                }
                            }
                        ];
                        
                        // If user added URLs, replace our samples
                        if (userUrls && userUrls.length > 0) {
                            func.urlSpecificValues = userUrls.map(url => ({
                                url: url,
                                values: {
                                    sixMonthsAgo: Math.floor(75 + Math.random() * 10).toString(),
                                    threeMonthsAgo: Math.floor(68 + Math.random() * 10).toString(),
                                    current: Math.floor(60 + Math.random() * 10).toString()
                                }
                            }));
                        }
                    }
                    
                    // Add URL-specific rows if available
                    if (func.urlSpecificValues && func.urlSpecificValues.length > 0) {
                        func.urlSpecificValues.forEach((urlData, index) => {
                            const urlRow = document.createElement('tr');
                            urlRow.className = 'url-row';
                            urlRow.setAttribute('data-parent', func.id);
                            urlRow.setAttribute('data-url-index', index);
                            
                            const shortenedUrl = urlData.url.length > 40 ? 
                                urlData.url.substring(0, 37) + '...' : 
                                urlData.url;
                            
                            // For accessibility score URL rows, ONLY use downward arrows and red text
                            if (func.id === 'accessibility_score') {
                                // Custom style for accessibility URL rows
                                const accessibilityUrlStyle = document.createElement('style');
                                accessibilityUrlStyle.textContent = `
                                    .accessibility-url-value {
                                        color: var(--trend-worse-color, #e74c3c) !important;
                                    }
                                    .accessibility-url-value .trend-indicator::after {
                                        content: "▼" !important;
                                        color: var(--trend-worse-color, #e74c3c) !important;
                                    }
                                `;
                                document.head.appendChild(accessibilityUrlStyle);
                                
                                urlRow.innerHTML = `
                                    <td class="url-cell">${shortenedUrl}</td>
                                    <td></td>
                                    <td>
                                        <span class="historical-value six-months-ago">
                                            ${urlData.values.sixMonthsAgo}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="historical-value three-months-ago accessibility-url-value">
                                            ${urlData.values.threeMonthsAgo}
                                            <span class="trend-indicator"></span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="historical-value current accessibility-url-value">
                                            ${urlData.values.current}
                                            <span class="trend-indicator"></span>
                                        </span>
                                    </td>
                                    <td></td>
                                `;
                            } else {
                                // Get trend classes for non-accessibility URL-specific values
                                const urlTrendClassThreeMonths = getTrendClass(urlData.values.threeMonthsAgo, urlData.values.sixMonthsAgo);
                                const urlTrendClassCurrent = getTrendClass(urlData.values.current, urlData.values.threeMonthsAgo);
                                
                                urlRow.innerHTML = `
                                    <td class="url-cell">${shortenedUrl}</td>
                                    <td></td>
                                    <td>
                                        <span class="historical-value six-months-ago">
                                            ${urlData.values.sixMonthsAgo}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="historical-value three-months-ago ${urlTrendClassThreeMonths}">
                                            ${urlData.values.threeMonthsAgo}
                                            <span class="trend-indicator"></span>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="historical-value current ${urlTrendClassCurrent}">
                                            ${urlData.values.current}
                                            <span class="trend-indicator"></span>
                                        </span>
                                    </td>
                                    <td></td>
                                `;
                            }
                            
                            // Insert URL row after the parent row
                            row.after(urlRow);
                            
                            // Add click event for URL row to show diagnostics
                            urlRow.addEventListener('click', (e) => {
                                // Set active URL row
                                const allUrlRows = document.querySelectorAll('.url-row');
                                allUrlRows.forEach(r => r.classList.remove('active'));
                                urlRow.classList.add('active');
                                
                                // Show diagnostics section
                                diagnosticsSection.classList.remove('hidden');
                                activeRowId = func.id;
                                activeUrlIndex = index;
                                
                                // Update diagnostics content based on the function ID
                                const diagnosticsTableBody = document.getElementById('diagnosticsTableBody');
                                if (diagnosticsTableBody) {
                                    diagnosticsTableBody.innerHTML = '';
                                    
                                    if (func.id === 'accessibility_score') {
                                        // Add accessibility-specific diagnostics
                                        diagnosticsTableBody.innerHTML = `
                                            <tr>
                                                <td>Background and foreground colors do not have a sufficient contrast ratio.</td>
                                                <td>Found on ${Math.floor(Math.random() * 5) + 1} elements</td>
                                            </tr>
                                            <tr>
                                                <td>Heading elements are not in a sequentially-descending order</td>
                                                <td>Found on ${Math.floor(Math.random() * 3) + 1} elements</td>
                                            </tr>
                                        `;
                                    } else if (func.id === 'largest_contentful_paint') {
                                        // Keep existing diagnostics for LCP
                                        diagnosticsTableBody.innerHTML = `
                                            <tr>
                                                <td>Minimize main-thread work</td>
                                                <td>9.8s</td>
                                            </tr>
                                            <tr>
                                                <td>Reduce JavaScript execution time</td>
                                                <td>6.7s</td>
                                            </tr>
                                        `;
                                    } else if (func.id === 'speed_index') {
                                        // Add speed index diagnostics
                                        diagnosticsTableBody.innerHTML = `
                                            <tr>
                                                <td>Eliminate render-blocking resources</td>
                                                <td>Potential savings: 1.2s</td>
                                            </tr>
                                            <tr>
                                                <td>Defer offscreen images</td>
                                                <td>Potential savings: 0.8s</td>
                                            </tr>
                                        `;
                                    } else if (func.id === 'total_blocking_time') {
                                        // Add total blocking time diagnostics
                                        diagnosticsTableBody.innerHTML = `
                                            <tr>
                                                <td>Reduce third-party code impact</td>
                                                <td>Blocking time: 120ms</td>
                                            </tr>
                                            <tr>
                                                <td>Minimize critical request chains</td>
                                                <td>Chains found: 4</td>
                                            </tr>
                                        `;
                                    }
                                }
                            });
                        });
                    }
                }
            });
        });
    }

    // Function to show a notification
    function showNotification(message) {
        // Check if a notification container already exists
        let notificationContainer = document.querySelector('.notification-container');
        
        // If not, create one
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
    
        // Create the notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add it to the container
        notificationContainer.appendChild(notification);
        
        // Remove it after a delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
                
                // If no more notifications, remove the container
                if (notificationContainer.children.length === 0) {
                    notificationContainer.remove();
                }
            }, 500);
        }, 3000);
    }
});

// Add notification styles dynamically
const styleElement = document.createElement('style');
styleElement.textContent = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
    }
    
    .notification {
        background-color: var(--accent-color);
        color: var(--light-text);
        padding: 12px 20px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        animation: slide-in 0.3s ease-out forwards;
    }
    
    .notification.fade-out {
        animation: fade-out 0.5s ease-out forwards;
    }
    
    @keyframes slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    /* Expandable rows styles */
    .parent-row {
        cursor: pointer;
        font-weight: bold;
        background-color: var(--bg-color);
    }
    
    .parent-row:hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
    
    .parent-row.expanded {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    .expand-icon {
        display: inline-block;
        width: 20px;
        text-align: center;
        font-weight: bold;
    }
    
    .url-row {
        background-color: var(--card-bg);
        cursor: pointer;
    }
    
    .url-row:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }
    
    .url-row.active {
        background-color: rgba(204, 102, 51, 0.1);
    }
    
    .url-cell {
        padding-left: 30px;
        font-style: italic;
    }
`;
document.head.appendChild(styleElement);
