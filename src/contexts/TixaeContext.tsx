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

    // STEP 1: AGGRESSIVE CLEANUP - Remove ALL existing bots
    const performCompleteCleanup = () => {
      console.log('🧹 Starting aggressive cleanup of ALL bots...');
      
      // Remove ALL bot scripts
      const allBotScripts = document.querySelectorAll(
        'script[src*="voiceflow"], script[src*="bunny-cdn"], script[src*="vg_bundle"], script[data-voiceflow], script[data-tixae], script[data-vg]'
      );
      allBotScripts.forEach(script => {
        console.log('🗑️ Removing bot script:', script.getAttribute('src') || script.getAttribute('data-voiceflow') || script.getAttribute('data-tixae'));
        script.remove();
      });

      // Clean ALL global variables
      if (window.voiceflow) {
        delete window.voiceflow;
        console.log('🗑️ Deleted window.voiceflow');
      }
      if (window.VG_CONFIG) {
        delete window.VG_CONFIG;
        console.log('🗑️ Deleted window.VG_CONFIG');
      }

      // Remove ALL bot DOM elements
      const allBotElements = document.querySelectorAll(
        '#VG_OVERLAY_CONTAINER, [id*="voiceflow"], [class*="voiceflow"], [class*="vf-"], [data-voiceflow], [data-vf], iframe[src*="voiceflow"], iframe[src*="bunny-cdn"], [class*="vg-"], [id*="vg"], [data-convocore], [class*="widget"], [id*="widget"]'
      );
      allBotElements.forEach(el => {
        console.log('🗑️ Removing bot element:', el.tagName, el.id || el.className);
        el.remove();
      });

      console.log('✅ Complete bot cleanup finished');
    };

    // STEP 2: Perform cleanup immediately
    performCompleteCleanup();

    // STEP 3: Wait for cleanup, then initialize ONLY the correct bot
    const initTimer = setTimeout(() => {
      if (isDemo1) {
        console.log('🤖 Demo 1: Loading ONLY Voiceflow bot - NO TixaeAgent');
        
        // Create Voiceflow script with your exact configuration
        const voiceflowScript = document.createElement('script');
        voiceflowScript.setAttribute('data-voiceflow-demo1', 'exclusive');
        voiceflowScript.type = 'text/javascript';
        voiceflowScript.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
        
        voiceflowScript.onload = function() {
          console.log('✅ Voiceflow script loaded for Demo 1');
          if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.load({
              verify: { projectID: '67d335f7d457415e2f50d2df' },
              url: 'https://general-runtime.voiceflow.com',
              versionID: 'production',
              voice: {
                url: "https://runtime-api.voiceflow.com"
              }
            });
            console.log('✅ Voiceflow chat initialized EXCLUSIVELY for Demo 1');
          } else {
            console.error('❌ Voiceflow not available after script load');
          }
        };

        voiceflowScript.onerror = function() {
          console.error('❌ Failed to load Voiceflow script for Demo 1');
        };

        document.head.appendChild(voiceflowScript);
        console.log('📝 ONLY Voiceflow script added to Demo 1 - TixaeAgent BLOCKED');
        
      } else {
        console.log('🤖 Non-Demo1 pages: Loading ONLY TixaeAgent - NO Voiceflow');
        
        // Create VG container for TixaeAgent (ONLY for non-Demo1 pages)
        const container = document.createElement('div');
        container.id = 'VG_OVERLAY_CONTAINER';
        document.body.appendChild(container);

        // Set VG_CONFIG for TixaeAgent
        window.VG_CONFIG = {
          ID: "ux5puvqrx8jlan6n",
          region: 'eu',
          render: 'bottom-right',
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };

        // Create TixaeAgent script
        const tixaeScript = document.createElement('script');
        tixaeScript.setAttribute('data-tixae-main', 'exclusive');
        tixaeScript.type = 'text/javascript';
        tixaeScript.src = 'https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js';
        tixaeScript.defer = true;
        
        tixaeScript.onload = function() {
          console.log('✅ TixaeAgent script loaded for non-Demo1 page');
        };

        tixaeScript.onerror = function() {
          console.error('❌ Failed to load TixaeAgent script');
        };

        document.body.appendChild(tixaeScript);
        console.log('📝 ONLY TixaeAgent script added to non-Demo1 page - Voiceflow BLOCKED');
      }
    }, 400); // Increased timeout for thorough cleanup

    // Cleanup function when route changes
    return () => {
      clearTimeout(initTimer);
      console.log('🔄 TixaeProvider cleanup on route change');
    };
  }, [location.pathname, isDemo1]);

  return (
    <TixaeContext.Provider value={{ isDemo }}>
      {children}
    </TixaeContext.Provider>
  );
};