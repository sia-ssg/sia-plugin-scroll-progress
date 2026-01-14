/**
 * Scroll Progress Plugin for Sia
 * 
 * Adds a scroll progress bar at the top of the page that shows
 * the user's scroll progress through the content.
 */

export default {
  name: 'sia-plugin-scroll-progress',
  version: '1.0.0',
  
  // Configuration schema
  configSchema: {
    enabled: { type: 'boolean', default: true },
    height: { type: 'string', default: '4px' },
    color: { type: 'string', default: '#007bff' },
    position: { type: 'string', default: 'top' }, // 'top' or 'bottom'
    zIndex: { type: 'number', default: 9999 }
  },
  
  hooks: {
    /**
     * Transform HTML after markdown parsing to inject scroll progress bar
     */
    afterMarkdown: (html, context, api) => {
      const pluginConfig = context.config.plugins?.config?.['sia-plugin-scroll-progress'] || {};

      // Skip if disabled
      if (pluginConfig.enabled === false) {
        return html;
      }
      
      // Get configuration values with defaults
      const height = pluginConfig.height || '4px';
      const color = pluginConfig.color || '#007bff';
      const position = pluginConfig.position || 'top';
      const zIndex = pluginConfig.zIndex || 9999;
      
      // Generate unique ID for this instance
      const progressBarId = `sia-scroll-progress-${Math.random().toString(36).substr(2, 9)}`;
      
      // CSS styles for the progress bar
      const styles = `
        <style id="${progressBarId}-styles">
          #${progressBarId} {
            position: fixed;
            ${position === 'top' ? 'top: 0;' : 'bottom: 0;'}
            left: 0;
            width: 0%;
            height: ${height};
            background-color: ${color};
            z-index: ${zIndex};
            transition: width 0.1s ease-out;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        </style>
      `;
      
      // HTML for the progress bar element
      const progressBar = `<div id="${progressBarId}"></div>`;
      
      // JavaScript to track scroll progress
      const script = `
        <script>
          (function() {
            const progressBar = document.getElementById('${progressBarId}');
            if (!progressBar) return;
            
            function updateProgress() {
              const windowHeight = window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const scrollableHeight = documentHeight - windowHeight;
              const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
              
              progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
            }
            
            // Update on scroll
            let ticking = false;
            function onScroll() {
              if (!ticking) {
                window.requestAnimationFrame(function() {
                  updateProgress();
                  ticking = false;
                });
                ticking = true;
              }
            }
            
            // Initial update
            updateProgress();
            
            // Listen to scroll events
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', updateProgress, { passive: true });
            
            // Update on content load (for dynamic content)
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', updateProgress);
            }
          })();
        </script>
      `;
      
      // Inject styles in the head, progress bar after body tag, and script before closing body
      let modifiedHtml = html;
      
      // Add styles to head
      if (modifiedHtml.includes('</head>')) {
        modifiedHtml = modifiedHtml.replace('</head>', `${styles}</head>`);
      } else if (modifiedHtml.includes('<head>')) {
        modifiedHtml = modifiedHtml.replace('<head>', `<head>${styles}`);
      } else {
        // No head tag, add at the beginning
        modifiedHtml = styles + modifiedHtml;
      }
      
      // Add progress bar after body tag
      if (modifiedHtml.includes('<body')) {
        // Find the opening body tag and add progress bar right after it
        modifiedHtml = modifiedHtml.replace(/(<body[^>]*>)/, `$1${progressBar}`);
      } else {
        // No body tag, add at the beginning
        modifiedHtml = progressBar + modifiedHtml;
      }
      
      // Add script before closing body tag
      if (modifiedHtml.includes('</body>')) {
        modifiedHtml = modifiedHtml.replace('</body>', `${script}</body>`);
      } else {
        // No closing body tag, add at the end
        modifiedHtml = modifiedHtml + script;
      }
      
      return modifiedHtml;
    }
  }
};
