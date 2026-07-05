// Student model used to build a report card.
type Student = {
  // Unique student ID.
  id: string;
  // Student display name.
  name: string;
  // Collection of graded scores.
  scores: number[];
};

// This class mixes domain logic, formatting, storage, and delivery responsibilities.
class GradeReport {
  // Student data used by all report operations.
  constructor(private student: Student) {}

  // Computes arithmetic mean of all student scores.
  calculateAverage(): number {
    const total = this.student.scores.reduce((sum, score) => sum + score, 0);
    return total / this.student.scores.length;
  }

  // Maps average score to a letter grade.
  getLetterGrade(): string {
    const average = this.calculateAverage();

    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  }

  generateHtml(): string {
    // Presentation formatting is embedded directly into the report domain object.
    // Produces an HTML fragment for display/sharing.
    const average = this.calculateAverage();
    const letterGrade = this.getLetterGrade();

    return `
      <h1>Grade Report</h1>
      <p>Student: ${this.student.name}</p>
      <p>Average: ${average.toFixed(2)}</p>
      <p>Grade: ${letterGrade}</p>
    `;
  }

  // Persists the rendered report to a file destination.
  saveToFile(filename: string): void {
    const html = this.generateHtml();

    console.log(`Saving report to ${filename}`);
    console.log(html);
  }

  // Sends the rendered report to a parent email address.
  emailTo(parentEmail: string): void {
    const html = this.generateHtml();

    console.log(`Sending report to ${parentEmail}`);
    console.log(html);
  }
}
