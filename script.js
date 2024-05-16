document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <label for="password">Enter Password:</label>
        <input type="password" id="password" placeholder="Enter your password">
        <button onclick="checkPassword()">Check Password Strength</button>
        <div id="result"></div>
    `;
    displaySavedPasswords();
});

function checkPassword() {
    const password = document.getElementById('password').value;
    const result = document.getElementById('result');
    
    if (!password) {
        result.innerHTML = 'Please enter a password!';
        return;
    }

    let analysis = '';
    let strength = 0;

    if (password.length >= 8) {
        strength++;
    } else {
        analysis += 'Password is too short. Must be at least 8 characters long.<br>';
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    } else {
        analysis += 'Password must contain at least one uppercase letter.<br>';
    }

    if (/[a-z]/.test(password)) {
        strength++;
    } else {
        analysis += 'Password must contain at least one lowercase letter.<br>';
    }

    if (/[0-9]/.test(password)) {
        strength++;
    } else {
        analysis += 'Password must contain at least one number.<br>';
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    } else {
        analysis += 'Password must contain at least one special character.<br>';
    }

    let strengthMessage = '';
    if (strength === 5) {
        strengthMessage = 'Strong Password!';
    } else if (strength >= 3) {
        strengthMessage = 'Moderate Password.';
    } else {
        strengthMessage = 'Weak Password.';
    }

    result.innerHTML = `${strengthMessage}<br>${analysis}`;
}

function suggestPassword() {
    const suggestions = [
        'Use a mix of letters, numbers, and special characters.',
        'Avoid using easily guessable information like birthdays or names.',
        'Use a password manager to generate and store unique passwords.',
        'Change your passwords regularly and avoid reusing them.'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function suggestStrongPassword() {
    const strongPassword = generateStrongPassword();
    document.getElementById('strong-password').textContent = 'Suggested Strong Password: ' + strongPassword;
}

function generateStrongPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function savePassword() {
    const passwordName = document.getElementById('password-name').value;
    const password = document.getElementById('password').value;
    const appName = document.getElementById('app-name').value;
    if (passwordName && password && appName) {
        const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push({ name: passwordName, app: appName, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displaySavedPasswords();
    } else {
        alert('Please enter all details to save the password!');
    }
}

function displaySavedPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const savedPasswordsDiv = document.getElementById('saved-passwords');
    savedPasswordsDiv.innerHTML = '<h3>Saved Passwords</h3>';
    passwords.forEach(p => {
        savedPasswordsDiv.innerHTML += `<div><strong>${p.app}</strong>: ${p.password} (${p.name})</div>`;
    });
}

function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const result = document.getElementById('encrypted');
    
    if (!plaintext) {
        result.innerHTML = 'Please enter text to encrypt!';
        return;
    }
    
    const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
    result.textContent = 'Encrypted: ' + ciphertext;
}

function decrypt() {
    const ciphertext = document.getElementById('encrypted').textContent.replace('Encrypted: ', '');
    const key = document.getElementById('key').value;
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById('decrypted').textContent = 'Decrypted: ' + plaintext;
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent.replace('Generated Password: ', '');
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Password copied to clipboard!');
}

function generateCustomPassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()';

    let chars = '';
    if (includeUppercase) chars += upperCaseChars;
    if (includeLowercase) chars += lowerCaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('custom-password-result').textContent = 'Generated Password: ' + password;
}

function toggleDarkMode() {
    const isDarkMode = document.getElementById('dark-mode-switch').checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.querySelector('.container').classList.toggle('dark-mode', isDarkMode);
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-mode', isDarkMode);
    });
    document.querySelectorAll('a.button').forEach(button => {
        button.classList.toggle('dark-mode', isDarkMode);
    });
}

function encryptNote() {
    const noteText = document.getElementById('note-text').value;
    const noteKey = document.getElementById('note-key').value;
    const result = document.getElementById('encrypted-note');
    
    if (!noteText) {
        result.innerHTML = 'Please enter a note to encrypt!';
        return;
    }
    
    const encryptedNote = CryptoJS.AES.encrypt(noteText, noteKey).toString();
    result.textContent = 'Encrypted Note: ' + encryptedNote;
}

function decryptNote() {
    const encryptedNote = document.getElementById('encrypted-note').textContent.replace('Encrypted Note: ', '');
    const noteKey = document.getElementById('note-key').value;
    const bytes = CryptoJS.AES.decrypt(encryptedNote, noteKey);
    const decryptedNote = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById('decrypted-note').textContent = 'Decrypted Note: ' + decryptedNote;
}

function checkBreach() {
    const password = document.getElementById('breach-password').value;
    const result = document.getElementById('breach-result');
    
    if (!password) {
        result.innerHTML = 'Please enter a password to check!';
        return;
    }

    checkLocalBreach(password, result);

    fetch(`https://api.pwnedpasswords.com/range/${sha1(password).slice(0, 5)}`)
        .then(response => response.text())
        .then(data => {
            const hashSuffix = sha1(password).slice(5).toUpperCase();
            const breaches = data.split('\n').filter(line => line.startsWith(hashSuffix));
            if (breaches.length > 0) {
                result.innerHTML = 'Your password has been found in data breaches!';
            } else {
                result.innerHTML += 'Your password is safe from public data breaches!';
            }
        })
        .catch(error => {
            result.innerHTML = 'Error checking password breach!';
        });
}

function checkLocalBreach(password, resultElement) {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    const usedApps = passwords.filter(p => p.password === password).map(p => p.app);

    if (usedApps.length > 1) {
        resultElement.innerHTML = `This password has already been used for these apps: ${usedApps.join(', ')}. Please use a different password.`;
    } else if (usedApps.length === 1) {
        resultElement.innerHTML = `This password has already been used for the app: ${usedApps[0]}. Please use a different password.`;
    }
}

function sha1(str) {
    // SHA-1 hashing function
    const buffer = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-1', buffer).then(hash => {
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    });
}

