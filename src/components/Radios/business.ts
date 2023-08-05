import { IRadio } from "../../types/radio.types";
import { ITab } from "../RadiosTabs";

const sortByPopularity = (a:IRadio, b:IRadio) => b.popularity - a.popularity;
const sortByReliability = (a:IRadio, b:IRadio) => b.reliability - a.reliability;

export const filterRadios = (data: IRadio[] = [], tab: ITab, sortBy: string, favorites: string[]) => {
  let radios:IRadio[] = [];
  
  const sorterFn = sortBy === 'popularity' ? sortByPopularity : sortByReliability;

  if (tab.id === 'all') {
    radios = [...data];
  } else if (tab.id === 'favorites') {
    radios = [...data].filter(radio => favorites.includes(radio.id));
  } else {
    radios = [...data].filter(radio => radio.tags.some(tag => tab.tags?.includes(tag)));
  }

  return radios.sort(sorterFn);
};