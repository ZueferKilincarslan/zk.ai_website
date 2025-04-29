import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TixaeContextType {
  isDemo: boolean;
}

const TixaeContext = createContext<TixaeContextType>({
  isDemo: false
});

export const useTixae = () => useContext(TixaeContext);

export const TixaeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/admin/dashboard');
  const isDemo = location.pathname.includes('/admin/demo');

  useEffect(() => {
    // Clean up any existing Tixae instances
    const existingScript = document.querySelector('script[data-tixae-script]');
    const existingContainer = document.getElementById('VG_OVERLAY_CONTAINER');
    
    if (existingScript) {
      existingScript.remove();
    }
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    // Create container if it doesn't exist
    let container = existingContainer;
    if (!container) {
      container = document.createElement('div');
      container.id = 'VG_OVERLAY_CONTAINER';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.width = 'auto';
      container.style.height = 'auto';
      container.style.zIndex = '2147483647'; // Maximum z-index value
      container.style.transform = 'translateZ(0)'; // Force GPU acceleration
      container.style.willChange = 'transform'; // Optimize for animations
      container.style.pointerEvents = 'none'; // Allow clicks to pass through container
      document.body.appendChild(container);
    }

    // Initialize appropriate bot based on route
    const script = document.createElement('script');
    script.setAttribute('data-tixae-script', '');
    script.textContent = `
      (function() {
        window.VG_CONFIG = {
          ID: "${isDashboard ? 'dldb6xcly75l06qq' : isDemo ? 'dldb6xcly75l06qq' : 'ux5puvqrx8jlan6n'}", // Different IDs for dashboard/demo/production
          region: 'eu',
          render: 'bottom-right',
          modalMode: ${isDemo},
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };

        // Create a style element for custom Tixae styles
        var style = document.createElement('style');
        style.textContent = \`
          .vg-widget-container {
            position: fixed !important;
            bottom: env(safe-area-inset-bottom, 16px) !important;
            right: env(safe-area-inset-right, 16px) !important;
            width: auto !important;
            height: auto !important;
            z-index: 2147483647 !important;
            transform: translateZ(0) !important;
            will-change: transform !important;
            pointer-events: auto !important;
          }
          .vg-widget-button {
            width: 48px !important;
            height: 48px !important;
            margin: 0 !important;
            transform: translateZ(0) !important;
            will-change: transform !important;
            transition: transform 0.2s ease-in-out !important;
          }
          .vg-widget-button:hover {
            transform: scale(1.1) translateZ(0) !important;
          }
          @media (max-width: 640px) {
            .vg-widget-container {
              bottom: max(env(safe-area-inset-bottom, 16px), 16px) !important;
              right: max(env(safe-area-inset-right, 16px), 16px) !important;
            }
          }
        \`;
        document.head.appendChild(style);

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        document.body.appendChild(VG_SCRIPT);
      })()
    `;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Don't remove the container on cleanup as it's reused
    };
  }, [isDashboard, isDemo]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};