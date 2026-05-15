const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const STORAGE_KEY = 'student-service-requests';

const starterRequests = [
  {
    studentName: 'Jopap',
    serviceType: 'Transcript',
    status: 'Approved',
    date: '2026-05-14T07:04:20.301Z',
    id: 1,
  },
  {
    studentName: 'Mike',
    serviceType: 'ID Card',
    status: 'Approved',
    date: '2026-05-14T07:04:40.562Z',
    id: 2,
  },
  {
    studentName: 'Gilbert',
    serviceType: 'Transcript',
    status: 'Pending',
    date: '2026-05-14T07:05:07.647Z',
    id: 3,
  },
];

const readLocalRequests = () => {
  const savedRequests = localStorage.getItem(STORAGE_KEY);

  if (savedRequests) {
    return JSON.parse(savedRequests);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRequests));
  return starterRequests;
};

const saveLocalRequests = (requests) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  return requests;
};

const fetchJson = async (path, options) => {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const localRequestService = {
  getAll: async () => readLocalRequests(),
  create: async (data) => {
    const requests = readLocalRequests();
    const nextRequest = {
      ...data,
      id: requests.length ? Math.max(...requests.map((request) => Number(request.id))) + 1 : 1,
    };

    saveLocalRequests([...requests, nextRequest]);
    return nextRequest;
  },
  updateStatus: async (id, status) => {
    let updatedRequest;
    const requests = readLocalRequests().map((request) => {
      if (String(request.id) !== String(id)) {
        return request;
      }

      updatedRequest = { ...request, status };
      return updatedRequest;
    });

    saveLocalRequests(requests);
    return updatedRequest;
  },
  delete: async (id) => {
    const requests = readLocalRequests().filter((request) => String(request.id) !== String(id));
    saveLocalRequests(requests);
    return null;
  },
};

const withLocalFallback = async (remoteAction, localAction) => {
  try {
    return await remoteAction();
  } catch (error) {
    console.warn('API server unavailable. Using browser storage instead.', error);
    return localAction();
  }
};

export const requestService = {
  getAll: () => withLocalFallback(
    () => fetchJson('/requests'),
    () => localRequestService.getAll(),
  ),
  create: (data) => withLocalFallback(
    () => fetchJson('/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    () => localRequestService.create(data),
  ),
  updateStatus: (id, status) => withLocalFallback(
    () => fetchJson(`/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }),
    () => localRequestService.updateStatus(id, status),
  ),
  delete: (id) => withLocalFallback(
    () => fetchJson(`/requests/${id}`, { method: 'DELETE' }),
    () => localRequestService.delete(id),
  ),
};
