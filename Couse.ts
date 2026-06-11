class Course {
  constructor(
    public readonly code: string,
    protected capacity: number,
    protected enrolledStudents: string[] = []
  ) {}

  enroll(studentId: string): void {
    if (this.enrolledStudents.length >= this.capacity) {
      throw new Error("Course is full.");
    }

    if (this.enrolledStudents.includes(studentId)) {
      throw new Error("Student is already enrolled.");
    }

    this.enrolledStudents.push(studentId);
  }

  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }
}

class ArchivedCourse extends Course {
  enroll(studentId: string): void {
    throw new Error("Cannot enroll in an archived course.");
  }
}

// Example usage:
function enrollStudent(course: Course, studentId: string): void {
  course.enroll(studentId);
  console.log(`${studentId} enrolled in ${course.code}`);
}

const currentCourse = new Course("CSCI 345", 30);
enrollStudent(currentCourse, "s123");

const archivedCourse = new ArchivedCourse("CSCI 330", 30);
enrollStudent(archivedCourse, "s456"); // Runtime failure