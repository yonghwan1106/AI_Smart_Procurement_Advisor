// ========================================
// AI Smart Procurement - Module Loader Patch
// 5개 AI 모듈을 동적으로 로드하는 패치
// ========================================

(function() {
  console.log('🔧 AI 모듈 로더 패치 시작');
  
  // 로드할 AI 모듈 목록
  const modules = [
    'necessity-ai.js',
    'sharing-ai.js', 
    'timing-ai.js',
    'esg-ai.js',
    'expert-ai.js'
  ];
  
  // 순차적으로 모듈 로드
  let loadedCount = 0;
  
  function loadModule(moduleName) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `assets/js/modules/${moduleName}`;
      script.onload = () => {
        loadedCount++;
        console.log(`✅ ${moduleName} 로드 완료 (${loadedCount}/${modules.length})`);
        resolve();
      };
      script.onerror = () => {
        console.error(`❌ ${moduleName} 로드 실패`);
        reject(new Error(`Failed to load ${moduleName}`));
      };
      document.head.appendChild(script);
    });
  }
  
  // 모든 모듈 로드
  async function loadAllModules() {
    try {
      for (const module of modules) {
        await loadModule(module);
      }
      
      console.log('🎉 모든 AI 모듈 로드 완료!');
      
      // 모듈 로드 완료 이벤트 발생
      document.dispatchEvent(new CustomEvent('aiModulesLoaded', {
        detail: { loadedModules: modules }
      }));
      
    } catch (error) {
      console.error('💥 AI 모듈 로드 중 오류:', error);
    }
  }
  
  // DOM 준비되면 모듈 로드 시작
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllModules);
  } else {
    loadAllModules();
  }
  
})();
