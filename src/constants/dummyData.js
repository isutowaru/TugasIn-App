const today = new Date();
const date = (offset) => { const d = new Date(today); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
export const initialTasks = [
  { id: '1', title: 'Menyelesaikan UI/UX Project', description: 'Finalisasi prototype aplikasi mobile dan siapkan presentasi untuk kelas.', category: 'Kuliah', deadline: date(0), priority: 'High', status: 'In Progress' },
  { id: '2', title: 'Baca materi basis data', description: 'Pelajari normalisasi database bab 4 dan 5.', category: 'Kuliah', deadline: date(1), priority: 'Medium', status: 'To Do' },
  { id: '3', title: 'Rapat komunitas kampus', description: 'Diskusi agenda kegiatan bulan ini.', category: 'Organisasi', deadline: date(2), priority: 'Low', status: 'To Do' },
  { id: '4', title: 'Kirim draft makalah', description: 'Kirim draft revisi ke dosen pembimbing.', category: 'Kuliah', deadline: date(3), priority: 'High', status: 'Completed' },
  { id: '5', title: 'Belanja kebutuhan mingguan', description: 'Beli kebutuhan pribadi di supermarket.', category: 'Pribadi', deadline: date(4), priority: 'Low', status: 'To Do' },
];
