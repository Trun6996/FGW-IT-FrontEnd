// ...existing code...
import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // đảm bảo có protocol + port

const http = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export async function getWords() {
  const res = await http.get('/words');
  return res.data;
}

export async function getWord(id) {
  const res = await http.get(`/words/${id}`);
  return res.data;
}

export async function createWord(payload) {
  const res = await http.post('/words', payload);
  return res.data;
}

export async function updateWord(id, payload) {
  const res = await http.put(`/words/${id}`, payload);
  return res.data;
}

export async function deleteWord(id) {
  const res = await http.delete(`/words/${id}`);
  return res.data;
}

// default export so existing imports like `import api from '../helpers/api'` work
const api = { getWords, getWord, createWord, updateWord, deleteWord };
export default api;
// ...existing code...