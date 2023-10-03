export const apiUrl = "http://localhost:8088/api";

export const COOKIE_NAME = "BookitJWT";

export const MAX_AGE = 60 * 60 * 24 * 30;

export const IsraelCities = [
  { title: "Tel Aviv", value: "Tel Aviv" },
  { title: "Jerusalem", value: "Jerusalem" },
  { title: "Haifa", value: "Haifa" },
  { title: "BeerSheva", value: "BeerSheva" },
  { title: "Ashkelon", value: "Ashkelon" },
  { title: "Eilat", value: "Eilat" },
  { title: "Ramla", value: "Ramla" },
  { title: "Netanya", value: "Netanya" },
  { title: "Rishon LeZion", value: "Rishon LeZion" },
  { title: "Petah Tikva", value: "Petah Tikva" },
  { title: "Holon", value: "Holon" },
  { title: "Bat Yam", value: "Bat Yam" },
  { title: "Bnei Brak", value: "Bnei Brak" },
  { title: "Ramat Gan", value: "Ramat Gan" },
  { title: "Ashdod", value: "Ashdod" },
  { title: "Rehovot", value: "Rehovot" },
  { title: "Herzliya", value: "Herzliya" },
  { title: "Kfar Saba", value: "Kfar Saba" },
  { title: "Modiin", value: "Modiin" },
];

export const countriesWithCities = {
  countries: [
    {
      name: "France",
      cities: ["Paris", "Nice", "Lyon", "Bordeaux", "Marseille"],
    },
    {
      name: "United States",
      cities: [
        "New York City",
        "Los Angeles",
        "Chicago",
        "San Francisco",
        "Miami",
      ],
    },
    {
      name: "Japan",
      cities: ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Sapporo"],
    },
    {
      name: "Italy",
      cities: ["Rome", "Venice", "Florence", "Milan", "Naples"],
    },
    {
      name: "Australia",
      cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    },
    {
      name: "Spain",
      cities: ["Barcelona", "Madrid", "Seville", "Valencia", "Granada"],
    },
    {
      name: "United Kingdom",
      cities: ["London", "Manchester", "Liverpool", "Birmingham", "Bristol"],
    },
    {
      name: "Germany",
      cities: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
    },
    {
      name: "Canada",
      cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
    },
    {
      name: "China",
      cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    },
    {
      name: "South Korea",
      cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
    },
    {
      name: "Netherlands",
      cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    },
    {
      name: "Israel",
      cities: ["Jerusalem", "Tel Aviv", "Haifa", "Eilat", "Netanya"],
    },
    {
      name: "Turkey",
      cities: ["Istanbul", "Ankara", "Antalya", "Izmir", "Bodrum"],
    },
  ],
};

export const stats = [
  { label: "Apartments booked every 24 hours", value: "440" },
  { label: "Assets under holding", value: "₪119 Million" },
  { label: "New users annually", value: "22,000" },
];

export const team = [
  {
    name: "Izat Alawi",
    role: "Founder / CEO",
  },
];

export const reservationStatus = [
  "Reserved",
  "Confirmed",
  "Rejected",
  "Cancelled",
  "Completed",
];

export const today = new Date().toISOString().split("T")[0];
export const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
