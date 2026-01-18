export const emailRules = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Invalid email format' },
];

export const nameRules = [
  { required: true, message: 'User name is required' },
  { min: 3, message: 'Minimum 3 characters required' },
];
