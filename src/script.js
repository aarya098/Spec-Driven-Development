/**
 * ============================================================
 *  REGISTRATION FORM — script.js
 *
 *  HOW TO READ THIS FILE:
 *  Every function, rule and behaviour maps to an ID in spec.yaml.
 *  Format: [SPEC-ID] above the code that implements it.
 *
 *  If code exists with NO spec ID → it violates REG-AC05.
 *  If a spec ID has no code       → it is not yet implemented.
 * ============================================================
 */

'use strict';

// ============================================================
//  FIELD REFERENCES
// ============================================================

const F = {
  // [REG-F01]
  fullName:        document.getElementById('fullName'),
  // [REG-F02]
  email:           document.getElementById('email'),
  // [REG-F03]
  age:             document.getElementById('age'),
  // [REG-F04]
  sex:             document.getElementById('sex'),
  // [REG-F05]
  password:        document.getElementById('password'),
  // [REG-F06]
  confirmPassword: document.getElementById('confirmPassword'),
  // [REG-F07]
  termsAccepted:   document.getElementById('termsAccepted'),
};

// ============================================================
//  VALIDATORS
//  Each function returns true (valid) or false (invalid).
//  Each rule references the exact spec ID it enforces.
// ============================================================

// [REG-F01] Full Name
function validateFullName() {
  const v = F.fullName.value.trim();

  // [REG-F01-R01]
  if (!v) return setError('fullName', 'Full name is required');

  // [REG-F01-R02]
  if (v.length < 2) return setError('fullName', 'Name must be at least 2 characters');

  // [REG-F01-R03]
  if (v.length > 80) return setError('fullName', 'Name must be under 80 characters');

  // [REG-F01-R04]
  if (!/^[A-Za-z\s'\-]+$/.test(v)) return setError('fullName', 'Name can only contain letters');

  return setValid('fullName', '');
}

// [REG-F02] Email Address
function validateEmail() {
  const v = F.email.value.trim();

  // [REG-F02-R01]
  if (!v) return setError('email', 'Email address is required');

  // [REG-F02-R02]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return setError('email', 'Enter a valid email address');

  return setValid('email', '');
}

// [REG-F03] Age
function validateAge() {
  const raw = F.age.value;
  const v   = parseInt(raw, 10);

  // [REG-F03-R01]
  if (!raw) return setError('age', 'Age is required');

  // [REG-F03-R02]
  if (isNaN(v) || v < 13) return setError('age', 'You must be at least 13 years old');

  // [REG-F03-R03]
  if (v > 120) return setError('age', 'Please enter a valid age');

  return setValid('age', '');
}

// [REG-F04] Sex
function validateSex() {
  // [REG-F04-R01]
  if (!F.sex.value) return setError('sex', 'Please select an option');
  return setValid('sex', '');
}

// [REG-F05] Password
function validatePassword() {
  const v = F.password.value;

  // [REG-F05-R01]
  if (!v) {
    updateStrength(0);
    return setError('password', 'Password is required');
  }

  // [REG-F05-R02]
  if (v.length < 8) {
    updateStrength(1);
    return setError('password', 'Password must be at least 8 characters');
  }

  // [REG-F05-R03] — count how many categories are satisfied
  let score = 0;
  if (/[a-z]/.test(v)) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  // [REG-F05-R04] — update visual strength indicator
  updateStrength(score);

  if (score < 2)
    return setError('password', 'Password is too weak — add uppercase letters, numbers or symbols');

  const label = score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong';
  setValid('password', `Strength: ${label}`);

  // re-check confirm if it already has a value [REG-B03]
  if (F.confirmPassword.value) validateConfirmPassword();

  return true;
}

// [REG-F05-R04] Strength bar visual
function updateStrength(score) {
  const bar    = document.getElementById('strengthBar');
  const widths = ['0%', '25%', '50%', '75%', '100%'];
  const colors = ['transparent', '#E05555', '#E8A855', '#4CAF7D', '#2E8B57'];
  bar.style.width      = widths[score] || '0%';
  bar.style.background = colors[score] || 'transparent';
}

// [REG-F06] Confirm Password
function validateConfirmPassword() {
  const v = F.confirmPassword.value;

  // [REG-F06-R01]
  if (!v) return setError('confirmPassword', 'Please confirm your password');

  // [REG-F06-R02]
  if (v !== F.password.value)
    return setError('confirmPassword', 'Passwords do not match');

  return setValid('confirmPassword', 'Passwords match');
}

// [REG-F07] Terms
function validateTerms() {
  // [REG-F07-R01]
  if (!F.termsAccepted.checked)
    return setError('termsAccepted', 'You must accept the terms to continue');

  return setValid('termsAccepted', '');
}

// ============================================================
//  STATE HELPERS
//  Implements REG-U03 (valid) and REG-U04 (error) visual states
// ============================================================

function setError(fieldId, message) {
  const group = document.getElementById('fg-' + fieldId);
  const msg   = document.getElementById('msg-' + fieldId);
  const icon  = document.getElementById('icon-' + fieldId);

  group.classList.remove('valid');
  group.classList.add('error');          // [REG-U04]
  if (msg)  msg.textContent  = message;
  if (icon) icon.textContent = '✕';
  return false;
}

function setValid(fieldId, message) {
  const group = document.getElementById('fg-' + fieldId);
  const msg   = document.getElementById('msg-' + fieldId);
  const icon  = document.getElementById('icon-' + fieldId);

  group.classList.remove('error');
  group.classList.add('valid');          // [REG-U03]
  if (msg)  msg.textContent  = message;
  if (icon) icon.textContent = '✓';
  return true;
}

function clearState(fieldId) {
  const group = document.getElementById('fg-' + fieldId);
  const msg   = document.getElementById('msg-' + fieldId);
  const icon  = document.getElementById('icon-' + fieldId);

  group.classList.remove('valid', 'error');  // [REG-U01] default state
  if (msg)  msg.textContent  = '';
  if (icon) icon.textContent = '';
}

// ============================================================
//  BEHAVIOUR BINDINGS
//  Implements Section 2 (REG-B01 to REG-B03) from spec.yaml
// ============================================================

// [REG-B01] Validate on blur (field loses focus)
F.fullName.addEventListener('blur',        validateFullName);
F.email.addEventListener('blur',           validateEmail);
F.age.addEventListener('blur',             validateAge);
F.sex.addEventListener('change',           validateSex);       // select uses 'change'
F.confirmPassword.addEventListener('blur', validateConfirmPassword);
F.termsAccepted.addEventListener('change', validateTerms);

// [REG-B02] Update strength in real time as user types in password
F.password.addEventListener('input', validatePassword);

// [REG-B03] Re-validate confirm match as user types
F.confirmPassword.addEventListener('input', validateConfirmPassword);

// ============================================================
//  PASSWORD VISIBILITY TOGGLE
//  Not a spec requirement — minimal UX helper
// ============================================================

document.getElementById('eyeBtn').addEventListener('click', function () {
  const isHidden = F.password.type === 'password';
  F.password.type = isHidden ? 'text' : 'password';
  this.style.color = isHidden ? '#E8D5B0' : '';
});

// ============================================================
//  FORM SUBMISSION
// ============================================================

document.getElementById('regForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // [REG-B04] Run ALL validators on submit
  const results = [
    validateFullName(),
    validateEmail(),
    validateAge(),
    validateSex(),
    validatePassword(),
    validateConfirmPassword(),
    validateTerms(),
  ];

  // [REG-B04] If any invalid: show all errors, focus first invalid field
  if (results.includes(false)) {
    const firstBad = document.querySelector('.field-group.error input, .field-group.error select');
    if (firstBad) firstBad.focus();
    return;
  }

  // [REG-B05] All valid — disable button, show spinner
  const btn     = document.getElementById('submitBtn');
  const label   = document.getElementById('btnLabel');
  const spinner = document.getElementById('btnSpinner');

  btn.disabled          = true;         // [REG-U05]
  label.textContent     = 'Creating account…';
  spinner.style.display = 'block';

  // Simulate API call [REG-B05 / spec out_of_scope: "Real backend API call"]
  setTimeout(function () {
    btn.disabled          = false;
    label.textContent     = 'Create account';
    spinner.style.display = 'none';

    // [REG-B06] API success → show success screen
    const name = F.fullName.value.trim().split(' ')[0];
    document.getElementById('successTitle').textContent = `Welcome, ${name}!`;
    document.getElementById('regForm').style.display   = 'none';
    document.getElementById('successScreen').style.display = 'block'; // [REG-U06]

  }, 1500);
});

// ============================================================
//  DEMO RESET
// ============================================================

function resetDemo() {
  document.getElementById('regForm').reset();
  document.getElementById('regForm').style.display      = 'block';
  document.getElementById('successScreen').style.display = 'none';
  document.getElementById('errorBanner').style.display  = 'none';

  // [REG-U01] Restore all fields to default state
  Object.keys(F).forEach(id => clearState(id));
  updateStrength(0);
}
