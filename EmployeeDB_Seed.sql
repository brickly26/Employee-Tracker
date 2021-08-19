INSERT INTO departments (name) 
VALUES ("Marketing"), ("Accounting"), ("Finance"), ("Engineering"), ("Legal");

SELECT * FROM departments;

INSERT INTO roles (title, salary, department_id) 
VALUES ("Accoutant", 80000, 2), ("Head of Marketing", 90000, 1), ("Fin. Analyst", 110000, 3), ("Junior Dev.", 90000, 4), ("Senior Dev.", 130000, 4), ("Lawyer", 120000, 5);

SELECT * FROM roles;

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Joe", "Shmoe", 1, NULL), ("Lara", "Croft", 2, NULL), ("Julia", "Smith", 3, NULL), ("Burak", "Aksu", 5, NULL), ("Mike", "Ross", 4, 4), ("James", "Hamilton", 5, NULL);

SELECT * FROM employees;