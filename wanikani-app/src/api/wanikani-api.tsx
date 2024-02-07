

export class WaniKaniApi {
  static readonly apiURL : string = "https://api.wanikani.com/v2";
  static readonly token : string = process.env.EXPO_PUBLIC_API_KEY as string;


  static async getSummary() : Promise<Summary> {
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
          const summary : Summary = {
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


  static async getUserProfile() : Promise<Profile>  {
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
          //console.log(outJSON);
          return json.data as Profile
      } catch (error) {
          return Promise.reject("Couldn't get user")

      }
  };




  static async getSubjectsAtLevel (level : number) : Promise<Array<Subject>> {
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
        const subjects : Array<Subject> = []

        json.data.forEach(
            (entry : any) => {
                const subject : Subject = entry.data
                subject.id = entry.id
                subjects.push(subject)
            }
        )

        return subjects
    } catch (error) {
        return Promise.reject("Couldn't get subjects")
    }
};


static async getAssignmentsAtLevel(level : number) : Promise<Array<Assignment>>{
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
        const assignments : Array<Assignment> = []
        json.data.forEach(
            (entry : any) => {
                const assignment : Assignment = entry.data
                assignments.push(assignment)
            }
        )
        return assignments
    } catch (error) {
        return Promise.reject("Couldn't get assignments")
    }
};





static async getSubjectAssignmentPairsAtLevel(level : number) : Promise<Array<SubjectAssignmentPair>>
{
    const assignments : Array<Assignment> = await this.getAssignmentsAtLevel(level);
    const subjects : Array<Subject> = await this.getSubjectsAtLevel(level);

    const pairs : Array<SubjectAssignmentPair> = []
    subjects.forEach( (subject : Subject) => {
        const matchingAssignment : Assignment | undefined = assignments.find((assignment : Assignment) => {
            return assignment.subject_id == subject.id
        })

        if(matchingAssignment != undefined){
            pairs.push({subject : subject, assignment : matchingAssignment} as SubjectAssignmentPair)
        }

    })

    return pairs

    }
}
