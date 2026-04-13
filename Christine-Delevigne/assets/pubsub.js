// Blueprint Theme PubSub System

window.BlueprintTheme = window.BlueprintTheme || {};

window.BlueprintTheme.PubSub = (function() {
  const events = {};

  return {
    // Subscribe to an event
    subscribe: function(eventName, callback) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(callback);
      
      // Return unsubscribe function
      return function() {
        events[eventName] = events[eventName].filter(cb => cb !== callback);
      };
    },

    // Publish an event
    publish: function(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error(`Error in event callback for ${eventName}:`, error);
          }
        });
      }
    },

    // Unsubscribe from all events of a given name
    unsubscribeAll: function(eventName) {
      delete events[eventName];
    },

    // Get all events (for debugging)
    getEvents: function() {
      return events;
    }
  };
})(); 