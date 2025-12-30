import { FC, useState, useEffect, ChangeEvent } from 'react';

//Fetching data with Effects
export const Page: FC = () => {
  const [person, setPerson] = useState<string>('Alice');
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);

    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });

    return () => {
      ignore = true;
    };
  }, [person]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerson(e.target.value);
  };

  return (
    <>
      <select value={person} onChange={handleSelectChange}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
};


const fetchBio = async (person: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const bios = {
    'Alice': 'happy',
    'Bob': 'new',
    'Taylor': 'year',
  };

  return bios[person as keyof typeof bios] || 'No bio available.';
};