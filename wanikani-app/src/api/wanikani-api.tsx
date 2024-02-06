

export class WaniKaniApi {
  static readonly apiURL : String = "https://api.wanikani.com/v2";
  static readonly token : String = process.env.EXPO_PUBLIC_API_KEY;


  static async getSummary() : Summary {
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
            lessons: json.data.reviews,
            available_lessons_count: json.data.lessons[0].subject_ids.length,
            available_reviews_count: json.data.reviews[0].subject_ids.length,
            next_reviews_at: json.data.next_reviews_at
          }

          return summary;
      } catch (error) {
          console.error("ERROR" + error);
      }
  };


  static async getUserProfile() : Profile  {
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
          return json.data
      } catch (error) {
          console.error(error);
      }
  };


}
