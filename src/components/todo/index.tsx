import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TTodo } from "../../store/todo";
import todo from "../../store/todo";

const Todo = ({ value, id }: TTodo) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const onRemove = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        todo.removeTodo(id);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        todo.updateTodo(id, e.target.value);
    };

    return (
        <Card sx={{ p: "16px", mb: "12px" }} style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    sx={{ mr: "6px", width: "100%" }}
                    id="todo"
                    onChange={onChange}
                    variant="standard"
                    value={value}
                    onPointerDown={(e) => e.stopPropagation()}
                />
                <CardActions>
                    <Button onClick={onRemove} onPointerDown={(e) => e.stopPropagation()}>
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default observer(Todo);
