/* global flatpickr */

import {settings, select} from './../settings.js';
import utils from './../utils.js';
import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date())); //, utils.dateToStr(new Date()
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();

  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    flatpickr(thisWidget.dom.input, {

      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      onChange: function(selectedDates, dateStr) {
        thisWidget.value = dateStr;
      },

      'disable': [
        function(date) {
          // disable for Monday
          return (date.getDay() === 1);

        }
      ],
      'locale': {
        'firstDayOfWeek': 1 // start week on Monday
      }
    });
  }

  parseValue(value) {
    return (value);
  }

  isValid(value) {
    return value === value;
  }

  renderValue() {

  }

}
export default DatePicker;
