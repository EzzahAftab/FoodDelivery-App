
# EasyEat – React Native Food Delivery App

**EasyEat** is a mobile food delivery app built with **React Native** and **Expo**, using **Firebase** for backend services such as authentication, data storage, and order management.

This app allows users to sign up, log in, browse menus, view product details, add items to their cart, place orders, and track their order history — all within a clean and modern interface.

---

## Features

- **User Authentication**
  - Firebase signup and login
  - Persistent login sessions with AsyncStorage

- **Home Screen**
  - Displays food categories, offers, and popular items
  - Integrated with location access (Expo Location & React Native Maps)

- **Product Screen**
  - Shows product image, name, description, and price
  - Option to add items to cart

- **User Cart Screen**
  - Displays added items with quantity and total
  - Option to proceed to checkout

- **Order Tracking**
  - View current and past orders
  - Fetches data from Firebase Firestore

- **User Profile**
  - Displays and edits user information
  - Logout functionality

- **Account and Settings**
  - Access to app settings, profile, and authentication state

---

## Tech Stack

**Frontend:** React Native, Expo, React Navigation, AsyncStorage  
**Backend:** Firebase Authentication, Firestore Database, Firebase Storage  
**State Management:** React Context API  
**Other Libraries:** Expo Location, React Native Maps

---

## Folder Structure

```

EasyEat/
├── assets/                # App images and icons
├── Components/            # Reusable UI components
├── Context/               # Context providers (AuthContext)
├── Firebase/              # Firebase configuration
├── Screens/               # App screens
│   ├── HomeScreen.js
│   ├── ProductScreen.js
│   ├── UserCartScreen.js
│   ├── TrackOrderScreen.js
│   ├── UserProfile.js
│   └── AccountAndSettings.js
├── App.js
├── app.json
├── package.json
└── README.md

````

---


## Future Improvements

* Real-time delivery tracking
* Online payment integration
* Admin panel for restaurant management
* Enhanced UI/UX with animations

---

## License

This project is open source and available under the **MIT License**.

---

## Author

Developed by **Ezzah Aftab**
Built with React Native, Expo, and Firebase.



---

