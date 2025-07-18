import csv
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(filename='student_system.log', level=logging.INFO, 
                    format='%(asctime)s:%(levelname)s:%(message)s')

class Student:
    def __init__(self, student_id, name, age, grade):
        self.student_id = student_id
        self.name = name
        self.age = age
        self.grade = grade

   


class StudentManager:
    def __init__(self, filename='students.csv'):
        self.filename = filename
        self.students = self.load_students()

    def load_students(self):
        students = {}
        try:
            with open(self.filename, mode='r', newline='') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    student = Student(row['student_id'], row['name'], int(row['age']), row['grade'])
                    students[student.student_id] = student
        except FileNotFoundError:
            logging.warning("CSV file not found. Starting with an empty database.")
        return students

    def save_students(self):
        with open(self.filename, mode='w', newline='') as file:
            fieldnames = ['student_id', 'name', 'age', 'grade']
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            for student in self.students.values():
                writer.writerow(vars(student))

    def add_student(self, student):
        if student.student_id in self.students:
            logging.error("Student already exists.")
            raise ValueError("Student already exists.")
        self.students[student.student_id] = student
        logging.info(f"Added student {student.student_id}")
        self.save_students()

    def delete_student(self, student_id):
        if student_id not in self.students:
            logging.error("Student not found.")
            raise KeyError("Student not found.")
        del self.students[student_id]
        logging.info(f"Deleted student {student_id}")
        self.save_students()

    def update_student(self, student_id, **kwargs):
        student = self.students.get(student_id)
        if not student:
            logging.error("Student not found.")
            raise KeyError("Student not found.")
        for key, value in kwargs.items():
            setattr(student, key, value)
        logging.info(f"Updated student {student_id}")
        self.save_students()

    def get_student(self, student_id):
        return self.students.get(student_id)

    def list_students(self):
        return list(self.students.values())


# Unit Testing
if __name__ == "__main__":
    manager = StudentManager()
    try:
        # Add students
        manager.add_student(Student("101", "Alice", 20, "A"))
        manager.add_student(Student("102", "Bob", 22, "B"))

        # Update
        manager.update_student("101", age=21, grade="A+")

        # Delete
        manager.delete_student("102")

        # List
        for s in manager.list_students():
            print(s)

    except Exception as e:
        print("Error:", e)
        logging.error(f"Error occurred: {e}")
