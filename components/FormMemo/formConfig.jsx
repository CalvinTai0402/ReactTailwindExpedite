const createRule = (ruleName, errorMessage, validateFunc) => ({
  name: ruleName,
  message: errorMessage,
  validate: validateFunc,
});

const requiredRule = (inputName) => createRule(
  'required',
  `${inputName} required`,
  (value) => value.length !== 0,
);

const emailValidRule = () => createRule('email valid', 'Email invalid', (value) => /^\S+@\S+$/.test(value));

export default [
  {
    htmlFor: 'email',
    label: 'Email',
    name: 'email',
    id: 'email',
    type: 'text',
    placeholder: 'JohnDoe@gmail.com',
    value: '',
    validationRules: [
      // put the most general validation rule at the bottom
      emailValidRule(),
      requiredRule('Email'),
    ],
    isValid: true,
    errorMessage: '',
  },
  {
    htmlFor: 'username',
    label: 'Username',
    name: 'username',
    id: 'username',
    type: 'text',
    placeholder: 'John Doe',
    value: '',
    validationRules: [requiredRule('Username')],
    isValid: true,
    errorMessage: '',
  },
  {
    htmlFor: 'password',
    label: 'Password',
    name: 'password',
    id: 'password',
    type: 'password',
    placeholder: '',
    value: '',
    validationRules: [requiredRule('Password')],
    isValid: true,
    errorMessage: '',
  },
];
