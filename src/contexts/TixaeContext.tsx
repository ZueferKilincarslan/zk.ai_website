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
  const isDemo1 = location.pathname === '/admin/demo/1';
  const isDemo = location.pathname.includes('/admin/demo');

  useEffect(() => {
    // Comprehensive cleanup function to remove ALL existing bots
    const destroyAllBots = () => {
      console.log('🧹 Destroying all existing bots...');
      
      // 1. Remove all bot scripts
      const scripts = document.querySelectorAll('script[data-voiceflow-script], script[data-convocore-script]');
      scripts.forEach(script => {
        console.log('Removing script:', script);
        script.remove();
      });

      // 2. Clean global variables
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
        console.log('Deleted VG_CONFIG');
      }
      if (window.voiceflow) {
        delete window.voiceflow;
        console.log('Deleted voiceflow');
      }

      // 3. Remove VG container
      const vgContainer = document.getElementById('VG_OVERLAY_CONTAINER');
      if (vgContainer) {
        vgContainer.remove();
        console.log('Removed VG_OVERLAY_CONTAINER');
      }

      // 4. Remove all voiceflow elements
      const voiceflowElements = document.querySelectorAll(
        '[data-voiceflow], [class*="voiceflow"], [id*="voiceflow"], [class*="vf-"], [data-vf], iframe[src*="voiceflow"]'
      );
      voiceflowElements.forEach(el => {
        console.log('Removing voiceflow element:', el);
        el.remove();
      });

      // 5. Remove all convocore/VG elements
      const convocoreElements = document.querySelectorAll(
        '[data-convocore], [class*="convocore"], [class*="vg-"], [id*="vg"], [id*="VG"], iframe[src*="bunny-cdn"]'
      );
      convocoreElements.forEach(el => {
        console.log('Removing convocore element:', el);
        el.remove();
      });

      // 6. Remove any chat widgets or floating elements
      const chatElements = document.querySelectorAll(
        '[class*="chat-widget"], [class*="chatbot"], [id*="chat"], [class*="widget"], div[style*="position: fixed"]'
      );
      chatElements.forEach(el => {
        const style = el.getAttribute('style') || '';
        const className = el.className || '';
        const id = el.id || '';
        
        if (style.includes('position: fixed') || 
            className.includes('chat') || 
            className.includes('widget') || 
            id.includes('chat') ||
            id.includes('widget')) {
          console.log('Removing chat element:', el);
          el.remove();
        }
      });

      console.log('✅ All bots destroyed');
    };

    // Initial cleanup
    destroyAllBots();

    // Wait for cleanup, then initialize the correct bot
    const initTimer = setTimeout(() => {
      if (isDemo1) {
        console.log('🤖 Demo 1: Initializing EXCLUSIVELY Voiceflow bot');
        
        // Create and add Voiceflow script for Demo 1 ONLY
        const voiceflowScript = document.createElement('script');
        voiceflowScript.setAttribute('data-voiceflow-script', 'demo1-exclusive');
        voiceflowScript.type = 'text/javascript';
        voiceflowScript.innerHTML = `
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
        document.head.appendChild(voiceflowScript);
        console.log('✅ Voiceflow bot script added to Demo 1');
        
      } else {
        console.log('🤖 Other pages: Initializing EXCLUSIVELY TixaeAgent bot');
        
        // Create VG container for other pages (NOT Demo 1)
        const container = document.createElement('div');
        container.id = 'VG_OVERLAY_CONTAINER';
        container.style.width = '0';
        container.style.height = '0';
        document.body.appendChild(container);

        // Create and add TixaeAgent script for all pages EXCEPT Demo 1
        const tixaeScript = document.createElement('script');
        tixaeScript.setAttribute('data-convocore-script', 'main');
        tixaeScript.defer = true;
        tixaeScript.innerHTML = `
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
        document.head.appendChild(tixaeScript);
        console.log('✅ TixaeAgent bot script added to non-Demo1 page');
      }
    }, 300);

    // Cleanup function when component unmounts or route changes
    return () => {
      clearTimeout(initTimer);
      destroyAllBots();
    };
  }, [location.pathname, isDemo1, isDemo]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};