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
    // COMPLETE cleanup of any existing chatbot instances
    const completeCleanup = () => {
      // Remove all existing scripts
      const allScripts = document.querySelectorAll('script[data-convocore-script], script[data-voiceflow-script]');
      allScripts.forEach(script => script.remove());
      
      // Clean up global variables
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
      }
      if (window.voiceflow) {
        delete window.voiceflow;
      }

      // Remove VG_OVERLAY_CONTAINER completely
      const container = document.getElementById('VG_OVERLAY_CONTAINER');
      if (container) {
        container.remove();
      }

      // Remove any dynamically created elements by both bots
      const voiceflowElements = document.querySelectorAll('[data-voiceflow], [class*="voiceflow"], [id*="voiceflow"], [class*="vf-"]');
      voiceflowElements.forEach(el => el.remove());

      const convocoreElements = document.querySelectorAll('[data-convocore], [class*="convocore"], [class*="vg-"], [id*="vg"], [id*="VG"]');
      convocoreElements.forEach(el => el.remove());

      // Remove any floating chat widgets
      const chatWidgets = document.querySelectorAll('[class*="chat"], [class*="widget"], [class*="bot"]');
      chatWidgets.forEach(el => {
        if (el.id && (el.id.includes('vg') || el.id.includes('VG') || el.id.includes('voiceflow'))) {
          el.remove();
        }
      });
    };

    // Start with complete cleanup
    completeCleanup();

    // Wait longer for cleanup to complete, then initialize the correct bot
    setTimeout(() => {
      if (isDemo1) {
        console.log('Demo 1: Loading ONLY Voiceflow - NO TixaeAgent');
        
        // For Demo 1: ONLY Voiceflow, NO TixaeAgent
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
        console.log('Other pages: Loading ONLY TixaeAgent - NO Voiceflow');
        
        // For ALL OTHER pages: ONLY TixaeAgent, NO Voiceflow
        // Create CONVOCORE container
        const container = document.createElement('div');
        container.id = 'VG_OVERLAY_CONTAINER';
        container.style.width = '0';
        container.style.height = '0';
        document.body.appendChild(container);

        // Initialize CONVOCORE chatbot
        const script = document.createElement('script');
        script.setAttribute('data-convocore-script', '');
        script.defer = true;
        script.textContent = `
          (function() {
            window.VG_CONFIG = {
              ID: "ux5puvqrx8jlan6n",
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
    }, 200); // Increased timeout

    // Cleanup function
    return () => {
      completeCleanup();
    };
  }, [location.pathname]); // Changed dependency to pathname for more precise tracking

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};