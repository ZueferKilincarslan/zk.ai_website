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
      container.style.width = '0';
      container.style.height = '0';
      document.body.appendChild(container);
    }

    // Initialize appropriate bot based on route
    const script = document.createElement('script');
    script.setAttribute('data-tixae-script', '');
    script.textContent = `
      (function() {
        window.VG_CONFIG = {
          ID: "${isDemo ? 'dldb6xcly75l06qq' : 'ux5puvqrx8jlan6n'}", // Different IDs for demo/production
          region: 'eu',
          render: 'bottom-right',
          modalMode: ${isDemo},
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };
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
  }, [isDemo]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};