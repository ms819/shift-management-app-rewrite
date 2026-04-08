const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function safeMessage(response) {
  try {
    const data = await response.json();
    return data.error || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    throw new Error(await safeMessage(response));
  }
  return response.json();
}

export function getShifts(month) {
  return request(`/api/shifts?month=${encodeURIComponent(month)}`);
}

export function createShift(payload) {
  return request('/api/shifts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function deleteShift(id) {
  return request(`/api/shifts/${id}`, {
    method: 'DELETE',
  });
}

export function getPayroll(month) {
  return request(`/api/payroll?month=${encodeURIComponent(month)}`);
}
