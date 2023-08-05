import { ITab } from "./components/RadiosTabs";

interface IConfig {
  tabs: ITab[];
}

export const config:IConfig = {
  tabs: [
    {
      id: 'favorites',
      name: 'Favorites'
    },
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'music',
      name: 'Music',
      tags: ['music', 'hip hop', 'latin', 'pop latino', 'jazz', 'chicago', 'classic rock', 'top hits', 'pop', 'country hits',]
    },
    {
      id: 'news',
      name: 'News',
      tags: ['news', 'world news', 'public radio', 'current affairs']
    },
    {
      id: 'pop',
      name: 'Pop music',
      tags: ['pop', 'top', 'pop latino', 'top hits']
    }
  ]
};