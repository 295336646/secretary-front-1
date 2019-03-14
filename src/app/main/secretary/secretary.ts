export class Secretary {
  id: string;
  subjectName: string;
  student: string;
  subjectType: string;
  guidanceScore: number;
  ratingScore: number;
  replyScore: number;
  state: string;

  constructor(id, subjectName, student, subjectType, guidanceScore, ratingScore, replyScore, state) {
    this.id = id;
    this.subjectName = subjectName;
    this.student = student;
    this.subjectType = subjectType;
    this.guidanceScore = guidanceScore;
    this.ratingScore = ratingScore;
    this.replyScore = replyScore;
    this.state = state;
  }
}
