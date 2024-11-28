const { writeFile } = require('fs').promises;
const { join } = require('path');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const filePath = join(__dirname, '../../public/data/timeline.json');
    
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Timeline data updated successfully' })
    };
  } catch (error) {
    console.error('Error saving timeline data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save timeline data' })
    };
  }
};