/* ============================================================
   IMROVICH UI KIT · JS helpers
   Optional · тема, ripple, копирование
   ============================================================ */
(function(window){
  'use strict';

  const THEMES = {
    gold:{accent:'#E0A800',light:'#FFD24A',rgb:'224,168,0',rgbLight:'255,210,74',rgbDark:'139,105,20',border:'#5C4A1E',borderStrong:'#C99B26',glassTint:'28,20,8',bgDeep1:'#2a1e08',bgDeep2:'#1a1206',bgDeep3:'#0a0703',onAccent:'#1a1206'},
    rose:{accent:'#C2386A',light:'#FF7BA5',rgb:'194,56,106',rgbLight:'255,123,165',rgbDark:'122,31,67',border:'#5C1F33',borderStrong:'#C94A7A',glassTint:'28,10,18',bgDeep1:'#2a0e18',bgDeep2:'#1a060e',bgDeep3:'#0a0307',onAccent:'#1a060e'},
    violet:{accent:'#7C3AED',light:'#C4A3FF',rgb:'124,58,237',rgbLight:'196,163,255',rgbDark:'74,31,139',border:'#3A1F5C',borderStrong:'#9B6BC9',glassTint:'20,12,32',bgDeep1:'#1c0f2e',bgDeep2:'#0f061a',bgDeep3:'#050310',onAccent:'#0f061a'},
    emerald:{accent:'#059669',light:'#4ADEA9',rgb:'5,150,105',rgbLight:'74,222,169',rgbDark:'2,77,56',border:'#1E5C44',borderStrong:'#26A37A',glassTint:'8,28,20',bgDeep1:'#0a2418',bgDeep2:'#061410',bgDeep3:'#020a06',onAccent:'#061410'},
    sapphire:{accent:'#2563EB',light:'#7BAEFF',rgb:'37,99,235',rgbLight:'123,174,255',rgbDark:'18,59,139',border:'#1E3A5C',borderStrong:'#4A7AC9',glassTint:'10,18,32',bgDeep1:'#0e1830',bgDeep2:'#060f1e',bgDeep3:'#03070f',onAccent:'#060f1e'},
    ruby:{accent:'#DC2626',light:'#FF8080',rgb:'220,38,38',rgbLight:'255,128,128',rgbDark:'139,24,24',border:'#5C1E1E',borderStrong:'#C94A4A',glassTint:'28,10,10',bgDeep1:'#2a0e0e',bgDeep2:'#1a0606',bgDeep3:'#0a0303',onAccent:'#1a0606'},
    amber:{accent:'#EA580C',light:'#FFB266',rgb:'234,88,12',rgbLight:'255,178,102',rgbDark:'139,52,10',border:'#5C2E1E',borderStrong:'#C96A2E',glassTint:'30,18,8',bgDeep1:'#2a1508',bgDeep2:'#1a0d05',bgDeep3:'#0a0603',onAccent:'#1a0d05'},
    cyan:{accent:'#0891B2',light:'#5DE8FF',rgb:'8,145,178',rgbLight:'93,232,255',rgbDark:'4,90,112',border:'#1E4A5C',borderStrong:'#3A99B8',glassTint:'8,22,30',bgDeep1:'#0a1e2a',bgDeep2:'#061218',bgDeep3:'#02080a',onAccent:'#061218'},
    lavender:{accent:'#9333EA',light:'#D4B0FF',rgb:'147,51,234',rgbLight:'212,176,255',rgbDark:'90,31,139',border:'#3F1F5C',borderStrong:'#A66BC9',glassTint:'22,14,32',bgDeep1:'#1e1030',bgDeep2:'#10061a',bgDeep3:'#06030a',onAccent:'#10061a'},
    coral:{accent:'#F43F5E',light:'#FF8FA3',rgb:'244,63,94',rgbLight:'255,143,163',rgbDark:'139,30,54',border:'#5C1F2C',borderStrong:'#C94A66',glassTint:'30,12,18',bgDeep1:'#2a0f18',bgDeep2:'#1a060e',bgDeep3:'#0a0306',onAccent:'#1a060e'},
    mint:{accent:'#10B981',light:'#6EECBF',rgb:'16,185,129',rgbLight:'110,236,191',rgbDark:'7,105,78',border:'#1E5C44',borderStrong:'#2EB891',glassTint:'8,26,20',bgDeep1:'#0a241c',bgDeep2:'#061410',bgDeep3:'#020a08',onAccent:'#061410'},
    graphite:{accent:'#6B7280',light:'#B4BCC8',rgb:'107,114,128',rgbLight:'180,188,200',rgbDark:'46,51,60',border:'#3A3F47',borderStrong:'#8A93A0',glassTint:'20,22,26',bgDeep1:'#1c1e22',bgDeep2:'#0e1014',bgDeep3:'#050608',onAccent:'#0e1014'}
  };

  const STORAGE_KEY = 'imr_uikit_theme';
  const DEFAULT = 'gold';

  function applyTheme(id){
    const t = THEMES[id] || THEMES[DEFAULT];
    const root = document.documentElement;
    root.style.setProperty('--gold', t.light);
    root.style.setProperty('--amber', t.accent);
    root.style.setProperty('--accent-rgb', t.rgb);
    root.style.setProperty('--accent-light-rgb', t.rgbLight);
    root.style.setProperty('--accent-dark-rgb', t.rgbDark);
    root.style.setProperty('--glass-border', t.border);
    root.style.setProperty('--glass-border-strong', t.borderStrong);
    root.style.setProperty('--glass-tint', t.glassTint);
    root.style.setProperty('--bg-deep-1', t.bgDeep1);
    root.style.setProperty('--bg-deep-2', t.bgDeep2);
    root.style.setProperty('--bg-deep-3', t.bgDeep3);
    root.style.setProperty('--on-accent', t.onAccent);
    try { localStorage.setItem(STORAGE_KEY, id); } catch(e){}
    document.querySelectorAll('.swatch').forEach(s =>
      s.classList.toggle('active', s.dataset.theme === id)
    );
  }

  function getTheme(){
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT; }
    catch(e){ return DEFAULT; }
  }

  function setupRipple(){
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn,.top-nav-link,.tab,.settings-btn,.swatch');
      if(!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const circle = document.createElement('span');
      circle.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.25);pointer-events:none;transform:translate(-50%,-50%) scale(0);width:${size}px;height:${size}px;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;animation:ripple .6s ease-out`;
      if(getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      if(getComputedStyle(btn).overflow !== 'hidden') btn.style.overflow = 'hidden';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  }

  function toast(msg){
    const el = document.getElementById('toast');
    if(!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2500);
  }

  window.IMRKit = {
    themes: THEMES,
    applyTheme,
    getTheme,
    setupRipple,
    toast,
    init(){
      applyTheme(getTheme());
      setupRipple();
    }
  };
})(window);
