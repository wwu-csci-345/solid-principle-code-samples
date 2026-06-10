type Student = {
  id: string;
  name: string;
  scores: number[];
};

class GradeReport {
  constructor(private student: Student) {}

  calculateAverage(): number {
    const total = this.student.scores.reduce((sum, score) => sum + score, 0);
    return total / this.student.scores.length;
  }

  getLetterGrade(): string {
    const average = this.calculateAverage();

    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  }

  generateHtml(): string {
    const average = this.calculateAverage();
    const letterGrade = this.getLetterGrade();

    return `
      <h1>Grade Report</h1>
      <p>Student: ${this.student.name}</p>
      <p>Average: ${average.toFixed(2)}</p>
      <p>Grade: ${letterGrade}</p>
    `;
  }

  saveToFile(filename: string): void {
    const html = this.generateHtml();

    console.log(`Saving report to ${filename}`);
    console.log(html);
  }

  emailTo(parentEmail: string): void {
    const html = this.generateHtml();

    console.log(`Sending report to ${parentEmail}`);
    console.log(html);
  }
}
