import { 
  JOURNEY_SELECTORS,
  MODIFY_SEARCH_SELECTORS
} from './domSelectors';
import { delay, waitForElementToAppear } from './utils';
import logger from './logger';

import { from, to, quotaType, isOpeningDayBooking, dateString, targetTime as targetTimeString } from './storage';

const shouldUseTimedSearch = () =>
  ['TATKAL', 'PREMIUM TATKAL'].includes(quotaType) ||
  (quotaType === 'GENERAL' && isOpeningDayBooking);

async function autoComplete(element, value) {
  if (!element) return;
  
  // Focus on the autocomplete input to trigger the generation of options
  element.focus();

  // Set the input value
  element.value = value;

  // Simulate an input event to trigger the autocomplete options
  var inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  
  element.dispatchEvent(inputEvent);

  // Wait for a short delay to ensure the options are generated
  await delay(600);

  var firstItem = document.querySelector(JOURNEY_SELECTORS.STATION_CODE_LIST);
  if (firstItem) {
    await firstItem.click();
  }
}

async function typeDate(element, mydate) {
  if (!element) return;

  // Trigger focus event
  element.dispatchEvent(new Event('focus', { bubbles: true }));

  // Clear the input field
  element.value = '';

  // Trigger input event after clearing the input field
  element.dispatchEvent(new Event('input', { bubbles: true }));

  // Iterate over each character of the date string and type it
  for (const char of mydate) {
    element.value += char;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
    await delay(100);
  }

  // Trigger blur event to simulate losing focus
  element.dispatchEvent(new Event('blur', { bubbles: true }));
}

async function selectQuota(element, value) {
  if (!element) return;
  await element.click();

  // Simulate an onChange event to trigger the autocomplete options
  var inputEvent = new Event('onChange', {
    bubbles: true,
    cancelable: true,
  });

  element.dispatchEvent(inputEvent);
  await delay(500);

  var listItems = document.querySelectorAll(JOURNEY_SELECTORS.JOURNEY_QUOTA_LIST);
  for (let item of listItems) {
    const itemText = item.textContent.trim();
    if (itemText.toLowerCase().includes(value.toLowerCase())) {
      item.click();
      break;
    }
  }
}

// Function to fill Journey Details
async function searchTrain(){
  // Wait for the components to actually render in the DOM before querying them
  await waitForElementToAppear(JOURNEY_SELECTORS.ORIGIN_STATION_CODE);
  
  let journeyInput = document.querySelector(JOURNEY_SELECTORS.JOURNEY_INPUT_COMPONENT);
  let origin = journeyInput.querySelector(JOURNEY_SELECTORS.ORIGIN_STATION_CODE);
  let destination = journeyInput.querySelector(JOURNEY_SELECTORS.DESTINATION_STATION_CODE);
  let quota = journeyInput.querySelector(JOURNEY_SELECTORS.JOURNEY_QUOTA);
  let jDate = journeyInput.querySelector(JOURNEY_SELECTORS.JOURNEY_DATE);

  await autoComplete(origin, from);
  await autoComplete(destination, to);
  await typeDate(jDate, dateString);
  await selectQuota(quota, quotaType);
}

// Function to update Journey Details
async function modifySearchTrain(){
  await waitForElementToAppear(JOURNEY_SELECTORS.ORIGIN_STATION_CODE);
  
  let journeyInput = document.querySelector(MODIFY_SEARCH_SELECTORS.MODIFY_SEARCH_COMPONENT);
  let origin = journeyInput.querySelector(JOURNEY_SELECTORS.ORIGIN_STATION_CODE);
  let destination = journeyInput.querySelector(JOURNEY_SELECTORS.DESTINATION_STATION_CODE);
  let quota = journeyInput.querySelector(JOURNEY_SELECTORS.JOURNEY_QUOTA);
  let jDate = journeyInput.querySelector(MODIFY_SEARCH_SELECTORS.MODIFY_JOURNEY_DATE);

  await autoComplete(origin, from);
  await autoComplete(destination, to);
  await typeDate(jDate, dateString);
  await selectQuota(quota, quotaType);
  
  const searchButton = journeyInput.querySelector('button[type="submit"]');
  if (searchButton) {
    await searchButton.click();
  }
}

async function callSearchTrainComponent(){
  // Wait slightly for angular route transitions to finish
  await delay(1000); 
  let journeyComponent = document.querySelector(JOURNEY_SELECTORS.JOURNEY_INPUT_COMPONENT);

  if(journeyComponent){
    await searchTrain();
  }
  else{
    await modifySearchTrain();
  }
}

function hasReachedTargetTime(currentTimeString, targetTimeString) {
  const [currentHour, currentMinute, currentSecond] = currentTimeString.split(':').map(Number);
  const [targetHour, targetMinute, targetSecond] = targetTimeString.split(':').map(Number);

  return currentHour > targetHour ||
    (currentHour === targetHour && currentMinute > targetMinute) ||
    (currentHour === targetHour && currentMinute === targetMinute && currentSecond >= targetSecond);
}

function waitForTargetTime(targetTime = targetTimeString) {
  const searchButton = document.querySelector(JOURNEY_SELECTORS.JOURNEY_SEARCH_BUTTON);

  if (!searchButton) {
    return;
  }

  if (!shouldUseTimedSearch()) {
    searchButton.click();
    return;
  }

  const intervalId = setInterval(() => {
    const currentTimeElement = document.querySelector(JOURNEY_SELECTORS.CURRENT_TIME);

    if (!currentTimeElement) {
      logger.error('Current time element not found.');
      clearInterval(intervalId);
      return;
    }

    const currentDateTimeString = currentTimeElement.textContent.trim();
    const timeMatch = currentDateTimeString.match(/\[(\d+:\d+:\d+)\]/);

    if (!timeMatch) {
      logger.error('Current time format not recognized:', currentDateTimeString);
      clearInterval(intervalId);
      return;
    }

    if (hasReachedTargetTime(timeMatch[1], targetTime)) {
      searchButton.click();
      clearInterval(intervalId);
    }
  }, 1000);
}

export {
  callSearchTrainComponent,
  shouldUseTimedSearch,
  waitForTargetTime
};