

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


}
