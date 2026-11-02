import { LOGIN_SELECTORS } from "./domSelectors";
import {
  delay,
  fillInput,
  scrollToElement,
  simulateTyping,
  waitForElementToAppear,
} from "./elementUtils";
import Logger from "./logger";
import { extractTextFromImage } from "./ocr-reader";

export async function login(settings) {
  try {
    const { username, password } = settings.loginDetails || {};

    if (!username || !password) {
      Logger.warn("Username or password not provided in settings.");
      return;
    }

    // --- 1. Open the login modal if it isn't already open ---
    let loginModal = document.querySelector(LOGIN_SELECTORS.LOGIN_COMPONENT);
    if (!loginModal) {
      const loginButton = document.querySelector(LOGIN_SELECTORS.LOGIN_BUTTON);
      if (loginButton) {
        loginButton.click();
        await waitForElementToAppear(LOGIN_SELECTORS.LOGIN_COMPONENT, 5000);
        loginModal = document.querySelector(LOGIN_SELECTORS.LOGIN_COMPONENT);
      }
    }

    if (!loginModal) {
      Logger.error("Login modal could not be found.");
      return;
    }

    // --- 2. Fill username ---
    const usernameInput = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_USERID);
    if (usernameInput) {
      await fillInput(usernameInput, username);
      await delay(100);
    } else {
      Logger.warn("Username input not found in login modal.");
    }

    // --- 3. Fill password ---
    const passwordInput = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_PASSWORD);
    if (passwordInput) {
      await fillInput(passwordInput, password);
      await delay(100);
    } else {
      Logger.warn("Password input not found in login modal.");
    }

    // --- 4. CAPTCHA is OPTIONAL ---
    // IRCTC now uses silent anti-bot checks and often renders no captcha at all.
    // We must NOT block on waitForElementToAppear here.
    const captchaImg = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_IMAGE);
    const captchaInput = loginModal.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_INPUT);

    if (captchaImg && captchaInput) {
      Logger.info("Captcha detected. Attempting to solve/fill...");
      await fillLoginCaptcha(loginModal);
    } else {
      Logger.info("No captcha found. Proceeding straight to sign-in.");
    }

    // --- 5. Click Sign In ---
    const signInButton =
      loginModal.querySelector('button[type="submit"]') ||
      loginModal.querySelector(".search_btn.train_Search");

    if (signInButton) {
      await delay(150);
      signInButton.click();
      Logger.info("Sign In button clicked.");
    } else {
      Logger.error("Sign in submit button not found.");
    }
  } catch (err) {
    Logger.error("Error during login execution:", err);
  }
}

/**
 * Best-effort captcha solving. Never throws and never assumes the
 * captcha elements still exist by the time this runs.
 */
async function fillLoginCaptcha(modal) {
  const captchaImage = modal.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_IMAGE);
  const captchaInput = modal.querySelector(LOGIN_SELECTORS.LOGIN_CAPTCHA_INPUT);

  // Hard guard against null references.
  if (!captchaImage || !captchaInput) {
    Logger.warn("Captcha elements vanished before fill — skipping.");
    return;
  }

  try {
    await scrollToElement(captchaInput);

    if (typeof captchaInput.focus === "function") {
      captchaInput.focus();
    }

    const captchaText = await extractTextFromImage(captchaImage.src);
    if (captchaText) {
      await simulateTyping(captchaInput, captchaText);
      await delay(50);
      Logger.info("Captcha text entered.");
    } else {
      Logger.warn("OCR returned empty captcha text — skipping.");
    }
  } catch (err) {
    // A captcha failure must never abort the rest of the login flow.
    Logger.warn("Failed automatic captcha resolution, skipping:", err);
  }
}