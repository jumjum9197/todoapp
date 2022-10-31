import React from "react";
import "./App.css";
import { Button, Container, Modal, TextField } from "@mui/material";
import CustomCard from "./components/customCard";
import { CardDto } from "./@types/props";

const App: React.FC = () => {


const [isEdit, setIsEdit]=  React.useState(false);
const [index, setIndex] = React.useState(1);
  const [todo, setTodo] = React.useState<CardDto>({
    name: "",
    description: "",
  });
  const [allTodo, setAllTodo] = React.useState<CardDto[]>([]);
  const [show, setShow] = React.useState(false);
  
 
  const handleTodo = (type: "add" | "delete" | "update", ind?: object) => {
    if (type === "add") {
      allTodo.push(todo);
      setTodo({
        name: "",
        description: "",
      });
      setShow(false);
      setAllTodo(allTodo);
    }
    if (type === "delete") {
      let data = [...allTodo];
      data.splice(index, 1);
      console.log(data);
      setAllTodo(data);
    }
    if (type === "update") {
      let newData = {ind, name: todo.name, description: todo.description }
      setTodo(newData);
      let newTodo= allTodo.map(ind =>{
        if(allTodo.indexOf(ind) ===index){
          return {...ind, name: todo.name, description: todo.description}
        }
        return ind;
      })
      setAllTodo(newTodo);
      setIsEdit(false);
      setShow(false)
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container component={"section"}>
      <Button
        sx={{ marginTop: 9, m: "auto", top:"20%", width: "20%", display: "block" }}
        variant="contained"
        onClick={() => setShow(!show)}
      >
        Add Todo
      </Button>
      <Modal open={show} onClose={() => setShow(!show)}>
        <Container sx={style}>
          <TextField
            label="Todo"
            value={todo.name}
            onChange={(name) => {
              setTodo({
                ...todo,
                name: name.target.value,
              });
            }}
            fullWidth
            sx={{ display: "block" }}
          />
          <TextField
            label="Description"
            fullWidth
            value={todo.description}
            onChange={(description) => {
              setTodo({
                ...todo,
                description: description.target.value,
              });
            }}
            sx={{ marginTop: 2, display: "block" }}
          />
          <Button
            variant="contained"
            onClick={() => isEdit ? handleTodo('update') : handleTodo("add")}
            sx={{ marginTop: 2, display: "block", float: "right" }}
          >
           {isEdit ? 'Edit' : 'Add'}
          </Button>
        </Container>
      </Modal>
      {allTodo.map(({ description, name }, index) => {
        return (
          <React.Fragment key={index}>
            <CustomCard
              name={name}
              description={description}
              deleteHandler={() => handleTodo("delete")}
              // edit={() => handleTodo("update", ind)}

              edit={() => {
                let ind = allTodo[index];
                setTodo(ind);
                setShow(true);
                setIndex(index);
                setIsEdit(true);
                
              }}
            />
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default App;