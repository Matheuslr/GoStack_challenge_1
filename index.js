const express = require("express");

server = express();

server.use(express.json());

const projects = [];


server.use((req, res, next) => {
    console.count("Number of requests made until now")
  return next();
});

function checkIfIdExists(req, res, next) {
    console.log(req)
  const { id } = req.params;
  let idInProjects = false;

  projects.forEach((project, index) => {
    if (project.id == id) {
      idInProjects = true;

    }
  });
  if (!idInProjects) {
    res.status(400).send("Project id not in Projects");
  } else {
    return next();
  }
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  project = {
    id: id,
    title: title,
    tasks: []
  };

  projects.push(project);

  return res.status(201).send("Project added successfully");
});

server.put("/projects/:id", checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach((project, index) => {
    if (project.id == id) {
      project.title = title;
    }
  });

  return res.status(200).json(projects);
});

server.delete("/projects/:id", checkIfIdExists, (req, res) => {
  const { id } = req.params;
  projects.forEach((project, index) => {
    if (project.id == id) {
      projects.splice(index, 1);
    }
  });

  return res.send("Project deleted successfully");
});

server.post("/projects/:id/tasks", checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  projects.forEach((project, index) => {
    if (project.id == id) {
      project.tasks.push(task);
    }
  });
  return res.json(projects);
});
server.listen(3000);
