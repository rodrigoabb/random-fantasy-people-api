import express from 'express';
import { generatePopulation, generatePeopleArrayByRace } from '../src/population';
import { getQueryStrings } from '../src/utilities/helperFunctions';
import { POPULATION_ACCEPTED_QUERY_STRINGS, RACES_SUPPORTED } from '../src/utilities/constants';

const router = express.Router();

router.get('/population/:race', async (req, res) => {
  try {
    const raceParam = req.params.race;
    const race = raceParam.toLowerCase();
    const filterQuery = getQueryStrings(req.query, POPULATION_ACCEPTED_QUERY_STRINGS);
    const qty = filterQuery.limit || 100;
    if (race) {
      // const isRaceSupported = checkIfExistInArray(race, RACES_SUPPORTED);
      // if (isRaceSupported) {
      const townPopulation = generatePopulation(race, qty);
      if (townPopulation) {
        res.status(200).send(townPopulation);
      } else {
        res.status(500).send('Something has happened');
      }
      // } else {
      // res.status(404).send(`Race provided is not supported YET. Please provide one of the currently supported races: [${RACES_SUPPORTED}]`);
      // }
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(error.statusCode).send(error.message);
  }
});

router.get('/population/race/:race/:qty', async (req, res) => {
  try {
    const { race, qty } = req.params;
    const peopleArray = generatePeopleArrayByRace(race, qty);
    console.log('peopleArray: ', JSON.stringify(peopleArray));
    res.status(200).send(peopleArray);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('An error has ocurred');
  }
});

export default router;
