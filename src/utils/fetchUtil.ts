import { EVENTS_URL } from '../constants.js';
import { UserEvent } from '../types.js';

export default async function fetchUtil(
  method = 'GET',
  data?: object,
  id?: string | number,
  url = EVENTS_URL
) {
  url = id ? url + `/${id}` : url;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: UserEvent[] | UserEvent = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
