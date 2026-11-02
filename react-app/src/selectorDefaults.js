// Storage key shared with the content script (chrome-extension/src/scripts/user-script.js).
// Keep in sync with CUSTOM_SELECTORS_STORAGE_KEY there.
export const CUSTOM_SELECTORS_STORAGE_KEY = 'customDomSelectors';

const LOGIN_CATEGORY = {
  label: 'Login',
  selectors: {
    APP_HEADER: { label: 'App header', default: 'app-header' },
    LOGIN_BUTTON: { label: 'Login button', default: 'app-header a.loginText' },
    LOGIN_COMPONENT: { label: 'Login component', default: 'app-login' },
    LOGIN_USERID: { label: 'User ID input', default: 'input[formcontrolname="userid"]' },
    LOGIN_PASSWORD: { label: 'Password input', default: 'input[formcontrolname="password"]' },
    LOGIN_CAPTCHA_IMAGE: { label: 'Captcha image', default: 'app-captcha .captcha-img' },
    LOGIN_CAPTCHA_INPUT: { label: 'Captcha input', default: 'app-captcha #captcha' },
  },
};

const JOURNEY_CATEGORY = {
  label: 'Journey input',
  selectors: {
    JOURNEY_INPUT_COMPONENT: { label: 'Journey input component', default: 'app-jp-input' },
    ORIGIN_STATION_CODE: { label: 'Origin station input', default: '#origin input' },
    DESTINATION_STATION_CODE: { label: 'Destination station input', default: '#destination input' },
    STATION_CODE_LIST: { label: 'Station autocomplete list', default: '.ui-autocomplete-items li' },
    JOURNEY_QUOTA: { label: 'Quota dropdown', default: '#journeyQuota>div' },
    JOURNEY_QUOTA_LIST: { label: 'Quota options', default: '#journeyQuota p-dropdownitem span' },
    JOURNEY_DATE: { label: 'Journey date input', default: '#jDate input' },
    CURRENT_TIME: { label: 'Server clock', default: 'app-header .h_head1>span strong' },
    JOURNEY_SEARCH_BUTTON: { label: 'Search button', default: 'app-jp-input button[type="submit"].search_btn' },
    MODIFY_SEARCH_COMPONENT: { label: 'Modify search component', default: 'app-modify-search' },
    MODIFY_JOURNEY_DATE: { label: 'Modify journey date input', default: '#journeyDate input' },
  },
};

const TRAIN_LIST_CATEGORY = {
  label: 'Train list',
  selectors: {
    TRAIN_LIST_COMPONENT: { label: 'Train list component', default: 'app-train-list' },
    TRAIN_COMPONENT: { label: 'Train row component', default: 'app-train-avl-enq' },
    FIND_TRAIN_NUMBER: { label: 'Train number heading', default: 'app-train-avl-enq .train-heading' },
    AVAILABLE_CLASS: { label: 'Available class', default: '.pre-avl' },
    SELECTED_CLASS_TAB: {
      label: 'Selected class tab',
      default: 'p-tabmenu li[role="tab"][aria-selected="true"][aria-expanded="true"] a>div',
    },
    BOOK_NOW_BUTTON: { label: 'Book now button', default: 'button.btnDefault.train_Search' },
    BUTTON_DISABLE_CLASS: { label: 'Disabled button class', default: 'disable-book' },
    LINK_INSERTED: { label: 'Availability link', default: '.link.ng-star-inserted' },
    DIALOG_FROM: { label: 'From/to dialog', default: 'p-confirmdialog[key="tofrom"]' },
    DIALOG_ACCEPT: { label: 'Dialog accept button', default: '.ui-confirmdialog-acceptbutton' },
    DIALOG_COMPONENT: { label: 'Dialog component', default: 'p-dialog' },
    LANGUAGE_BUTTON: {
      label: 'Language selection button',
      default: 'button[aria-label*="Please select your preferred language"]',
    },
  },
};

const PASSENGER_CATEGORY = {
  label: 'Passenger details',
  selectors: {
    PASSENGER_APP_COMPONENT: { label: 'Passenger input component', default: 'app-passenger-input' },
    PASSENGER_COMPONENT: { label: 'Passenger row', default: 'app-passenger' },
    PASSENGER_NEXT_ROW: { label: 'Add passenger button', default: 'app-passenger-input p-panel .prenext' },
    PASSENGER_NEXT_ROW_TEXT: { label: 'Add passenger button text', default: '+ Add Passenger' },
    PASSENGER_INFANT_ADD_BTN_TEXT: { label: 'Add infant button text', default: '+ Add Infant Without Berth' },
    PASSENGER_INFANT_COMPONENT: { label: 'Infant component', default: 'app-infant' },
    PASSENGER_INFANT_NAME_INPUT: { label: 'Infant name input', default: 'input[formcontrolname="name"]' },
    PASSENGER_INFANT_AGE_SELECT: { label: 'Infant age select', default: 'select[formcontrolname="age"]' },
    PASSENGER_INFANT_GENDER_SELECT: { label: 'Infant gender select', default: 'select[formcontrolname="gender"]' },
    PASSENGER_REMOVE_ROW: { label: 'Remove passenger button', default: 'app-passenger-input p-panel a.fa-remove' },
    PASSENGER_INPUT_COMPONENT: { label: 'Passenger panel component', default: 'app-passenger-input' },
    PASSENGER_NAME_INPUT: { label: 'Passenger name input', default: 'p-autocomplete input' },
    PASSENGER_NAME_LIST: { label: 'Passenger name suggestions', default: '.ui-autocomplete-items li' },
    PASSENGER_AGE_INPUT: { label: 'Age input', default: 'input[formcontrolname="passengerAge"]' },
    PASSENGER_GENDER_INPUT: { label: 'Gender select', default: 'select[formcontrolname="passengerGender"]' },
    PASSENGER_BERTH_CHOICE: { label: 'Berth preference select', default: 'select[formcontrolname="passengerBerthChoice"]' },
    PASSENGER_FOOD_CHOICE: { label: 'Food choice select', default: 'select[formcontrolname="passengerFoodChoice"]' },
    PASSENGER_MOBILE_NUMBER: { label: 'Mobile number field', default: 'mobileNumber' },
    PASSENGER_PREFERENCE_AUTOUPGRADATION: { label: 'Auto upgradation field', default: 'autoUpgradation' },
    PASSENGER_PREFERENCE_CONFIRMBERTHS: { label: 'Confirm berths field', default: 'confirmberths' },
    PASSENGER_PREFERENCE_TRAVELINSURANCEOPTED: {
      label: 'Travel insurance radio',
      default: 'input[type="radio"][name="travelInsuranceOpted-0"]',
    },
    PASSENGER_SUBMIT_BUTTON: { label: 'Continue button', default: 'app-passenger-input button.btnDefault.train_Search' },
    PASSENGER_PAYMENT_TYPE: { label: 'Payment type radio', default: 'p-radiobutton[name="paymentType"] input' },
  },
};

const REVIEW_CATEGORY = {
  label: 'Review booking',
  selectors: {
    REVIEW_COMPONENT: { label: 'Review component', default: 'app-review-booking' },
    REVIEW_TRAIN_HEADER: { label: 'Train header', default: 'app-train-header' },
    REVIEW_CAPTCHA_IMAGE: { label: 'Captcha image', default: 'app-captcha .captcha-img' },
    REVIEW_CAPTCHA_INPUT: { label: 'Captcha input', default: 'captcha' },
    REVIEW_AVAILABLE: { label: 'Available status', default: '.AVAILABLE' },
    REVIEW_WAITING: { label: 'Waiting status', default: '.WL' },
    REVIEW_SUBMIT_BUTTON: { label: 'Submit button', default: 'app-review-booking button.btnDefault.train_Search' },
  },
};

const PAYMENT_CATEGORY = {
  label: 'Payment',
  selectors: {
    PAYMENT_COMPONENT: { label: 'Payment component', default: 'app-payment-options' },
    PAYMENT_TYPE: { label: 'Payment type', default: '#pay-type .bank-type' },
    PAYMENT_METHOD: { label: 'Payment method', default: '#pay-type .bank-type' },
    PAYMENT_PROVIDER: { label: 'Payment provider', default: '#bank-type .bank-text, #bank-type .pay_tax_text' },
    PAY_BUTTON: { label: 'Pay button', default: 'button.btn-primary.ng-star-inserted' },
    PAY_BUTTON_TEXT: { label: 'Pay button text', default: 'Pay & Book ' },
    EWALLET_IRCTC_DEFAULT: { label: 'E-Wallet default text', default: 'E-Wallet' },
    EWALLET_COMPONENT: { label: 'E-Wallet component', default: 'app-ewallet-confirm' },
    EWALLET_BUTTON_LIST: { label: 'E-Wallet buttons', default: 'button.mob-bot-btn.search_btn' },
    EWALLET_CONFIRM_BUTTON_TEXT: { label: 'E-Wallet confirm text', default: 'CONFIRM' },
  },
};

// Category map consumed by components/SelectorEditor.js
const SELECTOR_CATEGORIES = {
  login: LOGIN_CATEGORY,
  journey: JOURNEY_CATEGORY,
  trainList: TRAIN_LIST_CATEGORY,
  passenger: PASSENGER_CATEGORY,
  review: REVIEW_CATEGORY,
  payment: PAYMENT_CATEGORY,
};

export default SELECTOR_CATEGORIES;
