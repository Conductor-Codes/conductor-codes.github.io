// Define the business metrics and their associated technical fitness functions
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

const businessMetrics = {
    conversion_rate: {
        name: "Conversion Rate",
        functions: [
            {
                id: "page_load_time",
                name: "Average Page Load time (LCP)",
                description: "Largest Contentful Paint - time to render the largest content element",
                currentValue: "2.8 seconds",
                target: "1.5",
                unit: "seconds",
                impactPercentage: 0.05 // 0.05% of revenue per second reduced
            },
            {
                id: "search_indexing",
                name: "Search Indexing Speed",
                description: "Time to index and return search results",
                currentValue: "450 ms",
                target: "200",
                unit: "ms",
                impactPercentage: 0.02 // 0.02% of revenue per 100ms reduced
            },
            {
                id: "image_load",
                name: "Image Load Time",
                description: "Average time to load product images",
                currentValue: "850 ms",
                target: "400",
                unit: "ms",
                impactPercentage: 0.03 // 0.03% of revenue per 100ms reduced
            },
            {
                id: "checkout_steps",
                name: "Checkout Process Steps",
                description: "Number of steps to complete checkout",
                currentValue: "5 steps",
                target: "3",
                unit: "steps",
                impactPercentage: 0.1 // 0.1% of revenue per step reduced
            }
        ]
    },
    page_views: {
        name: "Page Views",
        functions: [
            {
                id: "site_availability",
                name: "Site Availability",
                description: "Percentage of time the site is accessible",
                currentValue: "99.2%",
                target: "99.9",
                unit: "%",
                impactPercentage: 0.2 // 0.2% of revenue per 0.1% improvement
            },
            {
                id: "content_freshness",
                name: "Content Freshness",
                description: "Average age of dynamic content",
                currentValue: "48 hours",
                target: "24",
                unit: "hours",
                impactPercentage: 0.01 // 0.01% of revenue per hour reduced
            },
            {
                id: "mobile_responsiveness",
                name: "Mobile Responsiveness",
                description: "Mobile viewport compatibility score",
                currentValue: "85/100",
                target: "95",
                unit: "/100",
                impactPercentage: 0.04 // 0.04% of revenue per 5 points improvement
            }
        ]
    },
    bounce_rate: {
        name: "Bounce Rate",
        functions: [
            {
                id: "first_contentful_paint",
                name: "First Contentful Paint",
                description: "Time until first content is displayed",
                currentValue: "1.8 seconds",
                target: "1.0",
                unit: "seconds",
                impactPercentage: 0.06 // 0.06% of revenue per 0.1 second reduced
            },
            {
                id: "time_to_interactive",
                name: "Time to Interactive",
                description: "Time until page becomes fully interactive",
                currentValue: "3.5 seconds",
                target: "2.0",
                unit: "seconds",
                impactPercentage: 0.08 // 0.08% of revenue per 0.1 second reduced
            },
            {
                id: "error_rate",
                name: "JavaScript Error Rate",
                description: "Rate of JS errors per session",
                currentValue: "2.1%",
                target: "0.5",
                unit: "%",
                impactPercentage: 0.15 // 0.15% of revenue per 1% reduction
            },
            {
                id: "layout_shift",
                name: "Cumulative Layout Shift",
                description: "Score measuring visual stability",
                currentValue: "0.25",
                target: "0.1",
                unit: "",
                impactPercentage: 0.03 // 0.03% of revenue per 0.1 points reduced
            }
        ]
    }
};

// Function to calculate the financial impact of a fitness function
function calculateFinancialImpact(func) {
    // Get current and target values as numbers
    let currentNumeric, targetNumeric;
    
    // Extract numeric parts from values
    if (func.id === "page_load_time" || func.id === "promotion_load_time" || 
        func.id === "first_contentful_paint" || func.id === "time_to_interactive") {
        currentNumeric = parseFloat(func.currentValue.split(' ')[0]);
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "search_indexing" || func.id === "image_load") {
        currentNumeric = parseFloat(func.currentValue.split(' ')[0]);
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "site_availability" || func.id === "recommendation_relevance" || 
              func.id === "cross_sell_visibility" || func.id === "error_rate") {
        currentNumeric = parseFloat(func.currentValue.replace('%', ''));
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "mobile_responsiveness" || func.id === "pricing_display") {
        currentNumeric = parseFloat(func.currentValue.split('/')[0]);
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "checkout_steps") {
        currentNumeric = parseFloat(func.currentValue.split(' ')[0]);
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "content_freshness") {
        currentNumeric = parseFloat(func.currentValue.split(' ')[0]);
        targetNumeric = parseFloat(func.target);
    } else if (func.id === "layout_shift") {
        currentNumeric = parseFloat(func.currentValue);
        targetNumeric = parseFloat(func.target);
    }
    
    // Calculate impact based on improvement
    let impact = 0;
    
    // Different calculation methods based on the metric type
    if (func.id === "page_load_time" || func.id === "promotion_load_time") {
        // Impact per second reduced
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "search_indexing" || func.id === "image_load") {
        // Impact per 100ms reduced
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement / 100 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "checkout_steps") {
        // Impact per step reduced
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "site_availability") {
        // Impact per 0.1% improvement
        const improvement = Math.max(0, targetNumeric - currentNumeric);
        impact = improvement * 10 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "content_freshness") {
        // Impact per hour reduced
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "mobile_responsiveness" || func.id === "pricing_display") {
        // Impact per 5 points improvement
        const improvement = Math.max(0, targetNumeric - currentNumeric);
        impact = improvement / 5 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "recommendation_relevance" || func.id === "cross_sell_visibility") {
        // Impact per 5% improvement
        const improvement = Math.max(0, targetNumeric - currentNumeric);
        impact = improvement / 5 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "first_contentful_paint" || func.id === "time_to_interactive") {
        // Impact per 0.1 second reduced
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * 10 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "error_rate") {
        // Impact per 1% reduction
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * (func.impactPercentage / 100) * COMPANY_REVENUE;
    } else if (func.id === "layout_shift") {
        // Impact per 0.1 point reduction
        const improvement = Math.max(0, currentNumeric - targetNumeric);
        impact = improvement * 10 * (func.impactPercentage / 100) * COMPANY_REVENUE;
    }
    
    return Math.round(impact);
}

// Function to update the financial impact display
function updateFinancialImpact(func) {
    const impactCell = document.getElementById(`impact-${func.id}`);
    if (impactCell) {
        const impact = calculateFinancialImpact(func);
        impactCell.textContent = `$${impact.toLocaleString()}`;
        
        // Animate the impact change
        impactCell.classList.add('impact-updated');
        setTimeout(() => {
            impactCell.classList.remove('impact-updated');
        }, 1000);
    }
}

// DOM elements - Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const metricCards = document.querySelectorAll('.metric-card');
    const functionsList = document.getElementById('functionsList');
    const functionsTable = document.getElementById('functionsTable');
    const selectPrompt = document.querySelector('.select-prompt');
    const showUrlsButton = document.getElementById('showUrlsButton');
    const howConductorUsesButton = document.getElementById('howConductorUsesButton');
    const diagramPage = document.getElementById('diagramPage');
    const closeDiagramButton = document.getElementById('closeDiagramButton');
    
    // Keep track of the current selected metric
    let currentMetric = null;
    
    // Create modal for displaying URLs
    function createUrlModal(metricKey) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Get URLs for the current metric
        const urls = sampleUrls[metricKey] || [];
        
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
        modalTitle.textContent = `URLs Included in ${businessMetrics[metricKey].name} Score`;
        
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
                
                const urlInfo = document.createElement('div');
                urlInfo.className = 'url-info';
                
                const urlLink = document.createElement('a');
                urlLink.href = urlData.url;
                urlLink.target = '_blank';
                urlLink.textContent = urlData.url;
                
                const issueSpan = document.createElement('div');
                issueSpan.className = 'url-issue';
                issueSpan.textContent = urlData.issue ? `Issue: ${urlData.issue}` : 'No issues detected';
                
                urlInfo.appendChild(urlLink);
                urlInfo.appendChild(issueSpan);
                
                const performanceSpan = document.createElement('span');
                performanceSpan.className = 'url-performance';
                performanceSpan.textContent = urlData.performance;
                
                listItem.appendChild(urlInfo);
                listItem.appendChild(performanceSpan);
                
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
        if (currentMetric) {
            createUrlModal(currentMetric);
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

    // Event listener for metric selection
    metricCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            metricCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Get the selected metric
            const metricKey = card.getAttribute('data-metric');
            
            // Display the fitness functions for the selected metric
            displayFitnessFunctions(metricKey);
        });
    });

    // Function to display fitness functions for a selected metric
    function displayFitnessFunctions(metricKey) {
        // Update current metric
        currentMetric = metricKey;
        
        // Hide the select prompt
        selectPrompt.classList.add('hidden');
        
        // Show the functions table
        functionsTable.classList.remove('hidden');
        
        // Clear the previous functions
        functionsList.innerHTML = '';
        
        // Get the functions for the selected metric
        const functions = businessMetrics[metricKey].functions;
        
        // Populate the table with functions
        functions.forEach(func => {
            const row = document.createElement('tr');
            
            // Calculate initial financial impact
            const initialImpact = calculateFinancialImpact(func);
            
            row.innerHTML = `
                <td>${func.name}</td>
                <td>${func.description}</td>
                <td>${func.currentValue}</td>
                <td>
                    <div class="target-input-container">
                        <input 
                            type="text" 
                            id="target-${func.id}" 
                            value="${func.target}" 
                            data-original="${func.target}"
                            data-unit="${func.unit}"
                        />
                        <span class="unit-label">${func.unit}</span>
                    </div>
                </td>
                <td>
                    <button id="save-${func.id}" class="save-btn">Save</button>
                    <button id="reset-${func.id}" class="reset-btn" style="display: none;">Reset</button>
                </td>
                <td class="impact-cell" id="impact-${func.id}">$${initialImpact.toLocaleString()}</td>
            `;
            
            functionsList.appendChild(row);
            
            // Add event listeners for save and reset buttons after DOM is updated
            setTimeout(() => {
                const saveBtn = document.getElementById(`save-${func.id}`);
                const resetBtn = document.getElementById(`reset-${func.id}`);
                const targetInput = document.getElementById(`target-${func.id}`);
                
                if (saveBtn && resetBtn && targetInput) {
                    saveBtn.addEventListener('click', () => {
                        const newTarget = targetInput.value;
                        func.target = newTarget;
                        targetInput.setAttribute('data-original', newTarget);
                        saveBtn.style.display = 'none';
                        resetBtn.style.display = 'inline-block';
                        
                        // Update financial impact
                        updateFinancialImpact(func);
                        
                        // Show success notification
                        showNotification(`Target for ${func.name} updated to ${newTarget} ${func.unit}`);
                    });
                    
                    resetBtn.addEventListener('click', () => {
                        const originalTarget = targetInput.getAttribute('data-original');
                        targetInput.value = originalTarget;
                        resetBtn.style.display = 'none';
                        saveBtn.style.display = 'inline-block';
                    });
                    
                    // Add event listener for input change
                    targetInput.addEventListener('input', () => {
                        if (targetInput.value !== targetInput.getAttribute('data-original')) {
                            saveBtn.style.display = 'inline-block';
                            resetBtn.style.display = 'none';
                        } else {
                            saveBtn.style.display = 'none';
                            resetBtn.style.display = 'inline-block';
                        }
                        
                        // Update financial impact in real-time
                        const tempFunc = {...func, target: targetInput.value};
                        updateFinancialImpact(tempFunc);
                    });
                }
            }, 0);
        
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
`;
document.head.appendChild(styleElement);
