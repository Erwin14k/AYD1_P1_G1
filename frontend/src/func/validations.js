export function validateName(name) {
  const nameRegex = /^[a-zA-Z\u00C0-\u017F]+(([',. -][a-zA-Z\u00C0-\u017F ])?[a-zA-Z\u00C0-\u017F]*)*$/;
  return nameRegex.test(name);
}

 

 export function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}
