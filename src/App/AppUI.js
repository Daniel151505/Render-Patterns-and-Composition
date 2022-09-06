import React from 'react';
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { TodoButton} from "../TodoButton/index.js";
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { TodoHeader } from '../TodoHeader';

function AppUI() {
    const {
        error, 
        loading, 
        searchedTodos, 
        completeTodo, 
        deleteTodo,
        openModal,
        setOpenModal,
        totalTodos, 
        completedTodos,
        searchValue, 
        setSearchValue
    } = React.useContext(TodoContext);

    return(
        <React.Fragment>
            <TodoHeader>
                <TodoCounter
                    totalTodos={totalTodos}
                    completedTodos={completedTodos}
                >
                </TodoCounter>
                <TodoSearch>
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                </TodoSearch>
            </TodoHeader>

            <TodoList>
            {error && <TodosError />}
            {loading && <TodosLoading />}
            {(!loading && !searchedTodos.length) && <EmptyTodos />}
                
            {searchedTodos.map(todo => (
            <TodoItem 
                key={todo.text} 
                text={todo.text} 
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
                />
            ))}
            </TodoList>

            { !!openModal && (
                <Modal>
                    <TodoForm/>
                </Modal>
            )}

            <TodoButton 
                setOpenModal={setOpenModal}
            />      
         </React.Fragment>
    );
}

export {
    AppUI
};