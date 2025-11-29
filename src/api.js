const API_BASE_URL = 'http://localhost:3001/api';

export const getWods = async () => {
  const response = await fetch(`${API_BASE_URL}/wods`);
  if (!response.ok) {
    throw new Error('Failed to fetch WODs');
  }
  return response.json();
};

export const addWod = async (wod) => {
  const response = await fetch(`${API_BASE_URL}/wods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wod),
  });
  if (!response.ok) {
    throw new Error('Failed to add WOD');
  }
  return response.json();
};

export const updateWod = async (id, wod) => {
  const response = await fetch(`${API_BASE_URL}/wods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wod),
  });
  if (!response.ok) {
    throw new Error('Failed to update WOD');
  }
  return response.json();
};

export const deleteWod = async (id) => {
  const response = await fetch(`${API_BASE_URL}/wods/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete WOD');
  }
};
