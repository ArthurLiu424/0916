/**
 * Reality Time Engine & Profile Dashboard
 * Precision live time chronometer, dynamic atmospheric greetings,
 * and persistent interactive profile customization.
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const hoursEl = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  const millisEl = document.getElementById('clock-millis');
  const ampmEl = document.getElementById('clock-ampm');
  const dateWeekdayEl = document.getElementById('date-weekday');
  const dateFullEl = document.getElementById('date-full');
  const greetingWrapper = document.getElementById('greeting-wrapper');
  const greetingTextEl = document.getElementById('greeting-text');
  const greetingIconEl = document.getElementById('greeting-icon');

  const dayProgressPct = document.getElementById('day-progress-pct');
  const dayProgressBar = document.getElementById('day-progress-bar');

  const metricOffset = document.getElementById('metric-offset');
  const metricEpoch = document.getElementById('metric-epoch');
  const metricDayOfYear = document.getElementById('metric-day-of-year');
  const metricWeek = document.getElementById('metric-week');
  const metricUptime = document.getElementById('metric-uptime');
  const metricYearPct = document.getElementById('metric-year-pct');

  const profileTzText = document.getElementById('profile-tz-text');

  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  const userBioEl = document.getElementById('user-bio');

  const formatToggleBtn = document.getElementById('format-toggle-btn');
  const formatToggleText = document.getElementById('format-toggle-text');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const btnCopyTime = document.getElementById('btn-copy-time');
  const btnToggleMillis = document.getElementById('btn-toggle-millis');
  const toggleMillisText = document.getElementById('toggle-millis-text');
  const btnResetProfile = document.getElementById('btn-reset-profile');

  const toastEl = document.getElementById('toast-msg');
  const toastTextEl = document.getElementById('toast-text');

  // --- State Configuration ---
  const state = {
    is24Hour: localStorage.getItem('reality_time_format') !== '12',
    showMillis: localStorage.getItem('reality_show_millis') !== 'false',
    theme: localStorage.getItem('reality_theme') || 'cyan',
    sessionStartTime: Date.now(),
    lastHour: -1
  };

  const DEFAULTS = {
    name: 'Alex Morgan',
    role: 'Software Architect & Creative Technologist',
    bio: 'Bridging real-world dimensions and computational realities. Designing high-performance agentic systems, real-time engines, and aesthetic user interfaces.'
  };

  // --- SVGs for Atmospheric Greetings ---
  const ICONS = {
    morning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/><circle cx="12" cy="12" r="4"/></svg>`,
    afternoon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    evening: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/></svg>`,
    night: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
  };

  // --- Helper Functions ---
  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function pad3(n) {
    if (n < 10) return '00' + n;
    if (n < 100) return '0' + n;
    return String(n);
  }

  function showToast(message) {
    toastTextEl.textContent = message;
    toastEl.classList.add('show');
    if (showToast.timeout) clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  function getTimezoneString() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
      return tz;
    } catch {
      return 'Local';
    }
  }

  function getUtcOffsetString(date) {
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMinutes);
    const hrs = Math.floor(absMin / 60);
    const mins = absMin % 60;
    return `UTC${sign}${pad2(hrs)}:${pad2(mins)}`;
  }

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
    const oneDay = 86400000;
    return Math.floor(diff / oneDay);
  }

  function getWeekOfYear(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // --- Greeting Engine ---
  function updateGreeting(hours) {
    if (hours === state.lastHour) return;
    state.lastHour = hours;

    let text = '';
    let icon = '';

    if (hours >= 5 && hours < 12) {
      text = 'Good Morning // Dawn of Creation';
      icon = ICONS.morning;
    } else if (hours >= 12 && hours < 17) {
      text = 'Good Afternoon // Peak Momentum';
      icon = ICONS.afternoon;
    } else if (hours >= 17 && hours < 21) {
      text = 'Good Evening // Twilight Reflections';
      icon = ICONS.evening;
    } else {
      text = 'Late Night // Midnight Immersion';
      icon = ICONS.night;
    }

    greetingTextEl.textContent = text;
    greetingIconEl.innerHTML = icon;
  }

  // --- Reality Time Update Loop ---
  let lastSecondUpdate = 0;
  function updateClock() {
    const now = new Date();
    const nowTs = now.getTime();

    // High frequency values
    const rawHours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const millis = now.getMilliseconds();

    // 12h vs 24h calculation
    let displayHours = rawHours;
    let ampmText = '';

    if (!state.is24Hour) {
      ampmText = rawHours >= 12 ? 'PM' : 'AM';
      displayHours = rawHours % 12 || 12;
      ampmEl.style.display = 'inline-block';
      ampmEl.textContent = ampmText;
    } else {
      ampmEl.style.display = 'none';
    }

    hoursEl.textContent = pad2(displayHours);
    minutesEl.textContent = pad2(minutes);
    secondsEl.textContent = pad2(seconds);

    if (state.showMillis) {
      millisEl.textContent = '.' + pad3(millis);
      millisEl.style.display = 'inline-block';
    } else {
      millisEl.style.display = 'none';
    }

    // Dynamic greeting
    updateGreeting(rawHours);

    // Calculate Day Progress (Elapsed since midnight)
    const msSinceMidnight = (rawHours * 3600 + minutes * 60 + seconds) * 1000 + millis;
    const dayRatio = msSinceMidnight / 86400000;
    const dayPercent = (dayRatio * 100).toFixed(2);
    dayProgressPct.textContent = `${dayPercent}%`;
    dayProgressBar.style.width = `${dayPercent}%`;

    // Epoch timestamp
    metricEpoch.textContent = Math.floor(nowTs / 1000);

    // Update slightly lower frequency metrics (every 1 second)
    if (nowTs - lastSecondUpdate >= 1000) {
      lastSecondUpdate = nowTs;

      // Full Date strings
      const weekdayStr = now.toLocaleDateString(undefined, { weekday: 'long' });
      const fullDateStr = now.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      dateWeekdayEl.textContent = weekdayStr;
      dateFullEl.textContent = fullDateStr;

      // Day and Week of Year
      const doy = getDayOfYear(now);
      const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365;
      metricDayOfYear.textContent = `Day ${pad3(doy)} / ${totalDays}`;

      const weekNum = getWeekOfYear(now);
      metricWeek.textContent = `Week ${pad2(weekNum)}`;

      const yearPct = ((doy / totalDays) * 100).toFixed(1);
      metricYearPct.textContent = `${yearPct}% of ${now.getFullYear()}`;

      // Session Uptime
      const uptimeMs = nowTs - state.sessionStartTime;
      const upSec = Math.floor((uptimeMs / 1000) % 60);
      const upMin = Math.floor((uptimeMs / 60000) % 60);
      const upHr = Math.floor(uptimeMs / 3600000);
      metricUptime.textContent = `${pad2(upHr)}:${pad2(upMin)}:${pad2(upSec)}`;
    }

    // Keep RAF running smoothly
    requestAnimationFrame(updateClock);
  }

  // --- Initial Setup of Static / Slow Data ---
  function setupStaticMetrics() {
    const now = new Date();
    const tz = getTimezoneString();
    const offset = getUtcOffsetString(now);

    profileTzText.textContent = tz;
    metricOffset.textContent = offset;
  }

  // --- Profile Inline Edit Handlers ---
  function setupProfileEditing() {
    // Load persisted values
    const savedName = localStorage.getItem('reality_user_name');
    const savedRole = localStorage.getItem('reality_user_role');
    const savedBio = localStorage.getItem('reality_user_bio');

    if (savedName) userNameEl.textContent = savedName;
    if (savedRole) userRoleEl.textContent = savedRole;
    if (savedBio) userBioEl.textContent = savedBio;

    const editableElements = [
      { el: userNameEl, key: 'reality_user_name', label: 'Name' },
      { el: userRoleEl, key: 'reality_user_role', label: 'Title' },
      { el: userBioEl, key: 'reality_user_bio', label: 'Bio' }
    ];

    editableElements.forEach(({ el, key, label }) => {
      // Save on blur
      el.addEventListener('blur', () => {
        const text = el.textContent.trim();
        if (text) {
          localStorage.setItem(key, text);
          showToast(`${label} updated & saved`);
        }
      });

      // Prevent multiline for single line elements on Enter key
      if (el !== userBioEl) {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            el.blur();
          }
        });
      }
    });

    // Reset profile button
    btnResetProfile.addEventListener('click', () => {
      userNameEl.textContent = DEFAULTS.name;
      userRoleEl.textContent = DEFAULTS.role;
      userBioEl.textContent = DEFAULTS.bio;

      localStorage.removeItem('reality_user_name');
      localStorage.removeItem('reality_user_role');
      localStorage.removeItem('reality_user_bio');

      showToast('Profile reset to default');
    });
  }

  // --- Theme Controller ---
  function setupThemes() {
    const themeDots = document.querySelectorAll('.theme-dot');

    function applyTheme(themeName) {
      state.theme = themeName;
      if (themeName === 'cyan') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', themeName);
      }
      localStorage.setItem('reality_theme', themeName);

      themeDots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-theme') === themeName);
      });
    }

    themeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const selected = dot.getAttribute('data-theme');
        applyTheme(selected);
        showToast(`Theme switched to ${selected.toUpperCase()}`);
      });
    });

    applyTheme(state.theme);
  }

  // --- Controls & Utility Actions ---
  function setupControls() {
    // 12H / 24H Toggle
    function updateFormatBtn() {
      formatToggleText.textContent = state.is24Hour ? '24H' : '12H';
      formatToggleBtn.setAttribute('title', `Current: ${state.is24Hour ? '24-hour' : '12-hour'} (click to toggle)`);
    }

    formatToggleBtn.addEventListener('click', () => {
      state.is24Hour = !state.is24Hour;
      localStorage.setItem('reality_time_format', state.is24Hour ? '24' : '12');
      updateFormatBtn();
      showToast(`Clock switched to ${state.is24Hour ? '24-Hour' : '12-Hour'} mode`);
    });
    updateFormatBtn();

    // Toggle Milliseconds
    function updateMillisBtn() {
      toggleMillisText.textContent = state.showMillis ? 'Hide Millis' : 'Show Millis';
    }

    btnToggleMillis.addEventListener('click', () => {
      state.showMillis = !state.showMillis;
      localStorage.setItem('reality_show_millis', String(state.showMillis));
      updateMillisBtn();
      showToast(state.showMillis ? 'Milliseconds visible' : 'Milliseconds hidden');
    });
    updateMillisBtn();

    // Fullscreen Mode
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
          showToast('Fullscreen not permitted by browser');
        });
      } else {
        document.exitFullscreen();
      }
    });

    // Copy Current Timestamp
    btnCopyTime.addEventListener('click', async () => {
      const now = new Date();
      const isoString = now.toISOString();
      const localized = `${now.toLocaleDateString()} ${now.toLocaleTimeString()} (${getUtcOffsetString(now)})`;
      const copyText = `${localized} | ISO: ${isoString}`;

      try {
        await navigator.clipboard.writeText(copyText);
        showToast('Reality timestamp copied to clipboard!');
      } catch {
        // Fallback prompt or execCommand
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Timestamp copied!');
      }
    });
  }

  // --- Ambient Interactive Glow on Cursor Move ---
  function setupAmbientMotion() {
    const orb1 = document.getElementById('orb1');
    const orb2 = document.getElementById('orb2');

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xRatio = (clientX / window.innerWidth - 0.5) * 40;
      const yRatio = (clientY / window.innerHeight - 0.5) * 40;

      if (orb1) {
        orb1.style.transform = `translate(${xRatio}px, ${yRatio}px)`;
      }
      if (orb2) {
        orb2.style.transform = `translate(${-xRatio * 0.8}px, ${-yRatio * 0.8}px)`;
      }
    }, { passive: true });
  }

  // --- Initialize App ---
  function init() {
    setupStaticMetrics();
    setupProfileEditing();
    setupThemes();
    setupControls();
    setupAmbientMotion();
    requestAnimationFrame(updateClock);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
