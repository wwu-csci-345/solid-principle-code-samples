type StudentGrade = {
  studentId: string;
  studentName: string;
  score: number;
  letterGrade: string;
};

abstract class GradeExporter {
  export(grades: StudentGrade[]): string {
    const header = this.createHeader();
    const body = this.createBody(grades);
    const footer = this.createFooter();

    return header + body + footer;
  }

  protected createHeader(): string {
    return 'Student Grades\n';
  }

  protected abstract createBody(grades: StudentGrade[]): string;

  protected createFooter(): string {
    return '\nEnd of Report';
  }
}

class CsvGradeExporter extends GradeExporter {
  protected createBody(grades: StudentGrade[]): string {
    return grades
      .map((grade) => {
        return `${grade.studentId},${grade.studentName},${grade.score},${grade.letterGrade}`;
      })
      .join('\n');
  }
}

class HtmlGradeExporter extends GradeExporter {
  protected createHeader(): string {
    return '<h1>Student Grades</h1><table>';
  }

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