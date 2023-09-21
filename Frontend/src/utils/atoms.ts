import { FilterProps, User } from "@/types";
import { atom } from "jotai";
import { getNextDay, getToday } from "./helpers";

export const userAtom = atom<User | null>(null);

export const filterAtom = atom<FilterProps>({
  startDate: getToday(),
  endDate: getNextDay(),
  city: "Tel Aviv",
});
