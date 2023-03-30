import React, { useState } from "react";
import axios from "axios";
import JokeItem from "./components/JokeItem";

import {
  Wrapper,
  Header,
  Image,
  Row,
  Form,
  Search,
  Button,
} from "./components/styled/index";
import { Joke } from "./common/types";

const BASE_URL = "https://v2.jokeapi.dev/joke/Any";

interface IProps {}

const App: React.FC<IProps> = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getJokes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ENDPOINT = `${BASE_URL}?contains=${search}&amount=10`;

    const { data } = await axios.get(ENDPOINT);
    if (data.error) {
      setError(true);
      setJokes([]);
    } else {
      setError(false);
      setJokes(data.jokes);
    }

    setSearch("");
  };

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>Joker</Header>
          <Image src="https://cdn03.ciceksepeti.com/cicek/kcm4930705-1/XL/cakatabloyagli-boya-erkek-baykus-resmi-gorseli-mdf-tablo-kcm4930705-1-ffc2468e89654f9fbfc7d542f830c626.jpg" alt="Laughing Face" />
        </Row>
        <Form onSubmit={getJokes}>
          <Search
            type="text"
            placeholder="Search.."
            value={search}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>

        {/* Jokes */}
        <div>
          {error && <p>Sorry, no jokes found.</p>}
          {jokes.length > 0 &&
            jokes.map((joke) => <JokeItem key={joke.id} joke={joke} />)}
        </div>
      </Wrapper>
    </div>
  );
};

export default App;
