export const LOGIN_SELECTORS = {
  APP_HEADER: "app-header",
  LOGIN_BUTTON: "app-header a.loginText",
  LOGIN_COMPONENT: "app-login",
  LOGIN_USERID: 'input[formcontrolname="userid"]',
  LOGIN_PASSWORD: 'input[formcontrolname="password"]',
  LOGIN_CAPTCHA_IMAGE: "app-captcha .captcha-img",
  LOGIN_CAPTCHA_INPUT: 'app-captcha #captcha, input[formcontrolname="captcha"]',
};

export const JOURNEY_SELECTORS = {
  JOURNEY_COMPONENT: "app-jp-input",
  ORIGIN_INPUT: "#origin input",
  DESTINATION_INPUT: "#destination input",
  AUTOCOMPLETE_ITEMS: ".ui-autocomplete-items li",
  QUOTA_DROPDOWN: "#journeyQuota > div",
  QUOTA_ITEMS: "#journeyQuota p-dropdownitem span",
  JOURNEY_DATE_INPUT: "#jDate input",
  SEARCH_BUTTON: 'app-jp-input button[type="submit"].search_btn',
  SERVER_CLOCK: "app-header .h_head1 > span strong",
};

export const TRAIN_LIST_SELECTORS = {
  TRAIN_LIST_COMPONENT: "app-train-list",
  TRAIN_ROW_COMPONENT: "app-train-avl-enq",
  TRAIN_NUMBER_HEADING: "app-train-avl-enq .train-heading",
  AVAILABLE_CLASS: ".pre-avl",
  SELECTED_CLASS_TAB: 'p-tabmenu li[role="tab"][aria-selected="true"] a > div',
  BOOK_NOW_BUTTON: "button.btnDefault.train_Search",
  DISABLED_BUTTON_CLASS: "disable-book",
  AVAILABILITY_LINK: ".link.ng-star-inserted",
};

export const PASSENGER_SELECTORS = {
  PASSENGER_CONTAINER: "app-passenger-input",
  PASSENGER_ROW: "app-passenger",
  ADD_PASSENGER_BUTTON: "app-passenger-input p-panel .prenext",
  PASSENGER_NAME_INPUT: "p-autocomplete input",
  PASSENGER_NAME_DROPDOWN: ".ui-autocomplete-items li",
  PASSENGER_AGE: 'input[formcontrolname="passengerAge"]',
  PASSENGER_GENDER: 'select[formcontrolname="passengerGender"]',
  BERTH_PREFERENCE: 'select[formcontrolname="passengerBerthChoice"]',
  FOOD_CHOICE: 'select[formcontrolname="passengerFoodChoice"]',
  MOBILE_NUMBER: "#mobileNumber",
  AUTO_UPGRADATION: "#autoUpgradation",
  CONFIRM_BERTHS: "#confirmberths",
  TRAVEL_INSURANCE: 'input[type="radio"][name="travelInsuranceOpted-0"]',
  PAYMENT_RADIO_BUTTON: 'p-radiobutton[name="paymentType"] input',
  CONTINUE_BUTTON: "app-passenger-input button.btnDefault.train_Search",
};

// Convenience aggregate if the rest of the app expects a single object
const selectorDefaults = {
  LOGIN_SELECTORS,
  JOURNEY_SELECTORS,
  TRAIN_LIST_SELECTORS,
  PASSENGER_SELECTORS,
};

export default selectorDefaults;