import { useState } from "react";

import API from "../api/methods";

// Components
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';

function PollForm() {

  const [choice, setChoice] = useState("");

  function handleChange(event) {
    setChoice(event.target.value);
  }

  async function handleClick() {
    try {
      const data = {
        os: choice
      }
      await API.post("/poll/create", data);
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  }

  return (
    <Form id="vote-form">
      <div onChange={handleChange}>
        <Form.Check
        name="os"
        type="radio"
          value="Windows"
          label="Windows"
          checked={choice === "Windows"}
          onChange={ handleChange }
        />
        <Form.Check
          name="os"
          type="radio"
          value="MacOS"
          label="MacOS"
          checked={choice === "MacOS"}
          onChange={ handleChange }
        />
        <Form.Check
          name="os"  
          type="radio"
          value="Linux"
          label="Linux Distro"
          checked={choice === "Linux"}
          onChange={ handleChange }
        />
        <Form.Check
          name="os"  
          type="radio"
          value="Other"
          label="Something else"
          checked={choice === "Other"}
          onChange={ handleChange }
        />
        </div>
        <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={ handleClick }
        >
          Vote
        </Button>
    </Form>
  );
}

export default PollForm;
