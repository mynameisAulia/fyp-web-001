const admin = require('firebase-admin');

const serviceAccount = require('./config/serviceAccountKey.json'); // Replace with your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send push notifications
async function sendPushNotification(deviceToken, notification) {
  try {
    const message = {
      token: deviceToken,
      notification: {
        title: notification.title,
        body: notification.body,
      },
    };

    const response = await admin.messaging().send(message);
    console.log('Push notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

// Usage example
const deviceToken = 'DEVICE_TOKEN'; // Replace with the device token of the recipient
const notification = {
  title: 'Notification Title',
  body: 'Notification Body',
};

sendPushNotification(deviceToken, notification);
