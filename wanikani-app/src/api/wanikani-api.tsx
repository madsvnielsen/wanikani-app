import { Assignment } from "../models/assignment/AssignmentModel"
import { SubjectAssignmentPair } from "../models/SubjectAssignmentPairModel"


export class WaniKaniApi {
  static readonly apiURL: string = "https://api.wanikani.com/v2";
  static readonly token: string = process.env.EXPO_PUBLIC_API_KEY as string;


  static async getSummary(): Promise<Summary> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + '/summary',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      const summary: Summary = {
        lessons: json.data.lessons,
        reviews: json.data.reviews,
        available_lessons_count: json.data.lessons[0].subject_ids.length,
        available_reviews_count: json.data.reviews[0].subject_ids.length,
        next_reviews_at: json.data.next_reviews_at
      }

      return summary;
    } catch (error) {
      return Promise.reject("Couldn't get summary")
    }
  };


  static async getUserProfile(): Promise<Profile> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + '/user/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      return json.data as Profile
    } catch (error) {
      return Promise.reject("Couldn't get user")

    }
  };




  static async getSubjectsAtLevel(level: number): Promise<Array<Subject>> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + `/subjects?levels=${level}&types=kanji,radical`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      const subjects: Array<Subject> = []

      json.data.forEach(
        (entry: any) => {
          const subject: Subject = entry.data
          subject.id = entry.id
          subjects.push(subject)
        }
      )

      return subjects
    } catch (error) {
      return Promise.reject("Couldn't get subjects")
    }
  };


  static async getAssignmentsAtLevel(level: number): Promise<Array<Assignment>> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + `/assignments?levels=${level}&subject_types=kanji,radical`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      const assignments: Array<Assignment> = []
      json.data.forEach(
        (entry: any) => {
          const assignment: Assignment = entry.data
          assignments.push(assignment)
        }
      )

      return assignments
    } catch (error) {
      return Promise.reject("Couldn't get assignments")
    }
  };


  static createSubjectAssignmentPairs(subjects : Array<Subject>, assignments : Array<Assignment>) : Array<SubjectAssignmentPair>{

    let pairs: Array<SubjectAssignmentPair> = []
    subjects.forEach((subject: Subject) => {
      const matchingAssignment: Assignment | undefined = assignments.find((assignment: Assignment) => {
        return assignment.subject_id == subject.id
      })

      if (matchingAssignment != undefined) {
        pairs.push({ subject: subject, assignment: matchingAssignment } as SubjectAssignmentPair)
      }

    })

    return pairs;

  }





  static async getSubjectAssignmentPairsAtLevel(level: number): Promise<Array<SubjectAssignmentPair>> {
    const assignments: Array<Assignment> = await this.getAssignmentsAtLevel(level);
    const subjects: Array<Subject> = await this.getSubjectsAtLevel(level);

    let pairs: Array<SubjectAssignmentPair> = this.createSubjectAssignmentPairs(subjects, assignments);

    //Sort so radicals are first
    pairs.sort((itemA, itemB) => itemA.assignment.subject_type > itemB.assignment.subject_type ? -1 : 1);
    //Sort so locked kanji is last
    pairs = [...pairs.filter(pair => pair.assignment.srs_stage !== null),
    ...pairs.filter(pair => pair.assignment.srs_stage == null)]

    return pairs

  }




  static async getAllAssignments(): Promise<Array<Assignment>> {
    try {
      const visitPage = async (page: string) => {
        const response = await fetch(
          page,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + WaniKaniApi.token,
            }
          }
        );
        return await response.json();
      }

      let nextPage: string | null = WaniKaniApi.apiURL + "/assignments"
      let assignments: Array<Assignment> = []

      while (nextPage !== null) {
        let json = await visitPage(nextPage);
        nextPage = null
        if (json.pages.next_url !== null) {
          nextPage = json.pages.next_url
        }
        assignments = [...assignments, ...json.data.map((item: any) => item.data)]
      }

      return assignments

    } catch (error) {
      return Promise.reject("Couldn't get all assignments")
    }
  }




  static async getCurrentReviews(): Promise<Array<SubjectAssignmentPair>> {
      const summary : Summary = await this.getSummary();
      const subject_ids : Array<number> | undefined = summary.reviews.at(0) ?.subject_ids;

      const assignments : Array<Assignment> = await this.getAssignmentsByIDs(subject_ids as Array<number>)
      const subjects : Array<Subject> = await this.getSubjectsByIDs(subject_ids as Array<number>)
      const pairs = this.createSubjectAssignmentPairs(subjects, assignments);
      return pairs

    }




  static async getSubjectsByIDs(ids: Array<number>): Promise<Array<Subject>> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + `/subjects?ids=${ids}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      const subjects: Array<Subject> = []

      json.data.forEach(
        (entry: any) => {
          const subject: Subject = entry.data
          subject.id = entry.id
          subjects.push(subject)
        }
      )

      return subjects

    } catch (error) {
      return Promise.reject("Couldn't get subjects")
    }
  }

  static async getAssignmentsByIDs(ids: Array<number>): Promise<Array<Assignment>> {
    try {
      const response = await fetch(
        WaniKaniApi.apiURL + `/assignments?subject_ids=${ids}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + WaniKaniApi.token,
          }
        }

      );
      const json = await response.json();
      const assignments: Array<Assignment> = []
      json.data.forEach(
        (entry: any) => {
          const assignment: Assignment = entry.data
          assignments.push(assignment)
        }
      )

      return assignments

    } catch (error) {
      return Promise.reject("Couldn't get subjects")
    }
  }
}
