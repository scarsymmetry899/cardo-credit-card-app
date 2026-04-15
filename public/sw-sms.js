// SMS Service Worker for Cardo Credit Card App
// Handles background SMS reading and transaction detection

const SMS_PATTERNS = [
  // HDFC Bank patterns
  /(?:HDFC|hdfc).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // SBI Card patterns  
  /(?:SBI|sbi).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // ICICI Bank patterns
  /(?:ICICI|icici).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // Axis Bank patterns
  /(?:AXIS|axis).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // Yes Bank patterns
  /(?:YES|yes).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // Kotak patterns
  /(?:KOTAK|kotak).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // IDFC FIRST Bank patterns
  /(?:IDFC|idfc).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // AU Small Finance Bank patterns
  /(?:AU|au).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // IndusInd Bank patterns
  /(?:INDUSIND|indusind).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // Punjab National Bank patterns
  /(?:PNB|pnb).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // OneCard patterns
  /(?:ONECARD|onecard|FPL).*?(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent)/i,
  
  // UPI Credit patterns
  /(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|paid|spent).*?UPI/i,
  
  // Generic credit card patterns
  /(?:Rs|INR|₹)[\s\.]?([0-9,]+(?:\.[0-9]{2})?).*?(?:debited|charged|spent).*?(?:credit|card)/i
];

const BANK_KEYWORDS = [
  'HDFC', 'SBI', 'ICICI', 'AXIS', 'YES', 'KOTAK', 'IDFC', 'AU', 'INDUSIND', 'PNB', 'ONECARD', 'FPL'
];

// Check if SMS is from a bank
function isBankSMS(message) {
  const upperMessage = message.toUpperCase();
  return BANK_KEYWORDS.some(keyword => upperMessage.includes(keyword)) &&
         (upperMessage.includes('DEBITED') || upperMessage.includes('CHARGED') || upperMessage.includes('SPENT'));
}

// Check if SMS matches transaction patterns
function isTransactionSMS(message) {
  return SMS_PATTERNS.some(pattern => pattern.test(message));
}

// Handle incoming SMS
function handleSMS(message, sender) {
  console.log('SMS received from:', sender);
  console.log('Message:', message);
  
  if (isBankSMS(message) && isTransactionSMS(message)) {
    console.log('Transaction SMS detected, forwarding to main app');
    
    // Send message to main app
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SMS_RECEIVED',
          message: message,
          sender: sender,
          timestamp: Date.now()
        });
      });
    });
    
    // Show notification
    self.registration.showNotification('💳 Cardo: Transaction Detected', {
      body: 'New bank transaction found in SMS',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'cardo-transaction',
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: 'Open Cardo'
        },
        {
          action: 'dismiss', 
          title: 'Dismiss'
        }
      ]
    });
  }
}

// Service worker event listeners
self.addEventListener('install', event => {
  console.log('SMS Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('SMS Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle messages from main app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SMS_PERMISSION_GRANTED') {
    console.log('SMS permission granted, starting SMS monitoring');
    
    // In a real implementation, this would interface with the SMS API
    // For web apps, we rely on the Permissions API and user paste actions
    // Android apps can use the SMS_RECEIVED broadcast receiver
    
    event.ports[0].postMessage({
      success: true,
      message: 'SMS monitoring started'
    });
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    // Open the app
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        // If app is already open, focus it
        for (const client of clients) {
          if (client.url.includes('localhost') || client.url.includes('cardo')) {
            return client.focus();
          }
        }
        // Otherwise open new window
        return self.clients.openWindow('/');
      })
    );
  }
});

// Background sync for SMS processing
self.addEventListener('sync', event => {
  if (event.tag === 'sms-sync') {
    event.waitUntil(
      // Process any pending SMS messages
      console.log('Background sync triggered for SMS processing')
    );
  }
});

// Handle background fetch for offline SMS storage
self.addEventListener('backgroundfetch', event => {
  if (event.tag === 'sms-backup') {
    console.log('Background fetch for SMS backup');
  }
});

console.log('SMS Service Worker loaded and ready');
