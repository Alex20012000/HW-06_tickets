import { ICompanie, ITicket } from '../types/types';

import victoryLogo from '../assets/victory.png';
import redWingsLogo from '../assets/RedWings.png';
import s7Logo from '../assets/S7.png';

const airports: string[] = [
  'DME',
  'SVO',
  'VKO',
  'ZIA',
  'LED',
  'UFA',
  'KZN',
  'AER',
  'ROV',
  'SVX',
  'KRR',
  'OVB',
  'CEK',
  'KJA',
  'UUD',
  'VVO',
  'KUF',
  'TJM',
  'KGD',
  'NJC',
  'AAQ',
  'VOG',
  'GOJ',
  'SGC',
  'BQS',
  'MJZ',
  'MMK',
  'NER',
  'IJK',
  'DYR',
  'YKS',
  'BAX',
];

const generateTickets = (): ITicket[] =>
  Array.from({ length: 30 }, (_, i) => generateTicket(i));
  
const generateTicket = (id: number): ITicket => {
  const startTime = getDepartureTime();
  const duration = getRandomDuration();
  const endTime = getLandindTime(startTime, duration);

  return {
    id: id + 1,
    from: getRandomAirport(),
    to: getRandomAirport(),
    company: getRandomCompany(),
    price: getRandomNumber(1500, 100000),
    startTime,
    endTime,
    duration,
    connectionAmount: getRandomNumber(0, 3),
  };
};
  
const getRandomAirport = (): string => airports[Math.floor(Math.random() * airports.length)];
  
const getDepartureTime = (): string => {
    const hour = getRandomNumber(0, 23).toString().padStart(2, '0');
    const minute = getRandomNumber(0, 59).toString().padStart(2, '0');
    return `${hour}:${minute}`;
};
  
const getRandomDuration = (): number => getRandomNumber(60, 24 * 60);

const getLandindTime = (startTime: string, duration: number): string => {
    const startHour = Number(startTime.split(':')[0]);
    const startMinute = Number(startTime.split(':')[1]);
  
    const endHour = Math.floor((startHour + duration / 60) % 24);
    const endMinute = Math.floor((startMinute + duration % 60) % 60);
  
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
};
  
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const companiesData = [
  { key: 'pobeda', name: 'Победа', logo: victoryLogo, alt: 'Логотип компании Победа' },
  { key: 'redWings', name: 'Red Wings', logo: redWingsLogo, alt: 'Логотип компании Red Wings' },
  { key: 'S7', name: 'S7', logo: s7Logo, alt: 'Логотип компании S7' },
];

export const companies: { [key: string]: ICompanie } = Object.fromEntries(
  companiesData.map(company => [company.key, { name: company.name, logo: company.logo, alt: company.alt }])
);
  
const getRandomCompany = (): string => {
  const companyNames = Object.keys(companies);
  return companyNames[Math.floor(Math.random() * companyNames.length)];
};

export default generateTickets;
