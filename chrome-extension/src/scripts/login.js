import { LOGIN_SELECTORS } from './domSelectors';
import { scrollToElement } from './elementUtils';
import { delay, simulateTyping, waitForElementToAppear } from './utils';
import Logger from './logger';

import { username, password } from './storage';
import extractTextFromImage from './ocr-reader';

async function fillLoginCaptcha() {
  // Check if captcha elements exist without blocking execution
  var captchaImage = document.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_IMAGE);
  var captchaInput = document.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_INPUT);

  if (!captchaImage || !captchaInput) {
    Logger.warn("Captcha image or input field not found! Skipping captcha step.");
    return;
  }

  // Scroll the captcha input field into view safely
  await scrollToElement(captchaInput);

  // Extract text from captcha image using OCR if an image source exists
  if (captchaImage.src) {
    let captchaText = await extractTextFromImage(captchaImage.src);
    Logger.info("Captcha text:", captchaText);

    // Prompt user with the extracted text (allowing edits)
    let userInput = prompt("Please enter the Captcha:", captchaText);

    // Fill the captcha input field with the user-confirmed value
    if (userInput && captchaInput) {
      await simulateTyping(captchaInput, userInput);
      await delay(50);
    }
  }
}

// Function to Login
async function login() {
  let loginButton = document.querySelector(LOGIN_SELECTORS.LOGIN_BUTTON);
  if (loginButton) {
    await loginButton.click();
  }

  // Wait for the login dialog to mount
  await waitForElementToAppear(LOGIN_SELECTORS.LOGIN_COMPONENT);

  let loginModal = document.querySelector(LOGIN_SELECTORS.LOGIN_COMPONENT);
  if (!loginModal) return;

  const usernameInput = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_USERID);
  const passwordInput = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_PASSWORD);

  if (usernameInput && username) {
    await simulateTyping(usernameInput, username);
  }
  if (passwordInput && password) {
    await simulateTyping(passwordInput, password);
  }

  if (username && password) {
    // Only attempt to fill captcha if IRCTC serves a captcha element in the modal
    const captchaImage = document.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_IMAGE);
    if (captchaImage) {
      await fillLoginCaptcha();
    } else {
      Logger.info("No login captcha element detected. Proceeding directly to sign in.");
    }

    // Submit credentials
    const signInButton = loginModal.querySelector('button[type="submit"]');
    if (signInButton) {
      await signInButton.click();
    }
  }
}

// Function to wait for the app-login element to disappear
async function waitForAppLoginToDisappear() {
  const appLogin = document.querySelector(LOGIN_SELECTORS.LOGIN_COMPONENT);

  if (!appLogin) {
    return;
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(appLogin)) {
        Logger.info('app-login disappear');
        resolve();
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Export all functions and variables
export {
  fillLoginCaptcha,
  login,
  waitForAppLoginToDisappear
};
