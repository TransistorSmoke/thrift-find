export const FIREBASE_ERROR_MAP = {
  // Account/Email Errors

  'auth/email-already-in-use': 'Email is already registered',
  'auth/invalid-email	Email': 'format is invalid',
  'auth/user-not-found': 'No user exists with that email',
  'auth/user-disabled': 'Account has been disabled',
  'auth,/account-exists-with-different-credential':
    'Email already linked to another provider (e.g., Google vs Email/Pass)',

  // Password Errors
  'auth/wrong-password': 'Incorrect password',
  'auth/weak-password': "Password doesn't meet strength requirements (usually <6 characters)",
  'auth/too-many-requests': 'Temporarily blocked due to too many failed login attempts',

  // Credential & Sign-In Errors
  'auth/invalid-credential': 'Provided credential is malformed or expired',
  'auth/operation-not-allowed': 'Sign-in method (e.g., Google, Email) is not enabled in Firebase console',
  'auth/popup-closed-by-user': 'User closed the popup before completing auth',
  'auth/cancelled-popup-request': 'Only one popup allowed at a time',
  'auth/popup-blocked': 'Popup blocked by browser settings',
  'auth/unauthorized-domain': 'Your domain isn’t listed in Firebase Auth’s list of authorized domains',

  // Custom Auth & Token Errors
  'auth/invalid-custom-token': 'Token is incorrectly formatted or missing claims',
  'auth/custom-token-mismatch': "Token doesn't match current project",
  'auth/id-token-expired': 'ID token has expired',
  'auth/id-token-revoked': 'Token was revoked via Admin SDK',
};

export const FIREBASE_ERROR_CODE_LIST = [
  'auth/email-already-in-use',
  'auth/invalid-email	Email',
  'auth/user-not-found',
  'auth/user-disabled',
  'auth,/account-exists-with-different-credential',
  'auth/wrong-password',
  'auth/weak-password',
  'auth/too-many-requests',
  'auth/invalid-credential',
  'auth/operation-not-allowed',
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
  'auth/popup-blocked',
  'auth/unauthorized-domain',
  'auth/invalid-custom-token',
  'auth/custom-token-mismatch',
  'auth/id-token-expired',
  'auth/id-token-revoked',
];
