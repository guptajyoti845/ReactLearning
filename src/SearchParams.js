import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMAL = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]);
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle");
  const [animal, setAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);

  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets().then(r => {
      console.log(r);
    });
  }, [animal]);

  async function requestPets() {
    const response = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
    const json_response = await response.json();
    setPets(json_response.pets);
  }

  return (
    <div className="search-params">
      <form onSubmit={
        async e => {
          e.preventDefault();
          await requestPets();
        }
      }>
        <label htmlFor="location">Location
          <input type="text"
                 onCutCapture={e => {
                   console.log("e", e);
                 }}
                 id="location"
                 value={location}
                 onChange={e => setLocation(e.target.value)}
                 placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select name="animal"
                  id="animal"
                  value={animal}
                  onChange={e => setAnimal(e.target.value)} onBlur={e => setAnimal(e.target.value)}>

            <option />
            {
              ANIMAL.map(animal => (<option value={animal} key={animal}>{animal}</option>))
            }
          </select>
        </label>


        <label htmlFor="breed">
          Breed
          <select name="breed"
                  id="breed"
                  value={breed}
                  onChange={e => setBreed(e.target.value)} onBlur={e => setBreed(e.target.value)}>

            <option />
            {
              breeds.map(breed => (<option value={breed} key={breed}>{breed}</option>))
            }
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
