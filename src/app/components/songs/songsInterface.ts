export interface ISong {
  bandId:number,
  songId: number,
  title: string,
  youtubeUrl: string
/*   songs: object,
  songId: number,
  title: string,
  youtubeUrl: string */

}

 export class Song implements ISong {
  constructor(
    public  bandId:number,
    public songId: number,
    public title: string,
    public youtubeUrl: string


  ) { }

}
