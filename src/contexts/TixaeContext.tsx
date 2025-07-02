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
    // Clean up any existing chatbot instances
    const existingScript = document.querySelector('script[data-convocore-script]');
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

    // Initialize CONVOCORE chatbot
    const script = document.createElement('script');
    script.setAttribute('data-convocore-script', '');
    script.defer = true;
    script.textContent = `
      (function() {
        window.VG_CONFIG = {
          ID: "ux5puvqrx8jlan6n", // Main agent ID for production
          region: 'eu',
          render: 'bottom-right',
          ${isDemo ? 'modalMode: true,' : ''}
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };

        var VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        document.body.appendChild(VG_SCRIPT);
      })()
    `;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Clean up the VG_CONFIG to prevent conflicts
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
      }
    };
  }, [isDashboard, isDemo]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};