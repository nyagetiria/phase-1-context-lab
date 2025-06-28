// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Create multiple employee records
function createEmployeeRecords(arr) {
  return arr.map(createEmployeeRecord);
}

// Add a TimeIn event using `this`
function createTimeInEvent(dateTimeStr) {
  const [date, hour] = dateTimeStr.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// Add a TimeOut event using `this`
function createTimeOutEvent(dateTimeStr) {
  const [date, hour] = dateTimeStr.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// Calculate hours worked on a date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages for a date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Provided in the lab due to "lost context" issue
function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(e => e.date);
  return eligibleDates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
}

// Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => e.firstName === firstName);
}

// Calculate total payroll for all employees
function calculatePayroll(records) {
  return records.reduce((total, emp) => total + allWagesFor.call(emp), 0);
}
