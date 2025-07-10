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
    console.log('🔄 TixaeProvider: Route changed to:', location.pathname);
    console.log('🔍 Is Demo 1:', isDemo1);

    // STEP 1: Complete cleanup of ALL existing bots
    const cleanupAllBots = () => {
      console.log('🧹 Starting complete bot cleanup...');
      
      // Remove all existing bot scripts
      const existingScripts = document.querySelectorAll(
        'script[data-voiceflow-script], script[data-tixae-script], script[src*="voiceflow"], script[src*="bunny-cdn"]'
      );
      existingScripts.forEach(script => {
        console.log('🗑️ Removing script:', script.getAttribute('src') || script.getAttribute('data-voiceflow-script') || script.getAttribute('data-tixae-script'));
        script.remove();
      });

      // Clean global variables
      if (window.voiceflow) {
        delete window.voiceflow;
        console.log('🗑️ Deleted window.voiceflow');
      }
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
        console.log('🗑️ Deleted window.VG_CONFIG');
      }

      // Remove all bot containers and widgets
      const botElements = document.querySelectorAll(
        '#VG_OVERLAY_CONTAINER, [id*="voiceflow"], [class*="voiceflow"], [class*="vf-"], [data-voiceflow], [data-vf], iframe[src*="voiceflow"], iframe[src*="bunny-cdn"], [class*="vg-"], [id*="vg"], [data-convocore]'
      );
      botElements.forEach(el => {
        console.log('🗑️ Removing bot element:', el.tagName, el.id || el.className);
        el.remove();
      });

      console.log('✅ Bot cleanup completed');
    };

    // STEP 2: Clean everything first
    cleanupAllBots();

    // STEP 3: Wait for cleanup, then initialize the correct bot
    const initTimer = setTimeout(() => {
      if (isDemo1) {
        console.log('🤖 Demo 1: Loading ONLY Voiceflow bot');
        
        // Create Voiceflow script with proper DOM injection
        const voiceflowScript = document.createElement('script');
        voiceflowScript.setAttribute('data-voiceflow-script', 'demo1-exclusive');
        voiceflowScript.type = 'text/javascript';
        voiceflowScript.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
        
        voiceflowScript.onload = function() {
          console.log('✅ Voiceflow script loaded, initializing chat...');
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.load({
              verify: { projectID: '67d335f7d457415e2f50d2df' },
              url: 'https://general-runtime.voiceflow.com',
              versionID: 'production',
              voice: {
                url: "https://runtime-api.voiceflow.com"
              }
            });
            console.log('✅ Voiceflow chat initialized for Demo 1');
          } else {
            console.error('❌ Voiceflow not available after script load');
          }
        };

        voiceflowScript.onerror = function() {
          console.error('❌ Failed to load Voiceflow script');
        };

        document.head.appendChild(voiceflowScript);
        console.log('📝 Voiceflow script added to Demo 1');
        
      } else {
        console.log('🤖 Other pages: Loading ONLY TixaeAgent bot');
        
        // Create VG container for TixaeAgent
        const container = document.createElement('div');
        container.id = 'VG_OVERLAY_CONTAINER';
        container.style.width = '0';
        container.style.height = '0';
        document.body.appendChild(container);

        // Set VG_CONFIG first
        window.VG_CONFIG = {
          ID: "ux5puvqrx8jlan6n",
          region: 'eu',
          render: 'bottom-right',
          ...(isDemo && !isDemo1 ? { modalMode: true } : {}),
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };

        // Create TixaeAgent script with proper DOM injection
        const tixaeScript = document.createElement('script');
        tixaeScript.setAttribute('data-tixae-script', 'main');
        tixaeScript.type = 'text/javascript';
        tixaeScript.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
        tixaeScript.defer = true;
        
        tixaeScript.onload = function() {
          console.log('✅ TixaeAgent script loaded successfully');
        };

        tixaeScript.onerror = function() {
          console.error('❌ Failed to load TixaeAgent script');
        };

        document.body.appendChild(tixaeScript);
        console.log('📝 TixaeAgent script added to non-Demo1 page');
      }
    }, 300); // Wait 300ms for complete cleanup

    // Cleanup function when component unmounts or route changes
    return () => {
      clearTimeout(initTimer);
      console.log('🔄 TixaeProvider cleanup on route change');
    };
  }, [location.pathname, isDemo1, isDemo]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};