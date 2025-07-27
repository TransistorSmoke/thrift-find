# Thrift Find

**DEMO**


APP DEMO:     https://thrift-finds-d8f5a.web.app/login

SOURCE CODE:  https://github.com/TransistorSmoke/thrift-find

I go to thrift stores to find some good finds - used electronics, books, glassware and kids' toys. Some of these I resell, some I keep.
Electronics were my best finds so far - I got very good deals for especially those that I could use for my computer and work! :)

Thrift Find is my project that I use to record and track my inventory. These are the items that I post on online market place.
I can set the original purchase price and date, and selling price and date, and upload an image of the. If it gets sold, a profit or loss price gets calculated.
User can update details of the item, or delete it.

---------------------------------------------------

**TECH STACK**

- **React, bootstrap with Vite** - my goal was to try using more of React and Vite. Old school CRA was sunset, so Vite it was.
  - React hooks (useState, useReducer, useEffect, useRef, etc) and custom hooks, Context API
  
- **SCSS** - This is my attempt to use the CSS modular architecture - started simple, but it works! And I am happy to have learned how to build it on my own.
  
- **Firebase, Firestore and Storage** - for backend.
  - I created custom hooks to handle adding, updating, and deleting documents (items).
  - Upload image (file) to Firebase Storage - added feature to compress image that exceed a certain file size
  - Firebase and Storage rules set to allow restricted access and actions on documents and files
  - New user signup, login, logout, and forgot password handling








