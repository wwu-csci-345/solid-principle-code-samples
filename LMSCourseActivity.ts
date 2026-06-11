interface CourseActivity {
  id: string;
  title: string;

  open(): void;

  submit(studentId: string, content: string): void;
  grade(studentId: string, score: number): void;
  autoGrade(studentId: string): number;

  markWatched(studentId: string): void;
  getVideoUrl(): string;

  setRubric(rubric: string): void;
}

// a programming assignment that can be submitted and graded, but cannot be watched or have a video URL
class ProgrammingAssignment implements CourseActivity {
  constructor(
    public id: string,
    public title: string,
    private rubric: string = ""
  ) {}

  open(): void {
    console.log(`Opening assignment: ${this.title}`);
  }

  submit(studentId: string, content: string): void {
    console.log(`${studentId} submitted code: ${content}`);
  }

  grade(studentId: string, score: number): void {
    console.log(`${studentId} received ${score}`);
  }

  autoGrade(studentId: string): number {
    console.log(`Running tests for ${studentId}`);
    return 90;
  }

  setRubric(rubric: string): void {
    this.rubric = rubric;
  }

  markWatched(studentId: string): void {
    throw new Error("Programming assignments cannot be watched.");
  }

  getVideoUrl(): string {
    throw new Error("Programming assignments do not have video URLs.");
  }
}

// a lecture video that can be watched and has a video URL, but cannot be submitted or graded
class LectureVideo implements CourseActivity {
  constructor(
    public id: string,
    public title: string,
    private videoUrl: string
  ) {}

  open(): void {
    console.log(`Opening video: ${this.title}`);
  }

  markWatched(studentId: string): void {
    console.log(`${studentId} watched ${this.title}`);
  }

  getVideoUrl(): string {
    return this.videoUrl;
  }

  submit(studentId: string, content: string): void {
    throw new Error("Lecture videos do not accept submissions.");
  }

  grade(studentId: string, score: number): void {
    throw new Error("Lecture videos are not graded.");
  }

  autoGrade(studentId: string): number {
    throw new Error("Lecture videos cannot be autograded.");
  }

  setRubric(rubric: string): void {
    throw new Error("Lecture videos do not have rubrics.");
  }
}

// Usage example
function showVideo(activity: CourseActivity): void {
  console.log(activity.getVideoUrl());
}

const assignment = new ProgrammingAssignment("a1", "Binary Search Tree Lab");

showVideo(assignment); // Runtime failure