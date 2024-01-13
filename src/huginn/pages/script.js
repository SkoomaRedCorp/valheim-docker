document.addEventListener("DOMContentLoaded", function () {
  // Load JSON data from file
  fetch('/status')
    .then(response => response.json())
    .then(jsonData => {
      // Display the styled JSON
      const jsonContainer = document.getElementById("json-container");
      jsonContainer.innerHTML = formatJson(jsonData);
    })
    .catch(error => console.error('Error loading JSON:', error));
});

function formatJson(data, isNested = false) {
  let result = "<div class='property'>";
  if (!isNested) {
    result += "<div class='property-key'>Server Information:</div>";
  }

  result += "<div class='property-value'>";

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      result += `<div class='property'>`;

      if (typeof value === "object") {
        result += `<div class='property-key'>${key}:</div>`;
        if (key === 'mods' && Array.isArray(value)) {
          result += "<div class='array-item'>";
          value.forEach((mod) => {
            result += formatModCard(mod);
          });
          result += "</div>";
        } else if (key === 'jobs' && Array.isArray(value)) {
          result += "<div class='array-item'>";
          value.forEach((job) => {
            result += formatJob(job);
          });
          result += "</div>";
        } else {
          result += formatJson(value, true);
        }
      } else if (Array.isArray(value)) {
        result += `<div class='property-key'>${key}:</div>`;
        result += "<div class='array-item'>";
        value.forEach((item) => {
          result += formatJson(item, true);
        });
        result += "</div>";
      } else {
        result += `<div class='property-key'>${key}:</div>`;
        result += `<div class='property-value'>${value}</div>`;
      }

      result += "</div>";
    }
  }

  result += "</div></div>";
  return result;
}

function formatModCard(mod) {
  return `
    <div class='card'>
      <div class='card-title'>${mod.name}</div>
      <div class='card-description'>${mod.description}</div>
      <div class='card-version'>Version: ${mod.version}</div>
      <div class='card-dependencies'>Dependencies: ${mod.dependencies.join(', ')}</div>
    </div>
  `;
}

function formatJob(job) {
  const humanReadableSchedule = cronToHumanReadable(job.schedule);
  return `
    <div class='card'>
      <div class='card-title'>${job.name}</div>
      <div class='card-description'>Enabled: ${job.enabled ? 'Yes' : 'No'}</div>
      <div class='card-schedule'>Schedule: ${humanReadableSchedule}</div>
    </div>
  `;
}

function cronToHumanReadable(cronExpression) {
  try {
    return cronstrue.toString(cronExpression);
  } catch (error) {
    console.error('Error converting cron expression:', error);
    return cronExpression; // Return the original expression if there's an error
  }
}
