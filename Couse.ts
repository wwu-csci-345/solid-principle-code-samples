// Base course entity supports enrollment for active courses.
class Course {
  constructor(
    // Human-readable course code shown to users.
    public readonly code: string,
    // Maximum number of students allowed to enroll.
    protected capacity: number,
    // Internal roster of enrolled student IDs.
    protected enrolledStudents: string[] = []
  ) {}

  // Adds a student to the roster when capacity and uniqueness checks pass.
  enroll(studentId: string): void {
    if (this.enrolledStudents.length >= this.capacity) {
      throw new Error("Course is full.");
    }

    if (this.enrolledStudents.includes(studentId)) {
      throw new Error("Student is already enrolled.");
    }

    this.enrolledStudents.push(studentId);
  }

  // Returns the current number of enrolled students.
  getEnrollmentCount(): number {
    return this.enrolledStudents.length;
  }
}

class ArchivedCourse extends Course {
  // Replacing enroll behavior with an unconditional error breaks expectations of Course clients.
  // Archived courses cannot accept new enrollments.
  enroll(studentId: string): void {
    throw new Error("Cannot enroll in an archived course.");
  }
}

// Example usage:
// This helper assumes any Course subtype is safely enrollable.
function enrollStudent(course: Course, studentId: string): void {
  course.enroll(studentId);
  console.log(`${studentId} enrolled in ${course.code}`);
}

const currentCourse = new Course("CSCI 345", 30);
enrollStudent(currentCourse, "s123");

const archivedCourse = new ArchivedCourse("CSCI 330", 30);
enrollStudent(archivedCourse, "s456"); // Runtime failure