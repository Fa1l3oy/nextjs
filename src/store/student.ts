export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  specialSkills?: string;
  reason?: string;
  majorChoice?: string;
  university?: string;
  photos?: string[]; // image URLs (data URLs or hosted)
  activities?: string[];
  awards?: string[];
  works?: string[];
  teacherId?: string;
  teacherName?: string;
  createdAt: string;
};

const students: Student[] = [];

export function addStudent(s: Omit<Student, 'id' | 'createdAt'>) {
  const student: Student = {
    ...s,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: new Date().toISOString(),
  };
  students.push(student);
  return student;
}

export function getStudents() {
  return students.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getStudentById(id: string) {
  return students.find((s) => s.id === id) || null;
}

export function updateStudent(id: string, patch: Partial<Omit<Student, 'id' | 'createdAt'>>) {
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const updated: Student = { ...students[idx], ...patch } as Student;
  students[idx] = updated;
  return updated;
}

export function clearStudents() {
  students.length = 0;
}

// Note: This is an in-memory store. For persistence, replace this file with
// a database or localStorage implementation and update imports in
// `src/app/student/page.tsx` accordingly.
