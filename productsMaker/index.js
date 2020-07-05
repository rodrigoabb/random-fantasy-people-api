import uuidv4 from 'uuid/v4';
import { nameByRace } from 'fantasy-name-generator';
import {
  API_URL,
  PROFESSIONS_ARRAY,
  COLOR_NAMES,
  // GENDER_OPTIONS,
  AGES_RANGES,
  WEIGHT_RANGES,
  HEIGHT_RANGES,
  TOWNS_ARRAY,
} from '../src/utilities/constants';
import { generateRandom } from '../src/utilities/helperFunctions';

const elfHero = nameByRace('human', { gender: 'female', allowMultipleNames: true });
const enemyDemon = nameByRace('demon');

console.log('elfHero: ', elfHero);
console.log('enemyDemon: ', enemyDemon);

// const NUMBER_OF_PEOPLE = 1;

/*
        {
            "id": 0,
            "name": "Tobus Quickwhistle",
            "thumbnail": "http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg",
            "age": 306,
            "weight": 39.065952,
            "height": 107.75835,
            "hair_color": "Pink",
            "professions": [
                "Metalworker",
                "Woodcarver",
                "Stonecarver",
                "Tinker",
                "Tailor",
                "Potter"
            ],
            "friends": [
                "Cogwitz Chillwidget",
                "Tinadette Chillbuster"
            ]
        },
        */

const generatePeople = (numberOfPeople, townName) => {
  const peopleArray = [];
  const town = TOWNS_ARRAY.find((townObj) => (
    townObj.name === townName
  ));
  const race = town.mainRace;
  console.log('race: ', race);
  const peopleNamesAndGenderArray = generateMultiplePeopleNameAndGender(numberOfPeople, race);
  for (let i = 0; i < numberOfPeople; i += 1) {
    const { name, gender } = peopleNamesAndGenderArray[i];
    const avatarUrl = `${API_URL.base}/${API_URL.avatarResource}/${generateRandom([0, 999999999])}`;
    const age = generateAge(race);
    const weight = generateWeight(race);
    const height = generateHeight(race);
    const hairColor = COLOR_NAMES[generateRandom([0, COLOR_NAMES.length - 1])];
    const professions = [];
    for (let a = 0; a < generateRandom([0, 9]); a += 1) {
      professions.push(PROFESSIONS_ARRAY[generateRandom([0, PROFESSIONS_ARRAY.length - 1])]);
    }
    const numberOfFriends = numberOfPeople > 9 ? generateRandom([0, 9]) : generateRandom([0, numberOfPeople - 1]); // 0 to 9 friends
    const friends = getSomeNames(peopleNamesAndGenderArray, numberOfFriends, i);
    const person = {
      id: uuidv4(),
      name,
      gender,
      race,
      thumbnail: avatarUrl,
      age,
      weight,
      height,
      hair_color: hairColor,
      professions,
      friends,
    };
    peopleArray.push(person);
  }
  const townAndInhabitants = {
    townName: town.name,
    mainRace: town.mainRace,
    description: town.description,
    inhabitants: peopleArray,
  };
  return townAndInhabitants;
};

const generateMultiplePeopleNameAndGender = (numberOfPeople, race) => {
  const peopleNamesArray = [];
  for (let i = 0; i < numberOfPeople; i += 1) {
    peopleNamesArray.push(generateSinglePeopleNameAndGender(race));
  }
  return peopleNamesArray;
};

const generateSinglePeopleNameAndGender = (race) => {
  // const isFemale = Math.random() >= 0.1; // %90 probability of get "true"
  const isMale = Math.random() >= 0.5; // %50 probability of get 'true'
  const gender = isMale ? 'male' : 'female';
  const nameGenerated = nameByRace(race, { gender });
  const personGenerated = {
    name: nameGenerated,
    gender,
  };
  return personGenerated;
};

const generateAge = (race) => {
  const age = generateRandom(AGES_RANGES[race]);
  return age;
};

const generateWeight = (race) => {
  const age = generateRandom(WEIGHT_RANGES[race]);
  return age;
};

const generateHeight = (race) => {
  const age = generateRandom(HEIGHT_RANGES[race]);
  return age;
};

// const getPictures = () => {
//   return axios.get(`https://picsum.photos/v2/list?page=1&limit=${NUMBER_OF_PRODUCTS}`)
//     .then((response) => {
//       const picturesArray = response.data.map((picture) => picture.download_url);
//       return picturesArray;
//     });
// };

const getSomeNames = (peopleNamesArray, numberOfNames, indexToAvoid) => {
  const someNames = [];
  const bannedIndexes = [indexToAvoid];
  for (let i = 0; i < numberOfNames; i += 1) {
    const indexToAdd = generateRandom([0, peopleNamesArray.length - 1]);
    if (!bannedIndexes.includes(indexToAdd)) {
      someNames.push(peopleNamesArray[indexToAdd].name);
      bannedIndexes.push(indexToAdd);
    } else {
      i -= 1;
    }
  }
  return someNames;
};

const generatePeopleArray = async (qty, town) => {
  const selectedTown = town || TOWNS_ARRAY[generateRandom([0, TOWNS_ARRAY.length - 1])].name;
  const requestedQty = qty || 20;
  const peopleArray = generatePeople(requestedQty, selectedTown);
  console.log('peopleArray: ', JSON.stringify(peopleArray));
};

export default generatePeopleArray;
