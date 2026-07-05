// Normalized grade record used by exporters.
type StudentGrade = {
  // Student identifier.
  studentId: string;
  // Full student name.
  studentName: string;
  // Numeric score.
  score: number;
  // Letter equivalent of the score.
  letterGrade: string;
};

// Template Method: export flow is fixed while subclasses customize sections.
abstract class GradeExporter {
  // Fixed export algorithm that delegates variable sections to subclass hooks.
  export(grades: StudentGrade[]): string {
    const header = this.createHeader();
    const body = this.createBody(grades);
    const footer = this.createFooter();

    return header + body + footer;
  }

  // Default title/preamble for text-oriented formats.
  protected createHeader(): string {
    return 'Student Grades\n';
  }

  // Subclass-specific row/body rendering.
  protected abstract createBody(grades: StudentGrade[]): string;

  // Default footer used by text-oriented formats.
  protected createFooter(): string {
    return '\nEnd of Report';
  }
}

class CsvGradeExporter extends GradeExporter {
  // CSV output only overrides the variable part (body rows).
  // Emits one comma-separated row per student.
  protected createBody(grades: StudentGrade[]): string {
    return grades
      .map((grade) => {
        return `${grade.studentId},${grade.studentName},${grade.score},${grade.letterGrade}`;
      })
      .join('\n');
  }
}

class HtmlGradeExporter extends GradeExporter {
  // HTML output adjusts header/body/footer without changing export orchestration.
  // Starts an HTML table structure for row content.
  protected createHeader(): string {
    return '<h1>Student Grades</h1><table>';
  }

  // Emits HTML table rows for each grade record.
  protected createBody(grades: StudentGrade[]): string {
    return grades
      .map((grade) => {
        return `
          <tr>
            <td>${grade.studentId}</td>
            <td>${grade.studentName}</td>
            <td>${grade.score}</td>
            <td>${grade.letterGrade}</td>
          </tr>
        `;
      })
      .join('');
  }

  // Closes the HTML table.
  protected createFooter(): string {
    return '</table>';
  }
}


// Example usage:
const grades: StudentGrade[] = [
  {
    studentId: "s101",
    studentName: "Maya Chen",
    score: 94,
    letterGrade: "A",
  },
  {
    studentId: "s102",
    studentName: "Jordan Lee",
    score: 87,
    letterGrade: "B",
  },
];

const exporter: GradeExporter = new CsvGradeExporter();

console.log(exporter.export(grades));