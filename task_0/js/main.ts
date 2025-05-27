interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Alice',
  lastName: 'Dupont',
  age: 22,
  location: 'Paris',
};

const student2: Student = {
  firstName: 'Bob',
  lastName: 'Martin',
  age: 24,
  location: 'Lyon',
};

const studentsList = [student1, student2];

studentsList.forEach((student) => {});
