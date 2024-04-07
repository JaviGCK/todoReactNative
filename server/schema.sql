CREATE DATABASE todo_react;

USE todo_react;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

       --insert to users into the users table
INSERT INTO users (name, email, password_hash, password_salt) 
VALUES ('Usuario1', 'usuario1@example.com', 'hash1', 'salt1'),
       ('Usuario2', 'usuario2@example.com', 'hash2', 'salt2');

       -- Insert some todos for user 1
INSERT INTO todos (title, completed, user_id)
VALUES ('Complete task 1', false, 1),
       ('Review document', true, 1),
       ('Prepare presentation', false, 1);

      -- Insert some todos for user 2
INSERT INTO todos (title, completed, user_id)
VALUES ('Buy groceries', false, 2),
       ('Go to the gym', true, 2),
       ('Read a book', false, 2);

      -- share todo 1 of a user 1 to user 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);


      -- get todos including shared todos by id

SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];
