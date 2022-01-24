export class Bands {
  constructor(
    public bandId: number,
    public bandName: string,
    public singerName: string,
    public style: string,
    public name: string, // bof bof, il aurait fallu voir une autre approche pour récupérer cela depuis Images dans view.component.ts
    public year: string,
    public fav:boolean) {
    this.bandId = bandId;
    this.bandName = bandName;
    this.singerName = singerName;
    this.style = style;
    this.name = name;
    this.fav = fav;

  }


}
