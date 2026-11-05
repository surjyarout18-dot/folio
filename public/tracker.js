/**
 * Zero-PII Website Visitor Intelligence Beacon
 * Safe for GDPR/CCPA. No cookies, no fingerprints, no storage of sensitive personal data.
 */
(function () {
  'use strict';

  // Ignore headless bots, test environments, and automated crawlers
  var ua = navigator.userAgent || '';
  if (/bot|crawler|spider|crawling|googlebot|bingbot|lighthouse|headless/i.test(ua)) {
    return;
  }

  var ENDPOINT = '/api/track';
  var SESSION_STORAGE_KEY = 's_sid';
  var VISITOR_STORAGE_KEY = 's_vid';
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getOrCreateVisitorId() {
    try {
      var vid = localStorage.getItem(VISITOR_STORAGE_KEY);
      if (!vid) {
        vid = 'v_' + generateUUID();
        localStorage.setItem(VISITOR_STORAGE_KEY, vid);
      }
      return vid;
    } catch (e) {
      return 'v_incognito';
    }
  }

  function getOrCreateSessionId() {
    try {
      var now = Date.now();
      var raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (now - parsed.timestamp < SESSION_TIMEOUT_MS) {
          parsed.timestamp = now;
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsed));
          return { sessionId: parsed.id, isNew: false };
        }
      }
      var newId = 's_' + generateUUID();
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ id: newId, timestamp: now }));
      return { sessionId: newId, isNew: true };
    } catch (e) {
      return { sessionId: 's_incognito', isNew: true };
    }
  }

  function sendEvent(eventType, metadata) {
    try {
      var sessionInfo = getOrCreateSessionId();
      var visitorId = getOrCreateVisitorId();
      var urlParams = new URLSearchParams(window.location.search);

      var payload = {
        sessionId: sessionInfo.sessionId,
        visitorId: visitorId,
        isNewSession: sessionInfo.isNew,
        eventType: eventType || 'pageview',
        path: window.location.pathname || '/',
        fullUrl: window.location.href,
        referrer: document.referrer || '',
        utmSource: urlParams.get('utm_source') || '',
        utmMedium: urlParams.get('utm_medium') || '',
        utmCampaign: urlParams.get('utm_campaign') || '',
        screenWidth: window.screen ? window.screen.width : 0,
        screenHeight: window.screen ? window.screen.height : 0,
        devicePixelRatio: window.devicePixelRatio || 1,
        language: navigator.language || '',
        metadata: metadata || {}
      };

      var blobData = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([blobData], { type: 'application/json' }));
      } else {
        fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: blobData,
          keepalive: true
        }).catch(function () {});
      }
    } catch (err) {
      // Gracefully silent on tracker exceptions
    }
  }

  // 1. Initial Page View
  sendEvent('pageview');

  // 2. SPA Route Change Listener (PushState & PopState)
  var origPushState = history.pushState;
  if (origPushState) {
    history.pushState = function () {
      origPushState.apply(this, arguments);
      sendEvent('pageview', { trigger: 'pushState' });
    };
  }
  window.addEventListener('popstate', function () {
    sendEvent('pageview', { trigger: 'popstate' });
  });
})();

