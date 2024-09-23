// components/PusherClient.tsx
'use client';

import React, { useEffect } from 'react';
import Pusher from 'pusher-js';

const PusherClient = () => {
  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('your-key', {
      cluster: 'your-cluster',
    });

    // Subscribe to the channel
    const channel = pusher.subscribe('my-channel');

    // Bind to an event within the channel
    channel.bind('my-event', function (data: any) {
      alert('Received event data: ' + JSON.stringify(data));
    });

    // Cleanup on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return <div>Pusher Client is listening for events...</div>;
};

export default PusherClient;
