# Thrift Finds

**DEMO**

<img width="1500" height="442" alt="Screenshot 2025-07-27 at 12 08 40 pm" src="https://github.com/user-attachments/assets/8ad1fee8-6583-4bda-b6ad-88f88b6aa61e" />
<img width="1500" height="403" alt="Screenshot 2025-07-27 at 12 13 57 pm" src="https://github.com/user-attachments/assets/8f92a45e-efac-42e0-984d-942fe2aace46" />

**URL:         **https://thrift-finds-d8f5a.web.app/login

**SOURCE CODE: **https://github.com/TransistorSmoke/thrift-find

Thrift stores always have good finds - used electronics, books, glassware and kids' toys. Some of these I resell, some I keep.
Electronics were my best items so far - I got awesome deals for especially those that I could use for my computer and work! :)

Thrift Finds is my project that I use to record and track items that I buy and sell. I can set the original purchase price and date, and selling price and date, and upload an image of the item. If it gets sold, a profit or loss price gets calculated. I can also update details of the item, or delete it.

---------------------------------------------------

**TECH STACK**

- **React, bootstrap with Vite** - my goal was to try using more of React and Vite. Old school CRA was sunset, so Vite it was.
  - React hooks (useState, useReducer, useEffect, useRef, etc) and custom hooks, Context API
  
- **SCSS** - This is my attempt to use the CSS modular architecture - started simple, but it works! And I am happy to have learned how to build it on my own. I did not use a CSS framework for this.
  
- **Firebase, Firestore and Storage** - for backend.
  - I created custom hooks to handle adding, updating, and deleting documents (items).
  - Upload image (file) to Firebase Storage - added feature to compress image that exceed a certain file size
  - Firebase and Storage rules set to allow restricted access and actions on documents and files
  - New user signup, login, logout, and forgot password handling








