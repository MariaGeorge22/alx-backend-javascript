const fs = require('fs');

const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf8' });
    const lines = data.toString().trim().split('\n');
    // Process each line
    const fields = {};
    let count = 0;
    const firstNameIndex = 0;
    const fieldIndex = 3;
    lines.forEach((line, index) => {
      // Skip the header row
      if (index === 0 || line.trim() === '') return;

      count += 1;
      // Split each line into columns. Assuming comma-separated values
      const columns = line.split(',');
      // Example: Log the first column (e.g., name)
      const field = columns[fieldIndex];
      const firstName = columns[firstNameIndex];
      if (!(field in fields)) {
        fields[field] = [firstName];
      } else {
        fields[field].push(firstName);
      }
    });
    console.log(`Number of students: ${count}`);
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        const size = fields[key].length;
        const list = fields[key].join(', ');
        console.log(`Number of students in ${key}: ${size}. List: ${list}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
