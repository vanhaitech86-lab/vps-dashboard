/**
 * Chart Configuration and Management
 */

window.ChartManager = {
    charts: {},

    init() {
        // Set global Chart.js defaults
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#6C757D';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(27, 42, 74, 0.9)';
        Chart.defaults.plugins.tooltip.padding = 10;
        Chart.defaults.plugins.tooltip.cornerRadius = 4;
    },

    createChart(canvasId, type, data, options = {}) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;
        
        // Destroy existing chart if it exists
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, {
            type: type,
            data: data,
            options: { ...defaultOptions, ...options }
        });
        
        return this.charts[canvasId];
    },
    
    updateChart(canvasId, data) {
        if(this.charts[canvasId]) {
            this.charts[canvasId].data = data;
            this.charts[canvasId].update();
        }
    }
};
