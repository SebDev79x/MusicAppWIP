export interface IBand {
  id: number;
  image: string;
  description: string;
  name: string;
  singer: string;
   songs : [{
    songId: number,
    title: string,
    youtubeUrl: string
  }]
/*   songs: object,
  songId: number,
  title: string,
  youtubeUrl: string */

}

 export class Band implements IBand {
  constructor(
    public id: number,
    public image: string,
    public description: string,
    public name: string,
    public singer: string,
    public songs: [{
     songId: number,
     title: string,
     youtubeUrl: string
  }]


  ) { }

}
