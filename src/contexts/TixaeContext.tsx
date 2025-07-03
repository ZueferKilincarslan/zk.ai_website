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
  const isDemo1 = location.pathname === '/admin/demo/1';

  useEffect(() => {
    // AGGRESSIVE cleanup of any existing chatbot instances
    const cleanupAllBots = () => {
      // Remove all existing scripts
      const existingConvocoreScript = document.querySelector('script[data-convocore-script]');
      const existingVoiceflowScript = document.querySelector('script[data-voiceflow-script]');
      const existingContainer = document.getElementById('VG_OVERLAY_CONTAINER');
      
      if (existingConvocoreScript) {
        existingConvocoreScript.remove();
      }
      if (existingVoiceflowScript) {
        existingVoiceflowScript.remove();
      }
      
      // Clean up global variables
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
      }
      if (window.voiceflow) {
        delete window.voiceflow;
      }

      // Clean up any existing widgets in the DOM
      if (existingContainer) {
        existingContainer.innerHTML = '';
        existingContainer.style.display = 'none';
      }

      // Remove any dynamically created Voiceflow elements
      const voiceflowElements = document.querySelectorAll('[data-voiceflow], [class*="voiceflow"], [id*="voiceflow"]');
      voiceflowElements.forEach(el => el.remove());

      // Remove any dynamically created CONVOCORE elements
      const convocoreElements = document.querySelectorAll('[data-convocore], [class*="convocore"], [class*="vg-"]');
      convocoreElements.forEach(el => el.remove());
    };

    // Start with complete cleanup
    cleanupAllBots();

    // Wait a bit for cleanup to complete, then initialize the correct bot
    setTimeout(() => {
      if (isDemo1) {
        console.log('Loading ONLY Voiceflow for Demo 1');
        
        // Initialize Voiceflow chatbot for Demo 1 page ONLY
        const script = document.createElement('script');
        script.setAttribute('data-voiceflow-script', '');
        script.type = 'text/javascript';
        script.textContent = `
          (function(d, t) {
            var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
            v.onload = function() {
              window.voiceflow.chat.load({
                verify: { projectID: '67d335f7d457415e2f50d2df' },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production',
                voice: {
                  url: "https://runtime-api.voiceflow.com"
                }
              });
            }
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
            v.type = "text/javascript"; 
            s.parentNode.insertBefore(v, s);
          })(document, 'script');
        `;
        document.body.appendChild(script);
      } else {
        console.log('Loading ONLY CONVOCORE for other pages');
        
        // Create CONVOCORE container for ALL OTHER pages (excluding Demo 1)
        let container = document.getElementById('VG_OVERLAY_CONTAINER');
        if (!container) {
          container = document.createElement('div');
          container.id = 'VG_OVERLAY_CONTAINER';
          container.style.width = '0';
          container.style.height = '0';
          document.body.appendChild(container);
        }
        container.style.display = 'block';

        // Initialize CONVOCORE chatbot for ALL OTHER pages (excluding Demo 1)
        const script = document.createElement('script');
        script.setAttribute('data-convocore-script', '');
        script.defer = true;
        script.textContent = `
          (function() {
            window.VG_CONFIG = {
              ID: "ux5puvqrx8jlan6n", // Main agent ID for production
              region: 'eu',
              render: 'bottom-right',
              ${isDemo && !isDemo1 ? 'modalMode: true,' : ''}
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
      }
    }, 100);

    // Cleanup function
    return () => {
      cleanupAllBots();
    };
  }, [isDashboard, isDemo, isDemo1]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};