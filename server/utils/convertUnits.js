const calculateMeqFromMgL = (element, concentrationMgL) => {
  // Define element specific conversion factors
  const elementCharges = {
    co3: -2,
    hco3: -1,
    cl: -1,
    so4: -2,
    no3: -1,
    po4: -3,
    th: 2,
    ca: 2,
    mg: 2,
    na: 1,
    k: 1,
    f: -1,
    sio2: 0,
  };
  const molarMasses = {
    co3: 60.01,
    hco3: 61.02,
    cl: 35.45,
    so4: 96.06,
    no3: 62.01,
    po4: 96.08,
    th: 100.09,
    ca: 40.08,
    mg: 24.305,
    na: 22.99,
    k: 39.1,
    f: 18.998,
    sio2: 60.08,
  };

  // Calculate milliequivalents per liter (meq/L)
  const charge = elementCharges[element];
  const molarMass = molarMasses[element];
  const meqL = (concentrationMgL / molarMass) * charge;

  return meqL;
};

const convertUnits = (form) => {
  const convertedForm = {};

  // Loop through each key-value pair in the form
  for (const [key, value] of Object.entries(form)) {
    // Check if the key exists and if it has a unit property
    if (key && value?.unit) {
      const { value: originalValue, unit } = value;

      // Conversion logic based on the unit
      let convertedValue = parseFloat(originalValue);
      switch (unit) {
        case "mS/cm":
          convertedValue = originalValue * 1000; // Convert mS/cm to µS/cm
          break;
        case "dS/m":
          convertedValue = originalValue * 1000; // Convert dS/m to µS/cm (assuming deciSiemens)
          break;
        case "meq/L":
          // Conversion logic for meq/L to mg/L (replace with your specific conversion formula)
          convertedValue = calculateMeqFromMgL(key, originalValue); // Replace with your conversion function
          break;
        default:
          // No conversion needed for other units (e.g., no unit)
          break;
      }

      convertedForm[key] = convertedValue; // Add the converted value to the new object
    } else {
      // Remove units from specific fields (longitude, latitude, potentially ph)
      if (["longitude", "latitude", "ph"].includes(key)) {
        convertedForm[key] = parseFloat(value.value); // Convert to number and remove unit
      } else {
        convertedForm[key] = value; // Add non-convertible values directly
      }
    }
  }

  return convertedForm;
};

module.exports = {
  convertUnits,
};
