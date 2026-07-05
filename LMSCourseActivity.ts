// A broad interface forces unrelated capabilities into all activity types (ISP violation).
interface CourseActivity {
  // Unique activity identifier.
  id: string;
  // User-facing activity title.
  title: string;

  // Opens the activity for viewing/interacting.
  open(): void;

  // Submits student work for evaluable activities.
  submit(studentId: string, content: string): void;
  // Assigns a score to a student's submission.
  grade(studentId: string, score: number): void;
  // Executes automatic grading rules and returns a score.
  autoGrade(studentId: string): number;

  // Marks that a student has watched the activity media.
  markWatched(studentId: string): void;
  // Returns the media URL for video activities.
  getVideoUrl(): string;

  // Sets rubric text for manually graded activities.
  setRubric(rubric: string): void;
}

// a programming assignment that can be submitted and graded, but cannot be watched or have a video URL
class ProgrammingAssignment implements CourseActivity {
  constructor(
    // Unique activity identifier.
    public id: string,
    // Assignment title displayed to students.
    public title: string,
    // Rubric criteria used by instructors.
    private rubric: string = ""
  ) {}

  // Opens the assignment details.
  open(): void {
    console.log(`Opening assignment: ${this.title}`);
  }

  // Records submitted code/content from a student.
  submit(studentId: string, content: string): void {
    console.log(`${studentId} submitted code: ${content}`);
  }

  // Records an instructor-assigned score.
  grade(studentId: string, score: number): void {
    console.log(`${studentId} received ${score}`);
  }

  // Simulates auto-grading by running tests.
  autoGrade(studentId: string): number {
    console.log(`Running tests for ${studentId}`);
    return 90;
  }

  // Updates rubric guidance for the assignment.
  setRubric(rubric: string): void {
    this.rubric = rubric;
  }

  // Not supported for assignment activities.
  markWatched(studentId: string): void {
    // Unsupported operations are represented as runtime errors.
    throw new Error("Programming assignments cannot be watched.");
  }

  // Not supported for assignment activities.
  getVideoUrl(): string {
    throw new Error("Programming assignments do not have video URLs.");
  }
}

// a lecture video that can be watched and has a video URL, but cannot be submitted or graded
class LectureVideo implements CourseActivity {
  constructor(
    // Unique activity identifier.
    public id: string,
    // Video title displayed to students.
    public title: string,
    // URL where the lecture video is hosted.
    private videoUrl: string
  ) {}

  // Opens the lecture video view.
  open(): void {
    console.log(`Opening video: ${this.title}`);
  }

  // Records view completion for the student.
  markWatched(studentId: string): void {
    console.log(`${studentId} watched ${this.title}`);
  }

  // Returns the lecture video location.
  getVideoUrl(): string {
    return this.videoUrl;
  }

  // Not supported for lecture video activities.
  submit(studentId: string, content: string): void {
    // Unsupported operations are represented as runtime errors.
    throw new Error("Lecture videos do not accept submissions.");
  }

  // Not supported for lecture video activities.
  grade(studentId: string, score: number): void {
    throw new Error("Lecture videos are not graded.");
  }

  // Not supported for lecture video activities.
  autoGrade(studentId: string): number {
    throw new Error("Lecture videos cannot be autograded.");
  }

  // Not supported for lecture video activities.
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