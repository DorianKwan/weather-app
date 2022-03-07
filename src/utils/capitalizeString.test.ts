import { capitalizeString } from '.';

test('capitalizes all lowercase string', () => {
  const stringToCapitalize = 'abu dabi';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize);

  expect(capitalized === expected).toBeTruthy();
});

test('speedy capitalizes all lowercase string', () => {
  const stringToCapitalize = 'abu dabi';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize, true);

  expect(capitalized === expected).toBeTruthy();
});

test('capitalizes mixed casing string', () => {
  const stringToCapitalize = 'aBu DaBi';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize);

  expect(capitalized === expected).toBeTruthy();
});

test('speedily capitalizes mixed casing string', () => {
  const stringToCapitalize = 'aBu DaBi';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize, true);

  expect(capitalized === expected).toBeTruthy();
});

test('capitalize all capped string', () => {
  const stringToCapitalize = 'ABU DABI';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize);

  expect(capitalized === expected).toBeTruthy();
});

test('speedy capitalizes all capped string', () => {
  const stringToCapitalize = 'ABU DABI';
  const expected = 'Abu Dabi';

  const capitalized = capitalizeString(stringToCapitalize, true);

  expect(capitalized === expected).toBeTruthy();
});
