let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployees = function (employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
};

let createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let hoursWorkedOnDate = function (employee, dateSearched) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === dateSearched;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === dateSearched;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function (employee, dateSearched) {
  let rawWage = hoursWorkedOnDate(employee, dateSearched) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
};

let createEmployeeRecords = function (src) {
  return src.map(function (row) {
    return createEmployeeRecord(row);
  });
};

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};